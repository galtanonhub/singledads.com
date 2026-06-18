# SingleDads.com

> **Session start:** This folder (`...\sites\singledads.com`) is the working root — launch sessions
> from here so this file auto-loads. If a session opened in the parent `sites\` folder, this file
> won't have loaded automatically; read it first before doing project work.

A content/resource website for single fathers. Goal: a large, traffic-driving reference site
(legal, financial, mental health, food/childcare, dating, reading, merch). Not e-commerce.
Monetization planned via ads, affiliates (Amazon/Expedia), and merch.

## Stack & conventions
- **Eleventy (11ty v3) builds hand-written HTML/CSS into plain static HTML — no client framework.**
  The owner dislikes WordPress; Eleventy is a build-only static generator (no database/admin/PHP).
  Vanilla JS only where genuinely needed (nav scroll fade, mobile menu toggle).
- **Project shape:** templates live in `src/` (`.njk`), build output in `_site/` (committed, deployed).
  - `src/_includes/layouts/base.njk` — shared `<head>`, scripts, page shell (every page).
  - `src/_includes/layouts/page.njk` — reusable content-page layout (breadcrumb, header, prose body).
  - `src/_includes/partials/` — `nav.njk`, `footer.njk`.
  - `src/_data/nav.json` — the menu (incl. dropdown `children`), defined ONCE; drives nav + mobile + footer.
  - `src/_data/site.json` — site title/description/url/theme color.
  - Static assets (`style.css`, icons, `404.html`, `.htaccess`, `robots.txt`, `sitemap.xml`) live in `src/`,
    passthrough-copied by `eleventy.config.js`.
- **Adding a page:** create `src/<section>/<name>.njk` with `layout: layouts/page.njk` + front matter
  (`title`, `eyebrow`, `section`, `sectionUrl`, `lead`), then point its link in `nav.json` at the new path.
- **Internal links inside page content** must use the url filter: `<a href="{{ '/path' | url }}">` so the
  `pathPrefix` is applied. External `https://` links are untouched.
- **pathPrefix** is `/test/` (pre-launch staging). At launch, change it to `/` in `eleventy.config.js`
  (one line) — `check-launch.js` flags this.
- No external font CDNs — Google Fonts hang on the owner's network. Use the system font stack.
- Keep everything **responsive**; the site must work on all mobile devices (width-based breakpoints,
  not device-specific). Nav collapses to a hamburger at ≤960px.

## Design system
- Colors: bg `#141820`, bg-soft `#1c2230`, text `#e8e8e6`, dim `#9aa0b0`, cream `#f0e7d4`, gold `#c9a96e`.
- **Hard edges, never rounded.** Classy, not gaudy — restraint over flash.
- Subtle checkerboard texture on `body::before` (conic-gradient, 220px tiles, low opacity,
  faded left→right via mask). Design inspiration: neuemontreal.com (hero), apxgrouphq.com (texture).
- Nav order: LEGAL · FINANCIAL · MENTAL · RESOURCES · READING · DATING · MERCH.

## Local development
- `npm start` → Eleventy dev server with live reload at http://localhost:8080/test/.
- `npm run build` → regenerate `_site/`. Always rebuild before committing so `_site/` matches `src/`.
- `node check-launch.js` (after a build) → lists pre-launch items still pending.
- Hero shows a "VIDEO GOES HERE" placeholder until the owner drops in a Gemini-made `hero.mp4`.

## Deployment
- Traditional cPanel host (username `singledads`). Deploy is **cPanel Git Version Control** (manual trigger),
  not FTP — the failed FTP GitHub Action was removed.
- `.cpanel.yml` copies the committed `_site/` tree to `public_html/test/`.
- Server structure: `public_html/index.html` = coming-soon page; `public_html/test/` = the full built site.
- **Deploy flow:** edit `src/` → `npm run build` → commit (including `_site/`) → push to `main` →
  in cPanel: **Update from Remote** → **Deploy HEAD Commit**.
- At launch (moving to root): set `pathPrefix: "/"`, point `.cpanel.yml` `DEPLOYPATH` at `public_html/`,
  rebuild, and clear the items in `check-launch.js` / `LAUNCH-CHECKLIST.md`.

## Open TODOs before launch
- Verify every external resource link.
- Confirm the "~3M single fathers" stat.
- Write the real About story (owner's own words).
- Wire the signup form to an email service.
- Add affiliate links (books/travel) and connect a merch store.
