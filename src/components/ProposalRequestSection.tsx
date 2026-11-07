/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { EngineeringProposalRequest } from '../types.ts';
import { saveProposalRequest } from '../utils/storage.ts';
import { KENYA_COUNTIES, COMPANY_INFO } from '../data/content.ts';

interface ProposalRequestSectionProps {
  onOpenConsultation: () => void;
}

export const ProposalRequestSection: React.FC<ProposalRequestSectionProps> = ({
  onOpenConsultation,
}) => {
  const [organisation, setOrganisation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Kisumu');
  const [town, setTown] = useState('');
  const [division, setDivision] = useState<EngineeringProposalRequest['division']>('Security & Surveillance');
  const [estimatedScope, setEstimatedScope] = useState('Multi-site commercial facility');
  const [expectedTimeline, setExpectedTimeline] = useState('Within 30–60 days');
  const [budgetRange, setBudgetRange] = useState('KES 1M – KES 5M');
  const [projectDescription, setProjectDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!organisation.trim() || !contactPerson.trim() || !phone.trim() || !projectDescription.trim()) {
      setErrorMsg('Please complete all mandatory fields: Organisation, Contact Person, Phone, and Project Description.');
      return;
    }

    const newProposal: EngineeringProposalRequest = {
      id: `PROP-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      organisation: organisation.trim(),
      contactPerson: contactPerson.trim(),
      phone: phone.trim(),
      email: email.trim(),
      location: `${town.trim() || 'Central'}, ${county}`,
      division,
      estimatedScope,
      expectedTimeline,
      budgetRange,
      projectDescription: projectDescription.trim(),
      status: 'Pending Review',
    };

    saveProposalRequest(newProposal);
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* Header */}
      <section className="bg-black text-white pt-16 pb-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Institutional & Enterprise Procurement
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              REQUEST AN ENGINEERING PROPOSAL.
            </h1>
            <div className="w-16 h-1 bg-white mb-6" />
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              For commercial projects, multi-building institutions, industrial power resilience, and retail automation chains, our engineering desk compiles detailed architectural bills of quantities (BOQ), schematic topologies, and statutory compliance schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Main Workflow Form */}
      <section className="py-16 sm:py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 border border-neutral-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-black mx-auto" />
                <h3 className="text-2xl font-extrabold text-black">
                  Engineering Tender Request Logged
                </h3>
                <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                  Thank you, {contactPerson}. Our senior engineering desk at Demi Tech Solutions has captured the specifications for <strong>{organisation}</strong>. A dedicated systems engineer will contact you directly at {phone} to review your site requirements or schedule a physical technical survey.
                </p>
                <div className="pt-6 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setOrganisation('');
                      setContactPerson('');
                      setPhone('');
                      setEmail('');
                      setProjectDescription('');
                    }}
                    className="px-6 py-3 text-xs font-bold text-white bg-black hover:bg-neutral-800 uppercase tracking-wider"
                  >
                    Submit Another Specification
                  </button>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center gap-2 uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Fast-Track on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Step 1 of 2: Enterprise Credentials
                  </div>
                  <h3 className="text-xl font-extrabold text-black mb-4">
                    Client & Organization Details
                  </h3>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-neutral-100 border-l-4 border-black text-xs font-semibold text-black">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prop-org" className="block text-xs font-bold text-black mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      id="prop-org"
                      type="text"
                      required
                      placeholder="e.g. Imperial Hospitality Group / Mega Mart"
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="prop-contact" className="block text-xs font-bold text-black mb-1">
                      Lead Contact / Procurement Officer *
                    </label>
                    <input
                      id="prop-contact"
                      type="text"
                      required
                      placeholder="e.g. Eng. Denis Ochieng"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prop-phone" className="block text-xs font-bold text-black mb-1">
                      Telephone / WhatsApp Number *
                    </label>
                    <input
                      id="prop-phone"
                      type="tel"
                      required
                      placeholder="e.g. +254 700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="prop-email" className="block text-xs font-bold text-black mb-1">
                      Corporate Email Address
                    </label>
                    <input
                      id="prop-email"
                      type="email"
                      placeholder="e.g. procurement@organization.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prop-county" className="block text-xs font-bold text-black mb-1">
                      Project Site County
                    </label>
                    <select
                      id="prop-county"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      {KENYA_COUNTIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="prop-town" className="block text-xs font-bold text-black mb-1">
                      Town / Specific Commercial Center
                    </label>
                    <input
                      id="prop-town"
                      type="text"
                      placeholder="e.g. Kisumu Central / Kakamega / Milimani"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Step 2 of 2: Technical Scope & Parameters
                  </div>
                  <h3 className="text-xl font-extrabold text-black mb-4">
                    Engineering Division & Specifications
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prop-division" className="block text-xs font-bold text-black mb-1">
                      Primary Engineering Division
                    </label>
                    <select
                      id="prop-division"
                      value={division}
                      onChange={(e) => setDivision(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      <option value="Security & Surveillance">Division 01: Security & Commercial CCTV</option>
                      <option value="Enterprise Software & Automation">Division 02: POS & ERP Business Automation</option>
                      <option value="ICT Infrastructure & Networking">Division 03: Structured Cabling & Networking</option>
                      <option value="Energy & Power Resilience">Division 04: Commercial Solar Backup & UPS</option>
                      <option value="Technology Consulting & Systems Integration">Division 05: Technology Consulting & Systems Integration</option>
                      <option value="Multi-Division Turnkey">Multi-Division Turnkey Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="prop-scope" className="block text-xs font-bold text-black mb-1">
                      Estimated Project Magnitude
                    </label>
                    <select
                      id="prop-scope"
                      value={estimatedScope}
                      onChange={(e) => setEstimatedScope(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      <option value="Single commercial unit / retail branch">Single commercial unit / retail branch</option>
                      <option value="Multi-story office building">Multi-story office building</option>
                      <option value="Hospital / Medical campus">Hospital / Medical campus</option>
                      <option value="Resort / Hotel / Conference center">Resort / Hotel / Conference center</option>
                      <option value="Industrial warehouse / Agro-processing plant">Industrial warehouse / Agro-processing plant</option>
                      <option value="Multi-branch supermarket chain">Multi-branch supermarket chain</option>
                      <option value="Educational campus / Institution">Educational campus / Institution</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prop-timeline" className="block text-xs font-bold text-black mb-1">
                      Anticipated Execution Timeframe
                    </label>
                    <select
                      id="prop-timeline"
                      value={expectedTimeline}
                      onChange={(e) => setExpectedTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      <option value="Immediate (Within 14 days)">Immediate (Within 14 days)</option>
                      <option value="Within 30–60 days">Within 30–60 days</option>
                      <option value="Q1/Q2 Upcoming Financial Cycle">Upcoming Financial Cycle</option>
                      <option value="Architectural planning / Tender phase">Architectural planning / Tender phase</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="prop-budget" className="block text-xs font-bold text-black mb-1">
                      Estimated Target Budget Range (Optional)
                    </label>
                    <select
                      id="prop-budget"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      <option value="Under KES 500,000">Under KES 500,000</option>
                      <option value="KES 500,000 – KES 1,000,000">KES 500,000 – KES 1,000,000</option>
                      <option value="KES 1,000,000 – KES 5,000,000">KES 1,000,000 – KES 5,000,000</option>
                      <option value="KES 5,000,000 – KES 20,000,000">KES 5,000,000 – KES 20,000,000</option>
                      <option value="KES 20,000,000+ Enterprise Contract">KES 20,000,000+ Enterprise Contract</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="prop-desc" className="block text-xs font-bold text-black mb-1">
                    Detailed Engineering Requirements & Site Context *
                  </label>
                  <textarea
                    id="prop-desc"
                    required
                    rows={4}
                    placeholder="Provide details about the existing site infrastructure, number of camera drops, network drops, server room setup, power backup requirements, or software integration goals..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <Lock className="w-4 h-4" />
                    <span>Commercial data stored securely under NDA terms.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>SUBMIT SPECIFICATION FOR PROPOSAL</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
