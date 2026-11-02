/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, MessageSquare, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { COMPANY_INFO, KENYA_COUNTIES } from '../data/content.ts';

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenConsultation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Kisumu');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Location Details */}
          <div className="lg:col-span-5">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Direct Engineering Engagement
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              LET&apos;S DISCUSS YOUR SYSTEM REQUIREMENTS.
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed mb-8">
              Whether you are planning a new commercial security deployment, automating a supermarket checkout chain, or upgrading your institution&apos;s network infrastructure, our engineering desk is ready to assist.
            </p>

            <div className="space-y-5 text-sm font-mono border-t border-neutral-800 pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Headquarters</div>
                  <div className="text-white font-bold">{COMPANY_INFO.name}</div>
                  <div className="text-neutral-400">{COMPANY_INFO.location}</div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-sans">
                    Primary Service Corridor: Kisumu, Kakamega, Bungoma, Busia, Siaya, Homa Bay, Migori, Kisii.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Telephone / Voice</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-white font-bold hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Direct WhatsApp Desk</div>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:underline flex items-center gap-1.5"
                  >
                    <span>+{COMPANY_INFO.phoneRaw}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] text-neutral-400 font-sans block mt-0.5">
                    Fastest response for project inquiries & site coordinates
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Official Email</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-white font-bold hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Web</div>
                  <a
                    href="https://www.demitechsolutions.com"
                    className="text-white font-bold hover:underline"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-4 bg-neutral-950 border border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-neutral-400 font-mono mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>OPERATIONAL HOURS</span>
              </div>
              <div className="text-neutral-300">
                Monday – Saturday: 08:00 – 18:00 (EAT)
              </div>
              <div className="text-neutral-500 text-[11px] mt-0.5">
                Emergency support available 24/7 for contracted SLA clients.
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7 bg-white text-black p-8 sm:p-10 border border-neutral-200">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              Fast-Track Technical Inquiries
            </div>
            <h3 className="text-2xl font-extrabold text-black mb-3">
              Submit a Project Enquiry
            </h3>
            <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
              For rapid evaluation, share your details below. For chargeable on-site physical audits, use our{' '}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="font-bold underline text-black cursor-pointer"
              >
                Formal Consultation Booking Form
              </button>.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-neutral-50 border border-neutral-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h4 className="text-lg font-extrabold text-black">
                  Enquiry Transmitted
                </h4>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Our technical desk in Kisumu has logged your message. An engineer will follow up via phone at {phone} within 4 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-bold bg-black text-white hover:bg-neutral-800"
                  >
                    Submit Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Your Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kelvin Otieno"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@organisation.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Site County
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                    >
                      {KENYA_COUNTIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Describe Your System Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your site, number of buildings, security requirements, POS needs, or current technical challenges..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>SEND PROJECT INQUIRY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Direct WhatsApp Call-out Strip */}
            <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-neutral-600">Need urgent technical assistance?</span>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-black flex items-center gap-1.5 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Instantly via WhatsApp (+254 703 293201)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
