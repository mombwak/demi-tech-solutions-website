/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView = 
  | 'home' 
  | 'about' 
  | 'solutions' 
  | 'projects' 
  | 'insights' 
  | 'technician-network' 
  | 'contact'
  | 'admin';

export type SolutionDivisionId = 
  | 'security' 
  | 'automation' 
  | 'enterprise' 
  | 'power';

export interface ServiceItem {
  name: string;
  description: string;
  specs?: string[];
}

export interface SolutionDivision {
  id: SolutionDivisionId;
  number: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  services: string[];
  detailedServices: ServiceItem[];
  architecturalHighlights: string[];
  typicalClients: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Commercial Security' | 'Hospitality Technology' | 'Business Automation' | 'Enterprise Software' | 'Networking Infrastructure' | 'Power Solutions';
  location: string;
  clientType: string;
  challenge: string;
  solution: string;
  specifications: string[];
  deliverables: string[];
  image: string;
  year: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Security Technology' | 'Business Automation' | 'ERP & POS' | 'Networking' | 'Power Systems' | 'Technology Guides';
  readTime: string;
  date: string;
  summary: string;
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  keySolutions: string[];
  impactStatement: string;
}

export interface ConsultationBooking {
  id: string;
  createdAt: string;
  fullName: string;
  organization: string;
  phoneNumber: string;
  email: string;
  location: string;
  solutionType: string;
  projectDescription: string;
  consultationMethod: 'Remote Consultation' | 'On-site Consultation (Kisumu & Western Kenya)';
  consultationFee: number;
  mpesaCode?: string;
  status: 'Pending Review' | 'Confirmed' | 'Completed';
}

export interface TechnicianApplication {
  id: string;
  submittedAt: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  county: string;
  town: string;
  specialisations: string[];
  yearsExperience: string;
  toolsOwned: string[];
  brandsFamiliar: string[];
  previousExperience: string;
  availability: 'Immediate' | 'Within 1 Week' | 'Weekends / Flexible' | 'Project Basis';
  fileNameCV?: string;
  certifications?: string;
  status: 'Received' | 'Under Verification' | 'Shortlisted' | 'Onboarded';
}
