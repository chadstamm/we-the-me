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
      className="min-h-screen flex flex-col"
    >
      {/* Progress bar at top — full */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-cream">
        <div className="h-full bg-accent w-full" />
      </div>

      {/* Header */}
      <div className="px-6 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <Logo
          size="sm"
          onClick={() => dispatch({ type: 'SET_STEP', step: 0 })}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-display font-light text-ink mb-4 leading-tight">
            Your reflections are in
          </h2>
          <p className="text-ink-light leading-relaxed font-body">
            Time to turn them into something every AI will understand.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-10 w-full"
        >
          {[
            { value: answeredCount, label: 'Reflections' },
            { value: phaseCount, label: 'Dimensions' },
            { value: 1, label: 'Constitution' },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 bg-paper rounded-xl p-4 text-center shadow-elevated">
              <span className="text-2xl font-display font-light text-accent block">{stat.value}</span>
              <p className="text-[11px] text-muted mt-1 uppercase tracking-[0.15em] font-body">{stat.label}</p>
            </div>
          ))}
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
              <label htmlFor="firstName" className="block text-[11px] text-muted uppercase tracking-[0.15em] mb-2 font-body">
                First name *
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="w-full bg-paper border border-muted/20 rounded-xl px-4 py-3.5 text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:shadow-elevated"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[11px] text-muted uppercase tracking-[0.15em] mb-2 font-body">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your last name"
                className="w-full bg-paper border border-muted/20 rounded-xl px-4 py-3.5 text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:shadow-elevated"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[11px] text-muted uppercase tracking-[0.15em] mb-2 font-body">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-paper border border-muted/20 rounded-xl px-4 py-3.5 text-ink font-body placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:shadow-elevated"
              required
            />
            <p className="text-[11px] text-muted mt-2 font-body">
              We&apos;ll send a copy to your inbox. No spam, ever.
            </p>
          </div>

          <div className="flex items-center justify-between pt-6">
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

            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02, boxShadow: '0 8px 30px rgba(176, 141, 87, 0.25)' } : {}}
              whileTap={isValid ? { scale: 0.97 } : {}}
              className="bg-ink text-paper px-10 py-3.5 rounded-full text-sm font-medium font-body hover:bg-accent hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed shadow-elevated uppercase"
            >
              Generate My Constitution
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
