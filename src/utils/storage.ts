/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsultationBooking, TechnicianApplication } from '../types.ts';
import { COMPANY_INFO } from '../data/content.ts';

const CONSULTATIONS_KEY = 'demitech_consultations_v1';
const APPLICATIONS_KEY = 'demitech_applications_v1';
const SETTINGS_KEY = 'demitech_admin_settings_v1';

export interface AdminSettings {
  consultationFeeRemote: number;
  consultationFeeLocal: number;
  consultationFeeRegional: number;
  mpesaTill: string;
}

export interface DarajaTemporaryConfig {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  environment: 'sandbox' | 'production';
  simulatorMode: boolean;
}

const DARAJA_TEMP_KEY = 'demitech_daraja_temp_config_v1';

export const DARAJA_SANDBOX_DEFAULTS: DarajaTemporaryConfig = {
  consumerKey: '',
  consumerSecret: '',
  shortcode: '174379',
  passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  environment: 'sandbox',
  simulatorMode: true,
};

export function getStoredDarajaConfig(): DarajaTemporaryConfig {
  try {
    const raw = localStorage.getItem(DARAJA_TEMP_KEY);
    if (!raw) return DARAJA_SANDBOX_DEFAULTS;
    return { ...DARAJA_SANDBOX_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DARAJA_SANDBOX_DEFAULTS;
  }
}

export function saveStoredDarajaConfig(config: DarajaTemporaryConfig): void {
  try {
    localStorage.setItem(DARAJA_TEMP_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Daraja config', err);
  }
}

const DEFAULT_SETTINGS: AdminSettings = {
  consultationFeeRemote: COMPANY_INFO.consultationFeeRemote,
  consultationFeeLocal: COMPANY_INFO.consultationFeeLocal,
  consultationFeeRegional: COMPANY_INFO.consultationFeeRegional,
  mpesaTill: COMPANY_INFO.mpesaTillNumber,
};

const SEED_APPLICATIONS: TechnicianApplication[] = [
  {
    id: 'TECH-2026-081',
    submittedAt: '2026-10-24 14:15',
    fullName: 'Peter Otieno Omondi',
    phoneNumber: '+254 712 345678',
    email: 'p.otieno@gmail.com',
    county: 'Kisumu',
    town: 'Kisumu Central',
    specialisations: ['CCTV & IP Surveillance', 'Electric Fencing & Boundary Energizers', 'Networking & Structured Cabling'],
    yearsExperience: '6 years',
    toolsOwned: ['Fluke Network Tester', 'Crimping Tools & Punch Down', 'Tension Meter for Fencing', 'Heavy Duty SDS Hammer Drill', 'Extension Ladders (Fiberglass)'],
    brandsFamiliar: ['Hikvision', 'Dahua', 'Nemtek', 'MikroTik'],
    previousExperience: '6 years commercial installations in Kisumu Port, Milimani commercial complexes, and private residential compounds. Experience terminating Cat6A and testing Nemtek energizers.',
    availability: 'Immediate',
    fileNameCV: 'Peter_Otieno_Technical_CV.pdf',
    certifications: 'EPRA Certified Electrical Wireman Class C2, Hikvision Certified Security Associate (HCSA)',
    status: 'Shortlisted',
  },
  {
    id: 'TECH-2026-094',
    submittedAt: '2026-10-29 09:30',
    fullName: 'David Wafula Wanyonyi',
    phoneNumber: '+254 722 987654',
    email: 'd.wafula.eng@yahoo.com',
    county: 'Kakamega',
    town: 'Kakamega Town',
    specialisations: ['Solar & Electrical Power Systems', 'IT Infrastructure & Server Racks'],
    yearsExperience: '8 years',
    toolsOwned: ['True-RMS Digital Multimeter', 'Solar PV Clamp Meter', 'Insulated Torque Screwdrivers', 'Hydraulic Cable Lug Crimper'],
    brandsFamiliar: ['Deye / Sunsynk', 'Dyness / Pylontech', 'APC / Schneider Electric'],
    previousExperience: 'Installed over 45 commercial solar hybrid systems and rackmount lithium battery banks across Kakamega, Bungoma, and Busia.',
    availability: 'Project Basis',
    fileNameCV: 'David_Wafula_Solar_Portfolio.pdf',
    certifications: 'NITA Solar Photovoltaic T3 Certified, EPRA Solar Contractor Class V1',
    status: 'Under Verification',
  },
];

const SEED_CONSULTATIONS: ConsultationBooking[] = [
  {
    id: 'CONS-2026-019',
    createdAt: '2026-10-28 11:20',
    fullName: 'James K. Maina',
    organization: 'Lake Basin Agribusiness Ltd',
    phoneNumber: '+254 720 112233',
    email: 'j.maina@lakebasinagro.co.ke',
    location: 'Kisumu, Kibos Industrial Area',
    solutionType: 'Power & Infrastructure + Security',
    projectDescription: 'We require a 15kVA solar backup system with lithium batteries for our processing warehouse, plus 16 IP cameras to eliminate loading dock discrepancies.',
    consultationMethod: 'On-site Consultation (Kisumu & Western Kenya)',
    consultationFee: 5000,
    mpesaCode: 'SK94M8X2PQ',
    status: 'Confirmed',
  },
];

export function getStoredConsultations(): ConsultationBooking[] {
  try {
    const raw = localStorage.getItem(CONSULTATIONS_KEY);
    if (!raw) {
      localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(SEED_CONSULTATIONS));
      return SEED_CONSULTATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_CONSULTATIONS;
  }
}

export function saveConsultation(booking: ConsultationBooking): void {
  try {
    const current = getStoredConsultations();
    const updated = [booking, ...current];
    localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save consultation', err);
  }
}

export function updateConsultationStatus(id: string, status: ConsultationBooking['status']): void {
  try {
    const current = getStoredConsultations();
    const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
    localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update consultation status', err);
  }
}

export function getStoredApplications(): TechnicianApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_APPLICATIONS;
  }
}

export function saveTechnicianApplication(application: TechnicianApplication): void {
  try {
    const current = getStoredApplications();
    const updated = [application, ...current];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save technician application', err);
  }
}

export function updateApplicationStatus(id: string, status: TechnicianApplication['status']): void {
  try {
    const current = getStoredApplications();
    const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update application status', err);
  }
}

export function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save admin settings', err);
  }
}
