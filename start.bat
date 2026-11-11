@echo off
title Pahadon Ka Ghar - Offline Launcher
echo ============================================================
echo   PAHADON KA GHAR - LUXURY RESORT & RETREAT (OFFLINE MODE)
echo ============================================================
echo.
echo Launching Pahadon Ka Ghar in your default browser...
echo.

:: Check if Python is available to launch a local server for optimal experience
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Python detected! Starting local offline server at http://localhost:8080 ...
    start "" http://localhost:8080/offline.html
    python -m http.server 8080 --directory .
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Python detected! Starting local offline server at http://localhost:8080 ...
    start "" http://localhost:8080/offline.html
    py -m http.server 8080
    goto end
)

:: If Python is not installed, open the standalone zero-dependency offline HTML file directly
echo Opening standalone offline website directly in your browser...
if exist "dist\offline.html" (
    start "" "dist\offline.html"
) else if exist "public\offline.html" (
    start "" "public\offline.html"
) else if exist "offline.html" (
    start "" "offline.html"
) else (
    start "" "index.html"
)

:end
pause
