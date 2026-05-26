@echo off
chcp 65001 >nul
echo.
echo ============================================
echo   Portfolio CLG -- GitHub + Vercel Deploy
echo ============================================
echo.

cd /d "%~dp0"

:: ── Clean stale lock files ──────────────────────────────────
echo [1/6] Cleaning stale git lock files...
del /f /q ".git\*.lock" 2>nul
del /f /q ".git\refs\heads\*.lock" 2>nul
echo       Done.

:: ── Git init ────────────────────────────────────────────────
echo [2/6] Initialising git...
if exist ".git" (
    echo       .git already exists -- skipping init.
) else (
    git init
)
git config user.email "glightclg@gmail.com"
git config user.name  "ChonthichaG041-4"

:: ── Stage & commit ──────────────────────────────────────────
echo [3/6] Staging all files...
git add .
git commit -m "first commit"
echo       Done.

:: ── Branch + remote ─────────────────────────────────────────
echo [4/6] Setting branch main and remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/ChonthichaG041-4/Porfolio_CLG.git
echo       Done.

:: ── Push ────────────────────────────────────────────────────
echo.
echo [5/6] Pushing to GitHub...
echo       A login dialog may appear -- use your GitHub PAT as password.
echo       Create PAT at: https://github.com/settings/tokens  (scope: repo)
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo  Push failed. Check your PAT and repo name, then re-run.
    echo  Repo URL: https://github.com/ChonthichaG041-4/Porfolio_CLG.git
    echo.
    pause
    exit /b 1
)
echo       Pushed successfully!

:: ── Vercel ──────────────────────────────────────────────────
echo.
echo [6/6] Installing Vercel CLI and deploying...
call npm install -g vercel
echo.
echo  Follow the prompts:
echo    - Log in with GitHub
echo    - Project name: portfolio-clg
echo    - Framework: Vite
echo    - Build: npm run build    Output: dist
echo.
call vercel --prod

echo.
echo ============================================
echo   Done! Your live Vercel URL is above.
echo ============================================
pause
