'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-paper rounded-2xl shadow-elevated-lg max-w-lg w-full p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-muted hover:text-ink"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-display font-light text-ink mb-6">
              About We The Me
            </h2>

            <div className="space-y-4 text-ink-light text-sm leading-relaxed font-body">
              <p>
                Your AI doesn&apos;t know you. Every conversation starts from zero &mdash;
                no context, no memory, no understanding of who you are.
              </p>

              <p>
                <strong className="text-ink">We The Me</strong> fixes that. Your Personal
                Constitution is a structured capture of your values, beliefs, principles,
                and aspirations, written in your own words. It&apos;s the context document
                that makes AI actually understand you.
              </p>

              <p>
                Upload it to ChatGPT, Claude, Gemini, or any custom GPT. Use it as the
                base layer for an AI chief of staff, a Write Like Me codex, or any workflow
                where personalization matters.
              </p>

              <p>
                We don&apos;t store your answers. Your constitution is generated in real-time
                and delivered directly to you.
              </p>

              <div className="pt-5 mt-5 border-t border-cream">
                <p className="text-muted text-xs">
                  Built by{' '}
                  <a href="https://chadstamm.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                    Chad Stamm
                  </a>
                  {' & '}
                  <a href="https://tmcdigitalmedia.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                    TMC Digital Media
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
