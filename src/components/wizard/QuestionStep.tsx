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
    description: 'Let\'s start with what matters most — your values, the principles you live by, and the lines you won\'t cross.',
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
    description: 'Let\'s paint the picture of where you\'re headed and what fuels the journey.',
  },
  5: {
    tagline: 'What makes you, you',
    description: 'The most powerful context comes from the truths we rarely share. Go deep here.',
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

  // Show phase intro when entering a new phase
  useEffect(() => {
    if (!question) return;
    if (prevPhaseRef.current !== null && prevPhaseRef.current !== question.phase) {
      setShowPhaseIntro(true);
      const timer = setTimeout(() => setShowPhaseIntro(false), 2200);
      return () => clearTimeout(timer);
    }
    prevPhaseRef.current = question.phase;
  }, [question]);

  // Reset local state when question changes
  useEffect(() => {
    if (!question) return;
    const answer = getAnswerValue(state.answers, question.id);
    if (question.inputType === 'multiselect') {
      setLocalMultiselect(Array.isArray(answer) ? answer : []);
    } else {
      setLocalValue(typeof answer === 'string' ? answer : '');
    }
  }, [question, state.answers]);

  // Focus textarea on mount
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

    const nextStep = state.currentStep + 1;
    dispatch({ type: 'SET_STEP', step: nextStep });
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

  // Phase intro overlay
  if (showPhaseIntro && phaseIntros[question.phase]) {
    const intro = phaseIntros[question.phase];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Phase {question.phase} of {phases.length}
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-ink mb-4">
            {question.phaseName}
          </h2>
          <p className="text-lg text-ink-light italic">
            &ldquo;{intro.tagline}&rdquo;
          </p>
          <p className="text-ink-light mt-4 max-w-md mx-auto">
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
      className="min-h-[calc(100vh-80px)] flex flex-col"
    >
      {/* Header: Logo + Progress */}
      <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <Logo
            size="sm"
            onClick={() => dispatch({ type: 'SET_STEP', step: 0 })}
          />
          <span className="text-sm text-muted">
            {phaseInfo.phaseName} &middot; {questionIndex + 1}/{activeQuestions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex flex-col px-4 max-w-2xl mx-auto w-full py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id + '-content'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-ink leading-snug mb-3">
              {question.question}
            </h2>

            {question.subtext && (
              <p className="text-ink-light mb-6 leading-relaxed">
                {question.subtext}
              </p>
            )}

            {/* Considerations callout */}
            {question.considerations && question.considerations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-paper border border-accent/20 rounded-xl p-4 mb-6"
              >
                <p className="text-sm font-medium text-accent mb-2">Go deeper:</p>
                <ul className="space-y-1.5">
                  {question.considerations.map((c, i) => (
                    <li key={i} className="text-sm text-ink-light flex items-start gap-2">
                      <span className="text-accent/60 mt-0.5 text-xs">&bull;</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/10 text-ink'
                      : 'border-muted/30 bg-paper text-ink-light hover:border-accent/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-accent border-accent' : 'border-muted'
                      }`}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          <div className="space-y-2 mb-6">
            {question.options.map((option) => (
              <motion.button
                key={option}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setLocalValue(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  localValue === option
                    ? 'border-accent bg-accent/10 text-ink'
                    : 'border-muted/30 bg-paper text-ink-light hover:border-accent/40'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative mb-6">
            <textarea
              ref={textareaRef}
              value={displayValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              rows={6}
              className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 pr-12 text-ink placeholder:text-muted/50 resize-none focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all leading-relaxed"
            />
            {/* Voice input button */}
            {isSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
                  isListening
                    ? 'bg-accent text-paper'
                    : 'bg-cream text-muted hover:text-ink hover:bg-muted/20'
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
        <div className="flex items-center justify-between mt-auto pt-4">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8L10 4" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            {!question.required && (
              <button
                type="button"
                onClick={saveAndAdvance}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                Skip
              </button>
            )}
            <motion.button
              type="button"
              onClick={saveAndAdvance}
              disabled={!canAdvance()}
              whileHover={canAdvance() ? { scale: 1.02 } : {}}
              whileTap={canAdvance() ? { scale: 0.98 } : {}}
              className="bg-ink text-paper px-6 py-2.5 rounded-full text-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="text-center text-xs text-muted mt-4">
          Press <kbd className="px-1.5 py-0.5 bg-paper border border-muted/30 rounded text-xs">&#8984;+Enter</kbd> to continue
        </p>
      </div>

      {/* Phase Dots */}
      <div className="flex justify-center gap-2 pb-6">
        {phases.map((phase) => (
          <motion.div
            key={phase}
            layout
            className={`h-2 rounded-full transition-colors ${
              phase === question.phase ? 'bg-accent w-6' : 'bg-muted/30 w-2'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
