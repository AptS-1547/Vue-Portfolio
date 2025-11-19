export default {
  shortlinker: {
    title: 'ShortLinker',
    description: 'High-Performance URL Shortener built with Rust and Actix-web',
    longDescription:
      'ShortLinker is a minimalist yet powerful URL shortener service built from the ground up with Rust and Actix-web. Designed for maximum performance and reliability, it supports HTTP 307 redirection and achieves exceptional throughput through smart caching strategies and Bloom filters.',
    features: [
      'HTTP 307 redirection for better SEO and user experience',
      'Achieves 700k+ QPS with optimized caching layer',
      'Bloom filters for efficient URL existence checking',
      'Support for both SQLite and JSON storage backends',
      'Built-in admin API for URL management',
      'Configurable URL expiration support',
      'Cross-platform deployment with Docker',
      'Minimal memory footprint and fast startup',
    ],
    techStack: {
      backend: [
        { name: 'Rust', purpose: 'Core language for performance' },
        { name: 'Actix-web', purpose: 'High-performance web framework' },
        { name: 'SQLite', purpose: 'Embedded database for persistence' },
        { name: 'Bloom Filter', purpose: 'Efficient URL existence checking' },
      ],
      tools: [
        { name: 'Docker', purpose: 'Containerization and deployment' },
        { name: 'GitHub Actions', purpose: 'CI/CD pipeline' },
        { name: 'Cargo', purpose: 'Package management and building' },
      ],
    },
    performance: [
      { name: 'QPS', value: '700K+' },
      { name: 'Memory Usage', value: '<50MB' },
      { name: 'Startup Time', value: '<100ms' },
    ],
  },

  'ferrus-gate': {
    title: 'Ferrus Gate',
    description: 'Modern Identity Gateway supporting OAuth2, OIDC, SAML, and FIDO2',
    longDescription:
      'Ferrus Gate is a comprehensive identity gateway solution built with Rust, designed to provide unified authentication entry and account management for distributed systems. It supports multiple authentication protocols including OAuth2, OpenID Connect, SAML, and modern FIDO2/WebAuthn standards.',
    features: [
      'Multi-protocol support (OAuth2, OIDC, SAML, FIDO2)',
      'Passwordless authentication with FIDO2/WebAuthn',
      'Multi-tenant architecture for enterprise deployments',
      'Pluggable authentication providers',
      'Multi-factor authentication (MFA) support',
      'Session management and SSO capabilities',
      'Admin dashboard for user and tenant management',
      'API-first design with comprehensive REST APIs',
    ],
    techStack: {
      backend: [
        { name: 'Rust', purpose: 'Core system implementation' },
        { name: 'Actix-web', purpose: 'Modern async web framework' },
        { name: 'PostgreSQL', purpose: 'Primary data storage' },
        { name: 'Redis', purpose: 'Session and cache management' },
      ],
      frontend: [
        { name: 'Vue.js 3', purpose: 'Admin dashboard frontend' },
        { name: 'TypeScript', purpose: 'Type-safe development' },
        { name: 'Tailwind CSS', purpose: 'Utility-first styling' },
      ],
      tools: [
        { name: 'Docker Compose', purpose: 'Local development environment' },
        { name: 'Kubernetes', purpose: 'Production deployment' },
        { name: 'OpenAPI', purpose: 'API documentation' },
      ],
    },
  },

  nebulink: {
    title: 'Nebulink',
    description: 'Distributed acceleration management platform based on global cloud nodes',
    longDescription:
      'Nebulink is a distributed acceleration management platform based on global cloud nodes, dedicated to building an efficient, flexible, and scalable CDN control system. It aims to weave global nodes into a nebula and accelerate services through intelligent routing and load balancing.',
    features: [
      'Global node registration and heartbeat monitoring',
      'Multi-node latency detection and load balancing',
      'Intelligent routing and acceleration logic',
      'Configuration center with management APIs',
      'Real-time monitoring and status reporting (planned)',
      'Security mechanisms (planned)',
      'Distributed system architecture',
      'High-performance CDN control system',
    ],
    techStack: {
      backend: [
        { name: 'Rust', purpose: 'Core system implementation for performance' },
        { name: 'Actix-web', purpose: 'High-performance async web framework' },
      ],
      tools: [
        { name: 'Cargo', purpose: 'Rust package management and building' },
        { name: 'GitHub', purpose: 'Version control and collaboration' },
      ],
    },
  },

  'sled-gui': {
    title: 'Sled GUI',
    description: 'A Simple Visual Manager for Sled KV Database built with Tauri',
    longDescription:
      "Sled GUI is a modern desktop application built with Tauri that provides a visual interface for managing Sled embedded key-value databases. Combining the performance and security of Rust backend with the flexibility of modern web technologies, it offers developers an intuitive way to browse, edit, and manage Sled database entries without direct file manipulation. The application leverages Tauri's unique architecture to deliver native performance with web-based UI flexibility.",
    features: [
      "Native desktop performance with Tauri's Rust core",
      'Modern web UI built with Vue 3 and TypeScript',
      'Direct integration with Sled embedded database',
      'Real-time database browsing and key-value management',
      'Cross-platform support (Windows, macOS, Linux)',
      'Secure file system access through Tauri APIs',
      "Lightweight bundle size with Tauri's optimization",
      'Hot-reload development experience',
    ],
    techStack: {
      backend: [
        { name: 'Rust', purpose: 'Core application logic and Tauri backend' },
        { name: 'Tauri', purpose: 'Desktop app framework and system APIs' },
        { name: 'Sled', purpose: 'Embedded key-value database integration' },
        { name: 'tokio', purpose: 'Async runtime for database operations' },
      ],
      frontend: [
        { name: 'Vue 3', purpose: 'Reactive UI framework with Composition API' },
        { name: 'TypeScript', purpose: 'Type-safe frontend development' },
        { name: 'Tailwind CSS', purpose: 'Utility-first styling system' },
        { name: 'Vite', purpose: 'Fast build tool optimized for Tauri' },
      ],
      tools: [
        { name: 'Tauri CLI', purpose: 'Build and development toolchain' },
        { name: 'Cargo', purpose: 'Rust package management' },
        { name: 'ESLint + Prettier', purpose: 'Code quality and formatting' },
      ],
    },
  },

  'onebot-github-webhook': {
    title: 'OneBot GitHub Webhook',
    description: 'GitHub Webhook to QQ notification service via OneBot protocol',
    longDescription:
      'OneBot GitHub Webhook is a powerful service that bridges GitHub webhooks to QQ groups using the OneBot protocol. It provides seamless integration between GitHub repositories and QQ groups, enabling real-time notifications for code changes, issues, pull requests, and releases. The service features advanced pattern matching, secure webhook verification, and flexible configuration options.',
    features: [
      'Secure GitHub Webhook signature verification',
      'OneBot protocol support (WebSocket and HTTP)',
      'Advanced repository and branch matching with wildcards',
      'Flexible event filtering (push, PR, issues, releases)',
      'Customizable message formatting and templates',
      'Multi-group and multi-bot support',
      'Docker containerization for easy deployment',
      'Comprehensive logging and error handling',
      'Planned: GitHub API polling for private repositories',
      'Planned: Custom Jinja2 template system',
    ],
    techStack: {
      backend: [
        { name: 'Python 3.8+', purpose: 'Core programming language' },
        { name: 'FastAPI', purpose: 'High-performance async web framework' },
        { name: 'Uvicorn', purpose: 'ASGI server for production deployment' },
        { name: 'Pydantic', purpose: 'Data validation and settings management' },
        { name: 'aiohttp', purpose: 'Async HTTP client for OneBot communication' },
        { name: 'PyYAML', purpose: 'Configuration file parsing' },
      ],
      tools: [
        { name: 'Docker', purpose: 'Containerization and deployment' },
        { name: 'GitHub Actions', purpose: 'CI/CD pipeline' },
        { name: 'Poetry', purpose: 'Python dependency management' },
        { name: 'pytest', purpose: 'Unit testing framework' },
      ],
    },
    performance: [
      { name: 'Response Time', value: '<100ms' },
      { name: 'Memory Usage', value: '<100MB' },
      { name: 'Event Processing', value: '1000+/min' },
    ],
  },

  'vue-portfolio': {
    title: 'Vue Portfolio',
    description: 'Personal portfolio website built with Vue.js and modern design',
    longDescription:
      'A responsive and modern personal portfolio website showcasing projects, skills, and professional experience. Built with Vue.js 3, TypeScript, and Tailwind CSS, it features smooth animations, responsive design, and optimized performance.',
    features: [
      'Fully responsive design for all device sizes',
      'Smooth scroll animations and transitions',
      'Project showcase with filtering capabilities',
      'Skills and expertise visualization',
      'Professional experience timeline',
      'Contact form with validation',
      'SEO optimized with meta tags',
      'Fast loading with lazy loading images',
    ],
    techStack: {
      frontend: [
        { name: 'Vue.js 3', purpose: 'Progressive web framework' },
        { name: 'TypeScript', purpose: 'Type safety and better DX' },
        { name: 'Tailwind CSS', purpose: 'Utility-first CSS framework' },
        { name: 'Vue Router', purpose: 'Client-side routing' },
      ],
      tools: [
        { name: 'Vite', purpose: 'Fast build tool and dev server' },
        { name: 'ESLint', purpose: 'Code linting and formatting' },
        { name: 'Prettier', purpose: 'Code formatting' },
      ],
    },
  },

  'wakatime-readme-updater': {
    title: 'WakaTime README Updater',
    description: 'Automatically integrate WakaTime coding statistics into GitHub README',
    longDescription:
      'A high-performance Rust tool that automatically integrates WakaTime coding statistics into GitHub README files. This is a complete rewrite of an earlier Python implementation, offering blazing fast performance, memory safety, and a single binary with no runtime dependencies. It supports flexible deployment options including GitHub Actions, Docker, and standalone CLI.',
    features: [
      'Memory-safe and blazing fast Rust implementation',
      'Single binary with no runtime dependencies',
      'Flexible deployment: GitHub Actions, Docker, or CLI',
      'Multiple configuration methods: CLI args, env vars, or TOML',
      'Automated Git workflow with intelligent authentication',
      'Customizable statistics display (languages, editors, OS)',
      'Configurable timeframe for statistics collection',
      'Small binary footprint for efficient CI/CD integration',
    ],
    techStack: {
      backend: [
        { name: 'Rust 1.90+', purpose: 'Core language for performance and safety' },
        { name: 'WakaTime API', purpose: 'Coding statistics data source' },
        { name: 'GitHub API', purpose: 'Repository management and updates' },
      ],
      tools: [
        { name: 'Docker', purpose: 'Containerization for flexible deployment' },
        { name: 'GitHub Actions', purpose: 'Automated README updates' },
        { name: 'Cargo', purpose: 'Rust package management and building' },
      ],
    },
  },

  'nginx-modsecurity': {
    title: 'Nginx with ModSecurity',
    description: 'Enterprise-grade WAF Docker image with Nginx and OWASP ModSecurity',
    longDescription:
      'A lightweight yet powerful Docker image combining Nginx with the OWASP ModSecurity Web Application Firewall, providing enterprise-grade protection for modern web applications. Built on Alpine Linux with security hardening, it offers multi-architecture support and complete dependencies for robust security features.',
    features: [
      'Latest Nginx 1.28.0 with ModSecurity v3.0.14',
      'Lightweight Alpine Linux base (~60MB)',
      'Multi-architecture support (AMD64 and ARM64)',
      'ModSecurity compiled as dynamic module',
      'Complete dependencies: Lua 5.4, LMDB, YAJL, GeoIP',
      'Protection against OWASP Top 10 threats',
      'Multi-stage builds for reduced attack surface',
      'Automated CI/CD with GitHub Actions',
    ],
    techStack: {
      backend: [
        { name: 'Nginx 1.28.0', purpose: 'High-performance web server' },
        { name: 'ModSecurity v3.0.14', purpose: 'OWASP WAF engine' },
        { name: 'Alpine Linux', purpose: 'Lightweight and secure base image' },
        { name: 'Lua 5.4', purpose: 'Scripting support for advanced rules' },
      ],
      tools: [
        { name: 'Docker', purpose: 'Containerization and deployment' },
        { name: 'GitHub Actions', purpose: 'Automated building and publishing' },
        { name: 'Multi-stage builds', purpose: 'Optimized image size and security' },
      ],
    },
    performance: [
      { name: 'Image Size', value: '~60MB' },
      { name: 'Architectures', value: 'AMD64 + ARM64' },
    ],
  },

  'acme-docker-reloader': {
    title: 'ACME Docker Reloader',
    description: 'Automated SSL certificate renewal and service reload for Docker containers',
    longDescription:
      'An intelligent automation solution that enables acme.sh running in Docker containers to automatically request and renew SSL certificates, then seamlessly reload host or container services like Nginx or Caddy upon certificate updates. Features socket-based IPC, comprehensive error handling, and out-of-the-box usability.',
    features: [
      'Out-of-the-box functionality with three-step setup',
      'Containerized acme.sh with automated renewal',
      'Socket-based inter-process communication',
      'Multi-service support configuration',
      'Automatic service reload (Nginx, Caddy, etc.)',
      'Comprehensive error handling and logging',
      'Simple YAML-based configuration',
      'systemd service integration',
    ],
    techStack: {
      backend: [
        { name: 'Shell Script', purpose: 'Core automation logic' },
        { name: 'acme.sh', purpose: 'ACME protocol SSL certificate management' },
        { name: 'systemd', purpose: 'Service management and daemon process' },
      ],
      tools: [
        { name: 'Docker', purpose: 'Container orchestration' },
        { name: 'Docker Compose', purpose: 'Multi-container setup' },
        { name: 'Unix Sockets', purpose: 'Host-container communication' },
      ],
    },
  },

  'uptime-verse': {
    title: 'Uptime Verse',
    description: "A distributed uptime network that listens to the internet's pulse",
    longDescription:
      'Uptime Verse aims to be a distributed uptime monitoring network designed to track internet connectivity and service availability across globally distributed nodes. The project is in early development stages and focuses on monitoring uptime across distributed nodes to track internet health metrics.',
    features: [
      'Distributed uptime monitoring network (planned)',
      'Internet health metrics tracking (planned)',
      'Multi-node service availability monitoring (planned)',
      'Real-time connectivity pulse monitoring (planned)',
    ],
    techStack: {
      backend: [],
      tools: [],
    },
  },
}
