/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageView } from '../types.ts';

export interface RouteConfig {
  page: PageView;
  path: string;
  hash: string;
  title: string;
  description: string;
}

export const ROUTES: Record<PageView, RouteConfig> = {
  home: {
    page: 'home',
    path: '/',
    hash: '#home',
    title: 'Demi Tech Solutions – Engineering Intelligent Technology Systems',
    description: 'Premier technology engineering and systems integration in Kisumu & Western Kenya. Commercial CCTV, access control, POS & ERP automation, enterprise networking, and solar backup systems.',
  },
  about: {
    page: 'about',
    path: '/about',
    hash: '#about',
    title: 'About Our Engineering – Demi Tech Solutions Kisumu',
    description: 'Learn about Demi Tech Solutions, Western Kenya’s leading technology integration firm specialising in commercial security, business automation, and power resilience.',
  },
  solutions: {
    page: 'solutions',
    path: '/solutions',
    hash: '#solutions',
    title: 'Integrated Engineering Solutions – Demi Tech Solutions',
    description: 'Explore our 4 core engineering divisions: Security & Surveillance, Business Automation (POS/ERP), Enterprise Networking, and Power Resilience.',
  },
  projects: {
    page: 'projects',
    path: '/projects',
    hash: '#projects',
    title: 'Projects & Case Studies – Demi Tech Solutions Kenya',
    description: 'Review verified engineering deployments across Western Kenya: commercial CCTV, supermarket POS automation, hospital IT networks, and solar backup systems.',
  },
  insights: {
    page: 'insights',
    path: '/insights',
    hash: '#insights',
    title: 'Engineering Insights & Knowledge Base – Demi Tech Solutions',
    description: 'Technical advisory articles, compliance guides (KRA eTIMS, Hikvision/Dahua surveillance standards, LiFePO4 solar architecture) for Kenyan businesses.',
  },
  'technician-network': {
    page: 'technician-network',
    path: '/technician-network',
    hash: '#technician-network',
    title: 'Join Technician Network – Demi Tech Solutions Kenya',
    description: 'Independent verified installer and technician onboarding across all 47 counties in Kenya for security, telematics, networking, and POS systems.',
  },
  contact: {
    page: 'contact',
    path: '/contact',
    hash: '#contact',
    title: 'Contact Engineering Desk – Demi Tech Solutions Kisumu',
    description: 'Contact our Kisumu engineering desk for commercial system inquiries, site surveys, and project quotations across Western Kenya and nationwide.',
  },
  admin: {
    page: 'admin',
    path: '/admin',
    hash: '#admin',
    title: 'Internal Admin Portal – Demi Tech Solutions',
    description: 'Authorized administrative management and transaction dispatch.',
  },
};

/**
 * Returns the canonical path URL for a given PageView
 */
export function getPageUrl(page: PageView): string {
  return ROUTES[page]?.path || '/';
}

/**
 * Resolves current PageView from window.location pathname and hash
 */
export function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace('#', '');

  // Check path matches
  for (const [key, config] of Object.entries(ROUTES)) {
    if (config.path === pathname) {
      return key as PageView;
    }
  }

  // Check hash fallback
  if (hash && hash in ROUTES) {
    return hash as PageView;
  }

  return 'home';
}

/**
 * Updates browser history and document title without full page reload
 */
export function updateBrowserUrl(page: PageView): void {
  if (typeof window === 'undefined') return;

  const route = ROUTES[page];
  if (!route) return;

  const targetUrl = route.path;

  // Use HTML5 pushState if supported and path changed
  if (window.location.pathname !== targetUrl) {
    try {
      window.history.pushState({ page }, route.title, targetUrl);
    } catch {
      // Fallback for file:// or restricted sandboxes
      window.location.hash = route.hash;
    }
  }

  // Update document title for agentic browsers and screen readers
  document.title = route.title;
}
