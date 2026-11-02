/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content.ts';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="Quick Communication Channels" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation Desk"
        className="group flex items-center gap-2.5 bg-black text-white px-4 py-3 shadow-xl hover:bg-neutral-800 transition-all border border-neutral-700 hover:border-neutral-500"
      >
        <MessageSquare className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold tracking-wider hidden sm:inline whitespace-nowrap">
          WHATSAPP CONSULTATION
        </span>
      </a>
    </aside>
  );
};
