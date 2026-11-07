<?php
/**
 * Demi Tech Solutions – cPanel Native Admin Session Verification Endpoint
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = preg_replace('/^Bearer\s+/i', '', trim($authHeader));

if (empty($token)) {
    echo json_encode(['authenticated' => false]);
    exit;
}

$safeToken = preg_replace('/[^a-zA-Z0-9]/', '', $token);
$sessionFile = sys_get_temp_dir() . '/admin_session_' . $safeToken . '.json';

if (!file_exists($sessionFile)) {
    echo json_encode(['authenticated' => false]);
    exit;
}

$session = json_decode(file_get_contents($sessionFile), true);
if (empty($session) || empty($session['expiresAt']) || $session['expiresAt'] < time()) {
    @unlink($sessionFile);
    echo json_encode(['authenticated' => false]);
    exit;
}

echo json_encode([
    'authenticated' => true,
    'username' => $session['username'] ?? 'admin_demitech',
    'expiresAt' => ($session['expiresAt'] ?? 0) * 1000
]);
