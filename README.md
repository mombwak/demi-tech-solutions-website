# Demi Tech Solutions – Official Corporate Web Platform

[![Production Status](https://img.shields.io/badge/status-production--ready-black.svg?style=flat-square)](https://www.demitechsolutions.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-black.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-black.svg?style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-black.svg?style=flat-square)](https://tailwindcss.com/)
[![Safaricom Daraja](https://img.shields.io/badge/M--Pesa-Daraja_STK_Push-008000.svg?style=flat-square)](https://developer.safaricom.co.ke/)
[![License](https://img.shields.io/badge/license-Proprietary-black.svg?style=flat-square)](LICENSE)

> **ENGINEERING INTELLIGENT TECHNOLOGY SYSTEMS.**  
> *Technology. Security. Business Infrastructure.*  
> Official corporate website and client acquisition platform for **Demi Tech Solutions**, headquartered in **Kisumu, Kenya**, serving Kisumu, Western Kenya, and enterprise clients nationwide.

---

## 1. Executive Overview

**Demi Tech Solutions** is a technology engineering and systems integration firm delivering intelligent security, enterprise technology, business automation, and resilient infrastructure solutions to enterprises, commercial properties, healthcare institutions, and hospitality establishments.

This repository contains the complete full-stack web platform for `https://www.demitechsolutions.com`, re-engineered for:
1. **High-converting customer acquisition** for enterprise and commercial clients.
2. **Automated Daraja M-Pesa STK Push** payment processing for engineering consultations with manual **Buy Goods Till 5829259** support.
3. **Verified Independent Technician Network onboarding** across all 47 counties of Kenya.
4. **Sub-second mobile performance** on Kenyan cellular networks (Safaricom, Airtel, Telkom) with zero white-screen resilience.
5. **Turnkey cPanel / Apache `public_html` compatibility** alongside scalable Node.js full-stack execution.

---

## 2. Core Engineering Capabilities

The platform showcases Demi Tech Solutions' core technical capabilities:

| Domain | Systems & Engineering Deliverables |
| :--- | :--- |
| **Security Engineering & CCTV** | IP surveillance networks, AI human/vehicle detection, PTZ perimeter tracking, remote viewing bridges, access control. |
| **Fleet Telematics & GPS Tracking** | Real-time GPS tracking, fuel monitoring, remote engine immobilisation, geo-fencing, speed governance compliance. |
| **Point of Sale (POS) Systems** | Retail & supermarket POS, multi-till synchronisation, barcode inventory control, offline-first resilience. |
| **Hospitality Management Systems** | Restaurant POS, Kitchen Display Systems (KDS), split billing, table mapping, inventory recipe costing. |
| **ERP & Business Automation** | Enterprise resource planning, multi-warehouse stock management, automated accounting, procurement pipelines. |
| **Hospital Information Systems (HMIS)** | Outpatient/inpatient workflows, electronic medical records (EMR), pharmacy dispensary, NHIF/SHIF billing. |
| **Networking & IT Infrastructure** | Structured Cat6A/Fibre cabling, enterprise WiFi, MikroTik router provisioning, Starlink satellite integrations, VPNs. |
| **Solar Resilience & Power Systems** | Pure sine wave inverters, lithium LiFePO4 battery banks, solar PV arrays, uninterrupted failover for critical servers. |
| **Technician Partner Network** | Vetted national network of certified installers, telematics technicians, and network engineers across Kenya. |

---

## 3. Technology Stack & Architecture

### Frontend
- **Framework:** React 19 (Functional components, custom hooks)
- **Language:** TypeScript 5.x (Strict type safety, standard interfaces)
- **Styling:** Tailwind CSS v4 (Minimalist, engineering-focused black & white palette)
- **Icons:** Lucide React (Ultra-lightweight SVG vector icons)
- **Build Tool:** Vite 8.x with custom Rollup code-splitting chunks:
  - `vendor-react`: React, React-DOM
  - `vendor-icons`: Lucide React
  - Lazy-loaded dynamic modal imports (`ConsultationModal`, `TechnicianApplicationModal`, `AdminPortalModal`)
- **Initial Bundle Size:** 171 KB raw (38 KB gzipped) — down from 855 KB.

### Backend & API
- **Runtime:** Node.js (v20+ Recommended)
- **Server:** Express 4.x with native middleware mounting
- **Payment Gateway:** Safaricom Daraja 2.0 API (Lipa na M-Pesa Online STK Push)
- **Validation:** Server-side Kenyan phone normalization (`2547XXXXXXXX`, `2541XXXXXXXX`)
- **Transaction Memory:** Persistent in-memory ledger with callback state tracking

### Hosting & Infrastructure
- **cPanel / Apache:** Optimized `.htaccess` with `mod_deflate` gzip compression, browser cache control, and SPA URL rewrite rules.
- **Node.js Server:** Standalone Express server running on port `3000` via `tsx server.ts`.

---

## 4. Key Platform Features

### A. Daraja M-Pesa Consultation Checkout
Customers booking engineering consultations (Site Survey, Architecture Design, Urgent Diagnostics) can pay instantly via:
1. **Automated STK Push:** Prompts the user's Safaricom SIM card directly with amount and Till/Shortcode reference. The client UI polls transaction status seamlessly.
2. **Official Manual Alternative:** Explicit step-by-step instructions for **M-Pesa Buy Goods Till: 5829259**.
3. **WhatsApp Instant Verification:** Direct link to WhatsApp (+254 703 293 201) with pre-formatted transaction reference verification.

### B. Two Distinct User Journeys
1. **Premium Clients:** Direct paths to explore core solutions, view real-world deployment case studies, read technical insights, and request technical consultations.
2. **Field Technicians:** Dedicated onboarding gateway for verified installers, electricians, telematics technicians, and cable specialists to apply for regional subcontractor work.

### C. Performance & Zero-Freeze Resilience
- **Fail-Safe Client Bootloader:** An inline SVG loader in `index.html` displays instant visual confirmation with a 5-second automatic fallback recovery button if cellular connectivity drops.
- **Relative Path Resolvers:** Vite `base: './'` guarantees execution regardless of whether the site is hosted in root `public_html`, a subdomain, or a subfolder.

---

## 5. Repository Structure

```
├── .env.example              # Sample environment configuration for Daraja & Server
├── .gitignore                # Git ignore patterns
├── DEPLOYMENT.md             # In-depth cPanel & Node.js deployment guide
├── MPESA_INTEGRATION.md      # Detailed Safaricom Daraja STK Push documentation
├── CONTRIBUTING.md           # Developer guidelines & coding standards
├── README.md                 # Master project documentation
├── index.html                # Single-page application entry point & fail-safe loader
├── package.json              # NPM dependencies and run scripts
├── server.ts                 # Express backend server with Daraja STK endpoints
├── tsconfig.json             # TypeScript compiler settings
├── vite.config.ts            # Vite bundler configuration & chunk splitting
├── public/
│   ├── .htaccess             # Apache server compression, security, & SPA routing
│   ├── favicon.svg           # Scalable monochrome brand mark
│   └── robots.txt            # Search engine crawler instructions
└── src/
    ├── App.tsx               # Main application layout, state, & lazy modals
    ├── main.tsx              # React DOM mounting & loader dismiss logic
    ├── index.css             # Tailwind CSS imports & base styles
    ├── types.ts              # Data contracts, service models, & transaction types
    ├── components/
    │   ├── Header.tsx        # Responsive navigation with emergency contact
    │   ├── Hero.tsx          # Minimalist hero with dual CTAs & trust badges
    │   ├── CompanyIntro.tsx  # Executive mission & technical positioning
    │   ├── CoreSolutions.tsx # 8 specialized engineering domains with specs
    │   ├── WhyUs.tsx         # Engineering vs. contractor comparison matrix
    │   ├── ProjectsPortfolio.tsx # Western Kenya case studies & telemetry stats
    │   ├── IndustriesSection.tsx # Commercial sectors served
    │   ├── TechnicianNetworkSection.tsx # Verified subcontractor recruitment
    │   ├── InsightsSection.tsx # Technical engineering advisory articles
    │   ├── ConsultationSection.tsx # Tiered consultation selection & booking
    │   ├── ConsultationModal.tsx   # Daraja STK Push & Till 5829259 payment modal
    │   ├── TechnicianApplicationModal.tsx # Subcontractor intake application
    │   ├── AdminPortalModal.tsx    # Secure internal dispatch & transaction viewer
    │   ├── ContactSection.tsx # Physical Kisumu address, phones, & email
    │   ├── Footer.tsx        # Corporate footer, quick links, legal notices
    │   └── WhatsAppFloatingButton.tsx # Persistent WhatsApp chat trigger
    └── data/
        └── content.ts        # Structured content, pricing, services, & insights
```

---

## 6. Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher, v20+ recommended)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/demitechsolutions/demi-tech-solutions-website.git
   cd demi-tech-solutions-website
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Safaricom Daraja credentials (see [M-Pesa Integration](#7-safaricom-daraja-m-pesa-setup) below).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be live at `http://localhost:3000`.

5. **Type Checking & Linting:**
   ```bash
   npm run lint
   ```

6. **Production Build:**
   ```bash
   npm run build
   ```
   Generates optimized static assets in the `/dist` directory.

---

## 7. Safaricom Daraja M-Pesa Setup

The application supports both automated Daraja STK Push (Lipa na M-Pesa Online) and manual Buy Goods Till payments.

### Required `.env` Variables:

```env
# Daraja Environment: "sandbox" for testing, "production" for live
MPESA_ENVIRONMENT="sandbox"

# Safaricom Developer Portal App Keys
MPESA_CONSUMER_KEY="your_consumer_key_here"
MPESA_CONSUMER_SECRET="your_consumer_secret_here"

# Lipa na M-Pesa Online Passkey
MPESA_PASSKEY="your_lipa_na_mpesa_passkey"

# Business Shortcode (Sandbox test shortcode is 174379)
MPESA_SHORTCODE="174379"

# Party B (Buy Goods Till 5829259 or Shortcode)
MPESA_PARTY_B="5829259"

# Transaction Type: CustomerBuyGoodsOnline or CustomerPayBillOnline
MPESA_TRANSACTION_TYPE="CustomerBuyGoodsOnline"

# Public App Base URL for Daraja Webhooks
APP_URL="https://www.demitechsolutions.com"
```

### Manual Payment Alternative:
Even when Daraja STK Push is active, the system prominently renders the manual procedure:
- **Payment Method:** M-Pesa Buy Goods
- **Till Number:** `5829259`
- **Official Contact / WhatsApp:** `+254 703 293 201`

*For complete details, see [MPESA_INTEGRATION.md](./MPESA_INTEGRATION.md).*

---

## 8. Deployment Options

### Option 1: Apache / cPanel `public_html` (Static SPA)
1. Run `npm run build`.
2. Upload all files from the generated `/dist` directory (including `.htaccess`) into your cPanel `public_html` root.
3. The included `.htaccess` automatically manages:
   - Client-side routing rewrite rules to `index.html`.
   - Gzip compression via `mod_deflate`.
   - Aggressive 1-year caching for fingerprinted assets (`.js`, `.css`).
   - `Cache-Control: no-cache` on `index.html` to eliminate stale version caches.

### Option 2: Full-Stack Node.js (with Real-Time Daraja STK Backend)
1. In cPanel, navigate to **Setup Node.js App** (or use PM2 on a VPS / Cloud Run / Heroku).
2. Set application startup file to `server.ts` (or compile to `server.js` with `esbuild`).
3. Set environment variables in the cPanel Node.js dashboard.
4. Run `npm install` and start the application.

*For complete step-by-step instructions and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).*

---

## 9. Brand & Visual Identity Guidelines

- **Palette:** Strict monochrome palette (Deep Black `#000000`, Off-White `#F9FAFB`, Pure White `#FFFFFF`, Neutral Grays `#1F2937`, `#4B5563`).
- **Typography:** Clean sans-serif with high contrast, uppercase micro-labels (`tracking-widest`, `text-xs font-mono`), and bold structural headings.
- **Aesthetic:** High-precision technology engineering, hardware telematics, and infrastructure integration. Avoid bright consumer-grade colors, playful illustrations, or retail "computer shop" vibes.

---

## 10. Contact & Support

**DEMI TECH SOLUTIONS**  
- **Headquarters:** Kisumu, Kenya  
- **Primary Market:** Kisumu & Western Kenya  
- **Secondary Market:** Nationwide Kenya  
- **Website:** [https://www.demitechsolutions.com](https://www.demitechsolutions.com)  
- **Direct Phone / WhatsApp:** +254 703 293 201  
- **General Inquiries:** contact@demitechsolutions.com  
- **Engineering Desk:** solutions@demitechsolutions.com  

---

© Demi Tech Solutions. All rights reserved. Engineering Intelligent Technology Systems.
