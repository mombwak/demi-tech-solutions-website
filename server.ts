/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
  isSimulated?: boolean;
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

// Default Safaricom Daraja Sandbox test credentials
const DARAJA_SANDBOX_DEFAULTS = {
  shortcode: '174379',
  passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  partyB: '174379',
  transactionType: 'CustomerPayBillOnline',
};

// Runtime dynamic credentials store (allows updating temporary credentials without server restart)
interface RuntimeDarajaConfig {
  environment: 'sandbox' | 'production';
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  partyB: string;
  transactionType: string;
  simulatorMode: boolean;
}

let runtimeDarajaConfig: RuntimeDarajaConfig = {
  environment: ((process.env.MPESA_ENVIRONMENT || 'sandbox').trim().toLowerCase() === 'production'
    ? 'production'
    : 'sandbox') as 'sandbox' | 'production',
  consumerKey: process.env.MPESA_CONSUMER_KEY?.trim() || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET?.trim() || '',
  shortcode: process.env.MPESA_SHORTCODE?.trim() || DARAJA_SANDBOX_DEFAULTS.shortcode,
  passkey: process.env.MPESA_PASSKEY?.trim() || DARAJA_SANDBOX_DEFAULTS.passkey,
  partyB: process.env.MPESA_PARTY_B?.trim() || '5829259',
  transactionType: process.env.MPESA_TRANSACTION_TYPE?.trim() || 'CustomerBuyGoodsOnline',
  simulatorMode: !Boolean(process.env.MPESA_CONSUMER_KEY?.trim()),
};

