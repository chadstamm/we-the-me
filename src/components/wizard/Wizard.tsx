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
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      {/* Minimal footer */}
      <footer className="py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-[11px] text-muted/60 font-body">
          <a
            href="https://buymeacoffee.com/chadn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Donate
          </a>
          <span className="text-muted/30">&middot;</span>
          <span>&copy; 2026 WeTheMe.app</span>
          <span className="text-muted/30">&middot;</span>
          <button
            onClick={() => setAboutOpen(true)}
            className="hover:text-accent"
          >
            About
          </button>
          <span className="text-muted/30">&middot;</span>
          <span>
            <a href="https://chadstamm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Chad Stamm</a>
            {' & '}
            <a href="https://tmcdigitalmedia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">TMC Digital Media</a>
          </span>
        </div>
      </footer>

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
