<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa STK Push Endpoint
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

$phoneNumber = $input['phoneNumber'] ?? '254703293201';
$amount = $input['amount'] ?? 2500;
$accountRef = $input['accountReference'] ?? ('CONS-' . substr(time(), -4));

// Generate unique checkout request ID
$checkoutId = 'ws_CO_CP_' . date('dmYHis') . '_' . rand(100, 999);
$merchantId = 'MR_' . date('dmYHis') . '_' . rand(100, 999);

// Optionally store transaction record in temp directory
$txRecord = [
    'checkoutRequestId' => $checkoutId,
    'merchantRequestId' => $merchantId,
    'phoneNumber' => $phoneNumber,
    'amount' => $amount,
    'accountReference' => $accountRef,
    'status' => 'PENDING',
    'createdAt' => time()
];

$tmpFile = sys_get_temp_dir() . '/mpesa_' . preg_replace('/[^a-zA-Z0-9_-]/', '', $checkoutId) . '.json';
@file_put_contents($tmpFile, json_encode($txRecord));

echo json_encode([
    'success' => true,
    'checkoutRequestId' => $checkoutId,
    'merchantRequestId' => $merchantId,
    'customerMessage' => "Payment prompt sent to {$phoneNumber}. Please enter your M-Pesa PIN on your phone.",
    'responseCode' => '0',
    'responseDescription' => 'Success. Request accepted for processing',
    'isSimulated' => true,
    'tillNumber' => '5829259'
], JSON_PRETTY_PRINT);
