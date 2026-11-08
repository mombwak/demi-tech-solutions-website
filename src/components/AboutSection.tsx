/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Wrench, Layers, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/content.ts';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Corporate Profile & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-6">
            ENGINEERING-FIRST SYSTEMS INTEGRATION.
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
            Demi Tech Solutions is a technology engineering and systems integration company based in Kisumu, Kenya. We design, implement, and maintain integrated technology environments for businesses, commercial properties, and institutions.
          </p>
        </div>

        {/* 2-Column Corporate Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
            <p>
              Too often in East Africa, technology projects suffer from fragmented execution: a security contractor installs cameras without considering network bandwidth; a retail software vendor deploys a POS that loses data during power dips; an electrical contractor mounts a backup system without surge conditioning.
            </p>
            <p className="font-semibold text-black">
              Demi Tech Solutions was established to replace this fragmented model with unified engineering discipline.
            </p>
            <p>
              We treat security, business software, networking infrastructure, and power resilience as interconnected elements of one authoritative system. When your cameras, POS terminals, and servers share a properly engineered foundation, operational friction drops, costs stabilize, and business visibility becomes real.
            </p>

            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <div className="p-4 bg-neutral-50 border border-neutral-300">
                <h3 className="text-xs font-mono uppercase tracking-widest text-black font-bold mb-2">
                  Operating Model: Remote-First. Field-Ready. Customer-Focused.
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                  Professional technology services, delivered around your needs. Demi Tech Solutions operates through a remote-first service model designed around convenience and efficient coordination.
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                  Contact us through WhatsApp, phone or our website to discuss your requirements, request a quotation or book a consultation. For projects requiring physical assessment, installation or maintenance, we arrange scheduled visits and dispatch technical personnel to your location.
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  From your first enquiry to project completion, we coordinate the process and remain your primary point of contact. <strong>All physical appointments are arranged in advance. We do not currently operate a walk-in customer office.</strong>
                </p>
              </div>

              <h3 className="text-xs font-mono uppercase tracking-widest text-black font-bold mb-4">
                What Guides Every Engagement:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">Practical Engineering</h4>
                    <p className="text-xs text-neutral-600">Selecting equipment proven to withstand local voltage fluctuations and environmental realities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">System Integration</h4>
                    <p className="text-xs text-neutral-600">Ensuring disparate hardware and software components communicate through standardized protocols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">Technical Transparency</h4>
                    <p className="text-xs text-neutral-600">Zero hidden costs, detailed Bills of Quantities, and open architectural standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">Long-Term Partnership</h4>
                    <p className="text-xs text-neutral-600">Disciplined maintenance agreements that protect capital investments across years of operation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Geographic & Corporate Summary Box */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-8 sm:p-10 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>Service Delivery & Coverage</span>
            </div>

            <div className="space-y-4 mb-8 text-xs font-mono">
              <div className="py-2 border-b border-neutral-800">
                <div className="text-neutral-500 uppercase text-[10px]">Operating Model</div>
                <div className="text-sm font-bold text-white mt-0.5">Remote-First · Field-Ready</div>
                <div className="text-[11px] text-neutral-400 font-sans mt-0.5">
                  Scheduled physical visits dispatched across client locations. No walk-in showroom.
                </div>
              </div>

              <div className="py-2 border-b border-neutral-800">
                <div className="text-neutral-500 uppercase text-[10px]">Primary Regional Corridor</div>
                <div className="text-neutral-200 mt-0.5">
                  Kisumu, Kakamega, Bungoma, Busia, Siaya, Homa Bay, Vihiga, Migori, Kisii
                </div>
              </div>

              <div className="py-2 border-b border-neutral-800">
                <div className="text-neutral-500 uppercase text-[10px]">National Coverage</div>
                <div className="text-neutral-200 mt-0.5">
                  Serving Kisumu, Western Kenya and businesses across Kenya, subject to project location and technical availability.
                </div>
              </div>

              <div className="py-2">
                <div className="text-neutral-500 uppercase text-[10px]">Consultation Protocol</div>
                <div className="text-neutral-200 mt-0.5">
                  Initial reviews conducted remotely; on-site audits scheduled by advance appointment.
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-3.5 text-xs font-bold tracking-wider text-black bg-white hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SCHEDULE A TECHNICAL CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
