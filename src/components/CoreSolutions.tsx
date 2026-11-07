/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CORE_DIVISIONS } from '../data/content.ts';
import { SolutionDivisionId } from '../types.ts';
import { ArrowUpRight, Check, ArrowRight, Shield, Cpu, Network, Zap, Compass } from 'lucide-react';

interface CoreSolutionsProps {
  initialDivision?: SolutionDivisionId;
  onOpenConsultation: () => void;
  isStandalonePage?: boolean;
}

export const CoreSolutions: React.FC<CoreSolutionsProps> = ({
  initialDivision = 'security',
  onOpenConsultation,
  isStandalonePage = false,
}) => {
  const [activeDivisionId, setActiveDivisionId] = useState<SolutionDivisionId>(initialDivision);

  const activeDivision = CORE_DIVISIONS.find((d) => d.id === activeDivisionId) || CORE_DIVISIONS[0];

  const getDivisionIcon = (id: SolutionDivisionId) => {
    switch (id) {
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'automation':
        return <Cpu className="w-4 h-4" />;
      case 'enterprise':
        return <Network className="w-4 h-4" />;
      case 'power':
        return <Zap className="w-4 h-4" />;
      case 'consulting':
        return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <section id="solutions" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Core Engineering Divisions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
            INTEGRATED TECHNOLOGY SOLUTIONS
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            We structure our capabilities across five disciplined engineering divisions, ensuring every aspect of your physical security, enterprise software, IT connectivity, electrical continuity, and strategic integration operates reliably.
          </p>
        </div>

        {/* Division Tab Switcher (Segmented functional controls) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-neutral-100 mb-12 border border-neutral-200">
          {CORE_DIVISIONS.map((division) => {
            const isActive = activeDivisionId === division.id;
            return (
              <button
                key={division.id}
                onClick={() => setActiveDivisionId(division.id)}
                className={`py-3.5 px-4 text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-700 hover:text-black hover:bg-neutral-200/70'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75">{division.number}.</span>
                <span>{division.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Division Showcase Card */}
        <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-10 lg:p-12 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Headline, Description & Service Checklist */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase mb-3">
                  {getDivisionIcon(activeDivision.id)}
                  <span>Division {activeDivision.number} // {activeDivision.title}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-4 leading-tight">
                  {activeDivision.headline}
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-8">
                  {activeDivision.description}
                </p>

                {/* Service Items Grid */}
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 mb-4 font-bold">
                  Core Engineering Capabilities:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {activeDivision.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                      <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{service}</span>
                    </div>
                  ))}
                </div>

                {/* Architectural Highlights */}
                <div className="bg-white p-5 border border-neutral-200 mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-black font-bold mb-3">
                    Architectural Standards & Engineering Rigor:
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    {activeDivision.architecturalHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-black font-bold">·</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-200">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3.5 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>BOOK CONSULTATION FOR {activeDivision.title.toUpperCase()}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: High-Resolution Installation Photo & Technical Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative border border-neutral-200">
                <picture>
                  <source
                    type="image/webp"
                    media="(max-width: 640px)"
                    srcSet={activeDivision.image.replace('.jpg', '-mobile.webp')}
                  />
                  <source
                    type="image/webp"
                    srcSet={activeDivision.image.replace('.jpg', '.webp')}
                  />
                  <img
                    src={activeDivision.image}
                    alt={activeDivision.imageAlt}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                  <div className="uppercase tracking-widest text-neutral-300">Installed by Demi Tech</div>
                  <div className="text-neutral-100 font-sans text-xs mt-0.5 font-semibold">
                    {activeDivision.imageAlt}
                  </div>
                </div>
              </div>

              {/* Typical Deployment Context */}
              <div className="p-5 bg-white border border-neutral-200">
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
                  Typical Commercial Environments
                </div>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {activeDivision.typicalClients.map((client, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black shrink-0" />
                      <span>{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deep-Dive Technical Specifications accordion/breakdown if on standalone page or inspection */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h4 className="text-xs font-mono uppercase tracking-widest text-black font-bold mb-6">
              Detailed System Modules & Specifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDivision.detailedServices.map((det, idx) => (
                <div key={idx} className="p-5 bg-white border border-neutral-200">
                  <h5 className="text-sm font-bold text-black mb-2">{det.name}</h5>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">{det.description}</p>
                  {det.specs && (
                    <div className="space-y-1 pt-3 border-t border-neutral-100">
                      {det.specs.map((sp, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-neutral-500 font-mono flex items-center gap-1.5">
                          <span className="text-neutral-400">›</span>
                          <span>{sp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Divisions Overview Cards (Quick jump anchors) */}
        {!isStandalonePage && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_DIVISIONS.map((div) => (
              <div
                key={div.id}
                onClick={() => {
                  setActiveDivisionId(div.id);
                  const el = document.getElementById('solutions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-6 border transition-all cursor-pointer ${
                  activeDivisionId === div.id
                    ? 'border-black bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white hover:border-black text-black'
                }`}
              >
                <div className="text-xs font-mono mb-2 opacity-70">DIVISION {div.number}</div>
                <h4 className="text-base font-bold mb-2">{div.title}</h4>
                <p className={`text-xs mb-4 line-clamp-2 ${activeDivisionId === div.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {div.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span>EXPLORE {div.title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
