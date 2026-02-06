'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
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

export default function QuestionStep() {
  const { state, dispatch, activeQuestions } = useWizard();

  // Question index is currentStep - 1 (step 0 is intro)
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
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [questionIndex]);

  const handleTranscript = useCallback(
    (transcript: string) => {
      setLocalValue((prev) => {
        const newVal = prev ? prev + ' ' + transcript : transcript;
        return newVal;
      });
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

    // Move to next step
    const nextStep = state.currentStep + 1;
    dispatch({ type: 'SET_STEP', step: nextStep });
  };

  const goBack = () => {
    // Save current answer before going back
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex flex-col px-4 max-w-2xl mx-auto w-full py-8">
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
          <div className="bg-paper border border-accent/20 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-accent mb-2">Consider:</p>
            <ul className="space-y-1">
              {question.considerations.map((c, i) => (
                <li key={i} className="text-sm text-ink-light flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#8226;</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Input */}
        {question.inputType === 'multiselect' && question.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {question.options.map((option) => {
              const isSelected = localMultiselect.includes(option);
              return (
                <button
                  key={option}
                  type="button"
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
                          <path
                            d="M2 5L4 7L8 3"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        ) : question.inputType === 'select' && question.options ? (
          <div className="space-y-2 mb-6">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLocalValue(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  localValue === option
                    ? 'border-accent bg-accent/10 text-ink'
                    : 'border-muted/30 bg-paper text-ink-light hover:border-accent/40'
                }`}
              >
                {option}
              </button>
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
              className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/60 resize-none focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
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
            <button
              type="button"
              onClick={saveAndAdvance}
              disabled={!canAdvance()}
              className="bg-ink text-paper px-6 py-2.5 rounded-full text-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>
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
          <div
            key={phase}
            className={`w-2 h-2 rounded-full transition-colors ${
              phase === question.phase ? 'bg-accent' : 'bg-muted/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
