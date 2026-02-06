'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import IntroStep from './IntroStep';
import QuestionStep from './QuestionStep';
import EmailStep from './EmailStep';
import GeneratingStep from './GeneratingStep';
import AboutModal from '@/components/ui/AboutModal';
import SocialShareLinks from '@/components/ui/SocialShareLinks';

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

      {/* Footer — two rows */}
      <footer className="py-6 px-6 space-y-4">
        {/* Row 1: About · Donate · Copyright · Powered by */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm text-muted font-body">
          <button
            onClick={() => setAboutOpen(true)}
            className="underline hover:text-accent"
          >
            About
          </button>
          <span className="text-muted/30">&middot;</span>
          <a
            href="https://buymeacoffee.com/chadn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            Donate
          </a>
          <span className="text-muted/30">&middot;</span>
          <span>&copy; 2026 WeTheMe.app</span>
          <span className="text-muted/30">&middot;</span>
          <span>
            Powered by{' '}
            <a href="https://chadstamm.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">Chad Stamm</a>
            {' & '}
            <a href="https://tmcdigitalmedia.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">TMC Digital Media</a>
          </span>
        </div>

        {/* Row 2: Social share centered */}
        <div className="flex justify-center">
          <SocialShareLinks />
        </div>
      </footer>

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
