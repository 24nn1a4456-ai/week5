- [x] Remove AI-tool related naming/text (Google AI Studio / Gemini) from README.md, index.html, metadata.json, vite.config.ts
- [x] Remove @google/genai dependency from package.json (if unused) and update package-lock.json accordingly
- [x] Remove server-side Gemini capability hint from metadata.json


- [x] Reinstall deps and run build to verify
- [x] Re-check repository files for remaining forbidden names

## Root Cause of ERR_CONNECTION_REFUSED

The `&` character in the directory name `remix_-aether-&-gold` caused Node.js/npm to break path resolution on Windows. The path `remix_-aether-&-gold\node_modules\.bin\` was split at `&`, making Node.js unable to find the Vite binary.

## Fix Applied
- Copied project to `c:\Users\manju\Downloads\aether-gold` (no `&` in path)
- Fixed `start-dev.bat` to remove redundant CLI arguments
- Dev server now runs successfully at **http://127.0.0.1:3000/**

