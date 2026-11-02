/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, X, Volume2, ArrowRight, Delete, Clock, AlertTriangle } from 'lucide-react';

interface SafaricomStkPromptModalProps {
  isOpen: boolean;
  phoneNumber: string;
  amount: number;
  checkoutRequestId: string;
  isSimulated: boolean;
  onConfirm: (pin: string) => void;
  onCancel: () => void;
}

// Audio synthesizer for authentic Safaricom handset notifications
function playSound(type: 'prompt' | 'click' | 'success') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'prompt') {
      // Classic incoming USSD / prompt alert (two-tone chime)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880.00, now + 0.12); // A5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'click') {
      // Soft keypress tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      // M-Pesa transaction confirmation chime (C-E-G-C arpeggio)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    }
  } catch {
    // Gracefully ignore audio errors (e.g. strict browser autoplay policy)
  }
}

export const SafaricomStkPromptModal: React.FC<SafaricomStkPromptModalProps> = ({
  isOpen,
  phoneNumber,
  amount,
  checkoutRequestId,
  isSimulated,
  onConfirm,
  onCancel,
}) => {
  const [pin, setPin] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('Enter M-Pesa PIN to authorize payment');

  // Play chime and vibrate handset when prompt pops up
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setTimeLeft(45);
      setIsSubmitting(false);
      setStatusMessage('Enter M-Pesa PIN to authorize payment');

      playSound('prompt');
      try {
        if (navigator.vibrate) {
          navigator.vibrate([120, 80, 120]);
        }
      } catch {
        // Ignore vibration errors
      }
    }
  }, [isOpen]);

  // Handle countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleKeyPress = useCallback((num: string) => {
    if (pin.length < 4) {
      playSound('click');
      setPin((prev) => prev + num);
    }
  }, [pin]);

  const handleDelete = useCallback(() => {
    playSound('click');
    setPin((prev) => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    playSound('click');
    setPin('');
  }, []);

  const handleSubmit = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatusMessage('Verifying PIN with Safaricom M-Pesa...');
    playSound('success');

    // Slight delay for realistic verification UX
    setTimeout(() => {
      onConfirm(pin || '1234');
    }, 600);
  }, [isSubmitting, onConfirm, pin]);

  // Physical keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyPress, handleDelete, handleSubmit, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stk-prompt-title"
    >
      <div className="w-full max-w-sm bg-neutral-900 border-2 border-neutral-700 shadow-2xl rounded-2xl overflow-hidden text-neutral-100 font-sans transform animate-in zoom-in-95 duration-200">
        
        {/* Safaricom Header Banner */}
        <div className="bg-[#00843D] text-white px-4 py-3 flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-100 animate-pulse" />
            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-emerald-100 font-bold">
                SAFARICOM M-PESA
              </div>
              <div id="stk-prompt-title" className="text-xs font-black tracking-tight leading-none">
                SIM TOOLKIT PROMPT
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono bg-black/30 px-2 py-0.5 rounded text-white flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin" />
              <span>{timeLeft}s</span>
            </span>
            <button
              onClick={onCancel}
              className="p-1 rounded hover:bg-black/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Cancel prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Handset Display Screen Area */}
        <div className="p-4 sm:p-5 bg-black/90 space-y-4">
          
          {/* USSD Prompt Message Box */}
          <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Lipa na M-Pesa Online
            </div>

            <div className="text-sm font-bold text-white leading-snug">
              Do you want to pay <span className="text-emerald-400 font-mono">KES {amount.toLocaleString()}</span> to{' '}
              <span className="text-white underline decoration-emerald-500 underline-offset-2">DEMI TECH SOLUTIONS</span>?
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-neutral-800/80 text-neutral-300">
              <div>
                <span className="text-neutral-500 block text-[10px]">TILL / REF:</span>
                <span className="font-bold text-white">5829259</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">HANDSET:</span>
                <span className="font-bold text-white">{phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* PIN Input Slots */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-300 font-bold">{statusMessage}</span>
              <span className="text-[10px] text-neutral-500">{pin.length} / 4 digits</span>
            </div>

            <div className="flex items-center justify-center gap-3 py-2 bg-neutral-950/80 rounded-lg border border-neutral-800">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index;
                const isCurrent = pin.length === index;
                return (
                  <div
                    key={index}
                    className={`w-11 h-12 rounded-lg flex items-center justify-center text-xl font-bold font-mono transition-all duration-150 ${
                      filled
                        ? 'bg-neutral-800 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : isCurrent
                        ? 'bg-neutral-900 border-2 border-neutral-400 text-neutral-400 animate-pulse'
                        : 'bg-neutral-900/60 border border-neutral-800 text-neutral-600'
                    }`}
                  >
                    {filled ? '●' : ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Dial Pad */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(String(num))}
                disabled={isSubmitting}
                className="py-2.5 text-base font-bold font-mono bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting || pin.length === 0}
              className="py-2.5 text-xs font-bold font-mono bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer disabled:opacity-30"
              title="Clear all digits"
            >
              CLEAR
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              disabled={isSubmitting}
              className="py-2.5 text-base font-bold font-mono bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting || pin.length === 0}
              className="py-2.5 text-xs font-bold font-mono bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30"
              title="Delete last digit"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg border border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 text-xs font-black uppercase tracking-wider bg-[#00843D] hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Verifying...' : 'Send / OK'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Helper / Shortcut Bar */}
          <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
            <button
              type="button"
              onClick={() => {
                setPin('1234');
                playSound('click');
              }}
              className="hover:text-emerald-400 underline decoration-dashed transition-colors cursor-pointer"
            >
              ⚡ Quick Fill PIN (1234)
            </button>

            <span className="text-neutral-500">
              {isSimulated ? 'Simulator Active' : 'Daraja Network Push'}
            </span>
          </div>

          <div className="text-[10px] text-neutral-500 leading-tight text-center pt-1 border-t border-neutral-900">
            Press numeric keys on your keyboard or tap digits above. If using an actual Safaricom SIM card, you can also approve directly on your phone handset screen.
          </div>
        </div>
      </div>
    </div>
  );
};
