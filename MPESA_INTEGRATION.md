# Demi Tech Solutions – Safaricom Daraja M-Pesa Integration Guide

This document details the architectural implementation, environment setup, and verification flows for M-Pesa payments within Demi Tech Solutions' corporate platform, including **working with temporary Daraja sandbox credentials** and the **zero-setup sandbox simulator**.

---

## 1. Overview & Dual-Payment Strategy

To ensure zero lost revenue and frictionless consultation bookings across all technical customer segments in Kenya, Demi Tech Solutions employs a **dual payment strategy**:

1. **Automated M-Pesa STK Push (Lipa na M-Pesa Online):**
   - Direct SIM-toolkit prompt triggered to the customer's phone.
   - Real-time client polling with instant state updates (Initiated -> Prompt Sent -> User PIN -> Confirmed).
   - Compatible with **temporary Daraja sandbox credentials** (developer.safaricom.co.ke) and includes a **zero-setup interactive sandbox simulator**.

2. **Official Manual Alternative (Buy Goods Till 5829259):**
   - For customers using non-smartphone handsets, secondary SIMs, company accounts, or offline M-Pesa.
   - Exact instructions displayed in the UI:
     > **Payment Method: M-Pesa Buy Goods**  
     > 1. Select Lipa na M-Pesa.  
     > 2. Select Buy Goods and Services.  
     > 3. Enter Till Number: **5829259**.  
     > 4. Enter the consultation amount.  
     > 5. Confirm payment using your M-Pesa PIN.  
     > *Display Till Number: **5829259** prominently.*
   - Instant 1-click WhatsApp transaction verification with dispatch desk: `+254 703 293 201`.

---

## 2. Working with Daraja Temporary Credentials

Developers and testers can use temporary credentials in **two simple ways**:

### Method A: Interactive In-App Configuration (No Server Restart Needed)
1. In the customer **Book a Consultation** modal, click **"Temporary Credentials"** in the M-Pesa STK Push section (or access Tab 3 of the **Admin Portal**).
2. Toggle between:
   - **Daraja Sandbox Simulator (Zero Setup):** Requires no Safaricom developer account. Instantly simulates the STK Push prompt on screen, provides an authentic "Enter PIN: 1234" approval button, and generates a valid Safaricom receipt code within 4 seconds.
   - **Custom Daraja Keys:** Paste your temporary `Consumer Key` and `Consumer Secret` from [developer.safaricom.co.ke](https://developer.safaricom.co.ke).
3. Click **"Verify Keys"** / **"Test Connection"**. The server connects directly to `https://sandbox.safaricom.co.ke/oauth/v1/generate` to verify the keys in real time.

### Method B: Environment Variables (`.env`)
You can configure temporary or permanent credentials in `.env`:
```env
MPESA_ENVIRONMENT="sandbox"
MPESA_CONSUMER_KEY="your_temporary_consumer_key"
MPESA_CONSUMER_SECRET="your_temporary_consumer_secret"
MPESA_PASSKEY="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
MPESA_SHORTCODE="174379"
MPESA_PARTY_B="174379"
MPESA_TRANSACTION_TYPE="CustomerPayBillOnline"
APP_URL="https://www.demitechsolutions.com"
```

---

## 3. Server Architecture & API Endpoints

All Daraja API communication is handled strictly server-side in `server.ts` to ensure API credentials, Consumer Secret, and Lipa na M-Pesa Passkeys are **never exposed to the client browser**.

### Endpoints:

#### 1. Configuration Check
`GET /api/mpesa/config-status`
- **Purpose:** Informs the frontend whether live Daraja STK Push credentials are fully provisioned, whether simulation mode is active, and current till info.

#### 2. Set / Test Temporary Credentials
`POST /api/mpesa/temporary-credentials`
- **Request Body:**
  ```json
  {
    "consumerKey": "...",
    "consumerSecret": "...",
    "shortcode": "174379",
    "passkey": "bfb279f9aa9bdbcf...",
    "environment": "sandbox",
    "simulatorMode": false
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Successfully connected to Safaricom Daraja (sandbox)! Access token verified.",
    "environment": "sandbox",
    "simulatorMode": false
  }
  ```

#### 3. Simulate Handset Action (for On-Screen Test Prompts)
`POST /api/mpesa/simulate-action`
- **Request Body:**
  ```json
  {
    "checkoutRequestId": "ws_CO_SIM_1730560000_123",
    "action": "CONFIRM"
  }
  ```
- **Response:** Marks transaction as `SUCCESS`, issues authentic receipt code (e.g., `SK92MN74LQ`), and auto-notifies polling frontend.

#### 4. Initiate STK Push
`POST /api/mpesa/stkpush`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "phoneNumber": "0703293201",
    "amount": 2500,
    "accountReference": "CONS-1042",
    "transactionDesc": "Consultation",
    "temporaryCredentials": { ... }
  }
  ```
  ```
- **Backend Process:**
  1. Sanitizes and normalizes phone number to international 254 format (`254703293201`).
  2. Generates an OAuth Bearer token from Safaricom Daraja (`https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials` or sandbox counterpart).
  3. Generates base64 encoded password: `base64(Shortcode + Passkey + Timestamp)`.
  4. Dispatches the `POST /mpesa/stkpush/v1/processrequest` payload to Safaricom.
  5. Records the `MerchantRequestID` and `CheckoutRequestID` into the transaction store.
