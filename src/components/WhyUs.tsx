/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WHY_US_REASONS } from '../data/content.ts';

export const WhyUs: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Why Work With Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
            ENGINEERED WITH PURPOSE. DELIVERED WITH PRECISION.
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            We avoid exaggerated marketing rhetoric. Our reputation in Kisumu, Western Kenya and across the country is earned through methodological technical delivery, transparent specifications, and engineering accountability.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_REASONS.map((reason, index) => (
            <div
              key={reason.number}
              className={`p-8 bg-white border border-neutral-200 relative ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="text-2xl font-mono font-bold text-neutral-300 mb-4">
                {reason.number}
              </div>

              <h3 className="text-lg font-bold text-black mb-3">
                {reason.title}
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}

          {/* Standards & Compliance Callout */}
          <div className="p-8 bg-neutral-900 text-white border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                Industry Compliance
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Certified Engineering Standards
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                EPRA-certified electric fencing installations, TIA/EIA-568-C structured cabling, and KRA-verified eTIMS cryptographic integration protocols.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
              ZERO-COMPROMISE WORKMANSHIP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
