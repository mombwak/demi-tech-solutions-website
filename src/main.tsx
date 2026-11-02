/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (err: any) {
    console.error('Fatal initialization error:', err);
    container.innerHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 32px; color: #171717; max-width: 600px; margin: 40px auto; border: 1px solid #e5e5e5; background: #ffffff;">
        <h2 style="margin-top: 0; font-size: 18px; font-weight: 800;">Demi Tech Solutions</h2>
        <p style="font-size: 13px; color: #555555; line-height: 1.5;">An error occurred while loading the application: <strong>${err?.message || 'Initialization failed'}</strong></p>
        <p style="font-size: 11px; color: #888888; font-family: monospace;">Please refresh the page or clear your browser cache.</p>
      </div>
    `;
  }
}
