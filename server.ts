/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory transaction registry for STK Push requests
interface MpesaTransaction {
  checkoutRequestId: string;
  merchantRequestId: string;
  phoneNumber: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'CANCELLED' | 'FAILED';
  resultCode?: number;
  resultDesc?: string;
  mpesaReceiptNumber?: string;
  transactionDate?: string;
  createdAt: number;
  updatedAt: number;
}

const transactionStore = new Map<string, MpesaTransaction>();

// Clean up transactions older than 24 hours
setInterval(() => {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  for (const [key, tx] of transactionStore.entries()) {
    if (tx.createdAt < oneDayAgo) {
      transactionStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

// Helper: Safaricom Daraja Base URL
function getDarajaBaseUrl(): string {
  const env = (process.env.MPESA_ENVIRONMENT || 'sandbox').trim().toLowerCase();
  return env === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

// Helper: Generate Daraja OAuth Access Token
async function getDarajaAccessToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY?.trim();
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET?.trim();

  if (!consumerKey || !consumerSecret) {
    throw new Error('MISSING_CREDENTIALS: MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET is not configured.');
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const baseUrl = getDarajaBaseUrl();

  const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Daraja OAuth authentication failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: string };
  return data.access_token;
}

// Helper: Format Kenyan Phone Number to 254XXXXXXXXX
function normalizeKenyanPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return cleaned;
  }
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `254${cleaned.slice(1)}`;
  }
  if (cleaned.length === 9) {
    return `254${cleaned}`;
  }
  return cleaned;
}

// Helper: Format Timestamp YYYYMMDDHHmmss in East Africa Time (EAT, UTC+3)
function getMpesaTimestamp(): string {
  const date = new Date();
  // Kenyan local time is UTC+3
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const eatTime = new Date(utc + 3 * 3600000);

  const YYYY = eatTime.getFullYear();
  const MM = String(eatTime.getMonth() + 1).padStart(2, '0');
  const DD = String(eatTime.getDate()).padStart(2, '0');
  const hh = String(eatTime.getHours()).padStart(2, '0');
  const mm = String(eatTime.getMinutes()).padStart(2, '0');
  const ss = String(eatTime.getSeconds()).padStart(2, '0');

  return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
}

// -----------------------------------------------------------------------------
// API Endpoints for M-Pesa STK Push
// -----------------------------------------------------------------------------

// 1. Check Configuration Status
app.get('/api/mpesa/config-status', (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.MPESA_CONSUMER_KEY?.trim());
  const hasSecret = Boolean(process.env.MPESA_CONSUMER_SECRET?.trim());
  const hasPasskey = Boolean(process.env.MPESA_PASSKEY?.trim());
  const hasShortcode = Boolean(process.env.MPESA_SHORTCODE?.trim());

  const isConfigured = hasKey && hasSecret && hasPasskey && hasShortcode;

  res.json({
    configured: isConfigured,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
    tillNumber: '5829259',
    missingFields: [
      !hasKey && 'MPESA_CONSUMER_KEY',
      !hasSecret && 'MPESA_CONSUMER_SECRET',
      !hasPasskey && 'MPESA_PASSKEY',
      !hasShortcode && 'MPESA_SHORTCODE',
    ].filter(Boolean),
  });
});