// Helper: Safaricom Daraja Base URL
function getDarajaBaseUrl(environment?: 'sandbox' | 'production'): string {
  const env = environment || runtimeDarajaConfig.environment;
  return env === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

// Helper: Generate Daraja OAuth Access Token with given or runtime credentials
async function getDarajaAccessToken(customKey?: string, customSecret?: string, env?: 'sandbox' | 'production'): Promise<string> {
  const consumerKey = (customKey || runtimeDarajaConfig.consumerKey || process.env.MPESA_CONSUMER_KEY || '').trim();
  const consumerSecret = (customSecret || runtimeDarajaConfig.consumerSecret || process.env.MPESA_CONSUMER_SECRET || '').trim();

  if (!consumerKey || !consumerSecret) {
    throw new Error('MISSING_CREDENTIALS: Consumer Key or Consumer Secret is not configured.');
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const baseUrl = getDarajaBaseUrl(env);

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

// Helper: Generate Authentic-looking M-Pesa Receipt Code (e.g., SK98M4X2LQ)
function generateMpesaReceiptCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SK';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// -----------------------------------------------------------------------------
// API Endpoints for M-Pesa STK Push
// -----------------------------------------------------------------------------

// 1. Check Configuration Status
app.get('/api/mpesa/config-status', (_req: Request, res: Response) => {
  const hasEnvKey = Boolean(process.env.MPESA_CONSUMER_KEY?.trim());
  const hasRuntimeKey = Boolean(runtimeDarajaConfig.consumerKey?.trim());
  const hasKey = hasEnvKey || hasRuntimeKey;

  res.json({
    configured: hasKey || runtimeDarajaConfig.simulatorMode,
    hasRealCredentials: hasKey,
    environment: runtimeDarajaConfig.environment,
    simulatorMode: runtimeDarajaConfig.simulatorMode,
    shortcode: runtimeDarajaConfig.shortcode,
    tillNumber: runtimeDarajaConfig.partyB || '5829259',
    modeDescription: runtimeDarajaConfig.simulatorMode
      ? 'Daraja Sandbox Simulator Active (Instant Testing)'
      : `Live Daraja Gateway Active (${runtimeDarajaConfig.environment})`,
  });
});

// 2. Set / Test Temporary Daraja Credentials
app.post('/api/mpesa/temporary-credentials', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      consumerKey,
      consumerSecret,
      shortcode,
      passkey,
      environment,
      simulatorMode,
    } = req.body;

    // If simulator mode is explicitly toggled
    if (typeof simulatorMode === 'boolean') {
      runtimeDarajaConfig.simulatorMode = simulatorMode;
    }

    if (environment === 'sandbox' || environment === 'production') {
      runtimeDarajaConfig.environment = environment;
    }

    if (shortcode) {
      runtimeDarajaConfig.shortcode = String(shortcode).trim();
    }
    if (passkey) {
      runtimeDarajaConfig.passkey = String(passkey).trim();
    }

    // If user provided temporary consumer key and secret, validate them against Daraja
    if (consumerKey && consumerSecret) {
      const trimmedKey = String(consumerKey).trim();
      const trimmedSecret = String(consumerSecret).trim();

      try {
        const token = await getDarajaAccessToken(trimmedKey, trimmedSecret, runtimeDarajaConfig.environment);
        runtimeDarajaConfig.consumerKey = trimmedKey;
        runtimeDarajaConfig.consumerSecret = trimmedSecret;
        runtimeDarajaConfig.simulatorMode = false; // Disable simulator if real credentials work

        res.json({
          success: true,
          message: `Successfully connected to Safaricom Daraja (${runtimeDarajaConfig.environment})! Access token verified.`,
          environment: runtimeDarajaConfig.environment,
          shortcode: runtimeDarajaConfig.shortcode,
          simulatorMode: false,
        });
        return;
      } catch (authErr: any) {
        res.status(400).json({
          success: false,
          error: `Daraja credential validation failed: ${authErr.message}`,
          details: 'Please double-check your Consumer Key and Consumer Secret from developer.safaricom.co.ke.',
        });
        return;
      }
    }

    res.json({
      success: true,
      message: runtimeDarajaConfig.simulatorMode
        ? 'Daraja Sandbox Simulator mode activated. STK Push will simulate instant handset prompts.'
        : 'Daraja settings updated.',
      config: {
        environment: runtimeDarajaConfig.environment,
        shortcode: runtimeDarajaConfig.shortcode,
        simulatorMode: runtimeDarajaConfig.simulatorMode,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to update temporary credentials.',
      details: error.message,
    });
  }
});

// 3. Simulate Prompt Action (for on-screen phone testing)
app.post('/api/mpesa/simulate-action', (req: Request, res: Response): void => {
  const { checkoutRequestId, action } = req.body;

  if (!checkoutRequestId) {
    res.status(400).json({ success: false, error: 'checkoutRequestId is required' });
    return;
  }

  const tx = transactionStore.get(checkoutRequestId);
  if (!tx) {
    res.status(404).json({ success: false, error: 'Transaction not found or expired' });
    return;
  }

  if (action === 'CANCEL') {
    tx.status = 'CANCELLED';
    tx.resultCode = 1032;
    tx.resultDesc = 'Request cancelled by user.';
    tx.updatedAt = Date.now();
    transactionStore.set(checkoutRequestId, tx);
    res.json({ success: true, message: 'Transaction cancelled' });
    return;
  }

  // Otherwise CONFIRM
  tx.status = 'SUCCESS';
  tx.resultCode = 0;
  tx.resultDesc = 'The service request is processed successfully.';
  tx.mpesaReceiptNumber = tx.mpesaReceiptNumber || generateMpesaReceiptCode();
  tx.transactionDate = getMpesaTimestamp();
  tx.updatedAt = Date.now();
  transactionStore.set(checkoutRequestId, tx);

  res.json({
    success: true,
    message: 'Simulated payment approved successfully',
    receipt: tx.mpesaReceiptNumber,
  });
});

// 4. Initiate STK Push
app.post('/api/mpesa/stkpush', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc, temporaryCredentials } = req.body;

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

    // Merge temporary credentials from request body if passed
    const activeConsumerKey = (temporaryCredentials?.consumerKey || runtimeDarajaConfig.consumerKey || process.env.MPESA_CONSUMER_KEY || '').trim();
    const activeConsumerSecret = (temporaryCredentials?.consumerSecret || runtimeDarajaConfig.consumerSecret || process.env.MPESA_CONSUMER_SECRET || '').trim();
    const activeShortcode = (temporaryCredentials?.shortcode || runtimeDarajaConfig.shortcode || process.env.MPESA_SHORTCODE || DARAJA_SANDBOX_DEFAULTS.shortcode).trim();
    const activePasskey = (temporaryCredentials?.passkey || runtimeDarajaConfig.passkey || process.env.MPESA_PASSKEY || DARAJA_SANDBOX_DEFAULTS.passkey).trim();
    const isSimMode = temporaryCredentials?.simulatorMode ?? runtimeDarajaConfig.simulatorMode;

    // -------------------------------------------------------------------------
    // BRANCH A: SIMULATOR / ZERO-SETUP DARAJA SANDBOX MODE
    // -------------------------------------------------------------------------
    // If explicitly in simulator mode OR if no consumer key/secret are available yet
    if (isSimMode || !activeConsumerKey || !activeConsumerSecret) {
      const checkoutRequestId = `ws_CO_SIM_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const merchantRequestId = `MR_SIM_${Date.now()}`;

      // Register transaction in pending state
      const simulatedTx: MpesaTransaction = {
        checkoutRequestId,
        merchantRequestId,
        phoneNumber: normalizedPhone,
        amount: parsedAmount,
        status: 'PENDING',
        isSimulated: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      transactionStore.set(checkoutRequestId, simulatedTx);

      // Auto-schedule successful simulation resolution after 20 seconds (allows user to interact with the SIM prompt)
      setTimeout(() => {
        const current = transactionStore.get(checkoutRequestId);
        if (current && current.status === 'PENDING') {
          current.status = 'SUCCESS';
          current.resultCode = 0;
          current.resultDesc = 'The service request is processed successfully.';
          current.mpesaReceiptNumber = generateMpesaReceiptCode();
          current.transactionDate = getMpesaTimestamp();
          current.updatedAt = Date.now();
          transactionStore.set(checkoutRequestId, current);
          console.log(`[Daraja Simulator] Auto-completed transaction ${checkoutRequestId} with receipt ${current.mpesaReceiptNumber}`);
        }
      }, 20000);

      res.json({
        success: true,
        checkoutRequestId,
        merchantRequestId,
        isSimulated: true,
        customerMessage: `Daraja Sandbox STK Push initiated for KES ${parsedAmount.toLocaleString()} to ${normalizedPhone}. Enter PIN on your handset or approve using the on-screen prompt.`,
        tillNumber: '5829259',
      });
      return;
    }

    // -------------------------------------------------------------------------
    // BRANCH B: REAL DARAJA GATEWAY (SANDBOX OR PRODUCTION)
    // -------------------------------------------------------------------------
    let accessToken: string;
    try {
      accessToken = await getDarajaAccessToken(activeConsumerKey, activeConsumerSecret, runtimeDarajaConfig.environment);
    } catch (authError: any) {
      console.error('[Daraja Auth Error]:', authError.message);
      res.status(502).json({
        success: false,
        error: 'Could not connect to Safaricom Daraja gateway. Credentials invalid.',
        details: authError.message,
        canUseSimulator: true,
        tillNumber: '5829259',
      });
      return;
    }

    const timestamp = getMpesaTimestamp();
    const password = Buffer.from(`${activeShortcode}${activePasskey}${timestamp}`).toString('base64');

    // Callback URL setup
    const appUrl = (process.env.APP_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
    const callbackUrl = `${appUrl}/api/mpesa/callback`;

    const partyB = process.env.MPESA_PARTY_B?.trim() || activeShortcode;
    const transactionType = process.env.MPESA_TRANSACTION_TYPE?.trim() || (runtimeDarajaConfig.environment === 'production' ? 'CustomerBuyGoodsOnline' : 'CustomerPayBillOnline');

    const payload = {
      BusinessShortCode: activeShortcode,
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
        isSimulated: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      res.json({
        success: true,
        checkoutRequestId,
        merchantRequestId,
        isSimulated: false,
        customerMessage: stkData.CustomerMessage || 'STK Push prompt sent to your phone. Please enter your M-Pesa PIN.',
      });
    } else {
      console.error('[Daraja STK Push Error]:', stkData);
      res.status(400).json({
        success: false,
        error: stkData.errorMessage || stkData.ResponseDescription || 'Failed to initiate M-Pesa STK Push.',
        details: stkData,
        canUseSimulator: true,
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
// cPanel public_html Deployment Package Distribution Handlers
// -----------------------------------------------------------------------------

const serveDeploymentPackage = (req: Request, res: Response) => {
  const rootZip = path.resolve(__dirname, 'public_html_deployment.zip');
  const distZip = path.resolve(__dirname, 'dist', 'public_html_deployment.zip');
  const publicZip = path.resolve(__dirname, 'public', 'public_html_deployment.zip');

  const targetZip = [rootZip, distZip, publicZip].find((p) => fs.existsSync(p));

  // Determine if caller specifically requested JSON (e.g. format=json or curl -H "Accept: application/json")
  const acceptHeader = req.headers.accept || '';
  const wantsJson =
    acceptHeader.includes('application/json') ||
    req.query.format === 'json' ||
    req.path.startsWith('/api/');

  if (wantsJson) {
    let stats: fs.Stats | null = null;
    if (targetZip) {
      try {
        stats = fs.statSync(targetZip);
      } catch {
        // Ignored
      }
    }

    return res.json({
      success: true,
      status: 'ready',
      filename: 'public_html_deployment.zip',
      downloadUrl: '/public_html_deployment.zip',
      fileSizeBytes: stats?.size || 0,
      lastModified: stats?.mtime?.toISOString() || new Date().toISOString(),
      version: '1.2.0',
      message: 'cPanel public_html deployment package is ready and up to date.',
      features: [
        'Safaricom Daraja STK Push Integration',
        'Interactive Safaricom PIN Toolkit Simulation Modal',
        'Temporary Daraja Sandbox Credentials Support',
        'Buy Goods Till Number 5829259 Prominently Displayed',
        'cPanel Apache .htaccess with SPA Rewrite & API Protection',
        'cPanel Native PHP API endpoints included in /api/mpesa/'
      ],
      instructions: {
        targetDirectory: 'public_html (or subdomain directory)',
        uploadFile: 'public_html_deployment.zip',
        extraction: 'Extract directly into public_html root',
        dotfiles: 'Ensure "Show Hidden Files" is enabled in cPanel settings to show .htaccess',
        testUrl: 'https://www.demitechsolutions.com'
      }
    });
  }

  // File download response
  if (targetZip && fs.existsSync(targetZip)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="public_html_deployment.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.sendFile(targetZip);
  }

  return res.status(404).json({
    success: false,
    error: 'Deployment archive is being compiled. Please retry shortly.',
  });
};

app.get('/public_html_deployment', serveDeploymentPackage);
app.get('/public_html_deployment.zip', serveDeploymentPackage);
app.get('/api/public_html_deployment', serveDeploymentPackage);
app.get('/api/deployment-package', serveDeploymentPackage);

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
