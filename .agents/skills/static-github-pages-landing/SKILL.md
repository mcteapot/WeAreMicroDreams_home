---
name: static-github-pages-landing
description: Use when creating, editing, or reviewing a static landing page intended for GitHub Pages hosting. Prefer plain HTML/CSS/JS, lightweight assets, responsive layout, accessibility, SEO, and GitHub Pages-safe paths.
---

# Static GitHub Pages Landing Page Skill

When this skill is active, build or review the project as a lightweight static site for GitHub Pages.

## Default architecture
- Use plain HTML, CSS, and minimal vanilla JavaScript.
- Avoid React, Next.js, Vite, Tailwind build pipelines, npm dependencies, and bundlers unless the user explicitly asks.
- Use:
  - `index.html`
  - `styles.css`
  - optional `script.js`
  - `assets/` for images, icons, video, and downloadable files
  - optional `CNAME` for custom domain

## Landing page checklist
Include:
- Responsive hero section
- Clear headline and subheadline
- Primary call to action
- About/bio section
- Work/projects/services section
- Contact/social links
- Footer
- SEO title and meta description
- Open Graph tags
- Viewport meta tag
- Accessible headings and semantic landmarks

## GitHub Pages rules
- Use relative asset paths.
- Do not assume server-side routing.
- Avoid absolute `/assets/...` paths unless the repo is a user/organization root site.
- For project pages, prefer `./assets/...`.
- Keep file names lowercase and URL-safe.
- Add `404.html` only if requested.
- Add `CNAME` only if the user provides a custom domain.

## Quality rules
Before finishing:
- Check mobile and desktop layout.
- Verify all local links and asset paths.
- Avoid huge images.
- Add alt text.
- Keep JavaScript optional and unobtrusive.
- Ensure the page still works when opened directly as a static file.
