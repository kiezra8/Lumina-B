@echo off
echo ========================================
echo Lumina Beauty - Backend Setup
echo ========================================
echo.

cd /d "%~dp0backend"

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed!
    echo Please make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo Seeding database (one time only)...
call node seed.js

echo.
echo ========================================
echo Starting backend server...
echo ========================================
echo.
echo Backend API will run at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
