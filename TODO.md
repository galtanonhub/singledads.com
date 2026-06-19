# SingleDads.com — To-Do / Next Steps

Master next-steps list. For the detailed mechanics of moving the site from `/test/`
to the root domain at launch, see [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).

---

## 🔒 Hosting & security

- [ ] **Add SSL to the live site (HTTPS).** On cPanel this is usually free and automatic:
  - In cPanel, open **Security → SSL/TLS Status** and run **AutoSSL** (Let's Encrypt) for
    `singledads.com` (+ `www`). Most hosts issue the cert within minutes.
  - If AutoSSL isn't available, use **Let's Encrypt SSL** or your host's free cert tool.
  - Once the cert is active, force HTTPS by adding this to the **root** `.htaccess`
    (do NOT add it before the cert is live, or the site will break):
    ```apache
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    ```
  - After enabling, confirm `https://singledads.com` loads with a padlock and that
    `http://` redirects to `https://`.
- [ ] **Verify the cert covers both** `singledads.com` and `www.singledads.com`.

## 🚀 Launch (move from /test/ to root domain)
See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) for full detail. Key items:
- [ ] Set Eleventy `pathPrefix` to `/` in `eleventy.config.js`, rebuild.
- [ ] Point `.cpanel.yml` `DEPLOYPATH` at `public_html/` (not `/test/`).
- [ ] Replace the root coming-soon `index.html` with the real site.
- [ ] Remove `noindex` meta from the built pages.
- [ ] Fix `.htaccess` 404 path and `404.html` links (`/test/` → `/`).
- [ ] Deploy `robots.txt` + `sitemap.xml` to the domain root.

## 💰 Monetization — paste affiliate URLs (no rebuild needed)
Once accounts are approved, edit `src/go-links.php` (or the deployed `go-links.php`) and
drop the real URL next to each slug. Empty = inert (redirects to a fallback page).
- [ ] **Amazon Associates** (highest certainty): the 12 `book-*` slugs.
- [ ] **Meal kits:** `hellofresh`, `everyplate`, `homechef`, `thrive`, `emergency`.
- [ ] **Travel:** `expedia`, `booking`, `vrbo`, `viator`, `getyourguide`, `going`, `koa`, `travel-insurance`.
- [ ] **Childcare:** `carecom`, `sittercity`, `urbansitter`.
- [ ] **Dating:** `match`, `eharmony`, `ourtime`, `singleparentmeet`. *(Hinge & Bumble link direct — no affiliate program.)*
- [ ] **Legal:** `rocket-lawyer`, `legalzoom`.
- [ ] **Budgeting:** `rocket-money`, `simplifi`. *(YNAB is a non-affiliate honest pick.)*

## 🖼️ Assets & content that need you
- [ ] **About story** — write it in your own words.
- [ ] **Hero video** — drop in `hero.mp4` (+ optional `hero.webm`, `hero-poster.jpg`); delete the
  "VIDEO GOES HERE" placeholder and uncomment the `<video>` block in `src/index.njk`.
- [ ] **og:image** (1200×630) + `twitter:image` for social sharing.
- [ ] **Footer social icons** — replace the placeholder `#` hrefs with real profile URLs once accounts exist.
- [ ] **Merch store** — connect Printful/Shopify (print-on-demand) and replace the "Coming Soon"
  buttons on `src/merch/index.njk` with real product links.
- [ ] **Confirm the "~3M single fathers" stat** on the homepage.

## ✅ Email signup
- Already works: `save-email.php` saves signups to a private CSV above the web root. Download it
  from cPanel anytime. *(Optional later: connect a real email service like Buttondown/Mailchimp —
  if so, keep the API key server-side, never in the repo.)*

## 📈 Post-launch (Google Search Console)
- [ ] Verify the domain, submit `sitemap.xml`, request homepage indexing.
- [ ] Validate structured data with Google's Rich Results Test.

---

## ✔️ Done recently (for reference)
- Affiliate `/go/` link-cloaking system (go.php + go-links.php) across Meals, Childcare, Books,
  Travel, Dating, Legal, Budgeting.
- New Travel section (landing + Destinations, Budget Travel, Traveling with Kids).
- New pages: Holidays & Special Occasions (Resources), Taxes & Credits (Financial).
- Counseling page expanded; homepage section links wired to real pages.
- Auto-generated `sitemap.xml` (82 URLs) replacing the manual single-URL version.
