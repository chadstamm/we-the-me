import { WizardQuestion } from '@/types/wizard';

export const questions: WizardQuestion[] = [
  // ──────────────────────────────────────────────
  // Phase 1: Identity & Values
  // "Who you are when no one's watching"
  // ──────────────────────────────────────────────
  {
    id: 'core-values',
    phase: 1,
    phaseName: 'Identity & Values',
    question: 'What are the 3-5 values you\'d fight for — even when it\'s inconvenient?',
    subtext: 'Not the values that sound good on paper. The ones that actually cost you something.',
    considerations: [
      'When have you sacrificed comfort to protect a value?',
      'What do you judge others for? (This often reveals your deepest values.)',
      'What would you want people to say about you when you\'re not in the room?',
    ],
    inputType: 'textarea',
    placeholder: 'Be specific. "Integrity" is a start — but what does that look like in your real life?',
    required: true,
  },
  {
    id: 'value-regret',
    phase: 1,
    phaseName: 'Identity & Values',
    question: 'When have you compromised a value and deeply regretted it?',
    subtext: 'Our biggest regrets point to our truest convictions. This isn\'t about shame — it\'s about clarity.',
    inputType: 'textarea',
    placeholder: 'What happened, and what did it teach you about what you actually stand for?',
  },
  {
    id: 'surprising-value',
    phase: 1,
    phaseName: 'Identity & Values',
    question: 'What\'s a value you hold that others might find surprising or contradictory?',
    subtext: 'The most interesting people aren\'t one-dimensional. Where do you defy expectations?',
    inputType: 'textarea',
    placeholder: 'e.g., "I\'m fiercely competitive but believe winning means helping others win too..."',
  },
  {
    id: 'non-negotiables',
    phase: 1,
    phaseName: 'Identity & Values',
    question: 'What are your absolute non-negotiables — the lines you refuse to cross?',
    subtext: 'These are the boundaries that define you. The things that, if broken, would mean you\'ve lost yourself.',
    considerations: [
      'In how you treat people',
      'In your work and professional life',
      'In your relationship with yourself',
    ],
    inputType: 'textarea',
    placeholder: 'What rules do you have for yourself that you rarely break?',
    required: true,
  },

  // ──────────────────────────────────────────────
  // Phase 2: Beliefs & Worldview
  // "The lens through which you see everything"
  // ──────────────────────────────────────────────
  {
    id: 'world-beliefs',
    phase: 2,
    phaseName: 'Beliefs & Worldview',
    question: 'What do you believe about how the world works that shapes your decisions?',
    subtext: 'We all carry a mental model of how things work. Yours drives every choice you make.',
    considerations: [
      'What do you believe about human nature — are people fundamentally good?',
      'What do you believe about success, money, and ambition?',
      'What do you believe is the relationship between effort and outcomes?',
    ],
    inputType: 'textarea',
    placeholder: 'Share the beliefs that actually influence how you live, not just what you\'d put on a bumper sticker...',
    required: true,
  },
  {
    id: 'changed-belief',
    phase: 2,
    phaseName: 'Beliefs & Worldview',
    question: 'What\'s a belief you\'ve changed significantly in the last few years?',
    subtext: 'Growth means updating your operating system. What old belief did you shed — and what replaced it?',
    inputType: 'textarea',
    placeholder: 'I used to believe... but now I believe... because...',
  },
  {
    id: 'working-through',
    phase: 2,
    phaseName: 'Beliefs & Worldview',
    question: 'What\'s a belief you hold that you\'re still working through?',
    subtext: 'Not everything is resolved. The beliefs we\'re actively wrestling with say as much about us as the settled ones.',
    inputType: 'textarea',
    placeholder: 'Where are you in tension with yourself? What question are you still sitting with?',
  },

  // ──────────────────────────────────────────────
  // Phase 3: Principles & Standards
  // "Your operating system for daily life"
  // ──────────────────────────────────────────────
  {
    id: 'conflict-approach',
    phase: 3,
    phaseName: 'Principles & Standards',
    question: 'How do you want to handle conflict, failure, and criticism?',
    subtext: 'Character isn\'t revealed in easy moments. Define who you are when things get hard.',
    considerations: [
      'When someone disagrees with you publicly',
      'When you fail at something important',
      'When you receive criticism that stings',
    ],
    inputType: 'textarea',
    placeholder: 'When conflict arises, I will... When I fail, I will... When criticized, I will...',
    required: true,
  },
  {
    id: 'success-definition',
    phase: 3,
    phaseName: 'Principles & Standards',
    question: 'What\'s your honest definition of a life well-lived?',
    subtext: 'Not society\'s definition. Not your parents\'. Yours.',
    inputType: 'textarea',
    placeholder: 'If you looked back on your life at 90, what would make you think "I did it right"?',
    required: true,
  },
  {
    id: 'inconsistency',
    phase: 3,
    phaseName: 'Principles & Standards',
    question: 'What principle do you wish you followed more consistently?',
    subtext: 'The gap between who we are and who we want to be — that\'s the growth edge.',
    inputType: 'textarea',
    placeholder: 'Where is the distance between your stated values and your actual behavior?',
  },

  // ──────────────────────────────────────────────
  // Phase 4: Aspirations & Vision
  // "The person you're becoming"
  // ──────────────────────────────────────────────
  {
    id: 'future-self',
    phase: 4,
    phaseName: 'Aspirations & Vision',
    question: 'Who do you want to become in the next decade?',
    subtext: 'Not what you want to achieve — who you want to be. What qualities, capabilities, and ways of being are you growing into?',
    inputType: 'textarea',
    placeholder: 'In 10 years, the person I want to be is someone who...',
    required: true,
  },
  {
    id: 'legacy',
    phase: 4,
    phaseName: 'Aspirations & Vision',
    question: 'What\'s the legacy you want to leave?',
    subtext: 'Think beyond career. What impact do you want to have on the people and world around you?',
    inputType: 'textarea',
    placeholder: 'The mark I want to leave on the world is...',
  },
  {
    id: 'energy-map',
    phase: 4,
    phaseName: 'Aspirations & Vision',
    question: 'What gives you energy vs. what drains you?',
    subtext: 'Understanding your energy map is essential context. AI can\'t help you optimize a life it doesn\'t understand.',
    considerations: [
      'Types of work or activities',
      'Types of people or relationships',
      'Environments and circumstances',
    ],
    inputType: 'textarea',
    placeholder: 'I come alive when... I lose energy when...',
    required: true,
  },

  // ──────────────────────────────────────────────
  // Phase 5: The Unfiltered Truth
  // "What makes you, you"
  // ──────────────────────────────────────────────
  {
    id: 'secret-value',
    phase: 5,
    phaseName: 'The Unfiltered Truth',
    question: 'What do you secretly value that you\'re embarrassed to admit?',
    subtext: 'The things we hide often matter most. This is between you and your constitution.',
    inputType: 'textarea',
    placeholder: 'What drives you that you rarely say out loud?',
  },
  {
    id: 'afraid-becoming',
    phase: 5,
    phaseName: 'The Unfiltered Truth',
    question: 'What are you most afraid of becoming?',
    subtext: 'Your anti-goals are as defining as your goals. Name the version of yourself you refuse to accept.',
    inputType: 'textarea',
    placeholder: 'The person I never want to be is someone who...',
    required: true,
  },
  {
    id: 'identity-pride',
    phase: 5,
    phaseName: 'The Unfiltered Truth',
    question: 'What parts of your identity are you most proud of — and what labels do you reject?',
    subtext: 'Own what\'s yours. Reject what isn\'t. This helps AI understand how you see yourself.',
    inputType: 'textarea',
    placeholder: 'I proudly identify as... but I reject being called...',
  },
  {
    id: 'final-declaration',
    phase: 5,
    phaseName: 'The Unfiltered Truth',
    question: 'If you could tell the world one thing about who you really are, what would it be?',
    subtext: 'Your closing statement. The thing that, if people understood it, would change how they see you.',
    inputType: 'textarea',
    placeholder: 'The one thing I want the world to know about me is...',
    required: true,
  },
];
