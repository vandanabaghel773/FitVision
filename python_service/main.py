import base64
import io
import math
import os
import shutil
import tempfile
import uuid
from pathlib import Path

import mediapipe as mp
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from gradio_client import Client, handle_file
from PIL import Image

load_dotenv()

app = FastAPI(title="FitVision Try-On API")

# Allow React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temp directory to store result images
RESULTS_DIR = Path("results")
RESULTS_DIR.mkdir(exist_ok=True)

# Optional: HuggingFace token for faster queue (get free at hf.co/settings/tokens)
HF_TOKEN = os.getenv("HF_TOKEN", None)


@app.get("/")
def root():
    return {"status": "FitVision API is running"}


# ── Body type detection helpers ───────────────────────────────────────────────


def _x_width(a, b):
    """Horizontal distance only — measures actual body width, not diagonal."""
    return abs(a.x - b.x)


def classify_body_type(shoulder_w, waist_w, hip_w):
    """
    Classify body shape from horizontal widths (normalised 0-1).
    Uses ratio-based logic calibrated to MediaPipe x-coordinates.
    """
    sh = shoulder_w / hip_w if hip_w else 1.0
    wh = waist_w / hip_w if hip_w else 1.0
    ws = waist_w / shoulder_w if shoulder_w else 1.0

    print(f"  ratios → sh/hip={sh:.3f}  waist/hip={wh:.3f}  waist/sh={ws:.3f}")

    # Hourglass: shoulders ≈ hips, waist clearly smaller than both
    if 0.85 <= sh <= 1.15 and wh < 0.82 and ws < 0.82:
        shape = "Hourglass"
        desc = "Your shoulders and hips are well balanced with a defined waist — the most versatile body shape."
        tips = [
            "Fitted dresses and wrap styles look great on you.",
            "Highlight your waist with belts.",
            "Almost every silhouette works — own it!",
        ]
        color = "#a855f7"
        emoji = "⌛"

    # Pear: hips clearly wider than shoulders
    elif sh < 0.85:
        shape = "Pear (Triangle)"
        desc = "Your hips are wider than your shoulders, giving a classic feminine silhouette."
        tips = [
            "A-line and flared skirts balance your proportions.",
            "Boat necks and off-shoulder tops add width on top.",
            "Avoid clingy fabrics around the hips.",
        ]
        color = "#ec4899"
        emoji = "🔻"

    # Inverted Triangle: shoulders clearly wider than hips
    elif sh > 1.15 and wh < 0.88:
        shape = "Inverted Triangle"
        desc = "Your shoulders are broader than your hips — athletic and strong."
        tips = [
            "Wide-leg trousers and flared jeans add balance.",
            "V-necks draw the eye inward.",
            "Avoid heavy shoulder details.",
        ]
        color = "#3b82f6"
        emoji = "🔺"

    # Rectangle: all three roughly the same
    elif wh >= 0.82 and 0.85 <= sh <= 1.15:
        shape = "Rectangle (Straight)"
        desc = "Your shoulders, waist, and hips are roughly the same width — lean and athletic."
        tips = [
            "Peplum tops and ruffles create curves.",
            "Belted outfits define your waist.",
            "Layering adds dimension to your look.",
        ]
        color = "#10b981"
        emoji = "▬"

    # Apple: wide waist relative to hips and shoulders
    else:
        shape = "Apple (Oval)"
        desc = "Your midsection is fuller with slimmer legs — focus on elongating your silhouette."
        tips = [
            "Empire-waist and A-line dresses are very flattering.",
            "Monochrome outfits create a lean look.",
            "V-necks elongate the neckline beautifully.",
        ]
        color = "#f59e0b"
        emoji = "🟡"

    return {
        "shape": shape,
        "description": desc,
        "tips": tips,
        "color": color,
        "emoji": emoji,
        "measurements": {
            "shoulder": round(shoulder_w, 4),
            "waist": round(waist_w, 4),
            "hip": round(hip_w, 4),
        },
    }


def _pixel_width_at_row(mask, row_y, h):
    """Return the fraction of image width covered by body pixels at a given y (0-1)."""
    row = int(row_y * h)
    row = max(0, min(row, h - 1))
    body_cols = np.where(mask[row] > 0.5)[0]
    if len(body_cols) == 0:
        return 0.0
    return float(body_cols[-1] - body_cols[0]) / mask.shape[1]


