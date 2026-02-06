'use client';

import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import SocialShareLinks from '@/components/ui/SocialShareLinks';

const features = [
  {
    number: '01',
    title: 'Guided Reflection',
    description:
      'Answer thoughtful questions about your values, purpose, and commitments at your own pace.',
  },
  {
    number: '02',
    title: 'AI-Crafted Document',
    description:
      'Your answers are transformed into a beautifully structured Personal Constitution unique to you.',
  },
  {
    number: '03',
    title: 'Your North Star',
    description:
      'Download, print, and revisit your constitution whenever you need clarity on who you are.',
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-6"
        >
          Define Who You Are
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display text-ink leading-[1.1] mb-6"
        >
          Write Your
          <br />
          Personal Constitution
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-ink-light max-w-xl mb-10 leading-relaxed"
        >
          Every nation has a constitution. Now it&apos;s your turn.
          Answer a few guided questions and receive a beautifully crafted
          document that defines your values, purpose, and commitments.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
          className="bg-ink text-paper px-10 py-4 rounded-full text-lg font-medium hover:bg-ink-light transition-colors"
        >
          Begin Your Constitution
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-sm text-muted"
        >
          Takes about 10 minutes &middot; Completely free
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="text-accent font-display text-3xl">
                {feature.number}
              </span>
              <h3 className="text-lg font-medium text-ink mt-2 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Share */}
      <div className="flex justify-center pb-8">
        <SocialShareLinks />
      </div>
    </motion.div>
  );
}
