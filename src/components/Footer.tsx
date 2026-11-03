/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from '../types.ts';
import { COMPANY_INFO, CORE_DIVISIONS } from '../data/content.ts';
import { ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { getPageUrl } from '../utils/navigation.ts';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenAdminPortal,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceCounties = [
    'Kisumu Central & County',
    'Kakamega & Western Corridor',
    'Bungoma & Webuye',
    'Busia & Border Zone',
    'Siaya & Bondo',
    'Homa Bay & Mbita',
    'Vihiga & Luanda',
    'Migori & Isebania',
    'Kisii & Nyamira',
    'Eldoret & North Rift',
    'Nairobi Commercial Hub',
  ];

  return (
    <footer role="contentinfo" className="bg-black text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Wordmark & Core CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 mb-12 border-b border-neutral-800 gap-8">
          <div className="max-w-2xl">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              aria-label="Demi Tech Solutions Home"
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2 block hover:opacity-90"
            >
              DEMI TECH SOLUTIONS
            </a>
            <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
              ENGINEERING INTELLIGENT TECHNOLOGY SYSTEMS.
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg">
              Intelligent security engineering, business automation, enterprise networking, and power infrastructure for businesses, properties, and institutions in Kisumu, Western Kenya and nationwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenConsultation}
              aria-label="Book a Professional Consultation"
              className="px-6 py-3.5 text-xs font-bold tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Demi Tech Solutions WhatsApp Desk"
              className="px-6 py-3.5 text-xs font-bold tracking-wider text-white bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <span>WHATSAPP DESK</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4-Column Grid: Solutions, Navigation, Service Footprint, Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 mb-12 border-b border-neutral-800 text-xs">
          {/* Col 1: Solutions */}
          <nav aria-label="Footer Divisions Navigation">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
              Core Divisions
            </div>
            <ul className="space-y-2.5 text-neutral-300">
              {CORE_DIVISIONS.map((div) => (
                <li key={div.id}>
                  <a
                    href={getPageUrl('solutions')}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('solutions');
                    }}
                    className="hover:text-white transition-colors block text-left"
                  >
                    Division {div.number}: {div.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={getPageUrl('technician-network')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('technician-network');
                  }}
                  className="text-neutral-400 hover:text-white font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Technician Network Onboarding</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 2: Navigation */}
          <nav aria-label="Footer Company Navigation">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-neutral-300">
              <li>
                <a
                  href={getPageUrl('home')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('home');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Home Overview
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('about')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('about');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  About Our Engineering
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('solutions')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('solutions');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Integrated Solutions
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('projects')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('projects');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Projects & Case Studies
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('insights')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('insights');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Insights & Knowledge Base
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('technician-network')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('technician-network');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Join Technician Network
                </a>
              </li>
              <li>
                <a
                  href={getPageUrl('contact')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('contact');
                  }}
                  className="hover:text-white transition-colors block"
                >
                  Contact & Office Info
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 3: Service Areas */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
              Service Locations
            </div>
            <p className="text-neutral-400 mb-3 text-[11px] leading-relaxed">
              Engineering deployment, technical surveys and ongoing SLA support active across:
            </p>
            <div className="grid grid-cols-1 gap-1 text-neutral-300 font-mono text-[11px]">
              {serviceCounties.map((county, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-neutral-600">·</span>
                  <span>{county}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
              Direct Contact
            </div>
            <div className="space-y-3 text-neutral-300 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Kisumu, Kenya (Western Kenya Regional HQ)</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                onClick={onOpenAdminPortal}
                className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Management console for reviewing applications & consultations"
              >
                <Lock className="w-3 h-3" />
                <span>Administrator Ops Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Legals & Compliance */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Demi Tech Solutions. All rights reserved. Registered in Kenya.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-neutral-300 underline underline-offset-2 cursor-pointer"
            >
              Terms of Engagement
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Viewer */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-xl w-full p-6 sm:p-8 border border-neutral-300 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
              <h4 className="text-base font-extrabold uppercase tracking-wide">
                {legalModal === 'privacy' ? 'Privacy Policy & Data Protection' : 'Terms of Engineering Engagement'}
              </h4>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 text-neutral-500 hover:text-black font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-neutral-700 space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Demi Tech Solutions adheres strictly to the Kenya Data Protection Act (2019). Information gathered via consultation booking, site assessment surveys, or technician network applications is utilized solely for technical evaluation, project delivery, and contractual fulfillment.
                  </p>
                  <p>
                    Surveillance camera feeds, network passwords, and enterprise database credentials configured on client premises remain the exclusive property and responsibility of the client upon final commissioning sign-off.
                  </p>
                  <p>
                    We never sell, rent, or lease client or technician contact records to third-party marketing entities.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Scope of Consultations:</strong> Consultations conducted by Demi Tech Solutions are technical advisory and scope assessments. Recommendations provided in formal proposals are valid for 30 calendar days.
                  </p>
                  <p>
                    <strong>2. Contractor Collaboration:</strong> Independent technicians admitted to the Demi Tech Professional Network operate under discrete project subcontract agreements with milestone-based quality assurance prerequisites.
                  </p>
                  <p>
                    <strong>3. Commissioning & Warranty:</strong> Hardware products (Hikvision, Dahua, MikroTik, Solar inverters, LiFePO4 batteries) are backed by official manufacturer warranties alongside Demi Tech installation workmanship guarantees.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-bold bg-black text-white hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
