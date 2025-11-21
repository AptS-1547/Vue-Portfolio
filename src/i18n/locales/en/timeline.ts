export default {
  title: 'Activity Timeline',
  subtitle: 'Recent activities, learning records and life updates',
  viewAll: 'View All',

  // Timeline entry type labels
  types: {
    github: 'GitHub Activity',
    learning: 'Learning Record',
    life: 'Life Update',
  },

  // Filters
  filters: {
    all: 'All',
    github: 'GitHub',
    learning: 'Learning',
    life: 'Life',
  },

  // GitHub event types
  githubEvents: {
    push: 'Pushed code',
    pull_request: 'Pull Request',
    issue: 'Issue',
    release: 'Released version',
    star: 'Starred repository',
    fork: 'Forked repository',
  },

  // Learning records
  learning: {
    count: 4,
    records: {
      0: {
        date: '2025-11-20T15:00:00Z',
        title: 'Learning Rust Programming Language',
        description:
          'Systematically learning Rust language features including ownership system, traits, lifetimes and other core concepts',
        topic: 'Rust Programming',
        source: 'The Rust Programming Language',
        tags: ['Rust', 'Programming Language', 'Systems Programming'],
      },
      1: {
        date: '2025-01-15T10:00:00Z',
        title: 'Deep Dive into Rust Ownership System',
        description:
          'Learned about Rust ownership, borrowing and lifetimes, gained deeper understanding of memory safety',
        topic: 'Rust Programming',
        source: 'The Rust Programming Language (Official Documentation)',
        tags: ['Rust', 'Programming Language', 'Systems Programming'],
      },
      2: {
        date: '2025-01-10T14:30:00Z',
        title: 'Learning Vue 3 Composition API Best Practices',
        description:
          'Studied design patterns and state management with Composition API, improved code maintainability',
        topic: 'Vue.js Framework',
        source: 'Vue 3 Official Documentation and Community Best Practices',
        tags: ['Vue.js', 'TypeScript', 'Frontend Development'],
      },
      3: {
        date: '2025-01-05T09:00:00Z',
        title: 'Researching Docker Multi-stage Build Optimization',
        description:
          'Learned how to use multi-stage builds to reduce image size and improve build efficiency',
        topic: 'Docker Containerization',
        source: 'Docker Official Documentation',
        tags: ['Docker', 'DevOps', 'Containerization'],
      },
    },
  },

  // Life updates
  life: {
    count: 4,
    updates: {
      0: {
        date: '2025-11-20T18:00:00Z',
        title: 'Routine Meeting with The ESAP Project Team',
        description:
          'Discussed project progress and development plans for the next phase, great team collaboration',
        mood: 'Fulfilled',
        icon: '👥',
        tags: ['Team Collaboration', 'ESAP Project'],
      },
      1: {
        date: '2025-11-20T12:00:00Z',
        title: 'Brainstorming Session with AutoBits',
        description:
          'Explored new ideas for automation tools, generated lots of interesting concepts',
        mood: 'Excited',
        icon: '💡',
        tags: ['Brainstorming', 'AutoBits', 'Innovation'],
      },
      2: {
        date: '2025-11-21T00:35:00Z',
        title: 'Refactored Personal Website Architecture',
        description:
          'Spent the whole day refactoring the entire website, changed from sidebar layout to single column, looks much cleaner',
        mood: 'Fulfilled',
        icon: '💻',
        tags: ['Programming', 'Web Development'],
      },
      3: {
        date: '2025-01-12T16:00:00Z',
        title: 'Started Learning New Tech Stack',
        description:
          'Decided to dive deep into Rust and WebAssembly, hoping to make breakthroughs in performance optimization',
        mood: 'Excited',
        icon: '🚀',
        tags: ['Learning', 'Technology'],
      },
    },
  },

  // Empty state
  empty: {
    title: 'No Activity',
    description: 'No timeline records yet',
  },

  // Loading and error states
  loading: 'Loading...',
  loadError: 'Load Failed',
  retry: 'Retry',
}
