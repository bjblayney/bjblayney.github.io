const bookData = [
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    subtitle: 'A personal photo archive',
    label: 'Gallery',
    description:
      'Personal photographs served from Firestore. Lazy-loaded with infinite scroll — production infrastructure, personal subject matter.',
    techStack: ['React', 'Firebase', 'Firestore'],
    date: '2024',
    type: 'gallery',
    priority: 'featured',
  },
  {
    id: 'work-for-hire',
    title: 'Work for Hire',
    subtitle: 'Client work, live in production',
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
      'A gradient cycling through the full hue spectrum. Pure CSS, nothing more.',
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
      'Three options. Choose two, sacrifice one. A small experiment in the psychology of trade-offs.',
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
      'Fresh development questions every day, with streak tracking and scoring. The tool I wanted and couldn\'t find.',
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
      'Canadian geography drills: provinces, territories, capitals. Multiple modes, increasing difficulty.',
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
      'Conjugation drills for Québécois French — present, past, and future tenses with spaced-repetition scoring. Built while learning.',
    techStack: ['React', 'JavaScript'],
    date: '2024',
    href: '/french-verb-trainer/',
    type: 'project',
    group: 'quizzes',
    priority: 'grouped',
  },
];

export default bookData;
