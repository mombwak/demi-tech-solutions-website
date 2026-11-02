/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SolutionDivision, ProjectItem, InsightArticle, IndustryItem } from '../types.ts';

export const COMPANY_INFO = {
  name: 'DEMI TECH SOLUTIONS',
  tagline: 'ENGINEERING INTELLIGENT TECHNOLOGY SYSTEMS.',
  subTagline: 'Technology. Security. Business Infrastructure.',
  description:
    'Demi Tech Solutions is a technology engineering and systems integration company delivering intelligent security, enterprise technology, business automation and infrastructure solutions to businesses, institutions and property owners.',
  extendedDescription:
    'We specialise in designing, implementing and maintaining integrated technology systems that improve security, operational efficiency and business performance. We serve Kisumu, Western Kenya and clients across Kenya.',
  location: 'Kisumu, Kenya',
  primaryMarket: 'Kisumu and Western Kenya (Kakamega, Bungoma, Busia, Siaya, Homa Bay, Vihiga, Migori)',
  secondaryMarket: 'Nationwide Kenya',
  phone: '+254 703 293201',
  phoneRaw: '254703293201',
  email: 'info@demitechsolutions.com',
  website: 'www.demitechsolutions.com',
  whatsappPrefilledMessage: 'Hello Demi Tech Solutions, I would like to enquire about booking a professional consultation.',
  whatsappUrl:
    'https://wa.me/254703293201?text=Hello%20Demi%20Tech%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20professional%20consultation.',
  consultationFeeRemote: 2500,
  consultationFeeLocal: 5000,
  consultationFeeRegional: 8500,
  mpesaTillNumber: '5829259',
};

