@echo off
setlocal

rem Launch Vite dev server on port 3000 for stable local preview
rem NOTE: The project directory name must NOT contain '&' or other shell special characters,
rem as they break Node.js path resolution on Windows. If you encounter errors, rename the
rem parent directory to remove any '&' characters.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js not found in PATH. Install Node.js and retry.
  exit /b 1
)

call npm run dev
exit /b 0


