export default {
  shortlinker: {
    title: 'ShortLinker - 短链接服务',
    description: '基于 Rust 和 Actix-web 构建的高性能 URL 短链接服务',
    longDescription:
      'ShortLinker 是一个使用 Rust 和 Actix-web 从零构建的简约而强大的短链接服务。专为最大性能和可靠性而设计，支持 HTTP 307 重定向，并通过智能缓存策略和布隆过滤器实现卓越的吞吐量。',
    features: [
      'HTTP 307 重定向，提升 SEO 和用户体验',
      '通过优化的缓存层实现 70 万+ QPS',
      '布隆过滤器用于高效的 URL 存在性检查',
      '支持 SQLite 和 JSON 双存储后端',
      '内置管理 API 用于 URL 管理',
      '可配置的 URL 过期支持',
      '使用 Docker 跨平台部署',
      '最小内存占用和快速启动',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: '性能优先的核心语言' },
          { name: 'Actix-web', purpose: '高性能 Web 框架' },
          { name: 'SQLite', purpose: '嵌入式数据库持久化' },
          { name: 'Bloom Filter', purpose: '高效的 URL 存在性检查' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '容器化和部署' },
          { name: 'GitHub Actions', purpose: 'CI/CD 流水线' },
          { name: 'Cargo', purpose: '包管理和构建' },
        ],
      },
    ],
    performance: [
      { name: 'QPS', value: '70万+' },
      { name: '内存使用', value: '<50MB' },
      { name: '启动时间', value: '<100ms' },
    ],
  },

  'ferrus-gate': {
    title: 'Ferrus Gate - 身份网关',
    description: '支持 OAuth2、OIDC、SAML 和 FIDO2 的现代身份网关',
    longDescription:
      'Ferrus Gate 是一个使用 Rust 构建的综合性身份网关解决方案，旨在为分布式系统提供统一的认证入口和账户管理。支持多种认证协议，包括 OAuth2、OpenID Connect、SAML 和现代的 FIDO2/WebAuthn 标准。',
    features: [
      '多协议支持（OAuth2、OIDC、SAML、FIDO2）',
      'FIDO2/WebAuthn 无密码认证',
      '面向企业部署的多租户架构',
      '可插拔的认证提供者',
      '多因素认证（MFA）支持',
      '会话管理和 SSO 功能',
      '用于用户和租户管理的管理面板',
      'API 优先设计，提供完整的 REST API',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: '核心系统实现' },
          { name: 'Actix-web', purpose: '现代异步 Web 框架' },
          { name: 'PostgreSQL', purpose: '主要数据存储' },
          { name: 'Redis', purpose: '会话和缓存管理' },
        ],
      },
      {
        name: 'frontend',
        items: [
          { name: 'Vue.js 3', purpose: '管理面板前端' },
          { name: 'TypeScript', purpose: '类型安全开发' },
          { name: 'Tailwind CSS', purpose: '实用优先的样式' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker Compose', purpose: '本地开发环境' },
          { name: 'Kubernetes', purpose: '生产环境部署' },
          { name: 'OpenAPI', purpose: 'API 文档' },
        ],
      },
    ],
  },

  nebulink: {
    title: 'Nebulink - 分布式加速平台',
    description: '基于全球云节点的分布式加速管理平台',
    longDescription:
      'Nebulink 是一个基于全球云节点的分布式加速管理平台，致力于构建高效、灵活且可扩展的 CDN 控制系统。旨在将全球节点编织成星云，通过智能路由和负载均衡加速服务。',
    features: [
      '全球节点注册和心跳监控',
      '多节点延迟检测和负载均衡',
      '智能路由和加速逻辑',
      '配置中心与管理 API',
      '实时监控和状态报告（计划中）',
      '安全机制（计划中）',
      '分布式系统架构',
      '高性能 CDN 控制系统',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: '性能优先的核心系统实现' },
          { name: 'Actix-web', purpose: '高性能异步 Web 框架' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Cargo', purpose: 'Rust 包管理和构建' },
          { name: 'GitHub', purpose: '版本控制和协作' },
        ],
      },
    ],
  },

  'sled-gui': {
    title: 'Sled GUI - 数据库可视化管理器',
    description: '基于 Tauri 构建的 Sled 键值数据库可视化管理器',
    longDescription:
      'Sled GUI 是一个使用 Tauri 构建的现代桌面应用程序，为管理 Sled 嵌入式键值数据库提供可视化界面。结合 Rust 后端的性能和安全性与现代 Web 技术的灵活性，为开发者提供了一种直观的方式来浏览、编辑和管理 Sled 数据库条目，无需直接操作文件。该应用利用 Tauri 的独特架构，以 Web UI 的灵活性提供原生性能。',
    features: [
      'Tauri Rust 核心提供的原生桌面性能',
      '使用 Vue 3 和 TypeScript 构建的现代 Web UI',
      '与 Sled 嵌入式数据库直接集成',
      '实时数据库浏览和键值管理',
      '跨平台支持（Windows、macOS、Linux）',
      '通过 Tauri API 安全的文件系统访问',
      'Tauri 优化带来的轻量级打包体积',
      '热重载开发体验',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: '核心应用逻辑和 Tauri 后端' },
          { name: 'Tauri', purpose: '桌面应用框架和系统 API' },
          { name: 'Sled', purpose: '嵌入式键值数据库集成' },
          { name: 'tokio', purpose: '数据库操作的异步运行时' },
        ],
      },
      {
        name: 'frontend',
        items: [
          { name: 'Vue 3', purpose: '响应式 UI 框架与 Composition API' },
          { name: 'TypeScript', purpose: '类型安全的前端开发' },
          { name: 'Tailwind CSS', purpose: '实用优先的样式系统' },
          { name: 'Vite', purpose: '为 Tauri 优化的快速构建工具' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Tauri CLI', purpose: '构建和开发工具链' },
          { name: 'Cargo', purpose: 'Rust 包管理' },
          { name: 'ESLint + Prettier', purpose: '代码质量和格式化' },
        ],
      },
    ],
  },

  'onebot-github-webhook': {
    title: 'OneBot GitHub Webhook - QQ 通知服务',
    description: '通过 OneBot 协议将 GitHub Webhook 推送到 QQ 的通知服务',
    longDescription:
      'OneBot GitHub Webhook 是一个强大的服务，通过 OneBot 协议将 GitHub Webhook 桥接到 QQ 群。它提供了 GitHub 仓库和 QQ 群之间的无缝集成，实现代码更改、Issues、Pull Requests 和 Releases 的实时通知。该服务具有高级模式匹配、安全的 Webhook 验证和灵活的配置选项。',
    features: [
      '安全的 GitHub Webhook 签名验证',
      'OneBot 协议支持（WebSocket 和 HTTP）',
      '支持通配符的高级仓库和分支匹配',
      '灵活的事件过滤（push、PR、issues、releases）',
      '可定制的消息格式和模板',
      '多群和多机器人支持',
      'Docker 容器化便于部署',
      '全面的日志记录和错误处理',
      '计划中：私有仓库的 GitHub API 轮询',
      '计划中：自定义 Jinja2 模板系统',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Python 3.8+', purpose: '核心编程语言' },
          { name: 'FastAPI', purpose: '高性能异步 Web 框架' },
          { name: 'Uvicorn', purpose: '生产环境 ASGI 服务器' },
          { name: 'Pydantic', purpose: '数据验证和设置管理' },
          { name: 'aiohttp', purpose: 'OneBot 通信的异步 HTTP 客户端' },
          { name: 'PyYAML', purpose: '配置文件解析' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '容器化和部署' },
          { name: 'GitHub Actions', purpose: 'CI/CD 流水线' },
          { name: 'Poetry', purpose: 'Python 依赖管理' },
          { name: 'pytest', purpose: '单元测试框架' },
        ],
      },
    ],
    performance: [
      { name: '响应时间', value: '<100ms' },
      { name: '内存使用', value: '<100MB' },
      { name: '事件处理', value: '1000+/分钟' },
    ],
  },

  'vue-portfolio': {
    title: 'Vue Portfolio - 个人作品集',
    description: '使用 Vue.js 和现代设计构建的个人作品集网站',
    longDescription:
      '一个响应式的现代个人作品集网站，展示项目、技能和专业经验。使用 Vue.js 3、TypeScript 和 Tailwind CSS 构建，具有流畅的动画、响应式设计和优化的性能。',
    features: [
      '所有设备尺寸的完全响应式设计',
      '流畅的滚动动画和过渡',
      '带有筛选功能的项目展示',
      '技能和专长可视化',
      '专业经历时间线',
      '带验证的联系表单',
      '使用 meta 标签进行 SEO 优化',
      '图片懒加载实现快速加载',
    ],
    techStack: [
      {
        name: 'frontend',
        items: [
          { name: 'Vue.js 3', purpose: '渐进式 Web 框架' },
          { name: 'TypeScript', purpose: '类型安全和更好的开发体验' },
          { name: 'Tailwind CSS', purpose: '实用优先的 CSS 框架' },
          { name: 'Vue Router', purpose: '客户端路由' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Vite', purpose: '快速构建工具和开发服务器' },
          { name: 'ESLint', purpose: '代码检查和格式化' },
          { name: 'Prettier', purpose: '代码格式化' },
        ],
      },
    ],
  },

  'wakatime-readme-updater': {
    title: 'WakaTime README Updater - 统计集成工具',
    description: '自动将 WakaTime 编码统计集成到 GitHub README',
    longDescription:
      '一个高性能的 Rust 工具，可自动将 WakaTime 编码统计集成到 GitHub README 文件中。这是对早期 Python 实现的完全重写，提供极快的性能、内存安全和无运行时依赖的单一二进制文件。支持灵活的部署选项，包括 GitHub Actions、Docker 和独立 CLI。',
    features: [
      '内存安全且极快的 Rust 实现',
      '无运行时依赖的单一二进制文件',
      '灵活的部署：GitHub Actions、Docker 或 CLI',
      '多种配置方法：CLI 参数、环境变量或 TOML',
      '带智能认证的自动化 Git 工作流',
      '可定制的统计显示（语言、编辑器、操作系统）',
      '可配置的统计收集时间范围',
      '小型二进制占用，高效集成 CI/CD',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust 1.90+', purpose: '性能和安全的核心语言' },
          { name: 'WakaTime API', purpose: '编码统计数据源' },
          { name: 'GitHub API', purpose: '仓库管理和更新' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '灵活部署的容器化' },
          { name: 'GitHub Actions', purpose: '自动化 README 更新' },
          { name: 'Cargo', purpose: 'Rust 包管理和构建' },
        ],
      },
    ],
  },

  'nginx-modsecurity': {
    title: 'Nginx with ModSecurity - 企业级 WAF',
    description: '集成 Nginx 和 OWASP ModSecurity 的企业级 WAF Docker 镜像',
    longDescription:
      '一个轻量而强大的 Docker 镜像，结合 Nginx 和 OWASP ModSecurity Web 应用防火墙，为现代 Web 应用提供企业级保护。基于 Alpine Linux 构建并进行安全加固，提供多架构支持和完整的依赖项以实现强大的安全功能。',
    features: [
      '最新的 Nginx 1.28.0 和 ModSecurity v3.0.14',
      '轻量级 Alpine Linux 基础（约 60MB）',
      '多架构支持（AMD64 和 ARM64）',
      'ModSecurity 编译为动态模块',
      '完整依赖：Lua 5.4、LMDB、YAJL、GeoIP',
      '防御 OWASP Top 10 威胁',
      '多阶段构建减少攻击面',
      '使用 GitHub Actions 自动化 CI/CD',
    ],
    techStack: [
      {
        name: 'infrastructure',
        items: [
          { name: 'Nginx 1.28.0', purpose: '高性能 Web 服务器' },
          { name: 'ModSecurity v3.0.14', purpose: 'OWASP WAF 引擎' },
          { name: 'Alpine Linux', purpose: '轻量级且安全的基础镜像' },
          { name: 'Lua 5.4', purpose: '高级规则的脚本支持' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '容器化和部署' },
          { name: 'GitHub Actions', purpose: '自动化构建和发布' },
          { name: 'Multi-stage builds', purpose: '优化镜像大小和安全性' },
        ],
      },
    ],
    performance: [
      { name: '镜像大小', value: '约 60MB' },
      { name: '架构支持', value: 'AMD64 + ARM64' },
    ],
  },

  'acme-docker-reloader': {
    title: 'ACME Docker Reloader - SSL 自动化工具',
    description: 'Docker 容器的自动 SSL 证书续期和服务重载',
    longDescription:
      '一个智能自动化解决方案，使在 Docker 容器中运行的 acme.sh 能够自动请求和续期 SSL 证书，然后在证书更新时无缝重载主机或容器服务（如 Nginx 或 Caddy）。具有基于套接字的 IPC、全面的错误处理和开箱即用的可用性。',
    features: [
      '三步设置即可开箱即用',
      '容器化的 acme.sh 自动续期',
      '基于套接字的进程间通信',
      '多服务支持配置',
      '自动服务重载（Nginx、Caddy 等）',
      '全面的错误处理和日志记录',
      '简单的基于 YAML 的配置',
      'systemd 服务集成',
    ],
    techStack: [
      {
        name: 'automation',
        items: [
          { name: 'Shell Script', purpose: '核心自动化逻辑' },
          { name: 'acme.sh', purpose: 'ACME 协议 SSL 证书管理' },
          { name: 'systemd', purpose: '服务管理和守护进程' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '容器编排' },
          { name: 'Docker Compose', purpose: '多容器设置' },
          { name: 'Unix Sockets', purpose: '主机-容器通信' },
        ],
      },
    ],
  },

  'uptime-verse': {
    title: 'Uptime Verse - 分布式运行时监控',
    description: '倾听互联网脉搏的分布式运行时网络',
    longDescription:
      'Uptime Verse 旨在成为一个分布式的运行时监控网络，设计用于跟踪全球分布式节点的互联网连接性和服务可用性。该项目处于早期开发阶段，专注于跨分布式节点监控运行时间以跟踪互联网健康指标。',
    features: [
      '分布式运行时监控网络（计划中）',
      '互联网健康指标跟踪（计划中）',
      '多节点服务可用性监控（计划中）',
      '实时连接脉搏监控（计划中）',
    ],
  },
}
