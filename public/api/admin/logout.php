<?php
/**
 * Demi Tech Solutions – cPanel Native Admin Logout Endpoint
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = preg_replace('/^Bearer\s+/i', '', trim($authHeader));

if (!empty($token)) {
    $safeToken = preg_replace('/[^a-zA-Z0-9]/', '', $token);
    $sessionFile = sys_get_temp_dir() . '/admin_session_' . $safeToken . '.json';
    if (file_exists($sessionFile)) {
        @unlink($sessionFile);
    }
}

echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
