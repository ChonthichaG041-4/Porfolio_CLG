# ============================================================
#  deploy.ps1  —  GitHub + Vercel setup for portfolio-clg
#  Run this in PowerShell from inside D:\Apprentice\train\portfolio-clg
#  Right-click PowerShell -> "Run as Administrator" if needed
# ============================================================

$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot   # same folder as this script

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Portfolio CLG — GitHub + Vercel Deploy"   -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $ProjectDir

# ── STEP 1: Clean any stale git lock files ──────────────────
Write-Host "[1/6] Cleaning stale git lock files..." -ForegroundColor Yellow
Get-ChildItem -Path ".git" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue |
    Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "      Done." -ForegroundColor Green

# ── STEP 2: Init git ────────────────────────────────────────
Write-Host "[2/6] Initialising git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "      .git already exists — skipping init." -ForegroundColor DarkGray
} else {
    git init
}

# Configure identity (edit if needed)
git config user.email "glightclg@gmail.com"
git config user.name  "ChonthichaG041-4"
Write-Host "      Done." -ForegroundColor Green

# ── STEP 3: Stage & commit ──────────────────────────────────
Write-Host "[3/6] Staging all files and committing..." -ForegroundColor Yellow
git add .
git commit -m "first commit" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "      Nothing new to commit (already committed)." -ForegroundColor DarkGray
} else {
    Write-Host "      Committed." -ForegroundColor Green
}

# ── STEP 4: Set branch to main & add remote ─────────────────
Write-Host "[4/6] Setting branch to main and adding remote..." -ForegroundColor Yellow
git branch -M main
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "      Remote origin already set: $remote" -ForegroundColor DarkGray
} else {
    git remote add origin https://github.com/ChonthichaG041-4/Porfolio_CLG.git
    Write-Host "      Remote added." -ForegroundColor Green
}

# ── STEP 5: Push to GitHub ──────────────────────────────────
Write-Host ""
Write-Host "[5/6] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "      NOTE: A Windows credential dialog may appear." -ForegroundColor DarkGray
Write-Host "      Sign in with your GitHub account." -ForegroundColor DarkGray
Write-Host "      If it asks for a password, use a Personal Access Token (PAT)." -ForegroundColor DarkGray
Write-Host "      Create one at: https://github.com/settings/tokens" -ForegroundColor DarkGray
Write-Host ""

git push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "      Pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  Push failed. Common fixes:" -ForegroundColor Red
    Write-Host "  1. Make sure the repo exists at github.com/ChonthichaG041-4/Porfolio_CLG" -ForegroundColor White
    Write-Host "  2. Create a PAT at https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "     (Scopes needed: repo)" -ForegroundColor White
    Write-Host "  3. Re-run this script and paste the PAT when asked for password" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to continue to Vercel setup anyway"
}

# ── STEP 6: Vercel deploy ────────────────────────────────────
Write-Host ""
Write-Host "[6/6] Vercel deployment..." -ForegroundColor Yellow

# Check if vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "      Installing Vercel CLI globally..." -ForegroundColor DarkGray
    npm install -g vercel
}

Write-Host ""
Write-Host "      Launching Vercel deploy. Follow the prompts:" -ForegroundColor Cyan
Write-Host "      - Log in with GitHub when asked" -ForegroundColor White
Write-Host "      - Link to existing project? No (create new)" -ForegroundColor White
Write-Host "      - Project name: portfolio-clg" -ForegroundColor White
Write-Host "      - Framework detected: Vite (confirm)" -ForegroundColor White
Write-Host "      - Build command: npm run build" -ForegroundColor White
Write-Host "      - Output directory: dist" -ForegroundColor White
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  All done! Your live URL is above."         -ForegroundColor Cyan
Write-Host "  It looks like: https://portfolio-clg-xxx.vercel.app" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
