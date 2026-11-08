/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldAlert, Calendar, Clock, CreditCard } from 'lucide-react';
import { getAdminSettings } from '../utils/storage.ts';

interface ConsultationSectionProps {
  onOpenConsultation: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  onOpenConsultation,
}) => {
  const settings = getAdminSettings();

  const engagementSteps = [
    {
      step: '01',
      title: 'Initial Enquiry',
      desc: 'Submit your project scope, location, and key technical challenges via our consultation booking system.',
    },
    {
      step: '02',
      title: 'Professional Consultation',
      desc: 'A scheduled technical discussion (Remote or On-site) with a lead systems engineer to analyze feasibility.',
    },
    {
      step: '03',
      title: 'Technical Assessment',
      desc: 'Where necessary, physical site survey, RF heatmap, cable route measurements, and electrical power audits.',
    },
    {
      step: '04',
      title: 'Engineering Proposal',
      desc: 'Transparent Bill of Quantities (BOQ), schematic architecture, hardware brands, labor, and delivery timelines.',
    },
    {
      step: '05',
      title: 'Implementation & Commissioning',
      desc: 'Rigid installation, cable testing, firmware hardening, end-user training, and certified commissioning sign-off.',
    },
    {
      step: '06',
      title: 'Ongoing Support',
      desc: 'Structured preventative maintenance, SLA options, and direct technical responsiveness.',
    },
  ];

  return (
    <section id="consultation" className="py-20 sm:py-28 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Commercial Positioning & Engagement Flow */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Professional Engagement Process
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 text-balance">
              EVERY SUCCESSFUL PROJECT STARTS WITH THE RIGHT ASSESSMENT.
            </h2>

            <div className="space-y-4 text-base text-neutral-300 leading-relaxed mb-8">
              <p>
                Technology investments deserve proper planning. Unplanned technology purchases routinely lead to mismatched equipment, security loopholes, and stranded capital.
              </p>
              <p>
                Our professional consultations help businesses and property owners understand their technical requirements, identify suitable solutions and make informed investment decisions before implementation.
              </p>
            </div>

            {/* Commercial Positioning Notice */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 mb-10">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-1">
                    Structured Technical Assessments & Transparent Fees
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                    General project inquiries, capability discussions, and preliminary WhatsApp chats are always <strong>free of charge</strong>. Not every inquiry requires a paid consultation.
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Where a project requires dedicated engineering time—such as an in-depth remote technical architecture review (from KES 2,000) or an on-site physical survey with RF heatmapping, load analysis, and cable measurements—we conduct structured, paid assessments to deliver actionable engineering specifications.
                  </p>
                </div>
              </div>
            </div>

            {/* 6-Step Process */}
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 font-bold">
              Our 6-Step Engineering Methodology:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engagementSteps.map((s) => (
                <div key={s.step} className="p-4 bg-neutral-950/70 border border-neutral-800">
                  <div className="text-xs font-mono font-bold text-neutral-400 mb-1">
                    PHASE {s.step}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{s.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing & Quick Booking Callout */}
          <div className="lg:col-span-5 bg-white text-black p-8 sm:p-10 border border-neutral-200">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              Appointment Scheduling
            </div>
            <h3 className="text-2xl font-extrabold text-black mb-2">
              Book a Technical Consultation
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed mb-6">
              Initial phone and WhatsApp inquiries are free. For in-depth technical evaluations, select your format below.
            </p>

            {/* Fee Tiers */}
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-black uppercase">Remote Technical Consultation</span>
                  <span className="text-sm font-mono font-bold text-black">
                    KES {(settings.consultationFeeRemote ?? 2000).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Zoom / Google Meet or phone review. In-depth technical briefing, scope evaluation, and Bill of Quantities guidance.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-black uppercase">On-Site Assessment (Kisumu)</span>
                  <span className="text-sm font-mono font-bold text-black">
                    KES {(settings.consultationFeeLocal ?? 4000).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Physical visit within Kisumu environs. Precise cable runs, Wi-Fi RF heatmaps & electrical load analysis.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-black uppercase">Regional Assessment (Western Kenya)</span>
                  <span className="text-sm font-mono font-bold text-black">
                    KES {(settings.consultationFeeRegional ?? 7500).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  On-site engineering inspection across Kakamega, Bungoma, Busia, Siaya, Homa Bay, Vihiga, Migori.
                </p>
              </div>
            </div>

            {/* M-Pesa Buy Goods Instructions Briefing */}
            <div className="p-5 bg-neutral-100 border border-neutral-300 text-xs text-neutral-800 mb-8">
              <div className="font-bold text-black flex items-center gap-1.5 font-sans mb-2 text-sm">
                <CreditCard className="w-4 h-4 text-black" />
                <span>Payment Method: M-Pesa Buy Goods</span>
              </div>

              <div className="p-3 bg-white border border-neutral-300 mb-3 text-center">
                <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  M-Pesa Buy Goods Till Number
                </div>
                <div className="text-2xl font-mono font-extrabold text-black tracking-wider my-0.5">
                  5829259
                </div>
                <div className="text-xs font-semibold text-black">
                  Pay via M-Pesa Buy Goods Till Number: 5829259.
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-1 text-xs text-neutral-700 font-medium">
                <li>Select Lipa na M-Pesa.</li>
                <li>Select Buy Goods and Services.</li>
                <li>Enter Till Number: <strong className="text-black font-bold font-mono">5829259</strong>.</li>
                <li>Enter the consultation amount.</li>
                <li>Confirm payment using your M-Pesa PIN.</li>
              </ol>

              <div className="text-[11px] text-neutral-500 pt-3 border-t border-neutral-200 mt-3">
                Instant STK Push online prompt and manual Buy Goods options are available when booking.
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>BOOK YOUR CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
