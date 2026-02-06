'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import Logo from '@/components/ui/Logo';

export default function EmailStep() {
  const { state, dispatch, activeQuestions } = useWizard();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [email, setEmail] = useState(state.email);

  const answeredCount = state.answers.filter(
    (a) => (Array.isArray(a.value) ? a.value.length > 0 : a.value.trim().length > 0)
  ).length;

  const isValid =
    firstName.trim().length > 0 &&
    email.trim().length > 0 &&
    email.includes('@');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    dispatch({ type: 'SET_FIRST_NAME', firstName: firstName.trim() });
    dispatch({ type: 'SET_LAST_NAME', lastName: lastName.trim() });
    dispatch({ type: 'SET_EMAIL', email: email.trim() });
    dispatch({ type: 'SET_STEP', step: activeQuestions.length + 2 });
  };

  const goBack = () => {
    dispatch({ type: 'SET_STEP', step: activeQuestions.length });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-80px)] flex flex-col"
    >
      {/* Header */}
      <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <Logo
            size="sm"
            onClick={() => dispatch({ type: 'SET_STEP', step: 0 })}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-display text-ink mb-3">
            Almost there
          </h2>
          <p className="text-ink-light leading-relaxed">
            You&apos;ve answered {answeredCount} questions across {new Set(activeQuestions.map((q) => q.phase)).size} phases.
            Enter your details below and we&apos;ll generate your Personal Constitution.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-6 mb-8"
        >
          <div className="text-center">
            <span className="text-3xl font-display text-accent">{answeredCount}</span>
            <p className="text-xs text-muted mt-1">Questions</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-display text-accent">
              {new Set(activeQuestions.map((q) => q.phase)).size}
            </span>
            <p className="text-xs text-muted mt-1">Phases</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-display text-accent">1</span>
            <p className="text-xs text-muted mt-1">Constitution</p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm text-ink-light mb-1.5">
                First name *
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-ink-light mb-1.5">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-ink-light mb-1.5">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              required
            />
            <p className="text-xs text-muted mt-1.5">
              We&apos;ll send your constitution to this email. No spam, ever.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
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

            <button
              type="submit"
              disabled={!isValid}
              className="bg-ink text-paper px-8 py-3 rounded-full text-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate My Constitution
            </button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
