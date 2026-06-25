@echo off
title Testing Yapping (SOP)
echo Starting SOP App...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
start "SOP Backend" cmd /k "cd /d "%~dp0backend" && node server.js"
timeout /t 2 /nobreak >nul
start "SOP Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"
