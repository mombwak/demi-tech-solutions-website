/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { getAdminSettings, saveConsultation } from '../utils/storage.ts';
import { ConsultationBooking } from '../types.ts';
import { KENYA_COUNTIES, COMPANY_INFO } from '../data/content.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const settings = getAdminSettings();

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Kisumu');
  const [town, setTown] = useState('');
  const [solutionType, setSolutionType] = useState('Security & Surveillance');
  const [projectDescription, setProjectDescription] = useState('');
  const [consultationMethod, setConsultationMethod] = useState<
    'Remote Consultation' | 'On-site Consultation (Kisumu & Western Kenya)'
  >('Remote Consultation');
  const [mpesaCode, setMpesaCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);
  const [copiedPaybill, setCopiedPaybill] = useState(false);

  if (!isOpen) return null;

  const currentFee =
    consultationMethod === 'Remote Consultation'
      ? settings.consultationFeeRemote
      : county === 'Kisumu'
      ? settings.consultationFeeLocal
      : settings.consultationFeeRegional;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phoneNumber.trim() || !email.trim() || !town.trim() || !projectDescription.trim()) {
      setErrorMsg('Please complete all required fields (Name, Phone, Email, Town, Project Scope).');
      return;
    }

    const bookingId = `CONS-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newBooking: ConsultationBooking = {
      id: bookingId,
      createdAt: formattedDate,
      fullName: fullName.trim(),
      organization: organization.trim() || 'Private Client / Sole Proprietorship',
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      location: `${town.trim()}, ${county}`,
      solutionType,
      projectDescription: projectDescription.trim(),
      consultationMethod,
      consultationFee: currentFee,
      mpesaCode: mpesaCode.trim().toUpperCase() || 'PAYMENT_PENDING_CONFIRMATION',
      status: mpesaCode.trim() ? 'Confirmed' : 'Pending Review',
    };

    saveConsultation(newBooking);
    setConfirmedBooking(newBooking);
  };

  const copyPaybillInfo = () => {
    navigator.clipboard.writeText(`Paybill: ${settings.mpesaPaybill}, Account: ${settings.mpesaAccount}`);
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full my-8 border border-neutral-300 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-black text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-1">
              Demi Tech Solutions · Engineering Appointment
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">
              Book a Professional Consultation
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Structured technical requirement assessment for enterprises, institutions & properties.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 bg-neutral-50 border border-neutral-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
              <h4 className="text-lg font-extrabold text-black mb-1">
                Consultation Request Received
              </h4>
              <p className="text-xs text-neutral-600 font-mono">
                Reference ID: <strong className="text-black font-bold">{confirmedBooking.id}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs bg-white p-5 border border-neutral-200 font-mono">
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">CLIENT / COMPANY:</span>
                <span className="font-bold text-black">{confirmedBooking.fullName} ({confirmedBooking.organization})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">LOCATION:</span>
                <span className="font-bold text-black">{confirmedBooking.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">SOLUTION CATEGORY:</span>
                <span className="font-bold text-black">{confirmedBooking.solutionType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">METHOD:</span>
                <span className="font-bold text-black">{confirmedBooking.consultationMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">ASSESSMENT FEE:</span>
                <span className="font-bold text-black">KES {confirmedBooking.consultationFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">M-PESA REFERENCE:</span>
                <span className="font-bold text-black">{confirmedBooking.mpesaCode}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Our lead systems engineer will contact you at <strong>{confirmedBooking.phoneNumber}</strong> within business hours to confirm your calendar slot and finalize preliminary documentation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={`https://wa.me/254703293201?text=Hello%20Demi%20Tech%20Solutions%2C%20I%20have%20submitted%20consultation%20booking%20${confirmedBooking.id}%20for%20${encodeURIComponent(
                  confirmedBooking.organization
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 text-xs font-bold tracking-wider text-center text-white bg-black hover:bg-neutral-800 transition-colors"
              >
                CONFIRM VIA WHATSAPP (+254 703 293201)
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-neutral-600 border border-neutral-300 hover:bg-neutral-100"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-neutral-100 border border-neutral-300 text-xs text-black font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eng. Moses Omondi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Company / Property Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Victoria Business Plaza"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Phone Number (Active for WhatsApp/Calls) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +254 712 345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. info@company.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  County *
                </label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Town / Specific Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kisumu Central, Milimani"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Solution Division Required *
              </label>
              <select
                value={solutionType}
                onChange={(e) => setSolutionType(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
              >
                <option value="Security & Surveillance (CCTV, Fencing, Access)">Security & Surveillance (CCTV, Fencing, Access)</option>
                <option value="Business Automation (POS, KRA eTIMS, ERPNext)">Business Automation (POS, KRA eTIMS, ERPNext)</option>
                <option value="Enterprise Technology (Cabling, MikroTik, Wi-Fi 6)">Enterprise Technology (Cabling, MikroTik, Wi-Fi 6)</option>
                <option value="Power & Infrastructure (Solar, UPS, Starlink)">Power & Infrastructure (Solar, UPS, Starlink)</option>
                <option value="Comprehensive Multi-System Turnkey Integration">Comprehensive Multi-System Turnkey Integration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Brief Project Scope & Requirements *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe your property size, number of camera points, current pain points, existing equipment or timeline..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
              />
            </div>

            {/* Preferred Consultation Method */}
            <div>
              <label className="block text-xs font-bold text-black mb-2">
                Preferred Consultation Method *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                    consultationMethod === 'Remote Consultation'
                      ? 'border-black bg-neutral-100'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="consultationMethod"
                      checked={consultationMethod === 'Remote Consultation'}
                      onChange={() => setConsultationMethod('Remote Consultation')}
                      className="text-black"
                    />
                    <span className="text-xs font-bold text-black">Remote Consultation</span>
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">
                    Zoom / Google Meet / Phone · KES {settings.consultationFeeRemote.toLocaleString()}
                  </div>
                </label>

                <label
                  className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                    consultationMethod === 'On-site Consultation (Kisumu & Western Kenya)'
                      ? 'border-black bg-neutral-100'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="consultationMethod"
                      checked={consultationMethod === 'On-site Consultation (Kisumu & Western Kenya)'}
                      onChange={() => setConsultationMethod('On-site Consultation (Kisumu & Western Kenya)')}
                      className="text-black"
                    />
                    <span className="text-xs font-bold text-black">On-Site Technical Survey</span>
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">
                    {county === 'Kisumu' ? `Kisumu: KES ${settings.consultationFeeLocal.toLocaleString()}` : `Regional: KES ${settings.consultationFeeRegional.toLocaleString()}`}
                  </div>
                </label>
              </div>
            </div>

            {/* M-Pesa Instructions Box */}
            <div className="p-4 bg-neutral-50 border border-neutral-300 text-xs text-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-black">M-Pesa Consultation Fee Instructions:</span>
                <button
                  type="button"
                  onClick={copyPaybillInfo}
                  className="text-[11px] font-mono text-black underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedPaybill ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPaybill ? 'Copied' : 'Copy Paybill'}</span>
                </button>
              </div>

              <div className="font-mono text-neutral-800 space-y-0.5">
                <div>1. Go to M-Pesa &gt; Lipa na M-Pesa &gt; Paybill</div>
                <div>2. Business Number: <strong>{settings.mpesaPaybill}</strong></div>
                <div>3. Account Number: <strong>{settings.mpesaAccount}</strong></div>
                <div>4. Amount: <strong>KES {currentFee.toLocaleString()}</strong></div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-200">
                <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                  Enter M-Pesa Transaction Confirmation Code (optional at submission):
                </label>
                <input
                  type="text"
                  placeholder="e.g. SK98MX42LQ"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono uppercase border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
                <span className="text-[10px] text-neutral-500 mt-0.5 block">
                  You can also submit now and confirm transaction details with our dispatch coordinator.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>CONFIRM & BOOK CONSULTATION (KES {currentFee.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
