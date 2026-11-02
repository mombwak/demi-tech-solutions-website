/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Signal that the JavaScript application bundle has loaded and executed
(window as any).__DEMI_LOADED__ = true;

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);

    // Clean up fallback loading element once React is mounted
    setTimeout(() => {
      const fallback = document.getElementById('app-loading-fallback');
      if (fallback) {
        fallback.style.display = 'none';
      }
    }, 50);
  } catch (err: any) {
    console.error('Fatal initialization error:', err);
    container.innerHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 32px; color: #171717; max-width: 600px; margin: 40px auto; border: 1px solid #e5e5e5; background: #ffffff;">
        <h2 style="margin-top: 0; font-size: 18px; font-weight: 800;">Demi Tech Solutions</h2>
        <p style="font-size: 13px; color: #555555; line-height: 1.5;">An error occurred while loading the application: <strong>${err?.message || 'Initialization failed'}</strong></p>
        <p style="font-size: 11px; color: #888888; font-family: monospace;">Please refresh the page or clear your browser cache.</p>
        <button onclick="window.location.reload(true)" style="margin-top: 12px; background: #000; color: #fff; border: none; padding: 8px 16px; font-size: 12px; font-weight: 600; cursor: pointer;">Reload Site</button>
      </div>
    `;
  }
}
