@echo off
title Testing Yapping (SOP)
echo Starting SOP App...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
if not exist "%~dp0backend\node_modules" call npm.cmd install --prefix "%~dp0backend"
if not exist "%~dp0frontend\node_modules" call npm.cmd install --prefix "%~dp0frontend"
start "SOP Backend" /D "%~dp0backend" cmd /k node server.js
timeout /t 2 /nobreak >nul
start "SOP Frontend" /D "%~dp0frontend" cmd /k npm.cmd run dev
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"
