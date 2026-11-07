<?php
/**
 * Demi Tech Solutions – cPanel Native Admin Login Endpoint
 * Rate-limited server-side authentication with cryptographic session tokens.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?? [];

$username = trim($input['username'] ?? '');
$password = trim($input['password'] ?? '');

$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$lockFile = sys_get_temp_dir() . '/admin_lock_' . md5($ip) . '.json';

$attemptData = ['count' => 0, 'lockedUntil' => 0];
if (file_exists($lockFile)) {
    $attemptData = json_decode(file_get_contents($lockFile), true) ?? $attemptData;
}

$now = time();
if (!empty($attemptData['lockedUntil']) && $attemptData['lockedUntil'] > $now) {
    $remainingMinutes = ceil(($attemptData['lockedUntil'] - $now) / 60);
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => "Terminal locked due to multiple failed login attempts. Retry in {$remainingMinutes} minutes."
    ]);
    exit;
}

// Default production administrative credentials (can be overridden via environment variable)
$expectedUser = getenv('ADMIN_USERNAME') ?: 'admin_demitech';
$expectedPassHash = getenv('ADMIN_PASSWORD_HASH') ?: hash('sha256', 'DemiTech@2026!Sec');

$inputHash = hash('sha256', $password);

if ($username !== $expectedUser || $inputHash !== $expectedPassHash) {
    $newCount = ($attemptData['count'] ?? 0) + 1;
    $lockedUntil = 0;
    if ($newCount >= 5) {
        $lockedUntil = $now + 900; // 15 minutes lockout
    }
    @file_put_contents($lockFile, json_encode(['count' => $newCount, 'lockedUntil' => $lockedUntil]));

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid administrator credentials. Access denied.',
        'remainingAttempts' => max(0, 5 - $newCount)
    ]);
    exit;
}

// Clear lock on success
if (file_exists($lockFile)) {
    @unlink($lockFile);
}

// Generate high-entropy 256-bit session token
$token = bin2hex(random_bytes(32));
$expiresAt = $now + 7200; // 2 hours

$sessionFile = sys_get_temp_dir() . '/admin_session_' . $token . '.json';
$sessionRecord = [
    'token' => $token,
    'username' => $expectedUser,
    'role' => 'SUPER_ADMIN',
    'ip' => $ip,
    'expiresAt' => $expiresAt,
    'createdAt' => $now
];
@file_put_contents($sessionFile, json_encode($sessionRecord));

echo json_encode([
    'success' => true,
    'message' => 'Authentication successful',
    'token' => $token,
    'username' => $expectedUser,
    'role' => 'SUPER_ADMIN',
    'expiresAt' => $expiresAt * 1000
]);
