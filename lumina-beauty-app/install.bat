@echo off
echo ========================================
echo Lumina Beauty - Quick Install
echo ========================================
echo.

cd /d "%~dp0"

echo Installing FRONTEND dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installing BACKEND dependencies...
cd backend
call npm install
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the app:
echo 1. Double-click: start-frontend.bat
echo 2. (Optional) Double-click: start-backend.bat
echo.
echo The frontend will work with mock data even without the backend!
echo.

pause
