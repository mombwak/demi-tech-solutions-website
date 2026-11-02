/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/content.ts';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreSolutions: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onExploreSolutions,
}) => {
  return (
    <section className="relative bg-white pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                Kisumu, Kenya · Western Kenya · Nationwide Engineering
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-black tracking-tight leading-[1.12] mb-6 text-balance">
                ENGINEERING INTELLIGENT TECHNOLOGY SYSTEMS.
              </h1>

              <div className="w-16 h-1 bg-black mb-6" />

              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-8">
                We design, integrate and maintain intelligent technology solutions for businesses, institutions and properties across Kenya. Our expertise spans security engineering, enterprise systems, business automation and technology infrastructure.
              </p>
            </div>

            {/* CTAs & Secondary Actions */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  onClick={onOpenConsultation}
                  className="px-7 py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm whitespace-nowrap shrink-0"
                >
                  <span>BOOK A PROFESSIONAL CONSULTATION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreSolutions}
                  className="px-7 py-4 text-xs font-bold tracking-wider text-black bg-white hover:bg-neutral-100 border border-neutral-300 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>EXPLORE OUR SOLUTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct WhatsApp Consultation Line */}
              <div className="flex items-center gap-3 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                <span className="font-semibold text-neutral-800">Direct Engineering Desk:</span>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-semibold underline underline-offset-4 hover:text-neutral-700"
                >
                  Talk directly via WhatsApp (+254 703 293201)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural / Infrastructure Visual */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] bg-neutral-900 overflow-hidden relative border border-neutral-200">
              <img
                src="/src/assets/images/hero_corporate_tech_1793582462732.jpg"
                alt="Demi Tech Solutions commercial technology and systems integration facility"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <div className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase mb-1">
                  Technology · Security · Business Infrastructure
                </div>
                <div className="text-sm font-semibold tracking-wide text-neutral-100">
                  Headquartered in Kisumu · Serving Enterprises Nationwide
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Architectural Assurance Strip */}
        <div className="mt-14 pt-10 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-black" />
              <h2 className="text-xs font-bold tracking-wider text-black uppercase">Security Engineering</h2>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Hikvision & Dahua 4K IP CCTV, Nemtek electric fencing, biometric access & perimeter protection.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-black" />
              <h2 className="text-xs font-bold tracking-wider text-black uppercase">Business Automation</h2>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              High-speed POS, inventory control, ERPNext/Dolibarr, direct KRA eTIMS & M-Pesa integration.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-black" />
              <h2 className="text-xs font-bold tracking-wider text-black uppercase">Enterprise Networks</h2>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              TIA/EIA structured Cat6A cabling, MikroTik dynamic routing, high-density UniFi Wi-Fi 6/7.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-black" />
              <h2 className="text-xs font-bold tracking-wider text-black uppercase">Power & Continuity</h2>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              LiFePO4 lithium solar backup, online double-conversion UPS, and Starlink Business failover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
