---
name: run-static-github-pages-site
description: Start, run, and verify the We Are Micro Dreams static GitHub Pages landing page locally. Use when the user asks to run the project, preview the site, start the local server, open localhost, or troubleshoot local static hosting for this repo.
---

# Run Static Github Pages Site

## Workflow

1. Run from the repo root: `powershell -ExecutionPolicy Bypass -File .\start-server.ps1`.
2. For a user-friendly persistent preview, run: `powershell -ExecutionPolicy Bypass -File .\start-server.ps1 -Detached`.
3. Verify with `Invoke-WebRequest -Uri "http://127.0.0.1:8000/" -UseBasicParsing`.
4. Tell the user to open `http://127.0.0.1:8000/`.

## Notes

- This is a static GitHub Pages site. Do not install packages or start a framework dev server.
- If port `8000` is busy, pass `-Port <number>` and report the new URL.
- PowerShell script execution may be disabled for direct `.\start-server.ps1`; use `powershell -ExecutionPolicy Bypass -File .\start-server.ps1`.
- The server must stay running while the user previews the page.