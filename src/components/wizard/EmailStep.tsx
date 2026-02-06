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

  const phaseCount = new Set(activeQuestions.map((q) => q.phase)).size;

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
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-ink mb-3">
            You&apos;ve done the hard part
          </h2>
          <p className="text-ink-light leading-relaxed">
            {answeredCount} reflections across {phaseCount} dimensions of who you are.
            Now let&apos;s turn that into your Personal Constitution.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-8 mb-8"
        >
          <div className="text-center">
            <span className="text-3xl font-display text-accent">{answeredCount}</span>
            <p className="text-xs text-muted mt-1">Reflections</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-display text-accent">{phaseCount}</span>
            <p className="text-xs text-muted mt-1">Dimensions</p>
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
                placeholder="Your first name"
                className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
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
                placeholder="Your last name"
                className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
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
              placeholder="you@example.com"
              className="w-full bg-paper border border-muted/30 rounded-xl px-4 py-3 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
              required
            />
            <p className="text-xs text-muted mt-1.5">
              We&apos;ll send a copy to your inbox. No spam, no list.
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

            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
              className="bg-ink text-paper px-8 py-3 rounded-full text-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-ink/10"
            >
              Generate My Constitution
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
