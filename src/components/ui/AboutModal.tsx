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
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-paper rounded-2xl shadow-xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-display text-ink mb-4">
              About We The Me
            </h2>

            <div className="space-y-4 text-ink-light text-sm leading-relaxed">
              <p>
                We The Me helps you craft a Personal Constitution — a living document
                that defines who you are, what you stand for, and how you want to show up
                in the world.
              </p>

              <p>
                Inspired by the structure of the U.S. Constitution, your Personal Constitution
                becomes a north star for decisions big and small. Through guided reflection
                questions, we help you articulate your values, purpose, and commitments.
              </p>

              <p>
                Your responses are processed by AI to generate a beautifully structured
                document unique to you. We don&apos;t store your answers — your constitution
                is generated in real-time and delivered directly to you.
              </p>

              <div className="pt-2 border-t border-cream">
                <p className="text-muted">
                  Built by{' '}
                  <a
                    href="https://chadstamm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    Chad Stamm
                  </a>
                  {' & '}
                  <a
                    href="https://tmcdigitalmedia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
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
