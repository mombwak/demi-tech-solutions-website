/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CompanyIntro } from './components/CompanyIntro.tsx';
import { CoreSolutions } from './components/CoreSolutions.tsx';
import { WhyUs } from './components/WhyUs.tsx';
import { ProjectsPortfolio } from './components/ProjectsPortfolio.tsx';
import { ConsultationSection } from './components/ConsultationSection.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { TechnicianNetworkSection } from './components/TechnicianNetworkSection.tsx';
import { TechnicianApplicationModal } from './components/TechnicianApplicationModal.tsx';
import { IndustriesSection } from './components/IndustriesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { InsightsSection } from './components/InsightsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminPortalModal } from './components/AdminPortalModal.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [technicianModalOpen, setTechnicianModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Sync browser back/forward buttons or hash if needed
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (['home', 'about', 'solutions', 'projects', 'insights', 'technician-network', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans antialiased selection:bg-black selection:text-white">
      {/* Sticky Architectural Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      {/* Main Content Area Routed by PageView */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              onOpenConsultation={() => setConsultationModalOpen(true)}
              onExploreSolutions={() => handleNavigate('solutions')}
            />
            <CompanyIntro
              onLearnMore={() => handleNavigate('about')}
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <CoreSolutions
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <WhyUs />
            <ProjectsPortfolio
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <TechnicianNetworkSection
              onOpenApplication={() => setTechnicianModalOpen(true)}
            />
            <IndustriesSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <InsightsSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'about' && (
          <>
            <AboutSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <CompanyIntro
              onLearnMore={() => handleNavigate('solutions')}
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <WhyUs />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'solutions' && (
          <>
            <CoreSolutions
              isStandalonePage={true}
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <IndustriesSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'projects' && (
          <>
            <ProjectsPortfolio
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'insights' && (
          <>
            <InsightsSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'technician-network' && (
          <>
            <TechnicianNetworkSection
              onOpenApplication={() => setTechnicianModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <ContactSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
            <ConsultationSection
              onOpenConsultation={() => setConsultationModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Corporate Architectural Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => setConsultationModalOpen(true)}
        onOpenAdminPortal={() => setAdminModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      <TechnicianApplicationModal
        isOpen={technicianModalOpen}
        onClose={() => setTechnicianModalOpen(false)}
      />

      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloatingButton />
    </div>
  );
}
