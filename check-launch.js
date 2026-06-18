#!/usr/bin/env node
/*
 * Launch-readiness check for SingleDads.com.
 * Run with:  npm run build && node check-launch.js
 *
 * Checks the BUILT site in _site/ (that's what actually deploys), plus a few
 * source/config files. Reports which pre-launch items are still pending.
 * Everything PENDING must be resolved before/at go-live. See LAUNCH-CHECKLIST.md.
 */
const fs = require('fs');
const read = f => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };

// Pages/assets are checked from the build output — that's what ships to the server.
const index = read('_site/index.html');
if (index === null) {
  console.error('\n  _site/ not found. Run `npm run build` first, then re-run this check.\n');
  process.exit(1);
}
const coming = read('coming-soon.html') || '';
const notFound = read('_site/404.html') || '';
const htaccess = read('_site/.htaccess') || '';
const cpanel = read('.cpanel.yml') || '';
const config = read('eleventy.config.js') || '';

const checks = [
  ['Remove noindex from the built site',         !index.includes('noindex')],
  ['Remove noindex from coming-soon.html',       !coming.includes('noindex')],
  ['Switch Eleventy pathPrefix to "/" for root', !config.includes('pathPrefix: "/test/"')],
  ['.cpanel.yml deploys to root (not /test/)',   !cpanel.includes('/test/')],
  ['.htaccess 404 path points to root',          htaccess.includes('ErrorDocument') && !htaccess.includes('/test/')],
  ['404 page links point to root',               notFound.length > 0 && !notFound.includes('/test/')],
  ['og:image added',                             index.includes('property="og:image"')],
  ['Social icons have real URLs',                index.includes('footer-social') && !index.includes('href="#" class="social-icon"')],
  ['Hero video added (placeholder gone)',        !index.includes('VIDEO GOES HERE')],
  ['robots.txt builds',                          read('_site/robots.txt') !== null],
  ['sitemap.xml builds',                         read('_site/sitemap.xml') !== null],
];

let pending = 0;
console.log('\n  LAUNCH READINESS — SingleDads.com\n  ' + '-'.repeat(40));
for (const [label, done] of checks) {
  if (!done) pending++;
  console.log(`  ${done ? '[x] DONE   ' : '[ ] PENDING'}  ${label}`);
}
console.log('  ' + '-'.repeat(40));
if (pending === 0) {
  console.log('  All clear — ready to launch. \n');
} else {
  console.log(`  ${pending} item(s) still pending. See LAUNCH-CHECKLIST.md for details.\n`);
}
