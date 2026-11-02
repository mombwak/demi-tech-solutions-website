/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Wrench, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { TECHNICIAN_SPECIALISATIONS } from '../data/content.ts';

interface TechnicianNetworkSectionProps {
  onOpenApplication: () => void;
}

export const TechnicianNetworkSection: React.FC<TechnicianNetworkSectionProps> = ({
  onOpenApplication,
}) => {
  const collaborationSteps = [
    { step: '01', title: 'Submit Application', desc: 'Detail your verified experience, tooling inventory, and geographic service counties.' },
    { step: '02', title: 'Technical Review', desc: 'Our engineering supervisors evaluate past installations and brand competencies.' },
    { step: '03', title: 'Skills Verification', desc: 'Shortlisted candidates undergo practical reference checks and standards alignment.' },
    { step: '04', title: 'Professional Onboarding', desc: 'Signed independent contractor agreement, SLA standards briefing, and tool verification.' },
    { step: '05', title: 'Project Dispatch', desc: 'Opportunities dispatched based on technical specialty, geographic location, and availability.' },
    { step: '06', title: 'Milestone Remuneration', desc: 'Fair, transparent milestone payments executed upon certified QA sign-off.' },
  ];

  const requirements = [
    'Demonstrable technical experience on commercial or high-end residential sites',
    'Ownership of professional hand and power tools (meters, crimpers, hammer drills, ladders)',
    'Professional conduct, punctuality, and tidy work ethic (combing cables, vacuuming debris)',
    'Ability to work independently from engineering schematics and cable schedules',
    'Good communication and daily progress reporting to site supervisors',
    'Strict commitment to quality workmanship and Kenyan safety standards',
  ];

  return (
    <section id="technician-network" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Contractor & Specialist Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
            SKILLED. EQUIPPED. READY TO DELIVER.
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6">
            We are building a network of competent technical professionals across Kenya to support the delivery of technology engineering projects.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Are you an experienced technician with your own tools, equipment and practical expertise? Demi Tech Solutions welcomes qualified independent technicians, installers and technical specialists interested in collaborating on projects.
          </p>
        </div>

        {/* Independent Contractor Disclaimer Box */}
        <div className="p-5 bg-neutral-50 border border-neutral-300 mb-14">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-600 leading-relaxed">
              <strong className="text-black font-bold uppercase tracking-wide block mb-1">
                Independent Professional Collaboration Framework:
              </strong>
              Joining the Demi Tech Professional Network is an invitation to collaborate as an independent technical contractor. It does not constitute an offer of permanent employment or guarantee immediate project assignment. Work is contracted and compensated per project milestone under agreed engineering terms.
            </div>
          </div>
        </div>

        {/* 2-Column Split: Specialisations & Criteria */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column: Specialisations Sought */}
          <div className="lg:col-span-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-black font-bold mb-6 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-black" />
              <span>Technical Specialisations In Demand:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TECHNICIAN_SPECIALISATIONS.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-black shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-neutral-900 text-white border border-neutral-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold mb-2">
                Priority Geographic Counties:
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Kisumu, Kakamega, Bungoma, Busia, Siaya, Homa Bay, Vihiga, Migori, Kisii, Eldoret, and Nairobi metropolitan zones.
              </p>
            </div>
          </div>

          {/* Right Column: What We Look For */}
          <div className="lg:col-span-6 bg-neutral-50 p-6 sm:p-8 border border-neutral-200">
            <h3 className="text-sm font-mono uppercase tracking-widest text-black font-bold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-black" />
              <span>What We Look For In Network Technicians:</span>
            </h3>

            <div className="space-y-4 mb-8">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenApplication}
              className="w-full py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>APPLY TO JOIN OUR TECHNICIAN NETWORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Steps: How Collaboration Works */}
        <div className="pt-10 border-t border-neutral-200">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6 font-bold">
            How Collaboration Works:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborationSteps.map((step) => (
              <div key={step.step} className="p-5 bg-white border border-neutral-200">
                <div className="text-xs font-mono font-bold text-neutral-400 mb-1">
                  PHASE {step.step}
                </div>
                <h4 className="text-sm font-bold text-black mb-1">{step.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
