/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from '../types.ts';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content.ts';
import { getPageUrl } from '../utils/navigation.ts';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'ABOUT', page: 'about' },
    { label: 'SOLUTIONS', page: 'solutions' },
    { label: 'PROJECTS', page: 'projects' },
    { label: 'INSIGHTS', page: 'insights' },
    { label: 'TECHNICIAN NETWORK', page: 'technician-network' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header role="banner" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark with semantic home hyperlink */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            aria-label="Demi Tech Solutions Home"
            className="text-left text-lg sm:text-xl font-extrabold tracking-tight text-black hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
          >
            DEMI TECH SOLUTIONS
          </a>

          {/* Zone 2: Navigation Links (semantic URLs for search crawlers & AI agents) */}
          <nav role="navigation" aria-label="Main Desktop Navigation" className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-wider text-neutral-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <a
                  key={link.page}
                  href={getPageUrl(link.page)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.page);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-black font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              title="Call Demi Tech Solutions"
              aria-label={`Call Demi Tech Solutions at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenConsultation}
              aria-label="Book a Professional Consultation"
              className="px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors rounded-none shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              aria-label="Book a Consultation"
              className="sm:hidden px-3.5 py-2 min-h-[40px] text-[11px] font-bold text-white bg-black hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              CONSULT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[48px] min-h-[48px] flex items-center justify-center text-neutral-800 hover:text-black focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="region"
          aria-label="Mobile Navigation Menu"
          className="xl:hidden bg-white border-b border-neutral-300 px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-xl"
        >
          <nav aria-label="Mobile Navigation Links" className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <a
                  key={link.page}
                  href={getPageUrl(link.page)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.page);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-left text-sm font-semibold tracking-wider py-3 px-2 min-h-[44px] flex items-center border-b border-neutral-100 ${
                    isActive ? 'text-black font-bold pl-3 border-l-2 border-l-black bg-neutral-50' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                aria-label="Book a Consultation"
                className="w-full py-3.5 min-h-[48px] text-center text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="py-3 px-3 min-h-[44px] bg-neutral-100 text-neutral-800 flex items-center justify-center gap-2 font-medium hover:bg-neutral-200"
                  aria-label="Call Demi Tech Solutions Office"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Office</span>
                </a>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 min-h-[44px] bg-neutral-100 text-neutral-800 flex items-center justify-center gap-2 font-medium hover:bg-neutral-200"
                  aria-label="Chat with Demi Tech Solutions on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
