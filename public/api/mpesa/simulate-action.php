<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa Simulation Action Endpoint
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Enterprise Security: Block simulation if explicitly disabled or in production mode
if (getenv('ALLOW_SIMULATION') === 'false' || file_exists(__DIR__ . '/.production_lock')) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'error' => 'Simulation endpoint is disabled in production environment. Live Safaricom Daraja callback required.'
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? [];

$checkoutId = $input['checkoutRequestId'] ?? '';
$action = $input['action'] ?? 'CONFIRM';

$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
$receipt = 'SK';
for ($i = 0; $i < 8; $i++) {
    $receipt .= $chars[rand(0, strlen($chars) - 1)];
}

$tmpFile = sys_get_temp_dir() . '/mpesa_' . preg_replace('/[^a-zA-Z0-9_-]/', '', $checkoutId) . '.json';
$status = ($action === 'CONFIRM') ? 'SUCCESS' : 'CANCELLED';

$record = [
    'checkoutRequestId' => $checkoutId,
    'status' => $status,
    'receipt' => $receipt,
    'updatedAt' => time()
];
@file_put_contents($tmpFile, json_encode($record));

echo json_encode([
    'success' => true,
    'action' => $action,
    'status' => $status,
    'message' => $action === 'CONFIRM' ? 'Simulated payment approved successfully' : 'Simulated payment cancelled',
    'receipt' => $receipt
], JSON_PRETTY_PRINT);
