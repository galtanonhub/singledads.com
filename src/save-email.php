<?php
/**
 * SingleDads.com — launch-list email collector.
 *
 * Saves signups to a private CSV stored ABOVE the web root, so the list is
 * never reachable by URL. No third-party service — download the file from
 * cPanel (File Manager / FTP) anytime to import into an email tool later.
 *
 * File location on the server:  /home/<cpanel-user>/subscribers/emails.csv
 */

header('X-Content-Type-Options: nosniff');

// Only accept POST.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Method Not Allowed';
    exit;
}

// Background (fetch) requests get JSON; a plain no-JS form post gets an HTML page.
$wantsJson =
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch')
    || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

/** Send the response and stop. */
function respond($wantsJson, $code, $message, $isOk, $extra = []) {
    http_response_code($code);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array_merge(['ok' => $isOk, 'message' => $message], $extra));
    } else {
        header('Content-Type: text/html; charset=utf-8');
        $safe = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
        echo '<!doctype html><html lang="en"><head><meta charset="utf-8">';
        echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
        echo '<title>Single Dads</title></head>';
        echo '<body style="background:#141820;color:#e8e8e6;font-family:system-ui,sans-serif;'
           . 'min-height:100vh;display:flex;flex-direction:column;align-items:center;'
           . 'justify-content:center;text-align:center;padding:2rem">';
        echo '<p style="font-size:1.2rem;max-width:30rem">' . $safe . '</p>';
        echo '<p><a style="color:#c9a96e" href="../">&larr; Back to the site</a></p>';
        echo '</body></html>';
    }
    exit;
}

// Honeypot: a hidden field real users never fill. If it has content, it's a bot —
// pretend success and quietly drop it.
if (!empty($_POST['company'])) {
    respond($wantsJson, 200, "Thanks — you're on the list.", true);
}

// Validate the email.
$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';
if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond($wantsJson, 400, 'Please enter a valid email address.', false);
}
$email = strtolower($email);

// Store ABOVE the public web root so the list is never reachable by URL.
$docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
$baseDir = ($docRoot !== '' ? dirname($docRoot) : dirname(__DIR__, 2)) . '/subscribers';
if (!is_dir($baseDir)) {
    @mkdir($baseDir, 0700, true);
}
if (!is_dir($baseDir) || !is_writable($baseDir)) {
    respond($wantsJson, 500, 'Sorry — something went wrong saving your email. Please try again later.', false);
}
$file = $baseDir . '/emails.csv';

// Skip if this address is already on the list.
$already = false;
if (is_file($file)) {
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $cols = str_getcsv($line);
        if (isset($cols[1]) && strtolower($cols[1]) === $email) {
            $already = true;
            break;
        }
    }
}

if (!$already) {
    $fh = @fopen($file, 'a');
    if (!$fh) {
        respond($wantsJson, 500, 'Sorry — something went wrong saving your email. Please try again later.', false);
    }
    if (flock($fh, LOCK_EX)) {
        fputcsv($fh, [date('c'), $email, $_SERVER['REMOTE_ADDR'] ?? '']);
        fflush($fh);
        flock($fh, LOCK_UN);
    }
    fclose($fh);
    @chmod($file, 0600);
}

$count = is_file($file) ? count(file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)) : 0;
respond($wantsJson, 200, "Thanks — you're on the list.", true, ['count' => $count]);
