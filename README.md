# Atif Khan Portfolio

Personal portfolio website for Atif Khan, built as a lightweight static site and hosted on GitHub Pages.

View the live site: [https://atifkhan161.github.io](https://atifkhan161.github.io)

## Overview

This repository contains a responsive personal website showcasing:

- Professional background and experience
- Skills and technology stack
- Education and career timeline
- Contact details and social links
- Resume/CV in Markdown

The site is intentionally simple and fast: static HTML, CSS, and JavaScript with no framework or build tooling required.

## Project structure

- `index.html` — main portfolio landing page
- `css/styles.css` — all site styling and responsive layout
- `js/main.js` — dynamic rendering logic for skills, stats, and experience
- `data/profile.js` — single source of truth for profile content
- `cv/atif_cv.pdf` — downloadable PDF resume
- `cv/cv.md` — source resume content
- `404.html` — custom GitHub Pages fallback page
- `app-ads.txt` — ad verification file
- `favicon.svg` — site icon

## Customizing the portfolio

Update the profile content in `data/profile.js` to change:

- name, title, email, location
- GitHub and LinkedIn links
- work experience and skills
- stats and hero text

The page renders most content from this file, so it is the main place to maintain the site.

## Local development

Because this is a static site, you can preview it locally with any simple web server.

Example:

```bash
cd atifkhan161.github.io
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

This project is designed for GitHub Pages. Push the repository to GitHub and enable GitHub Pages from the repository settings.

## Notes

- No package installation is required.
- The site is optimized for a fast static hosting workflow.
- The resume is linked via the PDF in `cv/atif_cv.pdf`, and the Markdown source remains available in `cv/cv.md`.