export const CORE_DIVISIONS: SolutionDivision[] = [
  {
    id: 'security',
    number: '01',
    title: 'Security & Surveillance',
    headline: 'INTELLIGENT PERIMETER DEFENSE & COMMERCIAL IP SURVEILLANCE',
    description:
      'Intelligent security solutions designed to protect commercial properties, institutions, residential developments and business assets.',
    image: '/src/assets/images/security_cctv_deployment_1793582463628.jpg',
    imageAlt: 'Rigid conduit commercial CCTV surveillance camera installed on modern architectural facade',
    services: [
      'CCTV systems (Hikvision and Dahua)',
      'IP surveillance & NVR storage arrays',
      'Access control & biometric readers',
      'Electric fencing & perimeter monitoring',
      'Intruder alarms & motion beam sensors',
      'Smart locks & digital keyless access',
      'Video intercom systems',
      'GPS vehicle tracking & fleet telemetry',
      'Security system integration & central consoles',
    ],
    detailedServices: [
      {
        name: 'Hikvision & Dahua Commercial IP Video Surveillance',
        description:
          'High-definition IP surveillance cameras engineered with optical zoom, AcuSense perimeter tripwires, ColorVu low-light night optics, and RAID-protected Network Video Recorders (NVR) configured for uninterrupted 24/7 evidentiary recording.',
        specs: ['4K Ultra HD & 5MP Starlight Sensors', 'H.265+ Compression Efficiency', 'AcuSense AI Human/Vehicle Classification', 'Secure Off-Site Cloud & NAS Mirroring'],
      },
      {
        name: 'Perimeter Electric Fencing & Boundary Energizers',
        description:
          'High-tensile aluminum and stainless steel multi-strand perimeter fencing driven by Nemtek and Gallagher high-voltage energizers with tamper detection, battery backup, and siren alert integration.',
        specs: ['Multi-Zone Fault Localization', 'Solar-Compatible Battery Buffers', 'Anti-Cut / Short Circuit Triggering', 'Compliant with Energy and Petroleum Regulatory Authority (EPRA) standards'],
      },
      {
        name: 'Biometric Access Control & Turnstiles',
        description:
          'Facial recognition, fingerprint readers, RFID proximity access, and optical pedestrian turnstiles tied to central access control controllers for corporate offices, warehouses, and gated facilities.',
        specs: ['Contactless Face Recognition (<0.2s speed)', 'Anti-Passback Protocols', 'Automated Shift & Payroll Export', 'Time Attendance Logging'],
      },
      {
        name: 'Commercial Smart Locks & Video Intercoms',
        description:
          'Commercial multi-unit IP video intercoms and heavy-duty electromagnetic locking systems integrated with centralized reception monitors and mobile unlock authorization.',
        specs: ['PoE Door Stations', 'Two-Way Noise-Cancelling Audio', 'Fail-Safe / Fail-Secure Magnetic Locks (600lbs–1200lbs)', 'Emergency Fire Alarm Release Override'],
      },
    ],
    architecturalHighlights: [
      'Rigid metallic conduit piping protects all exposed cabling from tampering and weather',
      'Isolated VLAN architecture keeps surveillance video separate from corporate data networks',
      'Centralized equipment racks with rackmount UPS units safeguard against Kenyan grid fluctuations',
    ],
    typicalClients: [
      'Commercial office buildings and business parks',
      'Warehousing and logistics hubs across Kisumu Port & Industrial zones',
      'Hospitals, academic institutions, and secondary campuses',
      'Gated residential developments and hospitality facilities',
    ],
  },
  {
    id: 'automation',
    number: '02',
    title: 'Business Automation',
    headline: 'SEAMLESS POS, ERP AND REAL-TIME BUSINESS MANAGEMENT',
    description:
      'We help businesses improve operational efficiency through integrated management systems, automation and real-time business visibility.',
    image: '/src/assets/images/pos_retail_automation_1793582465220.jpg',
    imageAlt: 'High-end retail Point of Sale touchscreen workstation and receipt hardware in modern commercial store',
    services: [
      'Point of Sale (POS) systems',
      'Restaurant management systems & kitchen displays',
      'Retail management systems & barcode workflows',
      'Multi-branch inventory management',
      'ERP implementation & data migration',
      'ERPNext deployment & customization',
      'Dolibarr ERP & CRM implementation',
      'M-Pesa payment integration (Till / Paybill / STK Push)',
      'KRA eTIMS automated tax compliance integration',
    ],
    detailedServices: [
      {
        name: 'Retail & Supermarket Point of Sale (POS)',
        description:
          'Heavy-duty dual-display touch POS systems, high-speed thermal printers, omnidirectional barcode scanners, cash drawers, and customer-facing displays running fast, offline-resilient checkout software.',
        specs: ['Offline-First Transaction Caching', 'Instant M-Pesa Till / C2B Payment Reconciliation', 'Multi-Cashier Shift Balancing', 'Weighing Scale Serial Interface'],
      },
      {
        name: 'Restaurant & Hospitality Management Systems',
        description:
          'Table-side ordering tablets, Kitchen Display Systems (KDS), split billing, recipe costing, bar inventory tracking, and room charge synchronization for dining establishments and hotels.',
        specs: ['Instant Order-to-Kitchen Routing', 'Ingredient-Level Stock Depletion', 'Waitstaff Gratuity & Shift Reports', 'Room Folio Posting Integration'],
      },
      {
        name: 'KRA eTIMS & M-Pesa Direct API Integrations',
        description:
          'Direct integration of Kenya Revenue Authority electronic Tax Invoice Management System (eTIMS) via Virtual Sales Control Unit (VSCU) / Online Sales Control Unit (OSCU) APIs. Every receipt automatically acquires cryptographic verification and QR code stamping.',
        specs: ['Zero Manual Double-Entry', 'Compliant KRA QR Code Printing', 'Automated STK Push / Instant Payment Notification (IPN)', 'Automated Bank Reconciliations'],
      },
      {
        name: 'Enterprise ERP Implementation (ERPNext & Dolibarr)',
        description:
          'Complete end-to-end ERP deployment uniting procurement, inventory across multiple warehouses, sales, human resources, accounting, and executive reporting into one authoritative system.',
        specs: ['Multi-Branch / Multi-Warehouse Inventory', 'Automated Purchase Requisitions', 'Automated Ledger Balancing', 'Role-Based Access Controls'],
      },
    ],
    architecturalHighlights: [
      'No proprietary vendor lock-in; open standard ERP frameworks tailored to Kenyan statutory workflows',
      'Local database replication ensures stores ring up sales even during telecommunications fiber cuts',
      'Direct integration with Safaricom Daraja API for friction-free customer checkout',
    ],
    typicalClients: [
      'Supermarkets, retail chains, and wholesale distributors',
      'Hotels, restaurants, cafes, and conference centers',
      'Pharmacies, medical clinics, and veterinary suppliers',
      'Manufacturing workshops and agricultural input distributors',
    ],
  },
  {
    id: 'enterprise',
    number: '03',
    title: 'Enterprise Technology',
    headline: 'MISSION-CRITICAL NETWORKING, IT INFRASTRUCTURE & SOFTWARE',
    description:
      'Technology infrastructure and software systems that help organisations operate efficiently, securely and reliably.',
    image: '/src/assets/images/network_datacenter_racks_1793582464826.jpg',
    imageAlt: 'Immaculately dressed enterprise server rack with patch panels and MikroTik routing switches',
    services: [
      'Enterprise resource planning (ERP)',
      'Hospital management systems (HIS / EMR)',
      'Custom business software implementation',
      'IT infrastructure & server deployment',
      'Network engineering & structured cabling',
      'Structured Cat6A / Cat7 cabling & fiber optics',
      'MikroTik routing & firewall configurations',
      'Wireless infrastructure & UniFi Wi-Fi 6/7',
      'Enterprise connectivity & secure VPN tunnels',
    ],
    detailedServices: [
      {
        name: 'Structured Cabling & Fiber Optic Backbones',
        description:
          'TIA/EIA-568-compliant horizontal Cat6A copper cabling, single-mode and multi-mode fiber backbones, patch panels, cable trays, and rack installations certified with calibrated cable analyzers.',
        specs: ['10-Gigabit Certified Channel Performance', 'Color-Coded Tidy Cable Dressing', 'Comprehensive Labeling & Port Mapping', 'Fluke Networks Certification Documentation'],
      },
      {
        name: 'MikroTik Routing, Bandwidth Shaping & Firewalls',
        description:
          'High-performance MikroTik RouterOS deployments featuring multi-ISP load balancing, automated failover, bandwidth allocation policies for executive vs. guest traffic, and encrypted IPsec site-to-site VPN tunnels.',
        specs: ['BGP / OSPF Dynamic Routing', 'Layer 7 Firewall Filtering & Intrusion Prevention', 'Bandwidth Quotas & Content Filtering', 'Encrypted Remote Office Tunnels'],
      },
      {
        name: 'Enterprise High-Density Wi-Fi (Ubiquiti UniFi)',
        description:
          'RF site surveys, predictive heatmapping, and installation of ceiling-mounted Wi-Fi 6/7 access points delivering seamless fast-roaming coverage across campuses, conference facilities, and multi-story offices.',
        specs: ['Fast Roaming (802.11k/r/v)', 'VLAN Segmentation (Corporate / Guest / IoT)', 'Captive Portal / Guest Voucher Authentication', 'Centralized Cloud Console Management'],
      },
      {
        name: 'Hospital Management Systems (HIS) & Clinical Networks',
        description:
          'Deployment of robust hospital information systems encompassing patient triage, electronic health records (EHR), laboratory billing, pharmacy dispensing, and insurance claim tracking.',
        specs: ['HIPAA & Kenyan Data Protection Act Compliance', 'Offline PACS Imaging Archiving', 'Doctor Station Order Entry', 'Automated NHIF/SHA Insurance Claims'],
      },
    ],
    architecturalHighlights: [
      'Zero spaghettification: all cables combed, bundled with velcro, labeled, and mapped to CAD floor plans',
      'Multi-homed internet connections guarantee office operations survive single ISP outages',
      'Strict separation of guest Wi-Fi, financial terminals, and security cameras onto isolated VLANs',
    ],
    typicalClients: [
      'Hospitals and healthcare institutions in Western Kenya',
      'Colleges, universities, and technical training institutes',
      'Regional headquarters, NGOs, and legal/financial firms',
      'Manufacturing plants and agribusiness processing centers',
    ],
  },
  {
    id: 'power',
    number: '04',
    title: 'Power & Infrastructure',
    headline: 'UNINTERRUPTED POWER RESILIENCE & SATELLITE CONNECTIVITY',
    description:
      'Reliable power and connectivity infrastructure designed to support uninterrupted business operations.',
    image: '/src/assets/images/solar_power_resilience_1793582465096.jpg',
    imageAlt: 'Industrial solar hybrid inverter and rackmount lithium battery backup system with clean electrical distribution',
    services: [
      'Commercial solar backup systems',
      'Online double-conversion UPS installations',
      'Grid power resilience & automatic changeovers',
      'Structured electrical infrastructure & distribution',
      'Server room environmental conditioning',
      'Starlink Business high-speed satellite connectivity',
      'Surge protection devices (SPD) & grounding',
      'Infrastructure preventative maintenance',
    ],
    detailedServices: [
      {
        name: 'Commercial Solar Inverters & Lithium (LiFePO4) Battery Banks',
        description:
          'Pure sine wave hybrid inverters paired with high-cycle Lithium Iron Phosphate (LiFePO4) rackmount batteries. Configured for instantaneous transfer time (<10ms) to ensure computers, POS terminals, and servers never reboot during grid outages.',
        specs: ['6,000+ Deep Cycle Battery Life', 'Zero Millisecond Power Sag (<10ms Switchover)', 'Smart BMS Battery Management & Thermal Monitoring', 'Tier-1 High-Efficiency Monocrystalline Solar Arrays'],
      },
      {
        name: 'Server Room Online Double-Conversion UPS Systems',
        description:
          'True online double-conversion rackmount UPS units (APC, Eaton) that continuously regenerate clean AC sine wave power, isolating sensitive network switches and medical hardware from surges, sags, and harmonic noise.',
        specs: ['0ms Transfer Time (Continuous Double Conversion)', 'SNMP Network Monitoring Cards with SMS/Email Alerts', 'Automatic Voltage Regulation (AVR: 160V–280V Range)', 'Hot-Swappable Battery Modules'],
      },
      {
        name: 'Starlink Business Satellite Deployments',
        description:
          'High-performance Starlink Business satellite terminal installation with ruggedized roof mounts, lightning surge protectors, and integration into existing MikroTik routers as primary or automated backup internet.',
        specs: ['Speeds up to 220Mbps with low latency (25–50ms)', 'Automatic Failover Routing during Fiber Cuts', 'Weatherproof Ruggedized Metallic Mounting Hardware', 'Enterprise Priority Satellite Tier'],
      },
      {
        name: 'Industrial Surge Protection & Earth Grounding',
        description:
          'Installation of Type 1 + Type 2 Surge Protective Devices (SPD) on main distribution boards, dedicated copper grounding rods (<5 Ohm resistance), and phase balancing to safeguard expensive hardware.',
        specs: ['Copper Earth Rod Arrays with Soil Conditioning', 'Transient Voltage Surge Suppression (TVSS)', 'Phase Load Balancing Diagnostics', 'Preventative Thermal Imaging Audits'],
      },
    ],
    architecturalHighlights: [
      'Tailored specifically for the electrical realities of Western Kenya where power fluctuations are frequent',
      'Modular battery systems that can expand capacity as the business grows without replacing inverters',
      'Integrated Starlink failover ensures cloud ERP and credit card POS never stall during local ISP downtimes',
    ],
    typicalClients: [
      'Businesses requiring 99.9% uptime (clinics, cold-storage, supermarkets, petrol stations)',
      'Remote agricultural sites, estates, and eco-lodges along Lake Victoria and Western Kenya',
      'Corporate headquarters seeking reduction in generator fuel costs and continuous operations',
      'Educational institutions operating computer labs and administrative servers',
    ],
  },
];

