/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Users, CalendarCheck, Settings, Download, CheckCircle, RefreshCw, MessageSquare, Phone } from 'lucide-react';
import {
  getStoredApplications,
  getStoredConsultations,
  updateApplicationStatus,
  updateConsultationStatus,
  getAdminSettings,
  saveAdminSettings,
  AdminSettings,
} from '../utils/storage.ts';
import { TechnicianApplication, ConsultationBooking } from '../types.ts';
import { KENYA_COUNTIES } from '../data/content.ts';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'consultations' | 'settings'>('applications');
  const [applications, setApplications] = useState<TechnicianApplication[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  const [filterCounty, setFilterCounty] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<TechnicianApplication | null>(null);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  const refreshData = () => {
    setApplications(getStoredApplications());
    setConsultations(getStoredConsultations());
    setSettings(getAdminSettings());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateAppStatus = (id: string, status: TechnicianApplication['status']) => {
    updateApplicationStatus(id, status);
    refreshData();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  const handleUpdateConsStatus = (id: string, status: ConsultationBooking['status']) => {
    updateConsultationStatus(id, status);
    refreshData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSettings(settings);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 2500);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesCounty = filterCounty === 'All' || app.county === filterCounty;
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    return matchesCounty && matchesStatus;
  });

  const exportApplicationsCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'County', 'Town', 'Experience', 'Specialisations', 'Status'];
    const rows = applications.map((a) => [
      a.id,
      a.submittedAt,
      `"${a.fullName}"`,
      a.phoneNumber,
      a.email,
      a.county,
      `"${a.town}"`,
      a.yearsExperience,
      `"${a.specialisations.join(';')}"`,
      a.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DemiTech_Technicians_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-5xl w-full my-6 border border-neutral-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-neutral-800 px-2 py-0.5 text-neutral-300">ADMIN OPS</span>
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
              Demi Tech Management & Dispatch Portal
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh Records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-neutral-100 border-b border-neutral-200 px-6 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'applications'
                  ? 'bg-white text-black border border-neutral-300 shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Technician Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('consultations')}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'consultations'
                  ? 'bg-white text-black border border-neutral-300 shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Consultation Bookings ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-black border border-neutral-300 shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Fee & M-Pesa Settings</span>
            </button>
          </div>

          {activeTab === 'applications' && (
            <button
              onClick={exportApplicationsCSV}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black px-3 py-1 bg-white border border-neutral-300 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 text-xs">
                <div>
                  <span className="font-bold text-neutral-700 mr-2">County:</span>
                  <select
                    value={filterCounty}
                    onChange={(e) => setFilterCounty(e.target.value)}
                    className="px-2 py-1 bg-white border border-neutral-300 text-xs"
                  >
                    <option value="All">All Counties</option>
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 mr-2">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-2 py-1 bg-white border border-neutral-300 text-xs"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Received">Received</option>
                    <option value="Under Verification">Under Verification</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Onboarded">Onboarded</option>
                  </select>
                </div>

                <div className="ml-auto text-neutral-500 font-mono text-[11px]">
                  Showing {filteredApplications.length} of {applications.length} applications
                </div>
              </div>

              {/* Applications List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-3">
                  {filteredApplications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 border border-neutral-200">
                      No technician applications found matching current filter criteria.
                    </div>
                  ) : (
                    filteredApplications.map((app) => {
                      const isSelected = selectedApp?.id === app.id;
                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`p-4 border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-black bg-neutral-50 ring-1 ring-black'
                              : 'border-neutral-200 bg-white hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm text-black">{app.fullName}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-200 text-neutral-800">
                              {app.status}
                            </span>
                          </div>

                          <div className="text-xs text-neutral-600 mb-2 font-mono">
                            {app.town}, {app.county} · {app.yearsExperience} · {app.phoneNumber}
                          </div>

                          <div className="flex flex-wrap gap-1 text-[11px] text-neutral-500">
                            {app.specialisations.slice(0, 3).map((s, idx) => (
                              <span key={idx} className="bg-neutral-100 px-1.5 py-0.5 border border-neutral-200">
                                {s}
                              </span>
                            ))}
                            {app.specialisations.length > 3 && (
                              <span className="text-neutral-400">+{app.specialisations.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Detailed Preview Column */}
                <div className="lg:col-span-5 bg-neutral-50 border border-neutral-300 p-5">
                  {selectedApp ? (
                    <div className="space-y-4 text-xs">
                      <div className="border-b border-neutral-200 pb-3">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">
                          Candidate Details ({selectedApp.id})
                        </div>
                        <h4 className="text-base font-bold text-black">{selectedApp.fullName}</h4>
                        <div className="text-neutral-600 font-mono mt-0.5">
                          {selectedApp.town}, {selectedApp.county}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-neutral-800 block mb-1">Direct Contacts:</span>
                        <div className="flex gap-2">
                          <a
                            href={`tel:${selectedApp.phoneNumber}`}
                            className="px-2.5 py-1.5 bg-white border border-neutral-300 text-black font-semibold flex items-center gap-1.5 hover:bg-neutral-100"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{selectedApp.phoneNumber}</span>
                          </a>
                          <a
                            href={`https://wa.me/${selectedApp.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                              selectedApp.fullName
                            )}%2C%20Demi%20Tech%20Solutions%20engineering%20team%20is%20reviewing%20your%20technician%20application.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-black text-white font-semibold flex items-center gap-1.5 hover:bg-neutral-800"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-neutral-800 block mb-1">Tools & Equipment Owned:</span>
                        <div className="p-2 bg-white border border-neutral-200 text-neutral-700 leading-relaxed">
                          {selectedApp.toolsOwned.join(', ')}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-neutral-800 block mb-1">Brands Familiar With:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedApp.brandsFamiliar.map((b, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-neutral-200 text-neutral-800 text-[11px] font-mono">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-neutral-800 block mb-1">Previous Experience / Sites:</span>
                        <p className="p-2 bg-white border border-neutral-200 text-neutral-700 leading-relaxed">
                          {selectedApp.previousExperience}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-neutral-800 block mb-1">Certifications:</span>
                        <div className="p-2 bg-white border border-neutral-200 font-mono text-[11px] text-neutral-600">
                          {selectedApp.certifications || 'None submitted'}
                        </div>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="pt-3 border-t border-neutral-200">
                        <span className="font-bold text-neutral-800 block mb-2">Update Candidate Status:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleUpdateAppStatus(selectedApp.id, 'Under Verification')}
                            className="px-2 py-1.5 text-[11px] font-bold bg-white border border-neutral-300 hover:bg-neutral-100"
                          >
                            Mark Verifying
                          </button>
                          <button
                            onClick={() => handleUpdateAppStatus(selectedApp.id, 'Shortlisted')}
                            className="px-2 py-1.5 text-[11px] font-bold bg-white border border-neutral-300 hover:bg-neutral-100 text-black"
                          >
                            Mark Shortlisted
                          </button>
                          <button
                            onClick={() => handleUpdateAppStatus(selectedApp.id, 'Onboarded')}
                            className="px-2 py-1.5 text-[11px] font-bold bg-black text-white hover:bg-neutral-800 col-span-2"
                          >
                            ✓ Approve & Onboard into Network
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center text-xs text-neutral-500">
                      Select a technician profile on the left to review tooling, portfolio & contact details.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-600">
                Log of formal client consultation appointments and assessment requests.
              </div>

              <div className="divide-y divide-neutral-200 border border-neutral-200">
                {consultations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-neutral-500">
                    No consultation bookings recorded yet.
                  </div>
                ) : (
                  consultations.map((item) => (
                    <div key={item.id} className="p-5 bg-white space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            {item.id} · {item.createdAt}
                          </div>
                          <h4 className="text-base font-bold text-black">
                            {item.fullName} · {item.organization}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold bg-neutral-100 px-2.5 py-1 border border-neutral-300 text-black">
                            KES {item.consultationFee.toLocaleString()}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 ${
                            item.status === 'Confirmed' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-neutral-600">
                        <div><strong>Phone:</strong> {item.phoneNumber}</div>
                        <div><strong>Location:</strong> {item.location}</div>
                        <div><strong>M-Pesa Code:</strong> {item.mpesaCode}</div>
                      </div>

                      <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
                        <strong>Project Requirement:</strong> {item.projectDescription}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-neutral-500">
                          Method: <strong>{item.consultationMethod}</strong>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateConsStatus(item.id, 'Confirmed')}
                            className="px-3 py-1 text-xs font-semibold bg-black text-white hover:bg-neutral-800"
                          >
                            Mark Confirmed
                          </button>
                          <button
                            onClick={() => handleUpdateConsStatus(item.id, 'Completed')}
                            className="px-3 py-1 text-xs font-semibold bg-neutral-200 text-black hover:bg-neutral-300"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="max-w-xl space-y-6">
              <div>
                <h4 className="text-sm font-bold text-black mb-1">
                  Configurable Consultation Fees (KES)
                </h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Adjust assessment fees according to operational mileage and engineering hours.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Remote Technical Consultation Fee (KES):
                    </label>
                    <input
                      type="number"
                      value={settings.consultationFeeRemote}
                      onChange={(e) => setSettings({ ...settings, consultationFeeRemote: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      On-Site Assessment Fee – Kisumu & Environs (KES):
                    </label>
                    <input
                      type="number"
                      value={settings.consultationFeeLocal}
                      onChange={(e) => setSettings({ ...settings, consultationFeeLocal: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Regional On-Site Survey Fee – Western Kenya (KES):
                    </label>
                    <input
                      type="number"
                      value={settings.consultationFeeRegional}
                      onChange={(e) => setSettings({ ...settings, consultationFeeRegional: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-bold text-black mb-1">
                  M-Pesa Payment Details
                </h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Displayed on the customer consultation checkout dialog.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      M-Pesa Paybill / Till Number:
                    </label>
                    <input
                      type="text"
                      value={settings.mpesaPaybill}
                      onChange={(e) => setSettings({ ...settings, mpesaPaybill: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Account Reference Number:
                    </label>
                    <input
                      type="text"
                      value={settings.mpesaAccount}
                      onChange={(e) => setSettings({ ...settings, mpesaAccount: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {settingsSavedNotice && (
                <div className="p-3 bg-neutral-900 text-white text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>Administrative settings updated successfully.</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors"
              >
                SAVE CONFIGURATION
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