// 2. Initiate STK Push
app.post('/api/mpesa/stkpush', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body;

    if (!phoneNumber || !amount) {
      res.status(400).json({
        success: false,
        error: 'Phone number and amount are required.',
      });
      return;
    }

    const normalizedPhone = normalizeKenyanPhone(phoneNumber);
    if (!/^254[71]\d{8}$/.test(normalizedPhone)) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid Safaricom M-Pesa mobile number (e.g., 0712345678 or 254712345678).',
      });
      return;
    }

    const parsedAmount = Math.round(Number(amount));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      res.status(400).json({
        success: false,
        error: 'Invalid consultation payment amount.',
      });
      return;
    }

    // Verify credentials presence
    const consumerKey = process.env.MPESA_CONSUMER_KEY?.trim();
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET?.trim();
    const passkey = process.env.MPESA_PASSKEY?.trim();
    const shortcode = process.env.MPESA_SHORTCODE?.trim();

    if (!consumerKey || !consumerSecret || !passkey || !shortcode) {
      res.status(503).json({
        success: false,
        configured: false,
        error: 'Safaricom Daraja API credentials are not configured on this server.',
        details:
          'To enable automated STK Push, configure MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, and MPESA_SHORTCODE in environment variables. In the meantime, please complete your payment using the official manual Buy Goods Till Number below.',
        tillNumber: '5829259',
        instructions: 'Pay via M-Pesa Buy Goods Till Number: 5829259.',
      });
      return;
    }

    // Generate Access Token
    let accessToken: string;
    try {
      accessToken = await getDarajaAccessToken();
    } catch (authError: any) {
      console.error('[Daraja Auth Error]:', authError.message);
      res.status(502).json({
        success: false,
        error: 'Could not connect to Safaricom Daraja gateway. Please check your API credentials.',
        details: authError.message,
        tillNumber: '5829259',
      });
      return;
    }

    const timestamp = getMpesaTimestamp();
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    // Callback URL setup
    const appUrl = (process.env.APP_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
    const callbackUrl = `${appUrl}/api/mpesa/callback`;

    // Party B: For Buy Goods Till STK Push, merchant configuration must specify shortcode or Till
    const partyB = process.env.MPESA_PARTY_B?.trim() || shortcode;
    const transactionType = process.env.MPESA_TRANSACTION_TYPE?.trim() || 'CustomerBuyGoodsOnline';

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: transactionType,
      Amount: parsedAmount,
      PartyA: normalizedPhone,
      PartyB: partyB,
      PhoneNumber: normalizedPhone,
      CallBackURL: callbackUrl,
      AccountReference: (accountReference || 'DEMI-TECH').slice(0, 12),
      TransactionDesc: (transactionDesc || 'Consultation').slice(0, 13),
    };

    const baseUrl = getDarajaBaseUrl();
    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const stkData = (await stkResponse.json()) as any;

    if (stkResponse.ok && stkData.ResponseCode === '0') {
      const checkoutRequestId = stkData.CheckoutRequestID;
      const merchantRequestId = stkData.MerchantRequestID;

      // Register transaction in pending state
      transactionStore.set(checkoutRequestId, {
        checkoutRequestId,
        merchantRequestId,
        phoneNumber: normalizedPhone,
        amount: parsedAmount,
        status: 'PENDING',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      res.json({
        success: true,
        checkoutRequestId,
        merchantRequestId,
        customerMessage: stkData.CustomerMessage || 'STK Push prompt sent to your phone. Please enter your M-Pesa PIN.',
      });
    } else {
      console.error('[Daraja STK Push Error]:', stkData);
      res.status(400).json({
        success: false,
        error: stkData.errorMessage || stkData.ResponseDescription || 'Failed to initiate M-Pesa STK Push.',
        details: stkData,
        tillNumber: '5829259',
      });
    }
  } catch (error: any) {
    console.error('[STK Push Exception]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing the M-Pesa request.',
      details: error.message,
    });
  }
});

