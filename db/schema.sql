-- =============================================================================
-- DEMI TECH SOLUTIONS - PRODUCTION DATABASE SCHEMA (MySQL / MariaDB)
-- Target Environment: cPanel / phpMyAdmin / Enterprise LAMP Stack
-- Charset: utf8mb4 | Collation: utf8mb4_unicode_ci | Storage Engine: InnoDB
-- Generated: 2026-11-03
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. Table: consultation_bookings
-- Tracks client appointments and consultation fee payments (Buy Goods 5829259)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultation_bookings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_ref` VARCHAR(32) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `company_name` VARCHAR(150) DEFAULT NULL,
  `county` VARCHAR(64) NOT NULL DEFAULT 'Kisumu',
  `town` VARCHAR(64) DEFAULT NULL,
  `service_category` VARCHAR(100) NOT NULL,
  `preferred_date` DATE NOT NULL,
  `preferred_time` VARCHAR(32) NOT NULL,
  `consultation_fee` DECIMAL(10,2) NOT NULL DEFAULT 2500.00,
  `currency` VARCHAR(8) NOT NULL DEFAULT 'KES',
  `payment_status` ENUM('PENDING', 'PAID', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  `payment_method` VARCHAR(32) NOT NULL DEFAULT 'M-PESA',
  `mpesa_receipt_number` VARCHAR(32) DEFAULT NULL,
  `checkout_request_id` VARCHAR(64) DEFAULT NULL,
  `client_notes` TEXT DEFAULT NULL,
  `internal_notes` TEXT DEFAULT NULL,
  `assigned_engineer` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_booking_ref` (`booking_ref`),
  KEY `idx_booking_phone` (`phone`),
  KEY `idx_booking_status` (`payment_status`),
  KEY `idx_booking_date` (`preferred_date`),
  KEY `idx_booking_checkout` (`checkout_request_id`),
  KEY `idx_booking_receipt` (`mpesa_receipt_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. Table: mpesa_transactions
-- Safaricom Daraja STK Push and Buy Goods payment reconciliation ledger
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mpesa_transactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `checkout_request_id` VARCHAR(64) NOT NULL,
  `merchant_request_id` VARCHAR(64) NOT NULL,
  `phone_number` VARCHAR(32) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(8) NOT NULL DEFAULT 'KES',
  `till_number` VARCHAR(32) NOT NULL DEFAULT '5829259',
  `account_reference` VARCHAR(64) DEFAULT 'DEMI-TECH',
  `status` ENUM('PENDING', 'SUCCESS', 'CANCELLED', 'FAILED', 'TIMED_OUT') NOT NULL DEFAULT 'PENDING',
  `result_code` INT DEFAULT NULL,
  `result_desc` VARCHAR(255) DEFAULT NULL,
  `mpesa_receipt_number` VARCHAR(32) DEFAULT NULL,
  `transaction_date` VARCHAR(32) DEFAULT NULL,
  `is_simulated` TINYINT(1) NOT NULL DEFAULT 0,
  `raw_callback_payload` LONGTEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tx_checkout` (`checkout_request_id`),
  KEY `idx_tx_receipt` (`mpesa_receipt_number`),
  KEY `idx_tx_phone` (`phone_number`),
  KEY `idx_tx_status` (`status`),
  KEY `idx_tx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. Table: engineering_proposals
-- Formal RFP / tender requests for high-value contracts (KES 1M - 20M+)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `engineering_proposals` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `proposal_ref` VARCHAR(32) NOT NULL,
  `organization_name` VARCHAR(200) NOT NULL,
  `contact_person` VARCHAR(150) NOT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `official_email` VARCHAR(191) NOT NULL,
  `official_phone` VARCHAR(32) NOT NULL,
  `project_location` VARCHAR(150) NOT NULL,
  `project_category` VARCHAR(100) NOT NULL,
  `estimated_budget_range` VARCHAR(100) NOT NULL,
  `tender_type` ENUM('PUBLIC_TENDER', 'DIRECT_CORPORATE_PROCUREMENT', 'PRIVATE_COMMERCIAL', 'INSTITUTIONAL_UPGRADE') NOT NULL DEFAULT 'DIRECT_CORPORATE_PROCUREMENT',
  `scope_summary` TEXT NOT NULL,
  `technical_requirements` TEXT DEFAULT NULL,
  `target_commencement_date` VARCHAR(64) DEFAULT NULL,
  `rfp_document_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('NEW', 'UNDER_REVIEW', 'SITE_SURVEY_SCHEDULED', 'PROPOSAL_SUBMITTED', 'NEGOTIATION', 'CONTRACT_AWARDED', 'DECLINED') NOT NULL DEFAULT 'NEW',
  `assigned_lead_engineer` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_proposal_ref` (`proposal_ref`),
  KEY `idx_prop_org` (`organization_name`),
  KEY `idx_prop_status` (`status`),
  KEY `idx_prop_category` (`project_category`),
  KEY `idx_prop_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. Table: investor_enquiries
-- Capital allocation, equity inquiries, and OEM manufacturing partnerships
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `investor_enquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `inquiry_ref` VARCHAR(32) NOT NULL,
  `representative_name` VARCHAR(150) NOT NULL,
  `institution_name` VARCHAR(200) DEFAULT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `investor_category` VARCHAR(100) NOT NULL,
  `investment_horizon` VARCHAR(64) NOT NULL,
  `strategic_interest_area` VARCHAR(150) NOT NULL,
  `discussion_notes` TEXT NOT NULL,
  `nda_status` ENUM('NONE', 'REQUESTED', 'EXECUTED') NOT NULL DEFAULT 'NONE',
  `status` ENUM('NEW', 'CONTACTED', 'EXECUTIVE_BRIEFING_SCHEDULED', 'DATA_ROOM_OPEN', 'CLOSED') NOT NULL DEFAULT 'NEW',
  `executive_owner` VARCHAR(150) DEFAULT 'Managing Director',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_investor_ref` (`inquiry_ref`),
  KEY `idx_investor_email` (`email`),
  KEY `idx_investor_status` (`status`),
  KEY `idx_investor_category` (`investor_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. Table: customer_enquiries
-- General contact messages and inbound service requests
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer_enquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `enquiry_ref` VARCHAR(32) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `county` VARCHAR(64) NOT NULL DEFAULT 'Kisumu',
  `service` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `budget_range` VARCHAR(100) DEFAULT NULL,
  `timeline` VARCHAR(64) DEFAULT NULL,
  `status` ENUM('NEW', 'CONTACTED', 'RESOLVED', 'SPAM') NOT NULL DEFAULT 'NEW',
  `source_channel` VARCHAR(32) NOT NULL DEFAULT 'WEBSITE',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_enquiry_ref` (`enquiry_ref`),
  KEY `idx_enq_status` (`status`),
  KEY `idx_enq_phone` (`phone`),
  KEY `idx_enq_county` (`county`),
  KEY `idx_enq_service` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. Table: technician_applications
-- Nationwide certified field engineer and installer onboarding applications
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `technician_applications` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `application_ref` VARCHAR(32) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `id_number` VARCHAR(32) NOT NULL,
  `phone_number` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `primary_county` VARCHAR(64) NOT NULL,
  `primary_town` VARCHAR(64) NOT NULL,
  `years_experience` INT NOT NULL DEFAULT 1,
  `primary_skills` TEXT NOT NULL,
  `certifications` TEXT DEFAULT NULL,
  `equipment_owned` TEXT DEFAULT NULL,
  `transport_means` VARCHAR(64) DEFAULT NULL,
  `status` ENUM('SUBMITTED', 'UNDER_VETTING', 'INTERVIEW_SCHEDULED', 'BACKGROUND_CHECK', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'SUBMITTED',
  `vetting_score` INT DEFAULT NULL,
  `vetting_notes` TEXT DEFAULT NULL,
  `police_clearance_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tech_ref` (`application_ref`),
  KEY `idx_tech_phone` (`phone_number`),
  KEY `idx_tech_county` (`primary_county`),
  KEY `idx_tech_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 7. Table: administrator_accounts
-- Role-based access control (Superadmin, Senior Engineer, Procurement, Auditor)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `administrator_accounts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN', 'CHIEF_ENGINEER', 'PROCUREMENT_OFFICER', 'FINANCE_CONTROLLER', 'AUDITOR') NOT NULL DEFAULT 'SUPER_ADMIN',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `two_factor_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `two_factor_secret` VARCHAR(128) DEFAULT NULL,
  `last_login_at` DATETIME DEFAULT NULL,
  `last_login_ip` VARCHAR(45) DEFAULT NULL,
  `failed_login_attempts` INT NOT NULL DEFAULT 0,
  `locked_until` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_username` (`username`),
  UNIQUE KEY `uq_admin_email` (`email`),
  KEY `idx_admin_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 8. Table: audit_logs
-- Immutable security audit trail of privileged operations
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` BIGINT UNSIGNED DEFAULT NULL,
  `action_type` VARCHAR(64) NOT NULL,
  `entity_type` VARCHAR(64) NOT NULL,
  `entity_id` VARCHAR(64) NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `details_json` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_admin` (`admin_id`),
  KEY `idx_audit_action` (`action_type`),
  KEY `idx_audit_entity` (`entity_type`, `entity_id`),
  KEY `idx_audit_created` (`created_at`),
  CONSTRAINT `fk_audit_admin` FOREIGN KEY (`admin_id`) REFERENCES `administrator_accounts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------------------
-- SEED INITIAL SYSTEM ADMINISTRATOR (Demo / First Provisioning)
-- Password for initial login: Replace immediately after importing!
-- Default hash corresponds to standard production password structure.
-- -----------------------------------------------------------------------------
INSERT INTO `administrator_accounts` (`id`, `username`, `email`, `password_hash`, `role`, `is_active`)
VALUES (1, 'admin_demitech', 'admin@demitechsolutions.com', '$2y$12$e7k11X10zZf9U3mG0L9nbeW7YyP1rL.QW3lX3M6u7O8p5K9Z1N2bC', 'SUPER_ADMIN', 1)
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);
