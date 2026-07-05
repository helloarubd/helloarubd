# Aru – অরু

A single-page "coming soon" website for **Aru – অরু**, a women's jewelry &
fashion accessories brand in Bangladesh. Static HTML/CSS/JS only — no
frameworks, no build step, no backend.

## Run it locally

Just open `index.html` in a browser. That's it — no server, no `npm install`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (the contents of this folder should
   be at the repo root, or in `/docs` if you prefer that convention).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   pick your branch (e.g. `main`) and folder (`/` or `/docs`), then save.
4. GitHub will give you a URL like `https://yourusername.github.io/repo-name/`.

## Project structure

```
index.html          Markup for every section (hero, coming soon, categories,
                     why-choose-us, about, social, footer)
style.css            All styling: design tokens, layout, responsive rules,
                     and animations
script.js            Page loader hide, scroll-reveal, and the visual-only
                     "Notify Me" form handler
assets/
  images/            favicon.svg + PLACEHOLDERS.md (see below)
  fonts/             empty — fonts are loaded from Google Fonts via <link>
README.md            this file
```

## Things to customize before launch

- **Social links** — in `index.html`, the Facebook and Instagram cards in the
  `#social` section currently point to `#`. Replace with your real profile
  URLs.
- **Open Graph image** — add `assets/images/og-cover.jpg` (1200×630px). See
  `assets/images/PLACEHOLDERS.md`.
- **Countdown numbers** — the countdown in `#notify` is a static visual
  placeholder (Days / Hours / Minutes / Seconds). Update the numbers by hand,
  or wire up real JS if you later pick a launch date.
- **Notify Me form** — currently front-end only: it shows a thank-you message
  and does not send data anywhere. Connect it to a form service (e.g.
  Formspree, Google Forms, Mailchimp) or your own backend when you're ready
  to actually collect emails.
- **Canonical/OG URLs** — replace the placeholder `https://aru-jewelry.example/`
  URLs in the `<head>` with your real domain once you have one.

## Design notes

- **Palette**: warm cream background (`#FFF8F4` / `#F7EFE8`), espresso text
  (`#3B2E2A`), rose gold accent (`#C68A7A`) and soft gold (`#D8B26E`).
- **Type**: Cormorant Garamond for headings, Poppins for body text, Noto Sans
  Bengali for the "অরু" mark.
- **Signature element**: the hero features a single continuous line drawing of
  a pendant necklace that traces itself in on load — a small nod to the
  product itself rather than a generic hero graphic.
- Respects `prefers-reduced-motion` and keeps visible focus states for
  keyboard navigation.
