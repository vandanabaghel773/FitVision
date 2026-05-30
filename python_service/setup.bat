@echo off
echo ========================================
echo  FitVision - Backend Setup
echo ========================================

:: Try to find Python
set PYTHON=
for %%p in (
  "%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
  "%LOCALAPPDATA%\Programs\Python\Python38\python.exe"
  "C:\Python310\python.exe"
  "C:\Python38\python.exe"
) do (
  if exist %%p (
    set PYTHON=%%p
    goto :found
  )
)

echo Python not found automatically. Trying 'python' from PATH...
python --version >nul 2>&1
if %errorlevel%==0 (
  set PYTHON=python
  goto :found
)

echo ERROR: Python not found. Please install Python 3.10 from python.org
pause
exit /b 1

:found
echo Found Python: %PYTHON%
echo.

echo Creating virtual environment...
%PYTHON% -m venv venv
if %errorlevel% neq 0 (echo Failed to create venv & pause & exit /b 1)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (echo Failed to install requirements & pause & exit /b 1)

echo.
echo ========================================
echo  Setup complete!
echo  Run start.bat to launch the backend.
echo ========================================
pause