export const WHY_US_REASONS = [
  {
    number: '01',
    title: 'Engineering-led approach',
    description:
      'We do not sell boxed products blindly. Our engineers begin with an exhaustive assessment of your physical environment, operational workflow, and technical bottlenecks before drafting an engineered specification.',
  },
  {
    number: '02',
    title: 'Integrated systems',
    description:
      'We understand how security, networking, software, and power infrastructure interlock. Rather than managing five disconnected contractors, you work with a unified engineering integrator responsible for the entire stack.',
  },
  {
    number: '03',
    title: 'Business-focused solutions',
    description:
      'Our recommendations prioritize operational efficiency, auditability, uptime, and measurable long-term value. Every system we design is built to reduce operational friction and protect capital investments.',
  },
  {
    number: '04',
    title: 'Professional implementation',
    description:
      'We reject shortcut installations. We adhere to rigorous engineering standards: rigid conduits, combed and labeled cables, calibrated torque specifications, verified testing, and formal commissioning documentation.',
  },
  {
    number: '05',
    title: 'Ongoing technical support',
    description:
      'Technology systems require disciplined care. We support the systems we deploy through structured Service Level Agreements (SLAs), preventative maintenance visits, firmware hardening, and responsive technical assistance.',
  },
];

export const REAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Commercial IP Surveillance & Perimeter Defense',
    category: 'Commercial Security',
    location: 'Kisumu Port Industrial Zone, Kisumu',
    clientType: 'Logistics Hub & Freight Terminal',
    challenge:
      'The client operated a 4-acre logistics warehouse facing blind spots, frequent perimeter tampering along boundary walls, and uncoordinated nighttime movements causing inventory discrepancies.',
    solution:
      'Designed and deployed an integrated security system comprising 36 Hikvision 4K IP cameras with AcuSense vehicle classification, a 32-strand Nemtek multi-zone electric fence with silent alarm relays, and an isolated fiber backbone.',
    specifications: [
      '36x Hikvision 4K DarkFighter IP Cameras',
      '64-Channel NVR with 32TB WD Purple RAID-5 Storage Array',
      'Nemtek Druid 28LCD Dual-Zone Energizer with GSM Module',
      'Dual-Operator Security Console with 4K HDMI Matrix',
    ],
    deliverables: [
      'Zero blind spots across loading docks and boundary walls',
      'Instant SMS and audible alerts on fence wire touch or breach',
      '90 days of evidentiary footage backed up securely off-site',
    ],
    image: '/src/assets/images/security_cctv_deployment_1793582463628.jpg',
    year: '2025',
  },
  {
    id: 'proj-2',
    title: 'Multi-Branch POS & KRA eTIMS Retail Automation',
    category: 'Business Automation',
    location: 'Mega City Complex, Kisumu & Kakamega Town',
    clientType: 'Regional Supermarket & Distribution Group',
    challenge:
      'Manual cash register operations led to long checkout queues during peak evening hours, stock leakage across 3 retail outlets, and severe difficulty complying with mandatory KRA eTIMS regulations.',
    solution:
      'Implemented an enterprise Point of Sale solution integrated with ERPNext backend. Configured direct OSCU/VSCU cryptographic eTIMS invoice generation, automated M-Pesa Till reconciliation, and multi-warehouse stock transfers.',
    specifications: [
      '12x Dual-Screen Touchscreen POS Terminals',
      'Direct KRA eTIMS API Integration with QR Code Thermal Printing',
      'Integrated Safaricom Daraja M-Pesa STK Push / Till Verification',
      'Centralized ERPNext Cloud Database on Ubuntu Server',
    ],
    deliverables: [
      'Checkout speed accelerated from 95 seconds to under 22 seconds per customer',
      '100% automated KRA compliance with zero manual bookkeeper intervention',
      'Real-time central visibility of stock levels across all branches from a phone or laptop',
    ],
    image: '/src/assets/images/pos_retail_automation_1793582465220.jpg',
    year: '2025',
  },
  {
    id: 'proj-3',
    title: 'Hospital Network Infrastructure & EMR Deployment',
    category: 'Enterprise Software',
    location: 'Milimani Commercial District, Kisumu',
    clientType: 'Private Multi-Specialty Hospital',
    challenge:
      'The hospital struggled with unmanaged Wi-Fi routers dropping patient electronic records, radiology files stalling on slow links, and lack of electrical protection causing diagnostic PC crashes.',
    solution:
      'Engineered a certified Cat6A structured cabling network across 3 floors, deployed a 42U equipment rack with MikroTik routing, segregated clinical data from guest Wi-Fi via isolated VLANs, and installed an online UPS system.',
    specifications: [
      '148 Certified Cat6A Network Drops (LSZH jacketed)',
      'MikroTik Cloud Core Router CCR2004 with Layer 3 Switching',
      'APC Smart-UPS RT 6kVA Online Double Conversion UPS',
      'Ubuntu Linux Database Server running Hospital Information System',
    ],
    deliverables: [
      'Zero network dropped connections across doctor consultation suites and triage',
      'Sub-second retrieval of high-resolution digital X-rays and ultrasound scans',
      'Clean uninterrupted power conditioning preserving sensitive lab analyzers',
    ],
    image: '/src/assets/images/network_datacenter_racks_1793582464826.jpg',
    year: '2025',
  },
  {
    id: 'proj-4',
    title: 'Solar Power Resilience & Starlink Satellite Failover',
    category: 'Power Solutions',
    location: 'Chemelil Agricultural Corridor, Kisumu County',
    clientType: 'Commercial Agro-Processing Plant',
    challenge:
      'Frequent rural electrical blackouts and frequent overhead fiber cuts paralyzed computerized weighing bridges, dispatch billing, and inventory tracking, incurring costly transport delays.',
    solution:
      'Engineered an off-grid resilient power and connectivity pod: an 8kW pure sine wave hybrid inverter with 15kWh LiFePO4 rack batteries, paired with Starlink Business satellite internet integrated into an automated dual-WAN router.',
    specifications: [
      '8kW Deye Hybrid Pure Sine Wave Inverter',
      '3x 5.12kWh Dyness LiFePO4 Lithium Battery Modules (15.36kWh total)',
      'Starlink Business High-Performance Satellite Terminal',
      'MikroTik Dual-WAN Router with Automated Failover Scripting',
    ],
    deliverables: [
      '24/7 continuous operation of weighbridge, server, and accounting workstations',
      'Seamless 8ms switchover during KPLC power cuts with zero system rebooting',
      'Zero internet downtime even during extensive regional telecommunication breaks',
    ],
    image: '/src/assets/images/solar_power_resilience_1793582465096.jpg',
    year: '2026',
  },
  {
    id: 'proj-5',
    title: 'Hospitality Property Management & High-Density Wi-Fi',
    category: 'Hospitality Technology',
    location: 'Dunga Waterfront, Kisumu',
    clientType: 'Lakeside Conference Resort & Hotel',
    challenge:
      'Guest complaints regarding poor Wi-Fi in lakefront chalets, fragmented billing between restaurant, bar, and front desk, and lack of intercom communication across sprawling resort grounds.',
    solution:
      'Installed an end-to-end hospitality technology ecosystem: outdoor and indoor Ubiquiti UniFi Wi-Fi 6 access points, Dolibarr POS terminals for bars and restaurants, and IP PBX video intercoms.',
    specifications: [
      '18x Ubiquiti UniFi U6-Pro & U6-Mesh Outdoor Access Points',
      'Grandstream UCM6304 IP PBX with 40 Extension Endpoints',
      'Dolibarr Hospitality POS with Multi-Department Billing',
      'Outdoor Armored Single-Mode Fiber Inter-Building Links',
    ],
    deliverables: [
      'High-speed Wi-Fi coverage across 100% of guest rooms, gardens, and conference halls',
      'Single consolidated guest bill upon checkout across dining, bar, and lodging',
      'Crystal-clear digital telephone communication between reception and room service',
    ],
    image: '/src/assets/images/hero_corporate_tech_1793582462732.jpg',
    year: '2026',
  },
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'hospitality',
    title: 'Hospitality & Tourism',
    description:
      'Lakeside resorts, business hotels, and conference venues across Western Kenya require seamless guest Wi-Fi, unified food and beverage billing, robust security, and reliable backup power to protect their brand reputation.',
    keySolutions: ['UniFi High-Density Wi-Fi 6/7', 'Integrated Restaurant POS & KDS', 'IP PBX Intercoms', 'Perimeter CCTV & Access Gates'],
    impactStatement: 'Eliminates fragmented guest billing and guarantees high-speed connectivity across large properties.',
  },
  {
    id: 'retail',
    title: 'Retail & Supermarkets',
    description:
      'High-volume supermarkets, hardware distributors, and retail chains cannot afford checkout delays, inventory discrepancies, or non-compliance with KRA fiscalization requirements.',
    keySolutions: ['Fast Touchscreen POS Terminals', 'Direct KRA eTIMS Integration', 'Multi-Store Inventory Balancing', 'Loss Prevention CCTV Surveillance'],
    impactStatement: 'Cuts checkout queues by over 60% and provides real-time multi-branch stock visibility.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Hospitals',
    description:
      'Clinics, diagnostic centers, and hospitals require reliable patient data access, sterile cable runs, and zero-sag electrical conditioning for sensitive medical diagnostic machines.',
    keySolutions: ['Hospital Information Systems (HIS)', 'Online Double-Conversion UPS', 'Isolated Medical VLAN Networks', 'Facial Biometric Staff Attendance'],
    impactStatement: 'Safeguards multimillion-shilling diagnostic equipment and accelerates clinical decision-making.',
  },
  {
    id: 'commercial',
    title: 'Commercial Properties & Malls',
    description:
      'Property managers and commercial landlords require centralized access control, tenant submetering, vehicle ANPR management, and robust perimeter security to attract quality corporate tenants.',
    keySolutions: ['ANPR Vehicle Gate Control', 'Turnstiles & Biometrics', '4K Boundary Surveillance', 'Tenant Wi-Fi & Structured Cabling'],
    impactStatement: 'Maximizes tenant safety, automates visitor verification, and reduces physical security guard overhead.',
  },
  {
    id: 'education',
    title: 'Education & Universities',
    description:
      'Schools, colleges, and training academies require bandwidth-managed campus networks, computer laboratory installations, library systems, and comprehensive boundary surveillance.',
    keySolutions: ['MikroTik Bandwidth Throttling & Filtering', 'Campus-Wide Fiber Backbones', 'Smart Classroom Audio/Visual', 'Electric Perimeter Fencing'],
    impactStatement: 'Prevents network congestion, blocks unauthorized content, and ensures student safety across campus.',
  },
  {
    id: 'corporate',
    title: 'Corporate Offices & NGOs',
    description:
      'Regional headquarters, legal chambers, financial institutions, and NGOs demand bank-grade cybersecurity, encrypted VPN tunnels between branch offices, and professional boardrooms.',
    keySolutions: ['Encrypted Site-to-Site VPNs', 'Enterprise ERP Systems', 'Boardroom Video Conferencing', 'Clean Power Conditioning'],
    impactStatement: 'Enables confidential inter-office collaboration and guarantees business continuity.',
  },
  {
    id: 'industrial',
    title: 'Industrial & Agribusiness',
    description:
      'Factories, sugar mills, packaging plants, and agricultural processing facilities need ruggedized outdoor cabling, solar-backed telemetry, and Starlink backup internet.',
    keySolutions: ['Solar Power Storage (LiFePO4)', 'Starlink Satellite Failover', 'Harsh-Environment IP67 Surveillance', 'Weighbridge Automation'],
    impactStatement: 'Prevents downtime during grid disruptions and maintains real-time production reporting.',
  },
  {
    id: 'residential',
    title: 'Gated Residential Developments',
    description:
      'Private homeowners, housing estates, and developers requiring unobtrusive high-end smart security, video gate intercoms, perimeter fencing, and solar backup systems.',
    keySolutions: ['Nemtek Electric Fencing', 'Video Intercom with Mobile Access', 'Off-Grid & Hybrid Solar Systems', 'Smart Locks & Alarm Integration'],
    impactStatement: 'Provides peace of mind with verifiable, certified residential security engineering.',
  },
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'article-1',
    title: 'KRA eTIMS Integration Architecture for Retail & Hospitality Systems in Kenya',
    category: 'Business Automation',
    readTime: '6 min read',
    date: 'February 2026',
    summary:
      'A technical guide on integrating Point of Sale (POS) and ERP systems with the Kenya Revenue Authority (KRA) eTIMS OSCU and VSCU APIs to automate compliant fiscal invoicing without manual intervention.',
    author: 'Demi Tech Engineering Team',
    content: [
      'The Kenya Revenue Authority (KRA) mandate requiring all businesses to generate electronic tax invoices via eTIMS has transformed commercial operations. For businesses operating retail stores, supermarkets, or restaurants, relying on manual receipt entry creates immense bottlenecks and risks heavy penalties.',
      'A true systems integration connects your local database directly to the KRA eTIMS server via cryptographic REST APIs. When a cashier tenders a sale, the POS signs the invoice payload using an encrypted device certificate, receives an authorized invoice number and verification URL, and immediately renders the required QR code onto the customer thermal receipt.',
      'Key architectural considerations include offline caching: if the internet connection is disrupted, invoices must be securely queued in local encrypted storage and synchronized sequentially the moment connectivity resumes.',
    ],
    keyTakeaways: [
      'Cryptographic API integration eliminates human error and double entry',
      'Local transaction queues prevent cashier stalls during telecommunication outages',
      'Mandatory QR code and fiscal signatures print in under 1.5 seconds on thermal printers',
    ],
  },
  {
    id: 'article-2',
    title: 'Hikvision vs. Dahua: Architectural Selection for Commercial CCTV in Western Kenya',
    category: 'Security Technology',
    readTime: '8 min read',
    date: 'January 2026',
    summary:
      'An objective engineering comparison between Hikvision and Dahua IP surveillance platforms, analyzing sensor performance in high-humidity Lake Victoria environments and AcuSense AI tripwire reliability.',
    author: 'Demi Tech Security Integrators',
    content: [
      'Selecting an enterprise surveillance platform requires looking beyond megapixel specifications. In Western Kenya, environmental factors such as high humidity near Lake Victoria, dust during dry months, and frequent lightning surges demand ruggedized hardware and thoughtful engineering.',
      'Hikvision AcuSense technology excels in deep learning false-alarm reduction, distinguishing humans and vehicles from animals, swaying trees, and heavy rain with over 98% accuracy. Dahua WizSense and TiOC (Three-in-One Camera) offer powerful active deterrence with built-in red/blue strobes and audible siren triggers.',
      'We recommend rigid metallic conduit (Class 4 galvanized) for all external cable runs to protect against physical vandalism and rodent damage, coupled with certified Type 2 surge protectors at both the camera head and rack switch.',
    ],
    keyTakeaways: [
      'Deep learning classification prevents nuisance alarms caused by birds and weather',
      'Galvanized metallic conduit is mandatory for commercial durability in Kenya',
      'Surge suppression and isolated PoE switches protect expensive NVR chips from grid spikes',
    ],
  },
  {
    id: 'article-3',
    title: 'Deploying Starlink with MikroTik RouterOS for Enterprise Redundancy in Kenya',
    category: 'Networking',
    readTime: '7 min read',
    date: 'March 2026',
    summary:
      'How Kenyan enterprises and remote facilities can leverage Starlink Business satellite connections paired with MikroTik routers for automatic failover during regional fiber breaks.',
    author: 'Demi Tech Network Engineering',
    content: [
      'Terrestrial fiber optics in Kenya provide high bandwidth, but road construction, trenching accidents, and utility pole damage frequently cause extended outages. For commercial entities reliant on cloud ERPs, branch banking, and M-Pesa payments, every hour of downtime means lost revenue.',
      'Deploying Starlink as a secondary WAN link with a MikroTik Cloud Core Router creates a carrier-grade redundant connection. Using MikroTik RouterOS recursive route checking, the router actively pings public DNS addresses via each gateway.',
      'The moment the primary fiber link drops packets, traffic seamlessly shifts to Starlink in under 2 seconds. Non-critical traffic (such as video streaming) can be throttled or blocked on the satellite link to conserve priority data.',
    ],
    keyTakeaways: [
      'Recursive routing detects internet degradation even when local ISP modems remain lit',
      'Under 2-second automated failover keeps active POS and ERP sessions alive',
      'Bandwidth traffic shaping prioritizes critical operational data over satellite links',
    ],
  },
  {
    id: 'article-4',
    title: 'Solar Lithium-Iron (LiFePO4) Sizing for POS & Critical Server Continuity',
    category: 'Power Systems',
    readTime: '5 min read',
    date: 'December 2025',
    summary:
      'Why modern commercial businesses in Kisumu are transitioning from lead-acid batteries to Lithium Iron Phosphate (LiFePO4) rackmount energy storage for zero-downtime operations.',
    author: 'Demi Tech Power Systems Division',
    content: [
      'Traditional lead-acid and tubular gel batteries suffer from short cycle lives (300 to 500 cycles at 50% depth of discharge) and degrade rapidly in ambient African temperatures. In regions where power dips daily, lead-acid systems often fail within 12 to 18 months.',
      'Lithium Iron Phosphate (LiFePO4) batteries provide 6,000+ cycles at 80% depth of discharge, allowing more than 10 years of reliable daily cycling. When paired with high-speed hybrid inverters, transfer times are below 10 milliseconds.',
      'Proper sizing requires calculating continuous baseline wattage of active servers, switches, POS terminals, and emergency lights, ensuring the system sustains operations through customary peak outage durations without generator noise.',
    ],
    keyTakeaways: [
      'LiFePO4 provides 10x the operational lifespan of conventional gel or lead-acid batteries',
      'Sub-10ms transfer times prevent computer and server reboots during grid cuts',
      'Significant reduction in generator diesel consumption and carbon footprint',
    ],
  },
  {
    id: 'article-5',
    title: 'Electric Fencing Compliance & Maintenance in High-Humidity Lake Regions',
    category: 'Security Technology',
    readTime: '6 min read',
    date: 'November 2025',
    summary:
      'Technical standards for electric perimeter security in Kisumu, covering EPRA compliance, earthing arrays, and preventing vegetation short circuits in tropical climates.',
    author: 'Demi Tech Security Engineering',
    content: [
      'Perimeter electric fencing in Kenya must comply strictly with safety regulations enforced by the Energy and Petroleum Regulatory Authority (EPRA). Uncertified installations pose legal liability and physical hazards.',
      'The most common reason for fence failure in Western Kenya is poor earthing. High soil resistivity in rocky or sandy terrain requires an engineered earthing array consisting of multiple copper-bonded rods linked in parallel and treated with bentonite clay.',
      'Proper strain insulators, stainless steel wire selection, and bi-monthly tension adjustments ensure the fence delivers consistent 7,000V to 9,000V non-lethal deterrent shocks without false alarms from moisture-induced leakage.',
    ],
    keyTakeaways: [
      'Compliance with EPRA certification protects property owners from civil liability',
      'Engineered copper earthing arrays ensure full voltage delivery in dry and wet seasons',
      'Zone-specific LCD energizers pinpoint exact locations of boundary tampering',
    ],
  },
  {
    id: 'article-6',
    title: 'ERPNext vs. Dolibarr: Selecting the Right Open-Source ERP for Kenyan SMEs',
    category: 'ERP & POS',
    readTime: '7 min read',
    date: 'October 2025',
    summary:
      'Comparing two dominant open-source enterprise management platforms for Kenyan manufacturing, retail, and service businesses, focusing on customization and local accounting.',
    author: 'Demi Tech Enterprise Solutions',
    content: [
      'Commercial ERP suites from multinational vendors often carry prohibitive annual subscription fees per seat, payable in foreign currency. Open-source enterprise frameworks like ERPNext and Dolibarr provide robust alternatives when implemented by competent systems integrators.',
      'ERPNext is a comprehensive Python/Frappe-based solution with sophisticated multi-tier manufacturing, quality inspection, and human resource management. Dolibarr is exceptionally lightweight, PHP-based, and ideal for trading and distribution companies wanting quick onboarding.',
      'Both platforms can be tailored to generate Kenyan withholding tax schedules, VAT returns, and direct M-Pesa paybill reconciliation, ensuring local commercial compliance.',
    ],
    keyTakeaways: [
      'Eliminates perpetual foreign-currency software licensing fees per user',
      'Custom modules integrate Kenyan payroll (NSSF, NHIF/SHIF, PAYE) and KRA eTIMS',
      'Self-hosted on secure Kenyan or private cloud servers for complete data sovereignty',
    ],
  },
];

