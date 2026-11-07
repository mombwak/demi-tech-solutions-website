/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  Handshake,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';
import { InvestorEnquiry } from '../types.ts';
import { saveInvestorEnquiry } from '../utils/storage.ts';
import { COMPANY_INFO } from '../data/content.ts';

interface InvestorsSectionProps {
  onOpenConsultation: () => void;
}

export const InvestorsSection: React.FC<InvestorsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [organisation, setOrganisation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [partnershipCategory, setPartnershipCategory] = useState<InvestorEnquiry['partnershipCategory']>('Technology Manufacturer');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const partnershipInterests = [
    'Commercial Security & AI Video Surveillance',
    'POS & Enterprise ERP Automation (eTIMS/Daraja)',
    'Enterprise Networking & Structured Cabling',
    'Commercial Solar & LiFePO4 Power Systems',
    'Western Kenya & Regional Expansion',
    'Authorized Equipment Distribution Dealership',
    'Technician Partner Network Co-Investment',
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!organisation.trim() || !contactPerson.trim() || !email.trim()) {
      setErrorMsg('Please complete all required fields (Organisation, Contact Person, and Email).');
      return;
    }

    const newEnquiry: InvestorEnquiry = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      organisation: organisation.trim(),
      contactPerson: contactPerson.trim(),
      country: country.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website.trim(),
      partnershipCategory,
      areasOfInterest: selectedInterests.length > 0 ? selectedInterests : ['General Strategic Partnership'],
      message: message.trim(),
      status: 'New',
    };

    saveInvestorEnquiry(newEnquiry);
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* Hero Header */}
      <section className="bg-black text-white pt-16 pb-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Corporate Growth & Capital Deployment
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              INVESTORS & STRATEGIC PARTNERS.
            </h1>
            <div className="w-16 h-1 bg-white mb-6" />
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              We collaborate with international technology manufacturers, regional equipment distributors, institutional infrastructure investors, and enterprise software vendors to build resilient technology ecosystems across Kenya and East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Business Overview & Key Fundamentals */}
      <section className="py-16 sm:py-24 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              Corporate Thesis
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-4">
              Institutional Systems Integration in an Accelerating Market
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Kenya’s rapid commercial expansion—spanning hospitality corridors in Western Kenya, healthcare modernization, mandatory statutory digital taxation (KRA eTIMS), and corporate power decentralization—requires disciplined, certified engineering execution. Demi Tech Solutions bridges the gap between global hardware manufacturers and on-the-ground turnkey delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-neutral-200">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Enterprise Positioning</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Headquartered in Kisumu, we occupy an unassailable strategic position across the Lake Victoria economic basin, servicing Kisumu, Kakamega, Bungoma, Busia, Siaya, Homa Bay, and regional commercial nodes.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Corridor: Western Kenya & Nationwide
              </div>
            </div>

            <div className="bg-white p-8 border border-neutral-200">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">Diversified Revenue Streams</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Our model couples capital engineering deployments (turnkey CCTV, structured cabling, solar backup installations) with recurring revenue from maintenance SLAs, POS/ERP subscription support, and M-Pesa integration services.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Structure: Turnkey Capex + Recurring SLAs
              </div>
            </div>

            <div className="bg-white p-8 border border-neutral-200">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-6">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">National Technician Network</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                We are actively building an asset-light, quality-verified network of independent certified technicians across all 47 Kenyan counties, enabling rapid, multi-site rollout capabilities for national clients.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Footprint: 47 Counties Scalable Model
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership Opportunities */}
      <section className="py-16 sm:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Collaboration Tracks
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-12">
            Partnership Frameworks We Welcome
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-neutral-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-black" />
                <h3 className="text-lg font-bold text-black">Technology & Hardware Manufacturers (OEMs)</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                We partner with leading manufacturers of commercial surveillance (Hikvision, Dahua), structured networking (MikroTik, Ubiquiti, CommScope), access control, and solar power equipment looking for authoritative distribution, certified warranty support, and technical installation execution in Kenya.
              </p>
              <ul className="text-xs font-mono text-neutral-700 space-y-2">
                <li>• Authorized Regional System Integrator agreements</li>
                <li>• Certified warranty repair & technical RMA handling</li>
                <li>• Direct enterprise pilot deployments & showcase facilities</li>
              </ul>
            </div>

            <div className="p-8 border border-neutral-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-black" />
                <h3 className="text-lg font-bold text-black">Enterprise Software & FinTech Vendors</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                We integrate third-party enterprise platforms (Hospital Management Systems, ERP solutions, supply chain software) with local hardware endpoints, KRA eTIMS regulatory infrastructure, and Safaricom Daraja M-Pesa automated transaction rails.
              </p>
              <ul className="text-xs font-mono text-neutral-700 space-y-2">
                <li>• Implementation partner for Kenya & East Africa</li>
                <li>• Hardware compatibility certification & onsite provisioning</li>
                <li>• Tier-1 and Tier-2 client SLA support infrastructure</li>
              </ul>
            </div>

            <div className="p-8 border border-neutral-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-black" />
                <h3 className="text-lg font-bold text-black">Clean Energy & Infrastructure Investors</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                Opportunities for co-financing commercial solar backup systems, microgrid resilience, and Energy-as-a-Service (EaaS) installations for supermarkets, hospitals, and agro-processing facilities in Western Kenya.
              </p>
              <ul className="text-xs font-mono text-neutral-700 space-y-2">
                <li>• Commercial power audit & telemetry monitoring</li>
                <li>• High-cycle LiFePO4 battery installation & management</li>
                <li>• Predictable monthly lease and maintenance agreements</li>
              </ul>
            </div>

            <div className="p-8 border border-neutral-200 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Globe2 className="w-6 h-6 text-black" />
                <h3 className="text-lg font-bold text-black">Strategic & Expansion Capital</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                We engage with strategic partners and growth capital providers interested in backing high-margin, defensive technology infrastructure in East Africa with documented corporate governance and verifiable project cash flows.
              </p>
              <ul className="text-xs font-mono text-neutral-700 space-y-2">
                <li>• Working capital for multi-million shilling equipment tenders</li>
                <li>• Technology inventory and bonded logistics hub in Kisumu</li>
                <li>• Rigorous financial accountability and compliance standards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Investor Enquiry Form */}
      <section className="py-16 sm:py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Direct Executive Engagement
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              Initiate a Strategic Partnership or Investment Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              All discussions are treated under strict commercial confidentiality. Our executive leadership will review your inquiry and schedule an introductory technical briefing.
            </p>
          </div>

          <div className="bg-white text-black p-8 sm:p-12 border border-neutral-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-black mx-auto" />
                <h3 className="text-xl font-extrabold text-black">
                  Inquiry Received & Documented
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Demi Tech Solutions. Our leadership team has received your communication and will respond within 24 business hours to arrange an executive dialogue.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setOrganisation('');
                      setContactPerson('');
                      setEmail('');
                      setPhone('');
                      setWebsite('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-neutral-800 uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-neutral-100 border-l-4 border-black text-xs font-semibold text-black">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="inv-org" className="block text-xs font-bold text-black mb-1">
                      Organisation / Institution *
                    </label>
                    <input
                      id="inv-org"
                      type="text"
                      required
                      placeholder="e.g. Hikvision East Africa / Venture Capital Ltd"
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inv-contact" className="block text-xs font-bold text-black mb-1">
                      Contact Person & Title *
                    </label>
                    <input
                      id="inv-contact"
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Mwangi (Head of Partnerships)"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="inv-email" className="block text-xs font-bold text-black mb-1">
                      Corporate Email *
                    </label>
                    <input
                      id="inv-email"
                      type="email"
                      required
                      placeholder="e.g. partnerships@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inv-phone" className="block text-xs font-bold text-black mb-1">
                      Telephone / WhatsApp
                    </label>
                    <input
                      id="inv-phone"
                      type="tel"
                      placeholder="e.g. +254 700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inv-country" className="block text-xs font-bold text-black mb-1">
                      Country of Operation
                    </label>
                    <input
                      id="inv-country"
                      type="text"
                      placeholder="e.g. Kenya / South Africa / UK"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="inv-category" className="block text-xs font-bold text-black mb-1">
                      Partnership Category
                    </label>
                    <select
                      id="inv-category"
                      value={partnershipCategory}
                      onChange={(e) => setPartnershipCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      <option value="Technology Manufacturer">Technology Manufacturer (OEM)</option>
                      <option value="Equipment Distributor">Authorized Equipment Distributor</option>
                      <option value="Software Vendor">Enterprise Software / Cloud Vendor</option>
                      <option value="Infrastructure Investor">Infrastructure / Clean Energy Investor</option>
                      <option value="Institutional Partner">Institutional / Government Partner</option>
                      <option value="Other">Other Strategic Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inv-website" className="block text-xs font-bold text-black mb-1">
                      Corporate Website
                    </label>
                    <input
                      id="inv-website"
                      type="url"
                      placeholder="https://www.company.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-2">
                    Areas of Mutual Strategic Interest
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {partnershipInterests.map((interest) => {
                      const isChecked = selectedInterests.includes(interest);
                      return (
                        <label
                          key={interest}
                          className={`flex items-center gap-2 p-2.5 border cursor-pointer transition-colors ${
                            isChecked ? 'border-black bg-neutral-50 font-bold' : 'border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleInterest(interest)}
                            className="accent-black w-4 h-4"
                          />
                          <span>{interest}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="inv-msg" className="block text-xs font-bold text-black mb-1">
                    Nature of Proposed Partnership / Executive Summary
                  </label>
                  <textarea
                    id="inv-msg"
                    rows={4}
                    placeholder="Briefly describe your firm's proposition, product range, investment mandate, or proposed collaboration model..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs">
                    <Lock className="w-4 h-4" />
                    <span>Protected under strict executive non-disclosure guidelines.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>TRANSMIT EXECUTIVE INQUIRY</span>
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
