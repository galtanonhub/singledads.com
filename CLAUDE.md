# SingleDads.com

> **Session start:** This folder (`...\sites\singledads.com`) is the working root — launch sessions
> from here so this file auto-loads. If a session opened in the parent `sites\` folder, this file
> won't have loaded automatically; read it first before doing project work.

A content/resource website for single fathers. Goal: a large, traffic-driving reference site
(legal, financial, mental health, food/childcare, dating, reading, merch). Not e-commerce.
Monetization planned via ads, affiliates (Amazon/Expedia), and merch.

## Stack & conventions
- **Hand-written HTML/CSS, no framework, no build step.** The owner dislikes WordPress. Vanilla JS
  only where genuinely needed (nav scroll fade, mobile menu toggle).
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
- Preview server: `npx serve . -l 3000` then open http://localhost:3000
  (the server often needs restarting between sessions — just rerun it).
- Hero shows a "VIDEO GOES HERE" placeholder until the owner drops in a Gemini-made `hero.mp4`.

## Deployment
- Traditional cPanel/FTP host. Target structure on the server:
  - `public_html/index.html` = the coming-soon page (`coming-soon.html` renamed)
  - `public_html/test/` = the full site (`index.html`, `style.css`)
- Auto-deploy is planned via cPanel Git Version Control + `.cpanel.yml` (replace USERNAME first).
  Until that's live, changes must be re-uploaded manually to `test/`.

## Open TODOs before launch
- Verify every external resource link.
- Confirm the "~3M single fathers" stat.
- Write the real About story (owner's own words).
- Wire the signup form to an email service.
- Add affiliate links (books/travel) and connect a merch store.