export const KENYA_COUNTIES = [
  'Kisumu',
  'Kakamega',
  'Bungoma',
  'Busia',
  'Siaya',
  'Homa Bay',
  'Vihiga',
  'Migori',
  'Kisii',
  'Nyamira',
  'Kericho',
  'Nandi',
  'Uasin Gishu (Eldoret)',
  'Trans Nzoia (Kitale)',
  'Nakuru',
  'Nairobi',
  'Mombasa',
  'Other County in Kenya',
];

export const TECHNICIAN_SPECIALISATIONS = [
  'CCTV & IP Surveillance',
  'Electric Fencing & Boundary Energizers',
  'Access Control & Biometrics',
  'Networking & Structured Cabling',
  'Solar & Electrical Power Systems',
  'GPS Tracking & Fleet Telemetry',
  'POS & Business Systems Deployment',
  'IT Infrastructure & Server Racks',
  'Smart Home & Audio/Visual Systems',
  'Preventative Technical Maintenance',
];

export const COMMON_BRANDS = [
  'Hikvision',
  'Dahua',
  'Nemtek',
  'Gallagher',
  'ZKTeco',
  'MikroTik',
  'Ubiquiti UniFi',
  'Cisco',
  'Starlink',
  'Deye / Sunsynk',
  'Dyness / Pylontech',
  'APC / Schneider Electric',
  'ERPNext / Dolibarr',
];
