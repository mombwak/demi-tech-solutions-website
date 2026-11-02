/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CompanyIntroProps {
  onLearnMore: () => void;
  onOpenConsultation: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({
  onLearnMore,
  onOpenConsultation,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Integrated Technology Philosophy
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-8 text-balance">
              TECHNOLOGY SHOULD WORK AS ONE SYSTEM.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              <p>
                At Demi Tech Solutions, we believe technology delivers its greatest value when systems are properly designed, integrated and maintained.
              </p>
              <p>
                From securing commercial properties to automating business operations and deploying enterprise infrastructure, we help organisations build reliable technology environments that support long-term growth.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                onClick={onLearnMore}
                className="px-6 py-3.5 text-xs font-bold tracking-wider text-black bg-white hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>ABOUT DEMI TECH SOLUTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 text-xs font-bold tracking-wider text-white bg-transparent hover:bg-neutral-800 border border-neutral-700 transition-colors cursor-pointer"
              >
                <span>SCHEDULE AN ASSESSMENT</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Highlights */}
          <div className="lg:col-span-5 bg-neutral-950 p-8 sm:p-10 border border-neutral-800">
            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
              Core Engineering Tenets
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Root-Cause Engineering</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    We eliminate recurring technical pain points by diagnosing electrical, structural, and network dependencies before hardware deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Open Architectural Standards</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    We deploy non-proprietary, industry-standard equipment (Hikvision, MikroTik, UniFi, Linux ERP) avoiding predatory vendor lock-ins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Documented Commissioning</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Every project concludes with schematic drawings, port schedules, IP allocations, administrator training, and warranty handovers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>KISUMU ENGINEERING HQ</span>
              <span>EST. KENYA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
