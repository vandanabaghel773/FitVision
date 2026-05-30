import { useState, useRef } from 'react'

const API_URL = 'http://localhost:8000'

// ─── Small reusable upload zone ───────────────────────────────────────────────
const UploadZone = ({ label, hint, image, onFile, onClear, icon }) => {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onFile(file, URL.createObjectURL(file))
    }
  }

  return (
    <div>
      <p style={styles.stepLabel}>{label}</p>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFile(e.dataTransfer.files[0])
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        style={{
          ...styles.uploadBox,
          borderColor: dragging ? 'rgba(167,139,250,0.9)' : image ? '#a855f7' : 'rgba(167,139,250,0.35)',
          background: dragging ? 'rgba(167,139,250,0.12)' : image ? 'rgba(168,85,247,0.06)' : 'rgba(167,139,250,0.04)',
          cursor: 'pointer',
        }}
      >
        {image ? (
          <>
            <img src={image} alt="preview" style={styles.previewImg} />
            <button
              onClick={(e) => { e.stopPropagation(); onClear(); inputRef.current.value = '' }}
              style={styles.clearBtn}
            >✕</button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={styles.uploadIcon}>{icon}</div>
            <p style={styles.uploadTitle}>Drop image here</p>
            <p style={styles.uploadHint}>{hint}</p>
            <span style={styles.uploadPill}>Browse Files</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const TryOnSection = () => {
  const [personFile, setPersonFile]     = useState(null)
  const [personPreview, setPersonPreview] = useState(null)
  const [garmentFile, setGarmentFile]   = useState(null)
  const [garmentPreview, setGarmentPreview] = useState(null)
  const [resultImage, setResultImage]   = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [progress, setProgress]         = useState('')
  const [garmentDesc, setGarmentDesc]   = useState('')
  const [category, setCategory]         = useState('dress')

  const canTryOn = personFile && garmentFile && !loading

  const handleTryOn = async () => {
    if (!canTryOn) return
    setLoading(true)
    setError(null)
    setResultImage(null)

    const steps = [
      'Uploading images…',
      'Connecting to AI model…',
      'Detecting body pose…',
      'Fitting garment to body…',
      'Generating result…',
    ]
    let i = 0
    setProgress(steps[0])
    const interval = setInterval(() => {
      i = Math.min(i + 1, steps.length - 1)
      setProgress(steps[i])
    }, 12000)

    try {
      const formData = new FormData()
      formData.append('person_image', personFile)
      formData.append('garment_image', garmentFile)
      const desc = garmentDesc.trim() || category
      formData.append('garment_description', desc)

      const res = await fetch(`${API_URL}/try-on`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `Server error ${res.status}`)
      }

      const data = await res.json()
      setResultImage(data.image)
    } catch (err) {
      setError(err.message || 'Something went wrong. Is the backend running?')
    } finally {
      clearInterval(interval)
      setLoading(false)
      setProgress('')
    }
  }

  const handleReset = () => {
    setPersonFile(null); setPersonPreview(null)
    setGarmentFile(null); setGarmentPreview(null)
    setResultImage(null); setError(null)
  }

  return (
    <section id="tryon" style={styles.section}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="section-label">Virtual Try-On</span>
        <h2 style={styles.heading}>
          See it on you,{' '}
          <span className="gradient-text">before you buy</span>
        </h2>
        <p style={styles.subtext}>
          Upload your photo and the dress you want to try — our AI does the rest.
        </p>
      </div>

      {/* Upload row */}
      <div style={styles.uploadRow}>
        <UploadZone
          label="Step 1 — Your Photo"
          hint="Full-body photo works best"
          image={personPreview}
          icon="🧍"
          onFile={(file, url) => { setPersonFile(file); setPersonPreview(url) }}
          onClear={() => { setPersonFile(null); setPersonPreview(null) }}
        />

        {/* Arrow */}
        <div style={styles.arrow}>+</div>

        <UploadZone
          label="Step 2 — Garment / Dress"
          hint="Plain white background preferred"
          image={garmentPreview}
          icon="👗"
          onFile={(file, url) => { setGarmentFile(file); setGarmentPreview(url) }}
          onClear={() => { setGarmentFile(null); setGarmentPreview(null) }}
        />

        {/* Arrow */}
        <div style={styles.arrow}>→</div>

        {/* Result panel */}
        <div>
          <p style={styles.stepLabel}>Result — You Wearing It</p>
          <div
            style={{
              ...styles.uploadBox,
              borderColor: resultImage ? '#a855f7' : 'rgba(255,255,255,0.08)',
              background: resultImage ? 'rgba(168,85,247,0.06)' : 'rgba(255,255,255,0.02)',
              cursor: 'default',
            }}
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={styles.spinner} />
                <p style={{ color: '#c4b5fd', fontSize: '14px', marginTop: '20px', fontWeight: '500' }}>
                  {progress}
                </p>
                <p style={{ color: 'rgba(245,245,245,0.35)', fontSize: '12px', marginTop: '8px' }}>
                  This takes 30–90 seconds ☕
                </p>
              </div>
            ) : resultImage ? (
              <>
                <img src={resultImage} alt="Try-on result" style={styles.previewImg} />
                <a
                  href={resultImage}
                  download="fitvision-tryon-result.png"
                  onClick={(e) => e.stopPropagation()}
                  style={styles.downloadBtn}
                >
                  ⬇ Download
                </a>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={styles.uploadIcon}>🪞</div>
                <p style={styles.uploadTitle}>Result appears here</p>
                <p style={styles.uploadHint}>
                  {!personFile && !garmentFile
                    ? 'Upload both images to begin'
                    : !personFile
                    ? 'Still need your photo'
                    : !garmentFile
                    ? 'Still need the garment'
                    : 'Ready — click Try On below!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Garment type + description */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {/* Category selector */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <p style={styles.stepLabel}>Garment Type</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { value: 'dress', label: '👗 Dress / Frock' },
              { value: 'upper body top shirt', label: '👕 Top / Shirt' },
              { value: 'lower body pants jeans', label: '👖 Pants / Jeans' },
              { value: 'jacket coat', label: '🧥 Jacket' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  border: category === cat.value ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  background: category === cat.value ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'rgba(255,255,255,0.04)',
                  color: category === cat.value ? 'white' : 'rgba(245,245,245,0.6)',
                  fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional description */}
        <div style={{ flex: '2', minWidth: '240px' }}>
          <p style={styles.stepLabel}>Describe the Garment (optional)</p>
          <input
            type="text"
            placeholder='e.g. "a red floral frock with short sleeves"'
            value={garmentDesc}
            onChange={(e) => setGarmentDesc(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#f5f5f5',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: '11px', color: 'rgba(245,245,245,0.35)', marginTop: '6px' }}>
            A good description helps the AI apply the correct garment
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <div>
            <p style={{ fontWeight: '600', color: '#fca5a5', marginBottom: '4px' }}>Try-on failed</p>
            <p style={{ color: 'rgba(245,245,245,0.6)', fontSize: '13px' }}>{error}</p>
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          className="btn-primary"
          onClick={handleTryOn}
          disabled={!canTryOn}
          style={{
            fontSize: '16px',
            padding: '16px 44px',
            opacity: canTryOn ? 1 : 0.4,
            cursor: canTryOn ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? '⏳ Processing…' : '✨ Try It On'}
        </button>

        {(personFile || garmentFile || resultImage) && (
          <button className="btn-secondary" onClick={handleReset} style={{ fontSize: '15px' }}>
            ↺ Start Over
          </button>
        )}
      </div>

      {/* Step checklist */}
      <div style={styles.checklist}>
        {[
          { label: 'Your photo uploaded', done: !!personFile },
          { label: 'Garment uploaded', done: !!garmentFile },
          { label: 'Try-on complete', done: !!resultImage },
        ].map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: s.done ? '#7c3aed' : 'rgba(255,255,255,0.08)',
              border: s.done ? 'none' : '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '700',
            }}>
              {s.done ? '✓' : ''}
            </div>
            <span style={{ fontSize: '13px', color: s.done ? '#c4b5fd' : 'rgba(245,245,245,0.35)' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  section: {
    padding: '100px 24px',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  heading: {
    fontSize: 'clamp(30px, 4.5vw, 52px)',
    fontWeight: '800',
    letterSpacing: '-1.5px',
    marginTop: '12px',
    color: '#f5f5f5',
  },
  subtext: {
    color: 'rgba(245,245,245,0.55)',
    fontSize: '17px',
    marginTop: '16px',
    maxWidth: '500px',
    margin: '16px auto 0',
  },
  stepLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgba(245,245,245,0.45)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  uploadRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 40px 1fr 40px 1fr',
    gap: '12px',
    alignItems: 'start',
    marginBottom: '32px',
  },
  uploadBox: {
    minHeight: '320px',
    borderRadius: '16px',
    border: '2px dashed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.25s ease',
  },
  previewImg: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    display: 'block',
  },
  clearBtn: {
    position: 'absolute', top: '10px', right: '10px',
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white', borderRadius: '50%',
    width: '30px', height: '30px', cursor: 'pointer',
    fontSize: '13px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  downloadBtn: {
    position: 'absolute', bottom: '12px', right: '12px',
    background: 'rgba(124,58,237,0.85)',
    color: 'white', padding: '8px 16px',
    borderRadius: '50px', fontSize: '13px',
    fontWeight: '600', textDecoration: 'none',
    backdropFilter: 'blur(4px)',
  },
  uploadIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'rgba(167,139,250,0.12)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto 16px',
    fontSize: '26px',
  },
  uploadTitle: {
    fontSize: '15px', fontWeight: '600',
    color: '#f5f5f5', marginBottom: '6px',
  },
  uploadHint: {
    fontSize: '12px', color: 'rgba(245,245,245,0.4)',
    marginBottom: '16px', lineHeight: '1.5',
  },
  uploadPill: {
    background: 'rgba(167,139,250,0.18)',
    color: '#c4b5fd', padding: '7px 18px',
    borderRadius: '50px', fontSize: '12px', fontWeight: '500',
  },
  arrow: {
    fontSize: '24px',
    color: 'rgba(167,139,250,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '170px',
    fontWeight: '300',
  },
  errorBox: {
    display: 'flex', gap: '14px', alignItems: 'flex-start',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '12px', padding: '16px 20px',
    marginTop: '20px',
  },
  checklist: {
    display: 'flex', gap: '28px', justifyContent: 'center',
    flexWrap: 'wrap', marginTop: '32px',
  },
  spinner: {
    width: '44px', height: '44px',
    border: '3px solid rgba(167,139,250,0.2)',
    borderTop: '3px solid #a78bfa',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
    margin: '0 auto',
  },
}

// Inject spinner keyframes once
if (typeof document !== 'undefined' && !document.getElementById('spinner-style')) {
  const s = document.createElement('style')
  s.id = 'spinner-style'
  s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }'
  document.head.appendChild(s)
}

export default TryOnSection
