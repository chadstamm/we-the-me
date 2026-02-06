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

          {/* Brand illustration — ornate heraldic coat of arms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, type: 'spring', damping: 20 }}
            className="mb-10"
          >
            <svg width="240" height="280" viewBox="0 0 240 280" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="crestGlow" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="rgb(212,185,130)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="goldVertical" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgb(212,185,130)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Background glow */}
              <ellipse cx="120" cy="130" rx="110" ry="120" fill="url(#crestGlow)" />

              {/* ── CROWN / CORONET ── */}
              <motion.g
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Crown base band */}
                <motion.path
                  d="M88 42 L152 42"
                  stroke="url(#goldShimmer)" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
                {/* Crown points */}
                <motion.path
                  d="M90 42 L90 30 L100 36 L108 24 L120 38 L132 24 L140 36 L150 30 L150 42"
                  stroke="url(#goldShimmer)" strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
                {/* Crown jewel dots */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.4 }}>
                  <circle cx="108" cy="28" r="1.5" fill="rgb(212,185,130)" fillOpacity="0.7" />
                  <circle cx="120" cy="22" r="2" fill="rgb(212,185,130)" fillOpacity="0.8" />
                  <circle cx="132" cy="28" r="1.5" fill="rgb(212,185,130)" fillOpacity="0.7" />
                  <circle cx="90" cy="32" r="1" fill="rgb(212,185,130)" fillOpacity="0.5" />
                  <circle cx="150" cy="32" r="1" fill="rgb(212,185,130)" fillOpacity="0.5" />
                </motion.g>
                {/* Crown cross on top */}
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ delay: 1.3, duration: 0.4 }} style={{ transformOrigin: '120px 18px' }}>
                  <line x1="120" y1="14" x2="120" y2="22" stroke="rgb(212,185,130)" strokeWidth="0.8" />
                  <line x1="117" y1="17" x2="123" y2="17" stroke="rgb(212,185,130)" strokeWidth="0.8" />
                </motion.g>
              </motion.g>

              {/* ── MANTLING — flowing decorative fabric ── */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                {/* Left mantling — ornate flowing curves */}
                <motion.path
                  d="M72 55 C55 65 42 85 38 100 C35 110 38 118 45 112 C50 107 48 95 52 85 C56 75 50 100 42 120 C36 135 40 148 50 142 C58 137 55 125 58 115 C60 108 54 130 48 145 C44 155 48 162 55 158"
                  stroke="rgb(176,141,87)" strokeWidth="0.7" strokeOpacity="0.4" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 1.5, ease: 'easeOut' }}
                />
                {/* Right mantling — mirror */}
                <motion.path
                  d="M168 55 C185 65 198 85 202 100 C205 110 202 118 195 112 C190 107 192 95 188 85 C184 75 190 100 198 120 C204 135 200 148 190 142 C182 137 185 125 182 115 C180 108 186 130 192 145 C196 155 192 162 185 158"
                  stroke="rgb(176,141,87)" strokeWidth="0.7" strokeOpacity="0.4" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 1.5, ease: 'easeOut' }}
                />
              </motion.g>

              {/* ── SHIELD — main heraldic shape ── */}
              <motion.path
                d="M120 48 L172 72 C176 74 178 78 178 82 L178 140 C178 170 155 195 120 215 C85 195 62 170 62 140 L62 82 C62 78 64 74 68 72 Z"
                stroke="url(#goldShimmer)" strokeWidth="1.5" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Shield inner border — decorative double line */}
              <motion.path
                d="M120 56 L164 76 C166 77 167 80 167 82 L167 138 C167 163 148 185 120 203 C92 185 73 163 73 138 L73 82 C73 80 74 77 76 76 Z"
                stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.35" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              />

              {/* Shield decorative corner flourishes */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.6, duration: 0.6 }}>
                {/* Top left flourish */}
                <path d="M82 72 C85 68 90 66 95 68 C90 70 87 74 86 78" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="none" />
                {/* Top right flourish */}
                <path d="M158 72 C155 68 150 66 145 68 C150 70 153 74 154 78" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="none" />
              </motion.g>

              {/* ── SHIELD INTERIOR — heraldic charges ── */}

              {/* Horizontal division line */}
              <motion.line
                x1="76" y1="120" x2="164" y2="120"
                stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.25"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              />

              {/* Vertical division line */}
              <motion.line
                x1="120" y1="60" x2="120" y2="200"
                stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.15"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              />

              {/* Quill in upper left quadrant */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.6, duration: 0.6 }}>
                <path d="M95 75 C92 82 89 92 88 100 C88 103 90 104 92 102 C95 98 96 90 98 82 C99 78 100 76 95 75 Z" fill="rgb(176,141,87)" fillOpacity="0.3" />
                <path d="M95 75 C97 72 99 70 102 72" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="none" />
                <line x1="88" y1="105" x2="86" y2="112" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.5" />
              </motion.g>

              {/* Open book in upper right quadrant */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.7, duration: 0.6 }}>
                <path d="M132 85 C136 82 142 80 148 82 L148 105 C142 103 136 105 132 108 Z" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="rgb(176,141,87)" fillOpacity="0.08" />
                <path d="M132 85 C128 82 122 80 118 82 L118 105 C122 103 128 105 132 108 Z" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="rgb(176,141,87)" fillOpacity="0.08" />
                {/* Book text lines */}
                <line x1="122" y1="90" x2="130" y2="90" stroke="rgb(176,141,87)" strokeWidth="0.3" strokeOpacity="0.4" />
                <line x1="122" y1="94" x2="129" y2="94" stroke="rgb(176,141,87)" strokeWidth="0.3" strokeOpacity="0.3" />
                <line x1="134" y1="90" x2="145" y2="90" stroke="rgb(176,141,87)" strokeWidth="0.3" strokeOpacity="0.4" />
                <line x1="134" y1="94" x2="144" y2="94" stroke="rgb(176,141,87)" strokeWidth="0.3" strokeOpacity="0.3" />
              </motion.g>

              {/* Star / compass in lower left */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ delay: 1.8, duration: 0.5 }} style={{ transformOrigin: '97px 148px' }}>
                <path d="M97 135 L99 144 L108 144 L101 150 L103 159 L97 153 L91 159 L93 150 L86 144 L95 144 Z" stroke="rgb(176,141,87)" strokeWidth="0.5" fill="rgb(176,141,87)" fillOpacity="0.1" />
              </motion.g>

              {/* Heart in lower right — personalization */}
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ delay: 1.9, duration: 0.5 }} style={{ transformOrigin: '143px 148px' }}>
                <motion.path
                  d="M143 142 C143 138 147 134 151 134 C155 134 159 138 159 142 C159 150 143 160 143 160 C143 160 127 150 127 142 C127 138 131 134 135 134 C139 134 143 138 143 142 Z"
                  stroke="rgb(176,141,87)" strokeWidth="0.6" fill="rgb(176,141,87)" fillOpacity="0.1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                />
              </motion.g>

              {/* Central escutcheon — small inner shield */}
              <motion.path
                d="M120 108 L136 115 C137 115.5 138 117 138 118 L138 130 C138 138 130 145 120 150 C110 145 102 138 102 130 L102 118 C102 117 103 115.5 104 115 Z"
                stroke="url(#goldVertical)" strokeWidth="0.8" fill="rgb(176,141,87)" fillOpacity="0.06"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              />

              {/* Monogram "M" inside escutcheon */}
              <motion.text
                x="120" y="136" textAnchor="middle"
                fill="rgb(212,185,130)" fillOpacity="0.6"
                fontFamily="Cormorant Garamond, Georgia, serif" fontSize="18" fontWeight="300" letterSpacing="1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                M
              </motion.text>

              {/* ── LAUREL BRANCHES ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
                {/* Left laurel branch */}
                <motion.path
                  d="M58 210 C65 195 70 180 75 170 C78 164 80 160 82 158"
                  stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.5" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
                {/* Left leaves */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.6, duration: 0.6 }}>
                  <ellipse cx="60" cy="205" rx="4" ry="8" transform="rotate(-20 60 205)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="64" cy="195" rx="4" ry="7" transform="rotate(-25 64 195)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="68" cy="185" rx="3.5" ry="6.5" transform="rotate(-30 68 185)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="72" cy="176" rx="3" ry="6" transform="rotate(-35 72 176)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.06" />
                  <ellipse cx="76" cy="168" rx="3" ry="5" transform="rotate(-40 76 168)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.06" />
                </motion.g>

                {/* Right laurel branch */}
                <motion.path
                  d="M182 210 C175 195 170 180 165 170 C162 164 160 160 158 158"
                  stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.5" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
                {/* Right leaves */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.6, duration: 0.6 }}>
                  <ellipse cx="180" cy="205" rx="4" ry="8" transform="rotate(20 180 205)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="176" cy="195" rx="4" ry="7" transform="rotate(25 176 195)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="172" cy="185" rx="3.5" ry="6.5" transform="rotate(30 172 185)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.08" />
                  <ellipse cx="168" cy="176" rx="3" ry="6" transform="rotate(35 168 176)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.06" />
                  <ellipse cx="164" cy="168" rx="3" ry="5" transform="rotate(40 164 168)" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="rgb(176,141,87)" fillOpacity="0.06" />
                </motion.g>
              </motion.g>

              {/* ── BANNER / RIBBON ── */}
              <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.6 }}>
                {/* Ribbon shape */}
                <motion.path
                  d="M55 225 L68 220 L172 220 L185 225 L172 230 L68 230 Z"
                  stroke="url(#goldShimmer)" strokeWidth="0.8" fill="rgb(176,141,87)" fillOpacity="0.06"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                />
                {/* Ribbon tails */}
                <path d="M68 220 L60 215 L65 220 L60 225 L68 230" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
                <path d="M172 220 L180 215 L175 220 L180 225 L172 230" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
                {/* Ribbon text */}
                <motion.text
                  x="120" y="228" textAnchor="middle"
                  fill="rgb(212,185,130)" fillOpacity="0.5"
                  fontFamily="Cormorant Garamond, Georgia, serif" fontSize="8" fontWeight="400" letterSpacing="4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.6, duration: 0.5 }}
                >
                  KNOW THYSELF
                </motion.text>
              </motion.g>

              {/* ── ORNAMENTAL FILIGREE — fine details ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ delay: 2.0, duration: 0.8 }}>
                {/* Top scrollwork left */}
                <path d="M85 48 C82 50 78 48 76 52 C74 56 78 58 80 55 C82 52 80 48 85 48" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="none" />
                {/* Top scrollwork right */}
                <path d="M155 48 C158 50 162 48 164 52 C166 56 162 58 160 55 C158 52 160 48 155 48" stroke="rgb(176,141,87)" strokeWidth="0.4" fill="none" />
                {/* Small dots along shield top */}
                <circle cx="100" cy="52" r="0.8" fill="rgb(176,141,87)" />
                <circle cx="140" cy="52" r="0.8" fill="rgb(176,141,87)" />
                <circle cx="120" cy="48" r="1" fill="rgb(176,141,87)" />
                {/* Decorative curves below crown */}
                <path d="M95 44 C100 46 105 46 110 44" stroke="rgb(176,141,87)" strokeWidth="0.3" fill="none" />
                <path d="M130 44 C135 46 140 46 145 44" stroke="rgb(176,141,87)" strokeWidth="0.3" fill="none" />
              </motion.g>

              {/* ── FINAL SPARKLE — draws the eye ── */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.7], scale: [0, 1.3, 1] }}
                transition={{ delay: 2.6, duration: 0.8 }}
                style={{ transformOrigin: '120px 22px' }}
              >
                <circle cx="120" cy="14" r="1.5" fill="rgb(212,185,130)" fillOpacity="0.8" />
                <circle cx="120" cy="14" r="4" fill="none" stroke="rgb(212,185,130)" strokeWidth="0.3" strokeOpacity="0.4" />
                <circle cx="120" cy="14" r="7" fill="none" stroke="rgb(212,185,130)" strokeWidth="0.2" strokeOpacity="0.2" />
              </motion.g>
            </svg>
          </motion.div>

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
