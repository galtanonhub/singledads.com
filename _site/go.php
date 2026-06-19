<?php
/**
 * SingleDads.com — affiliate link redirector ("link cloaking").
 *
 * Visitors click pretty links like /go/hellofresh. An .htaccess rule rewrites that
 * to go.php?id=hellofresh; this script looks the slug up in go-links.php and 302s
 * to the real affiliate URL. Benefits: clean links in the page source, and every
 * destination is managed from one file (go-links.php) without rebuilding the site.
 *
 * Redirect URLs are kept out of search results via X-Robots-Tag + robots.txt.
 */

// Never let these redirects be indexed.
header('X-Robots-Tag: noindex, nofollow', true);
header('Referrer-Policy: no-referrer-when-downgrade');

// Where to send clicks that have no (yet) assigned destination.
$fallback = '../resources/food-meal-prep/';

// Read + sanitise the slug. Only lowercase letters, digits and hyphens are valid.
$slug = isset($_GET['id']) ? strtolower((string) $_GET['id']) : '';
if ($slug === '' || !preg_match('/^[a-z0-9-]+$/', $slug)) {
    header('Location: ' . $fallback, true, 302);
    exit;
}

// Look the slug up in the single source-of-truth map.
$links = @include __DIR__ . '/go-links.php';
$target = (is_array($links) && !empty($links[$slug])) ? $links[$slug] : '';

// Optional, best-effort click logging to a CSV ABOVE the web root (never URL-reachable),
// mirroring save-email.php. Failures here must never block the redirect.
$docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
$logDir  = ($docRoot !== '' ? dirname($docRoot) : dirname(__DIR__, 2)) . '/clicks';
if (@is_dir($logDir) || @mkdir($logDir, 0700, true)) {
    if (@is_writable($logDir) && ($fh = @fopen($logDir . '/clicks.csv', 'a'))) {
        if (flock($fh, LOCK_EX)) {
            fputcsv($fh, [date('c'), $slug, $target !== '' ? 'live' : 'inert', $_SERVER['REMOTE_ADDR'] ?? '']);
            fflush($fh);
            flock($fh, LOCK_UN);
        }
        fclose($fh);
    }
}

// Live destination → send them there. Otherwise bounce back to the meals page.
header('Location: ' . ($target !== '' ? $target : $fallback), true, 302);
exit;
