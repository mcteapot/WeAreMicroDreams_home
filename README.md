# We Are Micro Dreams

A cinematic, single-page landing page for **We Are Micro Dreams**, an AI-native vertical content studio.

The site is built as a lightweight static GitHub Pages project with plain HTML, CSS, and minimal JavaScript. There is no framework, package manager, bundler, or build step.

## Live Site

After GitHub Pages is enabled, the site will be available at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

Replace `YOUR-USERNAME` and `YOUR-REPO` with the GitHub account and repository names.

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── start-server.ps1
├── AGENTS.md
├── README.md
├── assets/
│   ├── favicon.svg
│   ├── hero-city.svg
│   ├── og-preview.svg
│   ├── poster-after-hours.svg
│   ├── poster-cat-boyfriend.svg
│   ├── poster-chroma-void.svg
│   └── poster-soft-launch.svg
└── .agents/
    └── skills/
        └── static-github-pages-landing/
            └── SKILL.md
```

## Features

- Full-screen cinematic hero section
- Featured vertical series poster gallery
- Production engine feature grid
- Infinite-feed inspired content section
- Sticky production analytics panel
- Smooth in-page scrolling
- Responsive mobile-first layout
- SEO and Open Graph metadata
- Local SVG assets with GitHub Pages-safe relative paths
- Accent color: `#00C9A1`

## Local Preview

You can open `index.html` directly in a browser, or run a local server.

From PowerShell:

```powershell
cd D:\Work\WeAreMicroDreams\Developer\WeAreMicroDreams_home
.\start-server.ps1
```

Then open:

```text
http://127.0.0.1:8000/
```

Keep the PowerShell window open while previewing the site.

## GitHub Pages Deployment

1. Push this project to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/root`
6. Save the settings.

GitHub will publish the site at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

## Notes for Codex

Project instructions live in `AGENTS.md`.

The repo-local skill for this project lives at:

```text
.agents/skills/static-github-pages-landing/SKILL.md
```

When editing the site, keep it static and GitHub Pages-friendly:

- Use relative paths such as `./assets/hero-city.svg`.
- Avoid framework or build-step dependencies unless explicitly requested.
- Keep accessibility, readable contrast, responsive layout, and local asset paths checked before finishing.
