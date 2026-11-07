<?php
/**
 * Demi Tech Solutions – cPanel M-Pesa Daraja STK Push Callback Webhook
 * Safaricom Daraja calls this endpoint via HTTPS POST upon PIN entry / cancellation.
 */

header('Content-Type: application/json; charset=utf-8');

// Always acknowledge Safaricom immediately
function respondSafaricom($code = 0, $desc = 'Service request processed successfully') {
    echo json_encode([
        'ResultCode' => $code,
        'ResultDesc' => $desc
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respondSafaricom(1, 'Invalid HTTP request method');
}

$rawInput = file_get_contents('php://input');
if (empty($rawInput)) {
    respondSafaricom(1, 'Empty callback body');
}

$data = json_decode($rawInput, true);
$callback = $data['Body']['stkCallback'] ?? null;

if (!$callback) {
    respondSafaricom(1, 'Missing stkCallback payload');
}

$checkoutRequestId = $callback['CheckoutRequestID'] ?? '';
$merchantRequestId = $callback['MerchantRequestID'] ?? '';
$resultCode = intval($callback['ResultCode'] ?? -1);
$resultDesc = $callback['ResultDesc'] ?? '';

// Sanitize filename
$safeCheckoutId = preg_replace('/[^a-zA-Z0-9_-]/', '', $checkoutRequestId);
$tmpFile = sys_get_temp_dir() . '/mpesa_' . $safeCheckoutId . '.json';

$existingData = [];
if (file_exists($tmpFile)) {
    $existingData = json_decode(file_get_contents($tmpFile), true) ?? [];
}

// Extract metadata items if success
$receipt = '';
$phone = $existingData['phoneNumber'] ?? '';
$amount = $existingData['amount'] ?? 0;
$transDate = date('YmdHis');

if ($resultCode === 0 && isset($callback['CallbackMetadata']['Item'])) {
    foreach ($callback['CallbackMetadata']['Item'] as $item) {
        $name = $item['Name'] ?? '';
        $val = $item['Value'] ?? null;
        if ($name === 'MpesaReceiptNumber') $receipt = (string)$val;
        if ($name === 'PhoneNumber') $phone = (string)$val;
        if ($name === 'Amount') $amount = (float)$val;
        if ($name === 'TransactionDate') $transDate = (string)$val;
    }
}

$status = ($resultCode === 0) ? 'SUCCESS' : (($resultCode === 1032) ? 'CANCELLED' : 'FAILED');

$record = [
    'checkoutRequestId' => $checkoutRequestId,
    'merchantRequestId' => $merchantRequestId,
    'status' => $status,
    'resultCode' => $resultCode,
    'resultDesc' => $resultDesc,
    'receipt' => $receipt,
    'mpesaReceiptNumber' => $receipt,
    'amount' => $amount,
    'phoneNumber' => $phone,
    'transactionDate' => $transDate,
    'rawCallback' => $callback,
    'updatedAt' => time()
];

@file_put_contents($tmpFile, json_encode($record, JSON_PRETTY_PRINT));

// Acknowledge receipt to Safaricom
respondSafaricom(0, 'Callback accepted and processed');