- **Response:**
  ```json
  {
    "success": true,
    "checkoutRequestId": "ws_CO_02112026182354789123",
    "merchantRequestId": "29115-49745-1",
    "customerMessage": "Success. Request accepted for processing"
  }
  ```

#### 3. Query Transaction Status
`GET /api/mpesa/query/:checkoutRequestId`
- **Purpose:** Used by the client modal to poll transaction status every 2.5 seconds.
- **Response (Pending):**
  ```json
  {
    "status": "pending",
    "message": "Payment prompt sent to phone. Enter M-Pesa PIN."
  }
  ```
- **Response (Success):**
  ```json
  {
    "status": "completed",
    "mpesaReceiptNumber": "TLK948D2JS",
    "amount": 2500,
    "phoneNumber": "254703293201",
    "transactionDate": "20261102182410"
  }
  ```

#### 4. Daraja Webhook Callback
`POST /api/mpesa/callback`
- **Purpose:** Asynchronous callback target invoked by Safaricom once the customer enters their PIN (or cancels the prompt).
- **Security:** Verifies payload structure; records M-Pesa Receipt Number, transaction date, and error codes (e.g. `ResultCode: 1032` for user cancellation).

---

## 3. Environment Variables

Store these variables in your `.env` file (or cPanel Node.js App Environment):

| Variable | Description | Example (Sandbox) | Example (Production) |
| :--- | :--- | :--- | :--- |
| `MPESA_ENVIRONMENT` | Daraja API Mode | `sandbox` | `production` |
| `MPESA_CONSUMER_KEY` | Daraja Developer Portal Key | `Abc123Xyz...` | `<ProductionKey>` |
| `MPESA_CONSUMER_SECRET`| Daraja Developer Secret | `Secret987...` | `<ProductionSecret>` |
| `MPESA_PASSKEY` | Lipa na M-Pesa Online Passkey | `bfb279f9aa9bdbcf...` | `<ProductionPasskey>` |
| `MPESA_SHORTCODE` | Online Initiating Shortcode | `174379` | `<Your_Online_Shortcode>` |
| `MPESA_PARTY_B` | Receiving Till or Shortcode | `174379` or `5829259` | `5829259` |
| `MPESA_TRANSACTION_TYPE`| Daraja Transaction Identifier | `CustomerPayBillOnline` | `CustomerBuyGoodsOnline` |
| `APP_URL` | Public Domain for Callbacks | `https://your-ngrok.io` | `https://www.demitechsolutions.com` |

---

## 4. Safaricom Sandbox Testing Guide

For testing in the development environment:

1. **Test Phone Number:** Use your personal Safaricom number or Safaricom's registered sandbox test numbers.
2. **Sandbox Shortcode:** `174379`
3. **Sandbox Passkey:** `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`
4. **Phone Formatting:** The backend accepts `0703293201`, `0112345678`, `+254703293201`, or `254703293201` and automatically normalizes them.
5. **Expected Sandbox Prompt:** Your phone will receive a prompt stating:  
   *"Do you want to pay KES 2,500 to DEMI TECH SOLUTIONS on Account Assessment?"*

---

## 5. Transitioning to Live Production

To transition from Sandbox to Live Safaricom Daraja Production:

1. Log in to [Safaricom Daraja Developer Portal](https://developer.safaricom.co.ke/).
2. Submit your **Go-Live** application linking your Demi Tech Solutions business till / shortcode.
3. Obtain your live **Consumer Key**, **Consumer Secret**, and request your live **Passkey**.
4. In your production environment, set:
   ```env
   MPESA_ENVIRONMENT="production"
   MPESA_CONSUMER_KEY="<live_key>"
   MPESA_CONSUMER_SECRET="<live_secret>"
   MPESA_PASSKEY="<live_passkey>"
   MPESA_SHORTCODE="<live_shortcode>"
   MPESA_PARTY_B="5829259"
   MPESA_TRANSACTION_TYPE="CustomerBuyGoodsOnline"
   APP_URL="https://www.demitechsolutions.com"
   ```
5. Restart your production server (`npm run dev` or restart via cPanel Node.js App).
6. Verify live configuration status at:  
   `https://www.demitechsolutions.com/api/mpesa/config-status`

---

## 6. Error Handling & Status Codes

| Daraja ResultCode | Meaning | System Action |
| :--- | :--- | :--- |
| `0` | Success | Transaction marked completed, receipt issued in UI. |
| `1` | Insufficient Funds | Informs client of insufficient M-Pesa balance. |
| `1032` | Cancelled by User | User pressed Cancel on their phone. Prompt for retry. |
| `1037` | Timeout / Unreachable | Phone was unreachable or user did not respond in 30s. |
| `2001` | Wrong PIN | User entered an incorrect M-Pesa PIN. |

In any event of network failure or API delay, the UI instantly defaults to the **Buy Goods Till: 5829259** workflow with direct WhatsApp confirmation to ensure no customer is stranded.
