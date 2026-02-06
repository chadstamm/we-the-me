'use client';

import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import SocialShareLinks from '@/components/ui/SocialShareLinks';

const steps = [
  {
    number: '01',
    title: 'Reflect',
    description: 'Answer guided questions that surface what you truly value, believe, and stand for.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Generate',
    description: 'AI synthesizes your answers into a structured Personal Constitution — written in your voice.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Use Everywhere',
    description: 'Load it into ChatGPT, Claude, Gemini — any AI. Watch generic answers become yours.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L13.5 9.5L21 8L14.5 12L21 16L13.5 14.5L12 22L10.5 14.5L3 16L9.5 12L3 8L10.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  );
}

export default function IntroStep() {
  const { dispatch } = useWizard();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col"
    >
      {/* ─── Hero ─── */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-light)_0%,_transparent_70%)] opacity-30" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <Ornament className="text-accent mx-auto" />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-accent uppercase tracking-[0.25em] text-xs font-medium mb-8"
          >
            AI doesn&apos;t know you. Yet.
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display text-ink leading-[0.95] mb-2"
          >
            We The{' '}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, y: -10 }}
                transition={{ delay: 2.8, duration: 0.5 }}
                className="relative"
              >
                People
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.1, duration: 0.5 }}
                className="absolute inset-0 text-accent"
              >
                Me
              </motion.span>
            </span>
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="ornament-line my-8 mx-auto max-w-xs"
          >
            <Ornament className="text-accent/40 w-3 h-3" />
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg md:text-xl text-ink-light max-w-lg mx-auto mb-3 leading-relaxed"
          >
            Every time you open AI, you start from zero.
            No context. No personalization. Generic answers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-lg md:text-xl text-ink max-w-lg mx-auto mb-12 leading-relaxed font-medium"
          >
            Your Personal Constitution changes that forever.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(176, 141, 87, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
            className="bg-ink text-paper px-12 py-4 rounded-full text-lg font-medium shadow-elevated hover:bg-ink-light"
          >
            Write Your Constitution
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-5 text-sm text-muted tracking-wide"
          >
            15 minutes &middot; Free &middot; Use it forever
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, y: [0, 6, 0] }}
          transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
          className="absolute bottom-8"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      {/* ─── How It Works ─── */}
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-[0.25em] text-muted mb-16"
          >
            How it works
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-paper rounded-2xl p-8 shadow-elevated hover:shadow-elevated-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-accent/30 font-display text-4xl">{step.number}</span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-display text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-ink-light leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── What is a Personal Constitution ─── */}
      <div className="bg-ink text-paper">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Ornament className="text-accent mx-auto mb-8" />

            <h2 className="text-3xl md:text-5xl font-display mb-8 leading-tight">
              What is a Personal Constitution?
            </h2>

            <p className="text-paper/70 leading-relaxed mb-6 text-lg">
              &ldquo;We The People&rdquo; defined a nation&apos;s identity.
              Your Personal Constitution defines <em className="text-accent not-italic font-medium">yours</em> —
              your values, beliefs, principles, and aspirations, written in your own words.
            </p>

            <p className="text-paper/70 leading-relaxed mb-6 text-lg">
              It&apos;s a context document designed to make every AI interaction
              personal. Upload it to ChatGPT, Claude, Gemini, or any custom GPT,
              and watch generic advice transform into guidance that fits your life.
            </p>

            <div className="ornament-line my-8 mx-auto max-w-xs">
              <Ornament className="text-accent/40 w-3 h-3" />
            </div>

            <p className="text-paper font-medium text-xl font-display leading-relaxed">
              Stop starting every conversation from zero.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <div className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(176, 141, 87, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
            className="bg-ink text-paper px-12 py-4 rounded-full text-lg font-medium shadow-elevated hover:bg-ink-light"
          >
            Begin Your Constitution
          </motion.button>
          <div className="mt-8">
            <SocialShareLinks />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
