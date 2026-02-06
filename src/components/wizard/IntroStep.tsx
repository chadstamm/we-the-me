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

          {/* Brand illustration — engraved heraldic coat of arms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.0, type: 'spring', damping: 18 }}
            className="mb-10"
          >
            <svg width="260" height="300" viewBox="0 0 260 300" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="crestGlow" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.18" />
                  <stop offset="70%" stopColor="rgb(176,141,87)" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldH" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(155,120,70)" />
                  <stop offset="50%" stopColor="rgb(212,185,130)" />
                  <stop offset="100%" stopColor="rgb(155,120,70)" />
                </linearGradient>
                <linearGradient id="goldV" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgb(212,185,130)" />
                  <stop offset="100%" stopColor="rgb(145,115,65)" />
                </linearGradient>
                <linearGradient id="goldD" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="rgb(222,195,140)" />
                  <stop offset="100%" stopColor="rgb(155,120,70)" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="shieldFill" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="rgb(176,141,87)" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="ribbonFill" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgb(176,141,87)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(145,115,65)" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              {/* Background glow */}
              <ellipse cx="130" cy="140" rx="120" ry="130" fill="url(#crestGlow)" />

              {/* ── CROWN ── */}
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Crown filled body */}
                <motion.path
                  d="M96 48 L96 32 L108 40 L118 22 L130 42 L142 22 L152 40 L164 32 L164 48 Z"
                  fill="url(#shieldFill)" stroke="url(#goldH)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.0 }}
                />
                {/* Crown base band — thick */}
                <rect x="94" y="46" width="72" height="6" rx="1" fill="url(#goldH)" fillOpacity="0.3" stroke="url(#goldH)" strokeWidth="1.5" />
                {/* Crown band decoration — engraved lines */}
                <line x1="100" y1="49" x2="160" y2="49" stroke="rgb(212,185,130)" strokeWidth="0.5" strokeOpacity="0.5" />
                {/* Crown jewels — faceted look */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
                  <circle cx="118" cy="28" r="3" fill="rgb(212,185,130)" fillOpacity="0.15" stroke="rgb(212,185,130)" strokeWidth="1" />
                  <circle cx="118" cy="28" r="1.2" fill="rgb(222,200,145)" fillOpacity="0.8" />
                  <circle cx="130" cy="20" r="4" fill="rgb(212,185,130)" fillOpacity="0.15" stroke="rgb(212,185,130)" strokeWidth="1.2" />
                  <circle cx="130" cy="20" r="1.8" fill="rgb(222,200,145)" fillOpacity="0.9" />
                  <circle cx="142" cy="28" r="3" fill="rgb(212,185,130)" fillOpacity="0.15" stroke="rgb(212,185,130)" strokeWidth="1" />
                  <circle cx="142" cy="28" r="1.2" fill="rgb(222,200,145)" fillOpacity="0.8" />
                  {/* Side gems */}
                  <circle cx="102" cy="38" r="2" fill="rgb(212,185,130)" fillOpacity="0.1" stroke="rgb(212,185,130)" strokeWidth="0.8" />
                  <circle cx="158" cy="38" r="2" fill="rgb(212,185,130)" fillOpacity="0.1" stroke="rgb(212,185,130)" strokeWidth="0.8" />
                </motion.g>
                {/* Cross pattée on top */}
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.85, scale: 1 }} transition={{ delay: 1.4, duration: 0.4 }} style={{ transformOrigin: '130px 12px' }}>
                  <path d="M130 6 L132 10 L136 10 L132 13 L130 18 L128 13 L124 10 L128 10 Z" fill="rgb(212,185,130)" fillOpacity="0.7" stroke="rgb(212,185,130)" strokeWidth="0.5" />
                </motion.g>
              </motion.g>

              {/* ── HELM / TORSE (twisted wreath between crown and shield) ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.9, duration: 0.5 }}>
                <path d="M105 54 C110 56 115 54 120 56 C125 54 130 56 135 54 C140 56 145 54 150 56 C155 54 157 55 158 56" stroke="rgb(212,185,130)" strokeWidth="1.5" fill="none" />
                <path d="M102 57 C107 59 112 57 117 59 C122 57 127 59 132 57 C137 59 142 57 147 59 C152 57 157 58 160 59" stroke="rgb(176,141,87)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
              </motion.g>

              {/* ── MANTLING — thick flowing acanthus leaves ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1.0 }}>
                {/* Left mantling — multiple flowing layers */}
                <motion.path
                  d="M100 56 C82 62 60 78 48 100 C42 112 44 122 52 118 C58 115 56 102 62 90 C66 82 60 96 50 115 C44 128 48 140 58 135 C66 130 60 116 64 106 C68 96 58 120 50 138 C44 152 50 162 60 156 C68 150 62 136 66 126 C70 116 60 142 55 158 C52 168 56 176 64 170"
                  stroke="url(#goldD)" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 2.0, ease: 'easeOut' }}
                />
                {/* Left inner mantling detail */}
                <motion.path
                  d="M96 58 C80 64 64 78 54 96 C48 108 52 116 56 112 C62 106 58 96 64 86 C68 78 62 98 56 112 C50 126 56 134 62 128"
                  stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                />
                {/* Left acanthus leaf curls */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.0, duration: 0.6 }}>
                  <path d="M48 100 C44 96 40 98 42 104 C44 108 48 106 48 100" fill="rgb(176,141,87)" fillOpacity="0.15" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M50 118 C46 114 42 116 44 122 C46 126 50 124 50 118" fill="rgb(176,141,87)" fillOpacity="0.12" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M50 140 C46 136 42 138 44 144 C46 148 50 146 50 140" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                </motion.g>

                {/* Right mantling — mirror of left */}
                <motion.path
                  d="M160 56 C178 62 200 78 212 100 C218 112 216 122 208 118 C202 115 204 102 198 90 C194 82 200 96 210 115 C216 128 212 140 202 135 C194 130 200 116 196 106 C192 96 202 120 210 138 C216 152 210 162 200 156 C192 150 198 136 194 126 C190 116 200 142 205 158 C208 168 204 176 196 170"
                  stroke="url(#goldD)" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 2.0, ease: 'easeOut' }}
                />
                {/* Right inner mantling detail */}
                <motion.path
                  d="M164 58 C180 64 196 78 206 96 C212 108 208 116 204 112 C198 106 202 96 196 86 C192 78 198 98 204 112 C210 126 204 134 198 128"
                  stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                />
                {/* Right acanthus leaf curls */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.0, duration: 0.6 }}>
                  <path d="M212 100 C216 96 220 98 218 104 C216 108 212 106 212 100" fill="rgb(176,141,87)" fillOpacity="0.15" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M210 118 C214 114 218 116 216 122 C214 126 210 124 210 118" fill="rgb(176,141,87)" fillOpacity="0.12" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M210 140 C214 136 218 138 216 144 C214 148 210 146 210 140" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                </motion.g>
              </motion.g>

              {/* ── SHIELD — main shape with fill and depth ── */}
              {/* Shield shadow/depth */}
              <motion.path
                d="M130 62 L185 88 C189 90 192 95 192 100 L192 158 C192 190 167 216 130 236 C93 216 68 190 68 158 L68 100 C68 95 71 90 75 88 Z"
                fill="rgb(176,141,87)" fillOpacity="0.04"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              {/* Shield outer border */}
              <motion.path
                d="M130 62 L185 88 C189 90 192 95 192 100 L192 158 C192 190 167 216 130 236 C93 216 68 190 68 158 L68 100 C68 95 71 90 75 88 Z"
                stroke="url(#goldD)" strokeWidth="2.5" fill="url(#shieldFill)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              />
              {/* Shield inner border */}
              <motion.path
                d="M130 70 L178 93 C180 94 182 97 182 100 L182 155 C182 183 161 206 130 224 C99 206 78 183 78 155 L78 100 C78 97 80 94 82 93 Z"
                stroke="rgb(176,141,87)" strokeWidth="1.2" strokeOpacity="0.5" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              />
              {/* Third inner line for engraved feel */}
              <motion.path
                d="M130 76 L174 96 C175 96.5 176 98 176 100 L176 152 C176 178 157 200 130 216 C103 200 84 178 84 152 L84 100 C84 98 85 96.5 86 96 Z"
                stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.25" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 1.0 }}
              />

              {/* ── SHIELD INTERIOR ── */}

              {/* Horizontal band (fess) with fill */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
                <path d="M82 130 L130 130 L178 130 L176 140 L130 140 L84 140 Z" fill="rgb(176,141,87)" fillOpacity="0.06" />
                <line x1="82" y1="130" x2="178" y2="130" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="84" y1="140" x2="176" y2="140" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" />
              </motion.g>

              {/* UPPER: Large quill & parchment — writing your constitution */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1.6, duration: 0.8 }}>
                {/* Parchment/scroll */}
                <path d="M108 88 L152 88 C154 88 156 90 156 92 L156 122 C156 124 154 126 152 126 L108 126 C106 126 104 124 104 122 L104 92 C104 90 106 88 108 88 Z" fill="rgb(176,141,87)" fillOpacity="0.05" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" />
                {/* Scroll curl top */}
                <path d="M104 92 C102 88 104 85 108 85 L152 85 C156 85 158 88 156 92" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                {/* Scroll curl bottom */}
                <path d="M104 122 C102 126 104 129 108 129 L152 129 C156 129 158 126 156 122" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
                {/* Text lines on parchment */}
                <line x1="112" y1="96" x2="148" y2="96" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="112" y1="101" x2="146" y2="101" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.3" />
                <line x1="112" y1="106" x2="144" y2="106" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.25" />
                <line x1="112" y1="111" x2="140" y2="111" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.2" />
                <line x1="112" y1="116" x2="136" y2="116" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.15" />
                {/* Quill feather writing on scroll */}
                <path d="M150 82 C145 90 142 100 140 110 C139 115 140 118 142 116 C144 112 145 104 148 94 C150 88 152 84 150 82 Z" fill="rgb(212,185,130)" fillOpacity="0.2" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.5" />
                {/* Feather vane lines */}
                <line x1="150" y1="82" x2="158" y2="76" stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.3" />
                <line x1="149" y1="86" x2="157" y2="80" stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.3" />
                <line x1="148" y1="90" x2="156" y2="84" stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.25" />
                {/* Nib */}
                <path d="M140 110 L138 118 L142 116" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.5" fill="rgb(212,185,130)" fillOpacity="0.15" />
              </motion.g>

              {/* LOWER: Personalization symbols — fingerprint + heart */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.8, duration: 0.8 }}>
                {/* Stylized fingerprint / identity whorl — left side */}
                <g transform="translate(108, 165)">
                  <motion.path d="M0 0 C4 -6 12 -6 16 0 C20 6 16 14 8 14 C2 14 -2 10 0 4" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.0, duration: 0.6 }} />
                  <motion.path d="M3 2 C5 -2 11 -2 13 2 C15 6 12 10 8 10 C5 10 2 7 3 4" stroke="rgb(176,141,87)" strokeWidth="0.6" strokeOpacity="0.4" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.1, duration: 0.5 }} />
                  <motion.path d="M5.5 3 C7 1 10 1 11 3 C12 5 10 7 8 7 C6.5 7 5 5.5 5.5 4" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.3" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.2, duration: 0.4 }} />
                </g>

                {/* Heart — bold, with shading */}
                <g transform="translate(130, 155)">
                  <motion.path
                    d="M12 6 C12 2 16 -2 20 -2 C24 -2 28 2 28 6 C28 14 12 24 12 24 C12 24 -4 14 -4 6 C-4 2 0 -2 4 -2 C8 -2 12 2 12 6 Z"
                    fill="rgb(176,141,87)" fillOpacity="0.08" stroke="rgb(176,141,87)" strokeWidth="1.2" strokeOpacity="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                  />
                  {/* Heart highlight */}
                  <path d="M6 4 C6 1 9 -1 11 1" stroke="rgb(212,185,130)" strokeWidth="0.4" strokeOpacity="0.4" fill="none" />
                </g>

                {/* Decorative divider between lower symbols */}
                <line x1="126" y1="152" x2="126" y2="186" stroke="rgb(176,141,87)" strokeWidth="0.4" strokeOpacity="0.2" />
              </motion.g>

              {/* ── Central "M" escutcheon on the fess band ── */}
              <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0, duration: 0.6 }} style={{ transformOrigin: '130px 135px' }}>
                {/* Mini shield */}
                <path d="M130 124 L146 130 C147 130.5 148 132 148 133 L148 142 C148 149 140 155 130 160 C120 155 112 149 112 142 L112 133 C112 132 113 130.5 114 130 Z"
                  fill="rgb(20,20,18)" fillOpacity="0.3" stroke="url(#goldV)" strokeWidth="1.5" />
                {/* M monogram — bolder */}
                <motion.text
                  x="130" y="149" textAnchor="middle"
                  fill="rgb(212,185,130)" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="22" fontWeight="600" letterSpacing="1"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                >
                  M
                </motion.text>
              </motion.g>

              {/* ── LAUREL BRANCHES — fuller, more realistic ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.0 }}>
                {/* Left branch stem */}
                <motion.path
                  d="M66 246 C72 232 78 218 84 206 C90 194 94 186 98 180 C100 176 102 174 103 172"
                  stroke="rgb(176,141,87)" strokeWidth="1.5" strokeOpacity="0.6" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.4, duration: 1.0 }}
                />
                {/* Left leaves — pairs along the stem */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8, duration: 0.8 }}>
                  <path d="M68 242 C62 238 58 230 60 224 C64 228 68 234 68 242" fill="rgb(176,141,87)" fillOpacity="0.15" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M72 234 C66 230 62 222 64 216 C68 220 72 226 72 234" fill="rgb(176,141,87)" fillOpacity="0.13" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M76 224 C70 220 68 212 70 208 C74 212 76 218 76 224" fill="rgb(176,141,87)" fillOpacity="0.12" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M82 214 C76 210 74 202 76 198 C80 202 82 208 82 214" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M88 204 C82 200 80 194 82 190 C86 194 88 198 88 204" fill="rgb(176,141,87)" fillOpacity="0.09" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M94 194 C88 190 86 184 88 180 C92 184 94 188 94 194" fill="rgb(176,141,87)" fillOpacity="0.08" stroke="rgb(176,141,87)" strokeWidth="0.4" />
                  {/* Outer leaves */}
                  <path d="M66 238 C72 236 76 230 74 226 C70 228 66 232 66 238" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M70 228 C76 226 80 220 78 216 C74 218 70 222 70 228" fill="rgb(176,141,87)" fillOpacity="0.08" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M76 218 C82 216 84 210 82 206 C78 208 76 212 76 218" fill="rgb(176,141,87)" fillOpacity="0.07" stroke="rgb(176,141,87)" strokeWidth="0.4" />
                </motion.g>

                {/* Right branch stem */}
                <motion.path
                  d="M194 246 C188 232 182 218 176 206 C170 194 166 186 162 180 C160 176 158 174 157 172"
                  stroke="rgb(176,141,87)" strokeWidth="1.5" strokeOpacity="0.6" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.4, duration: 1.0 }}
                />
                {/* Right leaves */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8, duration: 0.8 }}>
                  <path d="M192 242 C198 238 202 230 200 224 C196 228 192 234 192 242" fill="rgb(176,141,87)" fillOpacity="0.15" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M188 234 C194 230 198 222 196 216 C192 220 188 226 188 234" fill="rgb(176,141,87)" fillOpacity="0.13" stroke="rgb(176,141,87)" strokeWidth="0.6" />
                  <path d="M184 224 C190 220 192 212 190 208 C186 212 184 218 184 224" fill="rgb(176,141,87)" fillOpacity="0.12" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M178 214 C184 210 186 202 184 198 C180 202 178 208 178 214" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M172 204 C178 200 180 194 178 190 C174 194 172 198 172 204" fill="rgb(176,141,87)" fillOpacity="0.09" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M166 194 C172 190 174 184 172 180 C168 184 166 188 166 194" fill="rgb(176,141,87)" fillOpacity="0.08" stroke="rgb(176,141,87)" strokeWidth="0.4" />
                  {/* Outer leaves */}
                  <path d="M194 238 C188 236 184 230 186 226 C190 228 194 232 194 238" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M190 228 C184 226 180 220 182 216 C186 218 190 222 190 228" fill="rgb(176,141,87)" fillOpacity="0.08" stroke="rgb(176,141,87)" strokeWidth="0.5" />
                  <path d="M184 218 C178 216 176 210 178 206 C182 208 184 212 184 218" fill="rgb(176,141,87)" fillOpacity="0.07" stroke="rgb(176,141,87)" strokeWidth="0.4" />
                </motion.g>
              </motion.g>

              {/* ── BANNER RIBBON — substantial with folds ── */}
              <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.7 }}>
                {/* Ribbon back folds */}
                <path d="M56 255 L68 250 L68 262 L56 267 Z" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" />
                <path d="M204 255 L192 250 L192 262 L204 267 Z" fill="rgb(176,141,87)" fillOpacity="0.1" stroke="rgb(176,141,87)" strokeWidth="0.8" strokeOpacity="0.4" />
                {/* Main ribbon body */}
                <path d="M68 248 L192 248 L192 262 L68 262 Z" fill="url(#ribbonFill)" stroke="url(#goldD)" strokeWidth="1.5" />
                {/* Ribbon fold shadows */}
                <line x1="68" y1="248" x2="68" y2="262" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="192" y1="248" x2="192" y2="262" stroke="rgb(176,141,87)" strokeWidth="0.5" strokeOpacity="0.3" />
                {/* Ribbon tail cuts */}
                <path d="M56 255 L48 250 L56 255 L48 260 L56 267" stroke="rgb(176,141,87)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <path d="M204 255 L212 250 L204 255 L212 260 L204 267" stroke="rgb(176,141,87)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                {/* Ribbon text — larger, bolder */}
                <motion.text
                  x="130" y="259" textAnchor="middle"
                  fill="rgb(212,185,130)" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="10" fontWeight="600" letterSpacing="5"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
                  transition={{ delay: 2.6, duration: 0.6 }}
                >
                  KNOW THYSELF
                </motion.text>
              </motion.g>

              {/* ── SHIELD CORNER DECORATIONS — engraved flourishes ── */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 2.0, duration: 0.8 }}>
                {/* Top scrollwork */}
                <path d="M90 64 C86 60 82 62 82 66 C82 70 86 72 90 68 C92 66 90 62 86 62 C82 62 80 66 82 70" stroke="rgb(176,141,87)" strokeWidth="0.8" fill="none" />
                <path d="M170 64 C174 60 178 62 178 66 C178 70 174 72 170 68 C168 66 170 62 174 62 C178 62 180 66 178 70" stroke="rgb(176,141,87)" strokeWidth="0.8" fill="none" />
                {/* Bottom shield tip decoration */}
                <path d="M124 230 C126 234 128 236 130 238 C132 236 134 234 136 230" stroke="rgb(176,141,87)" strokeWidth="0.6" fill="none" />
                <circle cx="130" cy="240" r="1.5" fill="rgb(212,185,130)" fillOpacity="0.4" />
              </motion.g>

              {/* ── FINAL GLEAM ── */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0, 1.5, 1] }}
                transition={{ delay: 2.8, duration: 1.0 }}
                style={{ transformOrigin: '130px 10px' }}
              >
                <circle cx="130" cy="6" r="2" fill="rgb(222,200,145)" fillOpacity="0.9" />
                <circle cx="130" cy="6" r="5" fill="none" stroke="rgb(212,185,130)" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="130" cy="6" r="9" fill="none" stroke="rgb(212,185,130)" strokeWidth="0.3" strokeOpacity="0.2" />
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
