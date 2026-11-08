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
  | 'investors'
  | 'proposals'
  | 'technician-network' 
  | 'contact'
  | 'admin';

export interface CustomerEnquiry {
  id: string;
  name: string;
  email?: string;
  phone: string;
  county: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface InvestorEnquiry {
  id: string;
  submittedAt: string;
  organisation: string;
  contactPerson: string;
  country: string;
  email: string;
  phone?: string;
  website?: string;
  partnershipCategory: 'Technology Manufacturer' | 'Equipment Distributor' | 'Software Vendor' | 'Infrastructure Investor' | 'Institutional Partner' | 'Other';
  areasOfInterest: string[];
  message: string;
  status: 'New' | 'Under Review' | 'Meeting Scheduled';
}

export interface EngineeringProposalRequest {
  id: string;
  submittedAt: string;
  organisation: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  division: 'Security & Surveillance' | 'Enterprise Software & Automation' | 'ICT Infrastructure & Networking' | 'Energy & Power Resilience' | 'Technology Consulting & Systems Integration' | 'Multi-Division Turnkey';
  estimatedScope: string;
  expectedTimeline: string;
  budgetRange?: string;
  projectDescription: string;
  status: 'Pending Review' | 'Technical Survey Slated' | 'Proposal Drafted';
}

export type SolutionDivisionId = 
  | 'security' 
  | 'automation' 
  | 'enterprise' 
  | 'power'
  | 'consulting';

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
