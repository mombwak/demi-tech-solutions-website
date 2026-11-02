/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REAL_PROJECTS } from '../data/content.ts';
import { ProjectItem } from '../types.ts';
import { MapPin, Building, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectsPortfolioProps {
  onOpenConsultation: () => void;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Commercial Security',
    'Hospitality Technology',
    'Business Automation',
    'Enterprise Software',
    'Power Solutions',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? REAL_PROJECTS
      : REAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
              Portfolio & Engineering Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
              OUR WORK. OUR EXPERIENCE.
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Real projects engineered across Kisumu, Western Kenya and nationwide. We do not invent arbitrary client claims; every deployment reflects tangible infrastructure, verified solutions and rigorous commissioning.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3.5 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>DISCUSS YOUR PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar (Segmented functional controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 border border-neutral-200 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div>
                {/* Visual */}
                <div className="aspect-[16/10] bg-neutral-900 overflow-hidden relative border-b border-neutral-200">
                  <picture>
                    <source
                      type="image/webp"
                      media="(max-width: 640px)"
                      srcSet={project.image.replace('.jpg', '-mobile.webp')}
                    />
                    <source
                      type="image/webp"
                      srcSet={project.image.replace('.jpg', '.webp')}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-3 left-3 bg-black/85 text-white text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase">
                    {project.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2 group-hover:text-neutral-700 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4 font-medium">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span>Client: {project.clientType}</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">Challenge:</div>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">Solution Implemented:</div>
                    <p className="text-xs text-neutral-800 line-clamp-2 leading-relaxed font-medium">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="text-xs font-bold text-black hover:underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                >
                  <span>VIEW FULL SPECIFICATION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Administrator / Ongoing Project Placeholder as requested */}
          <div className="p-8 border-2 border-dashed border-neutral-300 bg-neutral-50 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                PROJECT RECORD EXPANSION
              </div>
              <h3 className="text-base font-bold text-neutral-700 mb-2">
                Active & Commissioned Site Record Placeholder
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Demi Tech Solutions routinely undertakes proprietary industrial deployments where client non-disclosure agreements apply. Additional case studies are added to this portal upon client authorization.
              </p>
              <div className="text-xs text-neutral-400 font-mono">
                [Status: Maintained by Engineering Administrator]
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="mt-6 w-full py-3 text-xs font-bold tracking-wider text-black bg-white border border-neutral-300 hover:bg-neutral-100 transition-colors"
            >
              REQUEST RELEVANT CASE STUDY REFS
            </button>
          </div>
        </div>
      </div>

      {/* Modal for In-Depth Project Case Study Details */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between border-b border-neutral-200 pb-4 mb-6">
              <div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
                  {activeProjectModal.category} · {activeProjectModal.year}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-black">
                  {activeProjectModal.title}
                </h3>
                <div className="text-xs text-neutral-600 mt-1 font-mono">
                  Location: {activeProjectModal.location} | Sector: {activeProjectModal.clientType}
                </div>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="p-2 text-neutral-500 hover:text-black font-bold text-sm cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="aspect-[16/9] bg-neutral-900 mb-6 overflow-hidden">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-6 text-sm text-neutral-700">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-2">
                  The Engineering Challenge:
                </h4>
                <p className="leading-relaxed bg-neutral-50 p-4 border border-neutral-200">
                  {activeProjectModal.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-2">
                  Engineered Solution:
                </h4>
                <p className="leading-relaxed bg-neutral-50 p-4 border border-neutral-200">
                  {activeProjectModal.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-2">
                  Technical Specifications & Hardware:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProjectModal.specifications.map((spec, i) => (
                    <div key={i} className="text-xs font-mono bg-white p-2.5 border border-neutral-200 flex items-center gap-2">
                      <span className="text-neutral-400">#</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-2">
                  Documented Deliverables & Impact:
                </h4>
                <div className="space-y-2">
                  {activeProjectModal.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  onOpenConsultation();
                }}
                className="px-6 py-3 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors"
              >
                REQUEST SIMILAR SYSTEM DESIGN
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
