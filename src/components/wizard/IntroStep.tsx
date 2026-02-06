'use client';

import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import SocialShareLinks from '@/components/ui/SocialShareLinks';

const steps = [
  {
    number: '01',
    title: 'Reflect',
    description:
      'Answer guided questions that surface what you truly value, believe, and stand for.',
  },
  {
    number: '02',
    title: 'Generate',
    description:
      'AI synthesizes your answers into a structured Personal Constitution — written in your voice.',
  },
  {
    number: '03',
    title: 'Use Everywhere',
    description:
      'Load it into ChatGPT, Claude, Gemini — any AI. Watch generic answers become yours.',
  },
];

export default function IntroStep() {
  const { dispatch } = useWizard();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex flex-col"
    >
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 max-w-3xl mx-auto">
        {/* Eyebrow — StoryBrand: Name the problem */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-6"
        >
          AI doesn&apos;t know you. Yet.
        </motion.p>

        {/* Headline — StoryBrand: The transformation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display text-ink leading-[1.1] mb-6"
        >
          We The People
          <br />
          <span className="relative inline-block">
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              className="relative"
            >
              People
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="absolute inset-0 text-accent"
            >
              Me
            </motion.span>
          </span>
        </motion.h1>

        {/* Subhead — StoryBrand: Empathy + clarity */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-ink-light max-w-xl mb-4 leading-relaxed"
        >
          Every time you open AI, you start from zero.
          No context. No personalization. Generic answers.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-ink max-w-xl mb-10 leading-relaxed font-medium"
        >
          Your Personal Constitution changes that.
          One document that tells AI exactly who you are.
        </motion.p>

        {/* CTA — StoryBrand: Call to action */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
          className="bg-ink text-paper px-10 py-4 rounded-full text-lg font-medium hover:bg-ink-light transition-colors shadow-lg shadow-ink/10"
        >
          Write Your Constitution
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-sm text-muted"
        >
          15 minutes &middot; Free &middot; Use it forever
        </motion.p>
      </div>

      {/* How It Works — StoryBrand: The plan */}
      <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm uppercase tracking-[0.15em] text-muted mb-8"
        >
          How it works
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="text-accent font-display text-3xl">
                {step.number}
              </span>
              <h3 className="text-lg font-medium text-ink mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What is a Personal Constitution — StoryBrand: Authority */}
      <div className="bg-paper border-y border-muted/10">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-ink mb-6">
              What is a Personal Constitution?
            </h2>
            <p className="text-ink-light leading-relaxed mb-4">
              &ldquo;We The People&rdquo; defined a nation&apos;s identity.
              Your Personal Constitution defines <em>yours</em> — your values,
              beliefs, principles, and aspirations, written in your own words.
            </p>
            <p className="text-ink-light leading-relaxed mb-4">
              It&apos;s a context document designed to make every AI interaction
              personal. Upload it to ChatGPT, Claude, Gemini, or any custom GPT,
              and watch generic advice transform into guidance that actually
              fits your life.
            </p>
            <p className="text-ink font-medium leading-relaxed">
              Stop starting every conversation from zero.
              Give AI the context it needs to truly help you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Social Share */}
      <div className="flex justify-center py-8">
        <SocialShareLinks />
      </div>
    </motion.div>
  );
}
