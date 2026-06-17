#!/usr/bin/env node
/*
 * Launch-readiness check for SingleDads.com.
 * Run with:  node check-launch.js
 * Reports which pre-launch items are still in their pre-launch state.
 * Everything PENDING below must be resolved before/at go-live. See LAUNCH-CHECKLIST.md.
 */
const fs = require('fs');
const read = f => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };

const index = read('index.html') || '';
const coming = read('coming-soon.html') || '';
const notFound = read('404.html') || '';
const htaccess = read('.htaccess') || '';
const cpanel = read('.cpanel.yml') || '';

const checks = [
  ['Remove noindex from index.html',        !index.includes('noindex')],
  ['Remove noindex from coming-soon.html',  !coming.includes('noindex')],
  ['.cpanel.yml deploys to root (not /test/)', !cpanel.includes('/test/')],
  ['.htaccess 404 path points to root',     htaccess.includes('ErrorDocument') && !htaccess.includes('/test/')],
  ['404.html links point to root',          notFound.length > 0 && !notFound.includes('/test/')],
  ['og:image added to index.html',          index.includes('property="og:image"')],
  ['Social icons have real URLs',           index.includes('footer-social') && !index.includes('href="#" class="social-icon"')],
  ['Hero video added (placeholder gone)',   !index.includes('VIDEO GOES HERE')],
  ['robots.txt exists',                     read('robots.txt') !== null],
  ['sitemap.xml exists',                    read('sitemap.xml') !== null],
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
