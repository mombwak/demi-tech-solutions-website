/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Upload, Wrench } from 'lucide-react';
import { saveTechnicianApplication } from '../utils/storage.ts';
import { TechnicianApplication } from '../types.ts';
import { KENYA_COUNTIES, TECHNICIAN_SPECIALISATIONS, COMMON_BRANDS } from '../data/content.ts';

interface TechnicianApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicianApplicationModal: React.FC<TechnicianApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Kisumu');
  const [town, setTown] = useState('');
  const [selectedSpecialisations, setSelectedSpecialisations] = useState<string[]>([]);
  const [yearsExperience, setYearsExperience] = useState('3-5 years');
  const [toolsOwned, setToolsOwned] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [previousExperience, setPreviousExperience] = useState('');
  const [availability, setAvailability] = useState<TechnicianApplication['availability']>('Immediate');
  const [certifications, setCertifications] = useState('');
  const [fileNameCV, setFileNameCV] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedApp, setSubmittedApp] = useState<TechnicianApplication | null>(null);

  if (!isOpen) return null;

  const toggleSpecialisation = (spec: string) => {
    setSelectedSpecialisations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSimulateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileNameCV(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !fullName.trim() ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !town.trim() ||
      selectedSpecialisations.length === 0 ||
      !toolsOwned.trim() ||
      !previousExperience.trim()
    ) {
      setErrorMsg(
        'Please complete all required fields (Name, Phone, Email, Town, at least 1 Specialisation, Tools Owned, and Past Experience).'
      );
      return;
    }

    const appId = `TECH-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newApp: TechnicianApplication = {
      id: appId,
      submittedAt: formattedDate,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      county,
      town: town.trim(),
      specialisations: selectedSpecialisations,
      yearsExperience,
      toolsOwned: toolsOwned.split(',').map((t) => t.trim()).filter(Boolean),
      brandsFamiliar: selectedBrands,
      previousExperience: previousExperience.trim(),
      availability,
      fileNameCV: fileNameCV || 'Submitted_Profile_Summary.pdf',
      certifications: certifications.trim() || 'Self-Taught / Industry References Provided',
      status: 'Received',
    };

    saveTechnicianApplication(newApp);
    setSubmittedApp(newApp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full my-8 border border-neutral-300 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-black text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-1">
              Demi Tech Solutions · Professional Contractor Network
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">
              Technician Onboarding Application
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Project-based collaboration for verified installers, technicians & systems engineers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close technician modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Success State */}
        {submittedApp ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 bg-neutral-50 border border-neutral-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto mb-3" />
              <h4 className="text-lg font-extrabold text-black mb-1">
                Technician Profile Submitted
              </h4>
              <p className="text-xs text-neutral-600 font-mono">
                Application Tracking ID: <strong className="text-black font-bold">{submittedApp.id}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs bg-white p-5 border border-neutral-200 font-mono">
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">APPLICANT:</span>
                <span className="font-bold text-black">{submittedApp.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">LOCATION:</span>
                <span className="font-bold text-black">{submittedApp.town}, {submittedApp.county}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">EXPERIENCE LEVEL:</span>
                <span className="font-bold text-black">{submittedApp.yearsExperience}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">SPECIALISATIONS:</span>
                <span className="font-bold text-black truncate max-w-[280px]">
                  {submittedApp.specialisations.join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">AVAILABILITY:</span>
                <span className="font-bold text-black">{submittedApp.availability}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">VERIFICATION STATUS:</span>
                <span className="font-bold text-black">{submittedApp.status} (In Queue)</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-100 text-xs text-neutral-700 leading-relaxed">
              <strong>Next Steps:</strong> Our technical operations manager reviews tool checklists and past project references. If your skills match active tenders in {submittedApp.county}, you will receive a phone interview and onboarding agreement.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={`https://wa.me/254703293201?text=Hello%20Demi%20Tech%20Solutions%2C%20I%20have%20submitted%20my%20technician%20network%20application%20${submittedApp.id}%20for%20${encodeURIComponent(
                  submittedApp.fullName
                )}%20in%20${encodeURIComponent(submittedApp.county)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 text-xs font-bold tracking-wider text-center text-white bg-black hover:bg-neutral-800 transition-colors"
              >
                NOTIFY RECRUITMENT ON WHATSAPP
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-neutral-600 border border-neutral-300 hover:bg-neutral-100"
              >
                Close Window
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

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dennis Ochieng"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Active Phone Number (Calls/WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +254 722 123456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. d.ochieng@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>

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
                  Base Town / Trading Centre *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kisumu Central / Kondele"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Specialisations */}
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Technical Specialisation(s) * (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {TECHNICIAN_SPECIALISATIONS.map((spec) => {
                  const isChecked = selectedSpecialisations.includes(spec);
                  return (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => toggleSpecialisation(spec)}
                      className={`p-2 text-left text-xs font-medium border flex items-center gap-2 cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-black bg-neutral-100 text-black font-bold'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-black text-white border-black' : 'border-neutral-300'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span>{spec}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Years of Practical Field Experience *
                </label>
                <select
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                >
                  <option value="1-2 years">1 - 2 years (Junior Technician)</option>
                  <option value="3-5 years">3 - 5 years (Experienced Lead)</option>
                  <option value="6-10 years">6 - 10 years (Senior Specialist)</option>
                  <option value="10+ years">10+ years (Master Technician / Engineer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Dispatch Availability *
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as TechnicianApplication['availability'])}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                >
                  <option value="Immediate">Immediate (On call for active projects)</option>
                  <option value="Within 1 Week">Within 1 Week notice</option>
                  <option value="Weekends / Flexible">Weekends / Flexible schedules</option>
                  <option value="Project Basis">Project Basis (Contract milestone only)</option>
                </select>
              </div>
            </div>

            {/* Tools Owned */}
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Tools & Equipment You Personally Own *
              </label>
              <textarea
                required
                rows={2}
                placeholder="List your testing meters, SDS rotary hammer drill, fiber cleavers, network crimpers, wire strippers, fiberglass ladder, safety harness..."
                value={toolsOwned}
                onChange={(e) => setToolsOwned(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
              />
              <span className="text-[10px] text-neutral-500">
                Separated by commas. Network members must possess adequate personal tools for independent site execution.
              </span>
            </div>

            {/* Brands Familiar With */}
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Hardware Brands & Ecosystems You Confidently Configure:
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {COMMON_BRANDS.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <button
                      type="button"
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-black text-white border-black font-semibold'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-black'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Previous Project Portfolio */}
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Summary of Significant Past Installations / Portfolio *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Briefly state 2-3 recent sites you installed (e.g., 16-cam Hikvision IP setup at a factory, Cat6A cabling at a clinic in Kisumu, solar inverter installation in Kakamega)..."
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
              />
            </div>

            {/* Certifications & Upload Simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Certifications / Licenses (EPRA, NITA, CCNA, HCSA)
                </label>
                <input
                  type="text"
                  placeholder="e.g. EPRA Electrical Wireman Class C2"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Attach CV or Credentials (PDF / Word)
                </label>
                <div className="relative border border-dashed border-neutral-300 p-2 text-center bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleSimulateFile}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-600">
                    <Upload className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="truncate max-w-[180px]">
                      {fileNameCV || 'Select Document'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contractor Disclaimer Acknowledgement */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600">
              By submitting this application, you acknowledge that onboarding into the Demi Tech Professional Network is on an independent contractor / project basis, subject to technical verification.
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>SUBMIT TECHNICIAN APPLICATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
