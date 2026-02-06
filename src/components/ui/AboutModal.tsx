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
                The key to maximizing AI&apos;s potential isn&apos;t better prompts &mdash;
                it&apos;s better <strong className="text-ink">context</strong>.
              </p>

              <p>
                Context engineering is the most critical and overlooked aspect of getting real
                value from AI. Without context, every tool &mdash; ChatGPT, Claude, Gemini &mdash;
                gives you the same generic answers it gives everyone else.
              </p>

              <p>
                <strong className="text-ink">A Personal Constitution is the most impactful way
                to give AI context about who you are.</strong> It&apos;s a structured document
                containing your values, beliefs, goals, challenges, personality, and aspirations.
                Upload it once and every interaction becomes personalized to you.
                Think of it as a foundation layer for everything you do with AI.
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
