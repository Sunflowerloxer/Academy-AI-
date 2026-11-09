@echo off
setlocal
cd /d "%~dp0"
where node.exe >nul 2>&1
if errorlevel 1 (
  echo Node.js 20.9 or newer is required. Install it from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
node -e "const [a,b]=process.versions.node.split('.').map(Number);if(a<20||(a===20&&b<9))process.exit(1)" >nul 2>&1
if errorlevel 1 (
  echo This app needs Node.js 20.9 or newer. Update Node.js and try again.
  pause
  exit /b 1
)
if not exist ".env.local" (
  if exist "%USERPROFILE%\Downloads\teacher-activity-builder\teacher-activity-builder\.env.local" (
    copy "%USERPROFILE%\Downloads\teacher-activity-builder\teacher-activity-builder\.env.local" ".env.local" >nul
    echo Using your existing local app settings. They are not bundled in this ZIP.
  ) else (
    copy ".env.example" ".env.local" >nul
    echo Created .env.local from the example.
    echo Add your Supabase URL and anon key to .env.local, then run this file again.
    echo The AI key is optional while FAKE_MODE=true.
    pause
    exit /b 1
  )
)
if not exist "node_modules" (
  echo Installing app packages. This first run needs an internet connection...
  call npm.cmd ci
  if errorlevel 1 (
    echo Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo Starting LessonLab at http://localhost:3000
call npm.cmd run dev