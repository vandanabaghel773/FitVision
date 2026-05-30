@echo off
echo ========================================
echo  FitVision - Starting Backend API
echo ========================================

if not exist "venv\Scripts\activate.bat" (
  echo Venv not found. Please run setup.bat first!
  pause
  exit /b 1
)

call venv\Scripts\activate.bat
echo Backend running at http://localhost:8000
echo Press Ctrl+C to stop.
echo.
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
