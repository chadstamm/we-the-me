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

          {/* Brand illustration — shield crest with quill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, type: 'spring', damping: 20 }}
            className="mb-10"
          >
            <svg width="200" height="220" viewBox="0 0 200 220" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Outer glow */}
              <defs>
                <radialGradient id="crestGlow" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="rgb(212,185,130)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Background glow */}
              <ellipse cx="100" cy="100" rx="90" ry="95" fill="url(#crestGlow)" />

              {/* Shield outline — elegant heraldic shape */}
              <motion.path
                d="M100 12 L168 45 C172 47 175 52 175 57 L175 105 C175 140 145 172 100 198 C55 172 25 140 25 105 L25 57 C25 52 28 47 32 45 Z"
                stroke="url(#goldShimmer)"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Inner shield line */}
              <motion.path
                d="M100 26 L158 54 C160 55 162 58 162 61 L162 103 C162 133 137 160 100 183 C63 160 38 133 38 103 L38 61 C38 58 40 55 42 54 Z"
                stroke="rgb(176,141,87)"
                strokeWidth="0.5"
                strokeOpacity="0.3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Quill feather — sweeping elegant curve */}
              <motion.path
                d="M68 155 C72 130 82 105 100 82 C105 75 112 70 118 72 C124 74 122 82 118 90 C110 106 98 120 92 140 L90 148"
                stroke="url(#goldShimmer)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 1.0, ease: 'easeOut' }}
              />

              {/* Feather barbs — delicate lines */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <line x1="105" y1="78" x2="125" y2="65" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                <line x1="108" y1="85" x2="128" y2="73" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                <line x1="110" y1="92" x2="130" y2="82" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                <line x1="107" y1="100" x2="125" y2="91" stroke="rgb(176,141,87)" strokeWidth="0.4" />
                <line x1="103" y1="108" x2="120" y2="100" stroke="rgb(176,141,87)" strokeWidth="0.4" />
              </motion.g>

              {/* Nib / pen tip */}
              <motion.path
                d="M90 148 L86 162 L92 152 Z"
                fill="rgb(176,141,87)"
                fillOpacity="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
              />

              {/* Written lines — text being authored */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              >
                <motion.line
                  x1="60" y1="95" x2="95" y2="95"
                  stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                />
                <motion.line
                  x1="55" y1="105" x2="88" y2="105"
                  stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                />
                <motion.line
                  x1="58" y1="115" x2="82" y2="115"
                  stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                />
              </motion.g>

              {/* Small star / sparkle accent at quill tip */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0, 1.2, 1] }}
                transition={{ delay: 2.2, duration: 0.8 }}
                style={{ transformOrigin: '86px 162px' }}
              >
                <circle cx="86" cy="162" r="2" fill="rgb(212,185,130)" fillOpacity="0.6" />
                <circle cx="86" cy="162" r="5" fill="none" stroke="rgb(212,185,130)" strokeWidth="0.3" strokeOpacity="0.3" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Headline with People→Me theatrical swap — single line */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display font-light text-paper text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] mb-2 tracking-tight"
          >
            We The{' '}
            <span className="relative inline-block">
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
