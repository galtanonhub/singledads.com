# Launch Checklist — SingleDads.com

Things that are intentionally "off" or pointed at `/test/` while pre-launch.
Work through these when moving the site live to the root domain.

## 1. Move the site to the root
- [ ] Decide final structure: site at `public_html/` (root) instead of `public_html/test/`.
- [ ] Update `.cpanel.yml` `DEPLOYPATH` from `/home/singledads/public_html/test/` to `/home/singledads/public_html/`.
- [ ] Replace the root coming-soon `index.html` with the real site `index.html`.

## 2. Turn on search indexing
- [ ] Remove the `<meta name="robots" content="noindex, nofollow">` line from `index.html`.
- [ ] Remove the same line from `coming-soon.html` (or retire that page).
- [ ] Remove it from `404.html` (a 404 can stay noindex — optional).

## 3. Deploy root-level SEO files
- [ ] Deploy `robots.txt` to `public_html/robots.txt`.
- [ ] Deploy `sitemap.xml` to `public_html/sitemap.xml`; keep `<lastmod>` current.

## 4. Fix paths that point at /test/
- [ ] `.htaccess`: change `ErrorDocument 404 /test/404.html` to `/404.html`.
- [ ] `404.html`: change the two `/test/` links to `/`.

## 5. Social / sharing
- [ ] Add an `og:image` (1200x630) and `twitter:image` to `index.html`.
- [ ] Swap each footer social icon's `href="#"` for the real profile URL once accounts exist.

## 6. Functionality
- [ ] Wire the email signup form to a real service (e.g. Buttondown / Mailchimp).
- [ ] Drop in `hero.mp4` (+ optional `hero.webm`, `hero-poster.jpg`); delete the placeholder
      `<div>` and uncomment the ready-made `<video>` block in `index.html`.
- [ ] Add a hero video loading state (branded "SD" mark / subtle spinner over the poster
      that fades out on the video's `canplay` event). Cosmetic preloader — only worth doing
      once the real video exists. (Inspired by neuemontreal.com's spinning logo.)
- [ ] Replace placeholder/inert resource links with real, vetted URLs.

## 7. Post-launch (in Google Search Console)
- [ ] Verify the domain.
- [ ] Submit `sitemap.xml`.
- [ ] Request indexing of the homepage.
- [ ] Validate structured data with Google's Rich Results Test.