// 3. Callback Webhook from Safaricom
app.post('/api/mpesa/callback', (req: Request, res: Response): void => {
  try {
    const callbackData = req.body?.Body?.stkCallback;
    if (!callbackData) {
      res.json({ ResultCode: 0, ResultDesc: 'No callback payload' });
      return;
    }

    const checkoutRequestId = callbackData.CheckoutRequestID;
    const resultCode = Number(callbackData.ResultCode);
    const resultDesc = callbackData.ResultDesc;

    console.log(`[M-Pesa Callback] RequestID: ${checkoutRequestId}, ResultCode: ${resultCode}, Desc: ${resultDesc}`);

    const existingTx = transactionStore.get(checkoutRequestId);

    let mpesaReceiptNumber: string | undefined;
    let transactionDate: string | undefined;

    if (resultCode === 0 && callbackData.CallbackMetadata?.Item) {
      for (const item of callbackData.CallbackMetadata.Item) {
        if (item.Name === 'MpesaReceiptNumber') {
          mpesaReceiptNumber = String(item.Value);
        }
        if (item.Name === 'TransactionDate') {
          transactionDate = String(item.Value);
        }
      }
    }

    let status: MpesaTransaction['status'] = 'FAILED';
    if (resultCode === 0) {
      status = 'SUCCESS';
    } else if (resultCode === 1032) {
      status = 'CANCELLED';
    }

    const updatedTx: MpesaTransaction = {
      checkoutRequestId,
      merchantRequestId: callbackData.MerchantRequestID || existingTx?.merchantRequestId || '',
      phoneNumber: existingTx?.phoneNumber || '',
      amount: existingTx?.amount || 0,
      status,
      resultCode,
      resultDesc,
      mpesaReceiptNumber,
      transactionDate,
      createdAt: existingTx?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    transactionStore.set(checkoutRequestId, updatedTx);

    // Acknowledge Safaricom callback
    res.json({ ResultCode: 0, ResultDesc: 'Callback accepted successfully' });
  } catch (err: any) {
    console.error('[Callback Processing Error]:', err);
    res.json({ ResultCode: 0, ResultDesc: 'Error acknowledged' });
  }
});

// 4. Check Transaction Status / Result (with Daraja Query fallback)
app.get('/api/mpesa/status/:checkoutRequestId', async (req: Request, res: Response): Promise<void> => {
  const { checkoutRequestId } = req.params;
  const tx = transactionStore.get(checkoutRequestId);

  if (!tx) {
    res.status(404).json({
      success: false,
      error: 'Transaction reference not found or expired.',
    });
    return;
  }

  // If already in a terminal state (SUCCESS, CANCELLED, FAILED), return immediately
  if (tx.status !== 'PENDING') {
    res.json({
      success: true,
      status: tx.status,
      resultCode: tx.resultCode,
      resultDesc: tx.resultDesc,
      mpesaReceiptNumber: tx.mpesaReceiptNumber,
      amount: tx.amount,
      phoneNumber: tx.phoneNumber,
    });
    return;
  }

  // If still PENDING and older than 8 seconds, attempt direct Daraja query if credentials exist
  const passkey = process.env.MPESA_PASSKEY?.trim();
  const shortcode = process.env.MPESA_SHORTCODE?.trim();

  if (Date.now() - tx.createdAt > 8000 && passkey && shortcode) {
    try {
      const accessToken = await getDarajaAccessToken();
      const timestamp = getMpesaTimestamp();
      const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
      const baseUrl = getDarajaBaseUrl();

      const queryRes = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId,
        }),
      });

      if (queryRes.ok) {
        const queryData = (await queryRes.json()) as any;
        const resultCode = Number(queryData.ResultCode);

        if (resultCode === 0) {
          tx.status = 'SUCCESS';
          tx.resultCode = 0;
          tx.resultDesc = queryData.ResultDesc;
          tx.updatedAt = Date.now();
        } else if (resultCode === 1032) {
          tx.status = 'CANCELLED';
          tx.resultCode = 1032;
          tx.resultDesc = queryData.ResultDesc || 'Request cancelled by user.';
          tx.updatedAt = Date.now();
        } else if (queryData.ResultCode !== undefined && queryData.ResultCode !== '0') {
          tx.status = 'FAILED';
          tx.resultCode = resultCode;
          tx.resultDesc = queryData.ResultDesc || 'Transaction failed.';
          tx.updatedAt = Date.now();
        }
        transactionStore.set(checkoutRequestId, tx);
      }
    } catch (queryErr) {
      // Ignore query errors and return current state
    }
  }

  // Check timeout (e.g. after 90 seconds without response)
  if (Date.now() - tx.createdAt > 90000 && tx.status === 'PENDING') {
    tx.status = 'FAILED';
    tx.resultDesc = 'Payment request timed out. No response received from phone.';
    transactionStore.set(checkoutRequestId, tx);
  }

  res.json({
    success: true,
    status: tx.status,
    resultCode: tx.resultCode,
    resultDesc: tx.resultDesc,
    mpesaReceiptNumber: tx.mpesaReceiptNumber,
    amount: tx.amount,
    phoneNumber: tx.phoneNumber,
  });
});

// -----------------------------------------------------------------------------
// Vite Middleware / Static Serving Setup
// -----------------------------------------------------------------------------

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