@app.post("/detect-body-type")
async def detect_body_type(person_image: UploadFile = File(...)):
    """
    Detect body type using MediaPipe segmentation mask for accurate
    shoulder / waist / hip width measurements.
    """
    try:
        img_bytes = await person_image.read()
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        np_img = np.array(pil_img)
        h, w = np_img.shape[:2]

        mp_pose = mp.solutions.pose
        with mp_pose.Pose(
            static_image_mode=True,
            model_complexity=2,
            min_detection_confidence=0.4,
            enable_segmentation=True,
        ) as pose:
            results = pose.process(np_img)

        if not results.pose_landmarks:
            raise HTTPException(
                400,
                "Could not detect a person in the image. Please use a clear full-body photo.",
            )

        lm = results.pose_landmarks.landmark
        PL = mp_pose.PoseLandmark
        mask = results.segmentation_mask  # shape (H, W), values 0-1

        # Get y-levels from landmarks
        shoulder_y = (lm[PL.LEFT_SHOULDER].y + lm[PL.RIGHT_SHOULDER].y) / 2
        hip_y = (lm[PL.LEFT_HIP].y + lm[PL.RIGHT_HIP].y) / 2
        waist_y = shoulder_y + (hip_y - shoulder_y) * 0.5  # midpoint

        # Measure actual pixel widths using segmentation mask
        # Average a band of 3 rows to reduce noise
        def band_width(cy):
            rows = [cy - 0.01, cy, cy + 0.01]
            widths = [_pixel_width_at_row(mask, r, h) for r in rows]
            return max(widths)

        shoulder_w = band_width(shoulder_y)
        waist_w = band_width(waist_y)
        hip_w = band_width(hip_y)

        # Also check a bit below hip (actual widest point of hips/thighs)
        hip_low_w = band_width(hip_y + 0.06)
        hip_w = max(hip_w, hip_low_w)

        print(
            f"Pixel widths → shoulder={shoulder_w:.3f}  waist={waist_w:.3f}  hip={hip_w:.3f}"
        )

        result = classify_body_type(shoulder_w, waist_w, hip_w)
        print(f"Body type: {result['shape']}")
        return JSONResponse(result)
    except Exception as e:
        import traceback

        traceback.print_exc()
        raise


@app.post("/try-on")
async def try_on(
    person_image: UploadFile = File(...),
    garment_image: UploadFile = File(...),
    garment_description: str = Form(default="a clothing item"),
):
    """
    Accepts a person photo and a garment photo.
    Sends both to IDM-VTON on HuggingFace and returns the try-on result image.
    """
    print(
        f"Received: person={person_image.filename} ({person_image.content_type}), garment={garment_image.filename} ({garment_image.content_type})"
    )

    # Save uploaded files to temp paths
    tmp_dir = Path(tempfile.mkdtemp())
    person_path = tmp_dir / f"person_{uuid.uuid4().hex}.jpg"
    garment_path = tmp_dir / f"garment_{uuid.uuid4().hex}.jpg"

    try:
        # Read and convert both images to JPG (handles avif, webp, png, etc.)
        person_bytes = await person_image.read()
        garment_bytes = await garment_image.read()

        Image.open(io.BytesIO(person_bytes)).convert("RGB").save(person_path, "JPEG")
        Image.open(io.BytesIO(garment_bytes)).convert("RGB").save(garment_path, "JPEG")

        # Connect to IDM-VTON with retry logic
        print("Connecting to IDM-VTON HuggingFace Space...")
        client = Client("yisol/IDM-VTON")

        result = None
        last_error = None
        for attempt in range(1, 4):
            try:
                print(f"Attempt {attempt}/3 — sending to model...")
                result = client.predict(
                    {
                        "background": handle_file(str(person_path)),
                        "layers": [],
                        "composite": None,
                    },
                    handle_file(str(garment_path)),
                    garment_description,
                    True,
                    False,
                    30,
                    42,
                    api_name="/tryon",
                )
                break  # success
            except Exception as e:
                last_error = e
                print(f"Attempt {attempt} failed: {e}")
                if attempt < 3:
                    import time

                    print("Waiting 15s before retry...")
                    time.sleep(15)

        if result is None:
            raise Exception(f"All attempts failed: {last_error}")

        # result is a tuple: (result_image_path, masked_image_path)
        result_image_path = result[0]

        # Read result and return as base64
        with open(result_image_path, "rb") as f:
            img_bytes = f.read()
        img_b64 = base64.b64encode(img_bytes).decode("utf-8")

        print(f"Try-on complete!")
        return JSONResponse({"image": f"data:image/png;base64,{img_b64}"})

    except Exception as e:
        print(f"Error during try-on: {e}")
        raise HTTPException(500, f"Try-on failed: {str(e)}")

    finally:
        # Clean up temp uploads
        shutil.rmtree(tmp_dir, ignore_errors=True)


@app.delete("/results/cleanup")
def cleanup_results():
    """Remove all stored result images (call periodically)"""
    for f in RESULTS_DIR.glob("*.png"):
        f.unlink()
    return {"message": "Results cleared"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
