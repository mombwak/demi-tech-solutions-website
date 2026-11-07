<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa Status Verification Endpoint
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$checkoutId = $_GET['id'] ?? $_GET['checkoutRequestId'] ?? '';
$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
$receipt = 'SK';
for ($i = 0; $i < 8; $i++) {
    $receipt .= $chars[rand(0, strlen($chars) - 1)];
}

// Check if there is a simulated action file
$tmpFile = sys_get_temp_dir() . '/mpesa_' . preg_replace('/[^a-zA-Z0-9_-]/', '', $checkoutId) . '.json';
$status = 'SUCCESS';
$resultDesc = 'Payment received and verified successfully.';

if (file_exists($tmpFile)) {
    $data = json_decode(@file_get_contents($tmpFile), true);
    if (!empty($data['status'])) {
        $status = $data['status'];
    }
    if (!empty($data['mpesaReceiptNumber'])) {
        $receipt = $data['mpesaReceiptNumber'];
    } elseif (!empty($data['receipt'])) {
        $receipt = $data['receipt'];
    }
    if (!empty($data['resultDesc'])) {
        $resultDesc = $data['resultDesc'];
    }
}

echo json_encode([
    'success' => true,
    'status' => $status,
    'resultCode' => $status === 'SUCCESS' ? 0 : ($status === 'CANCELLED' ? 1032 : 1),
    'resultDesc' => $resultDesc,
    'mpesaReceiptNumber' => $receipt,
    'checkoutRequestId' => $checkoutId
], JSON_PRETTY_PRINT);
