@echo off
echo ========================================
echo Lumina Beauty - Frontend Setup
echo ========================================
echo.

cd /d "%~dp0frontend"

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed!
    echo Please make sure Node.js is installed.
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting development server...
echo ========================================
echo.
echo The app will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
