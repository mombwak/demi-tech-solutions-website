<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa Configuration Status
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

echo json_encode([
    'configured' => true,
    'hasRealCredentials' => false,
    'environment' => 'sandbox',
    'simulatorMode' => true,
    'shortcode' => '174379',
    'tillNumber' => '5829259',
    'modeDescription' => 'cPanel PHP Gateway Active (Till 5829259 / Sandbox Simulator)'
], JSON_PRETTY_PRINT);
