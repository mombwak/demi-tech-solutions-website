/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// Embedded fallback inline PNG data URL (guarantees logo rendering even if static assets are blocked in iframe)
export const LOGO_FALLBACK_DATA_URI =
  'data:image/png;base64,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';

interface CompanyLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = 'w-9 h-9 sm:w-10 sm:h-10',
  size = 40,
  priority = false,
}) => {
  const [srcIndex, setSrcIndex] = useState(0);

  // Cascading fallbacks:
  // 1. /assets/logo.png
  // 2. /logo.png
  // 3. /assets/logo.svg
  // 4. Base64 data URI (100% immune to network/CDN/iframe route rewrites)
  // 5. Stylized inline SVG badge
  const sources = [
    '/assets/logo.png',
    '/logo.png',
    '/assets/logo.svg',
    LOGO_FALLBACK_DATA_URI,
  ];

  const handleImgError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      // Final fallback reached
      setSrcIndex(sources.length);
    }
  };

  if (srcIndex >= sources.length) {
    // Pure inline SVG fallback - zero external requests needed
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={size}
        height={size}
        className={`${className} object-contain rounded border border-neutral-800 bg-black shadow-sm shrink-0`}
        aria-label="Demi Tech Solutions Mark"
      >
        <rect width="256" height="256" fill="#000000" rx="16"/>
        <path d="M48 24H24v24M208 24h24v24M48 232H24v-24M208 232h24v-24" stroke="#ffffff" strokeWidth="14" strokeLinecap="square"/>
        <path d="M80 64h44c38 0 68 28 68 64s-30 64-68 64H80V64z" stroke="#ffffff" strokeWidth="16" fill="none" strokeLinejoin="round"/>
        <path d="M80 128h54" stroke="#ffffff" strokeWidth="16" strokeLinecap="square"/>
        <circle cx="152" cy="128" r="14" fill="#ffffff"/>
      </svg>
    );
  }

  return (
    <img
      src={sources[srcIndex]}
      alt="Demi Tech Solutions Logo"
      width={size}
      height={size}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={handleImgError}
      className={`${className} object-contain rounded border border-neutral-800 bg-neutral-950 shadow-sm shrink-0`}
    />
  );
};
