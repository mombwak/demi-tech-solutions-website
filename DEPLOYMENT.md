# Demi Tech Solutions – Production Deployment Guide

This guide details the procedures for deploying the Demi Tech Solutions web application across **cPanel Shared/VPS Hosting** (`public_html`) and **Node.js Production Environments**.

---

## Table of Contents
1. [Prerequisites & Build Process](#1-prerequisites--build-process)
2. [cPanel Static Deployment (`public_html`)](#2-cpanel-static-deployment-public_html)
3. [Fixing Common cPanel Hosting Issues](#3-fixing-common-cpanel-hosting-issues)
4. [cPanel Node.js Application Setup (Full-Stack STK Push)](#4-cpanel-nodejs-application-setup-full-stack-stk-push)
5. [Standalone VPS / Cloud Run / PM2 Deployment](#5-standalone-vps--cloud-run--pm2-deployment)
6. [Safaricom Daraja Webhook & SSL Requirements](#6-safaricom-daraja-webhook--ssl-requirements)
7. [Post-Deployment Verification Checklist](#7-post-deployment-verification-checklist)

---

## 1. Prerequisites & Build Process

Before deploying, ensure you compile the optimized production assets locally or via your CI/CD runner:

```bash
# 1. Clean previous builds
npm run clean

# 2. Verify TypeScript strict type-checking
npm run lint

# 3. Compile the production bundle
npm run build
```

The output bundle will be generated inside the `/dist` directory. The build configuration in `vite.config.ts` incorporates:
- `base: './'` for resilient relative path resolution.
- Granular vendor chunk splitting (`vendor-react`, `vendor-icons`).
- Dynamic code splitting for high-weight modals (`ConsultationModal`, `TechnicianApplicationModal`, `AdminPortalModal`).
- Pre-packaged Apache configuration (`.htaccess`).

---

## 2. cPanel Static Deployment (`public_html`)

If your cPanel plan only supports standard static hosting without a Node.js daemon:

### Step 1: Prepare the Deployment Archive
You can compress the `/dist` directory into a `.zip` archive:
```bash
cd dist
zip -r ../public_html_deployment.zip .
cd ..
```
*(Alternatively, download the pre-generated `public_html_deployment.zip` from the repository root).*

### Step 2: Upload to cPanel File Manager
1. Log in to your cPanel control panel (`https://yourdomain.com:2083`).
2. Open **File Manager** and navigate into the `public_html` directory (or your target subdomain directory).
3. If this is a fresh deployment or clean update:
   - Ensure you backup any existing customer files.
   - Delete outdated hashed assets from older builds inside `assets/`.
4. Click **Upload** in the top toolbar and select `public_html_deployment.zip`.
5. Once upload reaches 100%, return to File Manager, right-click `public_html_deployment.zip`, and choose **Extract**.
6. Ensure the extracted files sit directly in `public_html/`, not inside a nested `dist/` subfolder:
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   ├── favicon.svg
   ├── robots.txt
   └── assets/
       ├── index-*.js
       ├── index-*.css
       ├── vendor-react-*.js
       └── vendor-icons-*.js
   ```

### Step 3: Ensure Hidden Files Are Visible
By default, cPanel hides files starting with a dot (such as `.htaccess`).
- Click **Settings** (gear icon in the top right of File Manager).
- Check **"Show Hidden Files (dotfiles)"**.
- Click **Save**.
- Verify that `.htaccess` is present in `public_html/`.

---

## 3. Fixing Common cPanel Hosting Issues

### Issue A: "White Screen" or "Stuck on Initializing Systems Environment"
- **Root Cause:** Aggressive browser caching retaining an older `index.html` pointing to obsolete hashed asset filenames, or MIME-type misconfiguration serving `.js` files as `text/plain`.
- **Solution:** 
  1. The included `.htaccess` automatically applies `Cache-Control: no-cache, no-store, must-revalidate` to `index.html`.
  2. The application includes a self-healing fallback in `index.html`: if assets do not execute within 5 seconds, an emergency "Force Reload (Bypass Cache)" button appears.
  3. Clear browser cache with `Ctrl + F5` (Windows/Linux) or `Cmd + Shift + R` (Mac).

### Issue B: 404 Errors on Deep Page Navigation or Refresh
- **Root Cause:** Apache trying to locate a physical file matching the client-side URL path.
- **Solution:** Verify the `RewriteRule` in `.htaccess` is directing all non-file requests to `index.html`:
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

### Issue C: File Permissions
Ensure proper UNIX file permissions:
- Folders (`public_html`, `assets`): **755** (`drwxr-xr-x`)
- Files (`index.html`, `.htaccess`, `.js`, `.css`): **644** (`-rw-r--r--`)

---

## 4. cPanel Node.js Application Setup (Full-Stack STK Push)

To enable automated Safaricom Daraja STK Push requests directly from your cPanel server without a third-party proxy:

### Step 1: Open "Setup Node.js App"
1. In cPanel, search for **Setup Node.js App** (CloudLinux / cPanel LVE).
2. Click **Create Application**.

### Step 2: Configure Application Parameters
- **Node.js Version:** Select **20.x** (or the highest 18+ version available).
- **Application Mode:** `Production`.
- **Application Root:** `demitech_app` (or your chosen directory outside `public_html`).
- **Application URL:** Select `demitechsolutions.com`.
- **Application Startup File:** `server.js` or `server.ts` (if `tsx` is used).

### Step 3: Upload Repository Files
Upload all repository source files into `/home/username/demitech_app`:
```
/home/username/demitech_app/
├── package.json
├── server.ts
├── src/
├── vite.config.ts
├── tsconfig.json
└── .env
```

### Step 4: Configure Environment Variables in cPanel
Under **Environment Variables** in the Node.js application screen, add:
- `PORT` = `3000` (or leave default assigned by passenger)
- `MPESA_ENVIRONMENT` = `production`
- `MPESA_CONSUMER_KEY` = `<Your_Daraja_Consumer_Key>`
- `MPESA_CONSUMER_SECRET` = `<Your_Daraja_Consumer_Secret>`
- `MPESA_PASSKEY` = `<Your_Lipa_Na_Mpesa_Passkey>`
- `MPESA_SHORTCODE` = `<Your_Shortcode_Or_Paybill>`
- `MPESA_PARTY_B` = `5829259`
- `MPESA_TRANSACTION_TYPE` = `CustomerBuyGoodsOnline`
- `APP_URL` = `https://www.demitechsolutions.com`

### Step 5: Install Dependencies & Start
1. Click **Run NPM Install** in the cPanel UI.
2. Build the production client:
   ```bash
   npm run build
   ```
3. Click **Restart Application**.

---

## 5. Standalone VPS / Cloud Run / PM2 Deployment

For enterprise hosting on Ubuntu/Debian VPS (e.g. DigitalOcean, AWS EC2, Linode) or containerized Cloud Run:

### Step 1: Clone & Install
```bash
git clone https://github.com/demitechsolutions/demi-tech-solutions-website.git /var/www/demitech
cd /var/www/demitech
npm install
npm run build
```

### Step 2: Manage with PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Start the server with tsx
pm2 start "npm start" --name "demitech-web"

# Enable start on system boot
pm2 startup
pm2 save
```

### Step 3: NGINX Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name demitechsolutions.com www.demitechsolutions.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name demitechsolutions.com www.demitechsolutions.com;

    ssl_certificate /etc/letsencrypt/live/demitechsolutions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demitechsolutions.com/privkey.pem;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 6. Safaricom Daraja Webhook & SSL Requirements

1. **Mandatory HTTPS:** Safaricom Daraja **rejects** callback URLs using plain HTTP. Your domain MUST have a valid SSL certificate (Let's Encrypt, cPanel AutoSSL, or commercial SSL).
2. **Accessible Callback Endpoint:** The URL `${APP_URL}/api/mpesa/callback` must be publicly accessible from Safaricom's IP ranges without HTTP Basic Auth or Cloudflare Bot Fight Mode blocking it.
3. **Response Timing:** The `/api/mpesa/callback` endpoint must respond within **5 seconds** with `{ "ResultCode": 0, "ResultDesc": "Success" }`.

---

## 7. Post-Deployment Verification Checklist

- [ ] Visit `https://www.demitechsolutions.com` in an incognito window.
- [ ] Confirm no console errors in browser DevTools (`F12`).
- [ ] Check page load time on mobile 4G network.
- [ ] Test the **Book Consultation** modal:
  - Verify that **M-Pesa Buy Goods Till 5829259** is rendered.
  - Test an STK Push with a test phone number.
  - Verify WhatsApp instant link directs to `+254 703 293 201`.
- [ ] Test the **Join Technician Network** modal form submission.
- [ ] Test all internal anchor navigation links (Core Solutions, Engineering Specs, Why Us, Case Studies, Insights, Contact).
