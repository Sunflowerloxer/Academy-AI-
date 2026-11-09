@echo off
setlocal
cd /d "%~dp0"
where node.exe >nul 2>&1
if errorlevel 1 (
  echo Install Node.js 20.9 or newer, then run this file again.
  pause
  exit /b 1
)
node -e "const [a,b]=process.versions.node.split('.').map(Number);if(a<20||(a===20&&b<9))process.exit(1)" >nul 2>&1
if errorlevel 1 (
  echo This app needs Node.js 20.9 or newer.
  pause
  exit /b 1
)
if not exist ".env.local" (
  copy ".env.example" ".env.local" >nul
  echo Created .env.local. Add your Supabase URL and anon key, then run this file again.
  echo See COMPANY-TESTING.md for setup steps. Do not share private keys in this ZIP.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Installing app packages. An internet connection is needed the first time.
  call npm.cmd ci
  if errorlevel 1 (
    echo Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo Starting LessonLab at http://localhost:3000
call npm.cmd run dev