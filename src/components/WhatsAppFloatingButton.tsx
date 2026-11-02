/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Exact WhatsApp link and prefilled message as specified
  const whatsappUrl =
    'https://wa.me/254703293201?text=Hello%20Demi%20Tech%20Solutions%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20professional%20consultation.';

  return (
    <aside
      aria-label="WhatsApp Instant Consultation"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 select-none"
    >
      {/* Subtle Desktop Tooltip Label */}
      <span
        className={`hidden sm:inline-block bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat on WhatsApp
      </span>

      {/* Official WhatsApp Floating Chat Widget */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Demi Tech Solutions on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Official WhatsApp Speech Bubble + Handset SVG */}
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 sm:w-8.5 sm:h-8.5 fill-current transition-transform duration-300 group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.45.656 4.75 1.8 6.74L2.5 29.5l6.98-1.78c1.92 1.05 4.13 1.65 6.52 1.65 7.456 0 13.5-6.044 13.5-13.37S23.456 2.5 16 2.5zm0 2.27c6.19 0 11.23 5.04 11.23 11.23 0 6.19-5.04 11.23-11.23 11.23-2.13 0-4.1-.6-5.78-1.63l-.41-.25-4.28 1.09 1.14-4.16-.27-.43c-1.16-1.8-1.78-3.89-1.78-6.08 0-6.19 5.04-11.23 11.23-11.23zm-4.78 5.48c-.28 0-.6.1-.87.41-.36.41-1.39 1.36-1.39 3.32s1.42 3.86 1.62 4.12c.2.26 2.76 4.22 6.7 5.92.94.4 1.67.64 2.24.83.94.3 1.8.26 2.48.16.76-.11 2.34-.96 2.67-1.89.33-.93.33-1.72.23-1.89-.1-.17-.36-.27-.76-.47-.4-.2-2.34-1.16-2.7-1.29-.36-.14-.63-.2-.89.2-.26.4-.99 1.29-1.22 1.56-.23.26-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.02-.62.18-.81.18-.18.4-.46.6-.7.2-.23.26-.4.4-.66.13-.26.07-.5-.03-.7-.1-.2-.89-2.15-1.22-2.95-.32-.77-.65-.67-.89-.68-.23-.01-.49-.01-.76-.01z" />
        </svg>
      </a>
    </aside>
  );
};
