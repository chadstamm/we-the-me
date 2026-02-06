'use client';

import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';

const steps = [
  {
    number: '01',
    title: 'Reflect',
    description: 'Guided questions surface what you truly value, believe, and stand for — in your own words.',
  },
  {
    number: '02',
    title: 'Generate',
    description: 'AI synthesizes your reflections into a structured Personal Constitution, written in your voice.',
  },
  {
    number: '03',
    title: 'Use Everywhere',
    description: 'Upload to ChatGPT, Claude, or Gemini. Watch generic answers become genuinely yours.',
  },
];

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
      {/* ─── DARK HERO ─── */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden bg-ink">
        {/* Atmospheric gradient — gold glow from above */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(176,141,87,0.15),transparent)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-10"
          />

          {/* PROBLEM — The StoryBrand hook */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-accent uppercase tracking-[0.3em] text-[11px] font-medium mb-10 font-body"
          >
            Your AI doesn&apos;t know you
          </motion.p>

          {/* Headline with People→Me theatrical swap — "The" centered */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display font-light text-paper text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] mb-2 tracking-tight flex items-baseline justify-center"
          >
            <span className="inline-block w-[2.6em] text-right">We</span>
            <span className="inline-block mx-[0.2em]">The</span>
            <span className="relative inline-block w-[2.6em] text-left">
              <motion.span
                initial={{ opacity: 1, filter: 'blur(0px)' }}
                animate={{ opacity: 0, filter: 'blur(8px)', y: -8 }}
                transition={{ delay: 2.8, duration: 0.6 }}
                className="relative"
              >
                People
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 3.2, duration: 0.6, type: 'spring', damping: 15, stiffness: 150 }}
                className="absolute left-0 top-0 text-accent animate-glow"
              >
                Me
              </motion.span>
            </span>
          </motion.h1>

          {/* Subheader */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="text-2xl md:text-3xl font-display font-light text-paper/40 mt-4 tracking-wide"
          >
            Personal Constitution Generator
          </motion.p>

          {/* Scroll icon — white and gold */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 mb-2"
          >
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Scroll body */}
              <rect x="8" y="6" width="24" height="30" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              {/* Top curl */}
              <path d="M8 8 C6 4 8 1 12 1 L28 1 C32 1 34 4 32 8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
              {/* Bottom curl */}
              <path d="M8 34 C6 38 8 41 12 41 L28 41 C32 41 34 38 32 34" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
              {/* Text lines — alternating white and gold */}
              <line x1="13" y1="13" x2="27" y2="13" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <line x1="13" y1="17" x2="25" y2="17" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.35" />
              <line x1="13" y1="21" x2="26" y2="21" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1="13" y1="25" x2="23" y2="25" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.3" />
              <line x1="13" y1="29" x2="21" y2="29" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              {/* Seal / stamp at bottom right */}
              <circle cx="28" cy="33" r="3.5" fill="rgb(176,141,87)" fillOpacity="0.2" stroke="rgb(212,185,130)" strokeWidth="0.6" strokeOpacity="0.5" />
              <circle cx="28" cy="33" r="1.5" fill="rgb(212,185,130)" fillOpacity="0.4" />
            </svg>
          </motion.div>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.4, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-paper to-transparent mx-auto my-10"
          />

          {/* EMPATHY — Shows understanding */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xl md:text-2xl text-paper/60 max-w-xl mx-auto mb-4 leading-relaxed font-light font-body"
          >
            You&apos;ve had a thousand conversations with AI.
            <br className="hidden md:block" />
            Not one of them knew who you were.
          </motion.p>

          {/* ANSWER — The solution */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="text-xl md:text-2xl text-paper max-w-xl mx-auto mb-14 leading-relaxed font-display italic"
          >
            A Personal Constitution changes that.
          </motion.p>

          {/* CTA — Gold on dark for maximum contrast */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(176, 141, 87, 0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
            className="bg-accent text-ink px-14 py-4 rounded-full text-base font-medium shadow-elevated hover:bg-accent-hover font-body tracking-wide uppercase"
          >
            Write Yours
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-6 text-sm text-paper/30 tracking-wide font-body"
          >
            15 minutes &middot; Free &middot; Yours forever
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3, y: [0, 6, 0] }}
          transition={{ delay: 2.0, y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}
          className="absolute bottom-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-paper">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <div className="py-28 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.25em] text-ink font-medium mb-20 font-body"
          >
            Three steps to being understood
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative group"
              >
                {/* Oversized number — breaks the grid, overlaps */}
                <span className="absolute -top-8 -left-2 text-[7rem] font-display font-light text-accent/[0.07] leading-none select-none pointer-events-none">
                  {step.number}
                </span>
                <div className="relative bg-paper rounded-2xl p-8 pt-10 shadow-elevated hover:shadow-elevated-lg transition-shadow duration-500">
                  <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 font-body">Step {step.number}</p>
                  <h3 className="text-2xl font-display font-semibold text-ink mb-3">{step.title}</h3>
                  <p className="text-sm text-ink-light leading-relaxed font-body">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── WHAT IS A CONSTITUTION — CHANGE section ─── */}
      <div className="bg-ink text-paper relative overflow-hidden">
        {/* Subtle gradient accent from bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(176,141,87,0.08),transparent)]" />

        <div className="max-w-2xl mx-auto px-4 py-28 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Large decorative quote mark */}
            <span className="block text-[8rem] leading-none font-display text-accent/10 select-none pointer-events-none mb-[-3rem]">
              &ldquo;
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-light mb-10 leading-tight">
              What is a <br className="hidden sm:block" />Personal Constitution?
            </h2>

            <p className="text-paper/60 leading-relaxed mb-6 text-lg font-body font-light">
              A Personal Constitution is your comprehensive resource containing everything
              about you: your life, your goals, your challenges, your work, your family,
              your personality, and your hopes and dreams.
            </p>

            <p className="text-paper leading-relaxed mb-6 text-lg font-body font-light">
              It&apos;s a structured capture of your values, beliefs, principles, and aspirations &mdash;
              written in your own words. The context document that makes AI actually
              understand you.
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto my-10" />

            {/* END RESULT — Life after */}
            <p className="text-paper font-display text-2xl md:text-3xl font-light leading-snug italic">
              Upload it <span className="text-accent">once</span>. Every conversation
              <br className="hidden sm:block" /> becomes <span className="text-accent">personal</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <div className="py-24 px-4 text-center bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-ink text-lg font-medium mb-8 font-body">Ready to be understood?</p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(176, 141, 87, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
            className="bg-ink text-paper px-14 py-4 rounded-full text-base font-medium shadow-elevated hover:bg-accent hover:text-ink font-body tracking-wide uppercase"
          >
            Begin Your Constitution
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
