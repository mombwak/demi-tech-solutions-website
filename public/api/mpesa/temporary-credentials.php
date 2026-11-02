<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa Temporary Credentials Verification
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? [];

$consumerKey = trim($input['consumerKey'] ?? '');
$consumerSecret = trim($input['consumerSecret'] ?? '');
$env = ($input['environment'] ?? 'sandbox') === 'production' ? 'production' : 'sandbox';

if (empty($consumerKey) || empty($consumerSecret)) {
    echo json_encode([
        'success' => true,
        'message' => 'Daraja Sandbox Simulator mode active. Ready for instant testing.'
    ], JSON_PRETTY_PRINT);
    exit;
}

// Attempt real Daraja OAuth verification using cURL
$baseUrl = $env === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';
$authUrl = $baseUrl . '/oauth/v1/generate?grant_type=client_credentials';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $authUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Basic ' . base64_encode($consumerKey . ':' . $consumerSecret),
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($httpCode === 200 && $response) {
    echo json_encode([
        'success' => true,
        'message' => 'Safaricom Daraja API credentials authenticated successfully via cPanel!'
    ], JSON_PRETTY_PRINT);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Daraja authentication failed: HTTP ' . $httpCode . ' (' . ($curlErr ?: 'Invalid Consumer Key/Secret') . ')'
    ], JSON_PRETTY_PRINT);
}
