const bookData = [
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    subtitle: 'A curated image collection',
    label: 'Gallery',
    description:
      'A gallery of photographs stored in Firestore. Browse images with lazy loading and infinite scroll.',
    techStack: ['React', 'Firebase', 'Firestore'],
    date: '2024',
    type: 'gallery',
    priority: 'featured',
  },
  {
    id: 'work-for-hire',
    title: 'Work for Hire',
    subtitle: 'Ships that left the harbour',
    label: 'Portfolio',
    type: 'work',
    href: '/work',
    priority: 'featured',
  },
  {
    id: 'gradient',
    title: 'Gradient',
    subtitle: 'An animated color field',
    label: 'Experiment',
    description:
      'A continuously rotating gradient that cycles through the full spectrum. Pure CSS animation with a dynamic angle parameter.',
    techStack: ['React', 'CSS'],
    date: '2024',
    type: 'demo',
    priority: 'standard',
  },
  {
    id: 'choice-paradox',
    title: 'The Choice Paradox',
    subtitle: 'Pick two, sacrifice one',
    label: 'Experiment',
    description:
      'A playful decision-making experiment. Given three desirable options, you must choose only two — exploring the psychology of trade-offs and opportunity cost.',
    techStack: ['React', 'JavaScript'],
    date: '2024',
    href: '/pick-two/',
    type: 'project',
    priority: 'standard',
  },
  {
    id: 'daily-quiz',
    title: 'Daily Quiz',
    subtitle: 'A daily development exercise engine',
    description:
      'A timed quiz application that serves a fresh set of development-related questions each day. Tracks streaks, scores, and progress over time.',
    techStack: ['React', 'JavaScript'],
    date: '2024',
    href: '/dev-reps/',
    type: 'project',
    group: 'quizzes',
    priority: 'grouped',
  },
  {
    id: 'geography-quiz',
    title: 'Geography Quiz',
    subtitle: 'Canadian geography drills',
    description:
      'An interactive quiz covering Canadian provinces, territories, capitals, and geographic features. Multiple game modes with increasing difficulty.',
    techStack: ['React', 'JavaScript'],
    date: '2024',
    href: '/can-geo-game/',
    type: 'project',
    group: 'quizzes',
    priority: 'grouped',
  },
  {
    id: 'french-verbs',
    title: 'French Canadian Verb Trainer',
    subtitle: 'Conjugation practice for Quebecois French',
    description:
      'A verb conjugation trainer focused on Canadian French. Drill present, past, and future tenses with spaced-repetition scoring.',
    techStack: ['React', 'JavaScript'],
    date: '2024',
    href: '/french-verb-trainer/',
    type: 'project',
    group: 'quizzes',
    priority: 'grouped',
  },
];

export default bookData;
