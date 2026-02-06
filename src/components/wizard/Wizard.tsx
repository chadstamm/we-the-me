'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import IntroStep from './IntroStep';
import QuestionStep from './QuestionStep';
import EmailStep from './EmailStep';
import GeneratingStep from './GeneratingStep';
import AboutModal from '@/components/ui/AboutModal';

export default function Wizard() {
  const { state, activeQuestions } = useWizard();
  const [aboutOpen, setAboutOpen] = useState(false);

  const emailStep = activeQuestions.length + 1;
  const generatingStep = activeQuestions.length + 2;

  const renderStep = () => {
    if (state.currentStep === 0) {
      return <IntroStep key="intro" />;
    }
    if (state.currentStep >= 1 && state.currentStep <= activeQuestions.length) {
      return <QuestionStep key={`question-${state.currentStep}`} />;
    }
    if (state.currentStep === emailStep) {
      return <EmailStep key="email" />;
    }
    if (state.currentStep >= generatingStep) {
      return <GeneratingStep key="generating" />;
    }
    return <IntroStep key="intro-fallback" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-muted/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted">
          <div className="flex items-center gap-3">
            <a
              href="https://buymeacoffee.com/chadn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Donate
            </a>
            <span>&middot;</span>
            <span>&copy; 2026 WeTheMe.app</span>
            <span>&middot;</span>
            <button
              onClick={() => setAboutOpen(true)}
              className="hover:text-accent transition-colors"
            >
              About
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://chadstamm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Chad Stamm
            </a>
            <span>&</span>
            <a
              href="https://tmcdigitalmedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              TMC Digital Media
            </a>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
