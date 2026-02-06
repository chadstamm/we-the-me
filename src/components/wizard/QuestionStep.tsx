'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import Logo from '@/components/ui/Logo';
import {
  getAnswerValue,
  toggleMultiselectValue,
  calculateProgress,
  getPhaseInfo,
  getUniquePhases,
} from '@/utils/questionFlow';

const phaseIntros: Record<number, { tagline: string; description: string }> = {
  1: {
    tagline: 'Who you are when no one\'s watching',
    description: 'Let\'s start with what matters most — the values, principles, and lines you won\'t cross.',
  },
  2: {
    tagline: 'The lens through which you see everything',
    description: 'Your beliefs shape every decision. Let\'s capture the worldview that drives you.',
  },
  3: {
    tagline: 'Your operating system for daily life',
    description: 'How you handle the hard moments defines you more than the easy ones.',
  },
  4: {
    tagline: 'The person you\'re becoming',
    description: 'Paint the picture of where you\'re headed and what fuels the journey.',
  },
  5: {
    tagline: 'What makes you, you',
    description: 'The most powerful AI context comes from the truths we rarely share. Go deep here.',
  },
};

export default function QuestionStep() {
  const { state, dispatch, activeQuestions } = useWizard();
  const [showPhaseIntro, setShowPhaseIntro] = useState(false);
  const prevPhaseRef = useRef<number | null>(null);

  const questionIndex = state.currentStep - 1;
  const question = activeQuestions[questionIndex];

  const existingAnswer = question
    ? getAnswerValue(state.answers, question.id)
    : undefined;

  const [localValue, setLocalValue] = useState<string>(
    typeof existingAnswer === 'string' ? existingAnswer : ''
  );
  const [localMultiselect, setLocalMultiselect] = useState<string[]>(
    Array.isArray(existingAnswer) ? existingAnswer : []
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!question) return;
    if (prevPhaseRef.current !== null && prevPhaseRef.current !== question.phase) {
      setShowPhaseIntro(true);
      const timer = setTimeout(() => setShowPhaseIntro(false), 2200);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = question.phase;
  }, [question]);

  useEffect(() => {
    if (!question) return;
    const answer = getAnswerValue(state.answers, question.id);
    if (question.inputType === 'multiselect') {
      setLocalMultiselect(Array.isArray(answer) ? answer : []);
    } else {
      setLocalValue(typeof answer === 'string' ? answer : '');
    }
  }, [question, state.answers]);

  useEffect(() => {
    if (textareaRef.current && !showPhaseIntro) {
      textareaRef.current.focus();
    }
  }, [questionIndex, showPhaseIntro]);

  const handleTranscript = useCallback(
    (transcript: string) => {
      setLocalValue((prev) => (prev ? prev + ' ' + transcript : transcript));
    },
    []
  );

  const { isListening, interimTranscript, isSupported, toggleListening } =
    useVoiceInput({ onTranscript: handleTranscript });

  if (!question) return null;

  const progress = calculateProgress(questionIndex, activeQuestions.length);
  const phaseInfo = getPhaseInfo(activeQuestions, questionIndex);
  const phases = getUniquePhases(activeQuestions);

  const canAdvance = () => {
    if (!question.required) return true;
    if (question.inputType === 'multiselect') return localMultiselect.length > 0;
    return localValue.trim().length > 0;
  };

  const saveAndAdvance = () => {
    if (!canAdvance()) return;
    if (question.inputType === 'multiselect') {
      dispatch({ type: 'SET_ANSWER', questionId: question.id, value: localMultiselect });
    } else {
      dispatch({ type: 'SET_ANSWER', questionId: question.id, value: localValue.trim() });
    }
    dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
  };

  const goBack = () => {
    if (question.inputType === 'multiselect') {
      dispatch({ type: 'SET_ANSWER', questionId: question.id, value: localMultiselect });
    } else if (localValue.trim()) {
      dispatch({ type: 'SET_ANSWER', questionId: question.id, value: localValue.trim() });
    }
    dispatch({ type: 'SET_STEP', step: state.currentStep - 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      saveAndAdvance();
    }
  };

  const displayValue = isListening && interimTranscript
    ? localValue + (localValue ? ' ' : '') + interimTranscript
    : localValue;

  // Phase intro overlay — atmospheric dark screen
  if (showPhaseIntro && phaseIntros[question.phase]) {
    const intro = phaseIntros[question.phase];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-ink relative overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(176,141,87,0.06),transparent)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="relative z-10"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-[11px] font-medium mb-6 font-body">
            Phase {question.phase} of {phases.length}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-light text-paper mb-4 leading-tight">
            {question.phaseName}
          </h2>
          <p className="text-lg text-paper/50 italic font-display">
            &ldquo;{intro.tagline}&rdquo;
          </p>
          <p className="text-paper/40 mt-4 max-w-md mx-auto text-sm font-body">
            {intro.description}
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      {/* Progress bar — full width at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-cream">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <Logo
            size="sm"
            onClick={() => dispatch({ type: 'SET_STEP', step: 0 })}
          />
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.15em] text-muted font-body">
              {phaseInfo.phaseName}
            </span>
            <span className="text-[11px] text-accent font-medium bg-accent/10 px-2.5 py-1 rounded-full font-body">
              {questionIndex + 1}/{activeQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Question Content — centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-2xl mx-auto w-full py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id + '-content'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-3xl md:text-[2.75rem] font-display font-light text-ink leading-snug mb-4">
              {question.question}
            </h2>

            {question.subtext && (
              <p className="text-ink-light mb-8 leading-relaxed text-base font-body">
                {question.subtext}
              </p>
            )}

            {/* Considerations — gold left border */}
            {question.considerations && question.considerations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border-l-2 border-accent/30 pl-5 mb-8"
              >
                <p className="text-[11px] font-medium text-accent uppercase tracking-[0.2em] mb-3 font-body">Go deeper</p>
                <ul className="space-y-2">
                  {question.considerations.map((c, i) => (
                    <li key={i} className="text-sm text-ink-light leading-relaxed font-body">
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Input */}
        {question.inputType === 'multiselect' && question.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {question.options.map((option) => {
              const isSelected = localMultiselect.includes(option);
              return (
                <motion.button
                  key={option}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setLocalMultiselect((prev) => toggleMultiselectValue(prev, option))
                  }
                  className={`text-left px-5 py-4 rounded-xl border text-sm font-body transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/8 text-ink shadow-elevated'
                      : 'border-muted/20 bg-paper text-ink-light hover:border-accent/30 hover:shadow-elevated'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-accent border-accent' : 'border-muted/40'
                      }`}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>
        ) : question.inputType === 'select' && question.options ? (
          <div className="space-y-2 mb-8">
            {question.options.map((option) => (
              <motion.button
                key={option}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setLocalValue(option)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-body transition-all ${
                  localValue === option
                    ? 'border-accent bg-accent/8 text-ink shadow-elevated'
                    : 'border-muted/20 bg-paper text-ink-light hover:border-accent/30 hover:shadow-elevated'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative mb-8">
            <textarea
              ref={textareaRef}
              value={displayValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              rows={5}
              className="w-full bg-paper border border-muted/20 rounded-2xl px-6 py-5 pr-14 text-ink text-base font-body placeholder:text-muted/40 resize-none focus:outline-none focus:border-accent/40 focus:shadow-elevated transition-all leading-relaxed"
            />
            {isSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute bottom-4 right-4 p-2.5 rounded-full transition-all ${
                  isListening
                    ? 'bg-accent text-paper shadow-lg'
                    : 'bg-cream text-muted hover:text-ink hover:bg-accent-light'
                }`}
                aria-label={isListening ? 'Stop recording' : 'Start voice input'}
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
                )}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 text-muted hover:text-ink text-sm group font-body"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M10 12L6 8L10 4" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            {!question.required && (
              <button
                type="button"
                onClick={saveAndAdvance}
                className="text-sm text-muted hover:text-ink font-body"
              >
                Skip
              </button>
            )}
            <motion.button
              type="button"
              onClick={saveAndAdvance}
              disabled={!canAdvance()}
              whileHover={canAdvance() ? { scale: 1.02 } : {}}
              whileTap={canAdvance() ? { scale: 0.97 } : {}}
              className="bg-ink text-paper px-8 py-3 rounded-full text-sm font-medium font-body hover:bg-ink-light disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-elevated"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-[11px] text-muted/50 mt-6 font-body">
          Press <kbd className="px-1.5 py-0.5 bg-paper border border-muted/20 rounded text-[10px] font-mono">&#8984; Enter</kbd> to continue
        </p>
      </div>

      {/* Phase dots */}
      <div className="flex justify-center gap-2 pb-8">
        {phases.map((phase) => (
          <motion.div
            key={phase}
            layout
            className={`h-1.5 rounded-full transition-all duration-300 ${
              phase === question.phase ? 'bg-accent w-8' : phase < question.phase ? 'bg-accent/40 w-2' : 'bg-muted/20 w-2'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
