/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { INDUSTRIES_SERVED } from '../data/content.ts';
import { ArrowUpRight, Check } from 'lucide-react';

interface IndustriesSectionProps {
  onOpenConsultation: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Sectors & Operational Environments
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
            ENGINEERED FOR INDUSTRY REALITIES
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Different operational environments face distinct risks and technological demands. We configure tailored technology stacks addressing the specific regulatory and commercial requirements of each sector.
          </p>
        </div>

        {/* 8 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_SERVED.map((industry) => (
            <div
              key={industry.id}
              className="p-6 bg-neutral-50 border border-neutral-200 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <h3 className="text-base font-bold text-black mb-3">
                  {industry.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                  {industry.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-neutral-200">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold mb-2">
                    Key Systems Deployed:
                  </div>
                  {industry.keySolutions.map((sol, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-800">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span className="font-medium">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <div className="text-[11px] font-mono text-neutral-500 italic mb-3">
                  &ldquo;{industry.impactStatement}&rdquo;
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="text-xs font-bold text-black hover:underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                >
                  <span>REQUEST SECTOR BRIEFING</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
