<?php
/**
 * Demi Tech Solutions - Customer Enquiry Intake Endpoint (cPanel Native PHP)
 * SPDX-License-Identifier: Apache-2.0
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid JSON payload.',
    ]);
    exit;
}

$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$email = trim($data['email'] ?? '');
$county = trim($data['county'] ?? 'Kisumu');
$message = trim($data['message'] ?? '');
$enquiryId = !empty($data['id']) ? trim($data['id']) : 'ENQ-' . substr((string)time(), -6);

if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Name, telephone number, and message are required fields.',
    ]);
    exit;
}

// Log or persist enquiry to JSON storage file safely
$logDir = __DIR__ . '/../../data';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0750, true);
}

$enquiryFile = $logDir . '/customer_enquiries.jsonl';
$record = [
    'id' => $enquiryId,
    'createdAt' => date('c'),
    'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    'county' => htmlspecialchars($county, ENT_QUOTES, 'UTF-8'),
    'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
    'status' => 'NEW',
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

@file_put_contents($enquiryFile, json_encode($record) . PHP_EOL, FILE_APPEND | LOCK_EX);

echo json_encode([
    'success' => true,
    'id' => $enquiryId,
    'message' => 'Enquiry logged successfully. A systems engineer will respond within 4 business hours.',
]);
