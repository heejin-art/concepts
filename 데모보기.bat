@echo off
chcp 65001 >nul
cd /d "%~dp0"
title WOO HEE JIN - Concept Demos
echo ============================================
echo   컨셉 데모 서버를 시작합니다.
echo   잠시 후 브라우저가 자동으로 열립니다.
echo   * 다 본 뒤에는 이 검은 창을 닫으면 종료됩니다.
echo ============================================
start "" /min cmd /c "timeout /t 2 >nul & start http://localhost:8910/"
node server.js
pause
