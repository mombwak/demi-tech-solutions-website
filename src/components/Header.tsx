/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types.ts';
import { Menu, X, ArrowUpRight, Phone, MessageSquare, ChevronRight, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../data/content.ts';
import { getPageUrl } from '../utils/navigation.ts';
import { CompanyLogo } from './CompanyLogo.tsx';

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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Core navigation links visible across desktop screens
  const primaryNavLinks: { label: string; page: PageView }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SOLUTIONS', page: 'solutions' },
    { label: 'PROJECTS', page: 'projects' },
    { label: 'PROPOSALS', page: 'proposals' },
    { label: 'ABOUT', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
  ];

  // Secondary items accessible via dropdown or wide desktop expansion
  const secondaryNavLinks: { label: string; page: PageView; desc: string }[] = [
    { label: 'INSIGHTS', page: 'insights', desc: 'Technical engineering guides & whitepapers' },
    { label: 'INVESTORS', page: 'investors', desc: 'OEM manufacturers & capital partnerships' },
    { label: 'NETWORK', page: 'technician-network', desc: 'Join certified field engineer network' },
  ];

  // All links in logical order for mobile drawer and keyboard traversal
  const allNavLinks: { label: string; page: PageView }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SOLUTIONS & DIVISIONS', page: 'solutions' },
    { label: 'PROJECT PORTFOLIO', page: 'projects' },
    { label: 'REQUEST PROPOSAL', page: 'proposals' },
    { label: 'ABOUT OUR ENGINEERING', page: 'about' },
    { label: 'KNOWLEDGE & INSIGHTS', page: 'insights' },
    { label: 'INVESTORS & PARTNERS', page: 'investors' },
    { label: 'TECHNICIAN NETWORK', page: 'technician-network' },
    { label: 'CONTACT & SCHEDULING', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key and outside click to dismiss drawers and dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (moreMenuOpen) setMoreMenuOpen(false);
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          toggleButtonRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Dismiss mobile menu
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }

      // Dismiss "More" dropdown
      if (
        moreMenuOpen &&
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, moreMenuOpen]);

  const isSecondaryActive = secondaryNavLinks.some((l) => l.page === currentPage);

  return (
    <header role="banner" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3 md:gap-4 lg:gap-6">
          {/* Zone 1: Active Logo & Corporate Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            aria-label="Demi Tech Solutions Home"
            className="flex items-center gap-2.5 sm:gap-3 text-left hover:opacity-85 transition-opacity shrink-0 group min-w-max"
          >
            <CompanyLogo priority={true} className="w-8 h-8 sm:w-10 sm:h-10" size={40} />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-black leading-none">
                DEMI TECH SOLUTIONS
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5 hidden xs:block">
                Engineering Systems
              </span>
            </div>
          </a>

          {/* Zone 2: Intelligent Desktop Navigation */}
          {/* Automatically shows on >= 1024px with zero collision */}
          <nav
            role="navigation"
            aria-label="Desktop Navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-5 text-xs font-semibold tracking-wider text-neutral-700 shrink-0"
          >
            {primaryNavLinks.map((link) => {
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
                  className={`relative py-2 px-1 text-[11px] xl:text-xs whitespace-nowrap transition-colors ${
                    isActive ? 'text-black font-bold' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
                </a>
              );
            })}

            {/* Extended links for massive screens (>= 1536px 2xl) */}
            <div className="hidden 2xl:flex items-center gap-4">
              {secondaryNavLinks.map((link) => {
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
                    className={`relative py-2 px-1 text-xs whitespace-nowrap transition-colors ${
                      isActive ? 'text-black font-bold' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />}
                  </a>
                );
              })}
            </div>

            {/* Compact "MORE" Dropdown for 1024px - 1535px desktops (prevents phone & CTA collision) */}
            <div ref={moreMenuRef} className="relative 2xl:hidden">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 py-2 px-2 text-[11px] xl:text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                  isSecondaryActive || moreMenuOpen ? 'text-black font-bold' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <span>MORE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Card */}
              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-neutral-300 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold px-3 py-1.5 border-b border-neutral-100">
                    Additional Portals
                  </div>
                  <div className="flex flex-col py-1">
                    {secondaryNavLinks.map((item) => {
                      const isActive = currentPage === item.page;
                      return (
                        <a
                          key={item.page}
                          href={getPageUrl(item.page)}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.page);
                          }}
                          className={`px-3 py-2 text-left rounded transition-colors ${
                            isActive ? 'bg-neutral-100 text-black font-bold' : 'hover:bg-neutral-50 text-neutral-700 hover:text-black'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-neutral-500 mt-0.5 leading-snug">{item.desc}</div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Direct Actions & Phone (Self-contained, flex-shrink-0) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="text-xs font-semibold text-neutral-700 hover:text-black flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1.5 rounded hover:bg-neutral-50"
              title="Call Demi Tech Solutions Engineering Desk"
              aria-label={`Call Demi Tech Solutions at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <span className="font-mono text-[11px] xl:text-xs">{COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              aria-label="Book a Professional Consultation"
              className="px-3.5 sm:px-4 xl:px-5 py-2.5 text-[11px] sm:text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zone 4: Mobile & Tablet Controls (Visible on < 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Consultation CTA for Small Screens */}
            <button
              onClick={onOpenConsultation}
              aria-label="Book Consultation"
              className="md:hidden px-2.5 py-1.5 min-h-[36px] text-[10px] sm:text-[11px] font-bold tracking-wide text-white bg-black hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 rounded-none shadow-sm"
            >
              <span>CONSULT</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Accessible Hamburger Trigger */}
            <button
              ref={toggleButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Full-Height Mobile & Tablet Overlay Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] sm:top-[80px] z-50 lg:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-200"
          aria-hidden={!mobileMenuOpen}
        >
          <div
            ref={menuRef}
            id="mobile-navigation-menu"
            role="region"
            aria-label="Mobile Navigation Menu"
            className="bg-white border-b border-neutral-300 w-full max-h-[calc(100vh-72px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto px-5 pt-3 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2 pt-1 border-b border-neutral-100 pb-1">
              NAVIGATION & CAPABILITIES
            </div>

            <nav aria-label="Mobile Navigation Links" className="flex flex-col divide-y divide-neutral-100">
              {allNavLinks.map((link) => {
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
                    className={`text-left text-sm font-semibold tracking-wide py-3.5 px-2 min-h-[48px] flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-black font-bold pl-3 border-l-4 border-l-black bg-neutral-50'
                        : 'text-neutral-800 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </a>
                );
              })}
            </nav>

            {/* Direct Action Hub inside Mobile Drawer */}
            <div className="pt-6 mt-4 border-t border-neutral-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                aria-label="Book a Professional Consultation"
                className="w-full py-4 min-h-[48px] text-center text-xs font-bold tracking-wider text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="py-3 px-3 min-h-[44px] bg-neutral-100 text-neutral-900 border border-neutral-200 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                  aria-label={`Call Demi Tech Solutions at ${COMPANY_INFO.phone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 min-h-[44px] bg-neutral-100 text-neutral-900 border border-neutral-200 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                  aria-label="Chat directly on WhatsApp (+254 703 293201)"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-700" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-neutral-500 font-mono text-center pt-2">
                Kisumu Base · Field-Ready Across Western Kenya & Nationwide
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
