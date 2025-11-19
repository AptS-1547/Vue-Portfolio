export default {
  shortlinker: {
    title: 'ShortLinker',
    description: 'RustとActix-webで構築された高性能URLショートナー',
    longDescription:
      'ShortLinkerは、RustとActix-webでゼロから構築されたミニマリストでありながら強力なURLショートナーサービスです。最大のパフォーマンスと信頼性を目指して設計されており、HTTP 307リダイレクトをサポートし、スマートキャッシング戦略とブルームフィルタにより卓越したスループットを実現しています。',
    features: [
      'SEOとユーザー体験向上のためのHTTP 307リダイレクト',
      '最適化されたキャッシング層で70万+ QPSを達成',
      'URL存在チェックのための効率的なブルームフィルタ',
      'SQLiteとJSONの両ストレージバックエンドをサポート',
      'URL管理のための組み込み管理API',
      '設定可能なURL有効期限サポート',
      'Dockerによるクロスプラットフォーム展開',
      '最小限のメモリフットプリントと高速起動',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: 'パフォーマンス重視のコア言語' },
          { name: 'Actix-web', purpose: '高性能Webフレームワーク' },
          { name: 'SQLite', purpose: '永続化のための組み込みデータベース' },
          { name: 'Bloom Filter', purpose: '効率的なURL存在チェック' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: 'コンテナ化とデプロイメント' },
          { name: 'GitHub Actions', purpose: 'CI/CDパイプライン' },
          { name: 'Cargo', purpose: 'パッケージ管理とビルド' },
        ],
      },
    ],
    performance: [
      { name: 'QPS', value: '70万+' },
      { name: 'メモリ使用量', value: '<50MB' },
      { name: '起動時間', value: '<100ms' },
    ],
  },

  'ferrus-gate': {
    title: 'Ferrus Gate',
    description: 'OAuth2、OIDC、SAML、FIDO2をサポートする最新の認証ゲートウェイ',
    longDescription:
      'Ferrus Gateは、Rustで構築された包括的な認証ゲートウェイソリューションで、分散システムに統合認証エントリとアカウント管理を提供するよう設計されています。OAuth2、OpenID Connect、SAML、および最新のFIDO2/WebAuthn標準を含む複数の認証プロトコルをサポートしています。',
    features: [
      'マルチプロトコルサポート（OAuth2、OIDC、SAML、FIDO2）',
      'FIDO2/WebAuthnによるパスワードレス認証',
      'エンタープライズ展開のためのマルチテナントアーキテクチャ',
      'プラグイン可能な認証プロバイダー',
      '多要素認証（MFA）サポート',
      'セッション管理とSSO機能',
      'ユーザーとテナント管理のための管理ダッシュボード',
      '包括的なREST APIを備えたAPIファースト設計',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: 'コアシステム実装' },
          { name: 'Actix-web', purpose: '最新の非同期Webフレームワーク' },
          { name: 'PostgreSQL', purpose: 'プライマリデータストレージ' },
          { name: 'Redis', purpose: 'セッションとキャッシュ管理' },
        ],
      },
      {
        name: 'frontend',
        items: [
          { name: 'Vue.js 3', purpose: '管理ダッシュボードフロントエンド' },
          { name: 'TypeScript', purpose: '型安全な開発' },
          { name: 'Tailwind CSS', purpose: 'ユーティリティファーストスタイリング' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker Compose', purpose: 'ローカル開発環境' },
          { name: 'Kubernetes', purpose: '本番環境デプロイメント' },
          { name: 'OpenAPI', purpose: 'APIドキュメント' },
        ],
      },
    ],
  },

  nebulink: {
    title: 'Nebulink',
    description: 'グローバルクラウドノードに基づく分散加速管理プラットフォーム',
    longDescription:
      'Nebulinkは、グローバルクラウドノードに基づく分散加速管理プラットフォームで、効率的で柔軟かつスケーラブルなCDN制御システムの構築に専念しています。グローバルノードを星雲に編み込み、インテリジェントルーティングと負荷分散を通じてサービスを高速化することを目指しています。',
    features: [
      'グローバルノード登録とハートビート監視',
      'マルチノードレイテンシ検出と負荷分散',
      'インテリジェントルーティングと加速ロジック',
      '管理APIを備えた設定センター',
      'リアルタイム監視とステータスレポート（予定）',
      'セキュリティメカニズム（予定）',
      '分散システムアーキテクチャ',
      '高性能CDN制御システム',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: 'パフォーマンス重視のコアシステム実装' },
          { name: 'Actix-web', purpose: '高性能非同期Webフレームワーク' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Cargo', purpose: 'Rustパッケージ管理とビルド' },
          { name: 'GitHub', purpose: 'バージョン管理とコラボレーション' },
        ],
      },
    ],
  },

  'sled-gui': {
    title: 'Sled GUI',
    description: 'Tauriで構築されたSled KVデータベースのシンプルなビジュアルマネージャー',
    longDescription:
      'Sled GUIは、Tauriで構築された最新のデスクトップアプリケーションで、Sled組み込みキーバリューデータベースを管理するためのビジュアルインターフェースを提供します。Rustバックエンドのパフォーマンスとセキュリティを最新のWeb技術の柔軟性と組み合わせ、開発者がファイルを直接操作することなくSledデータベースエントリを参照、編集、管理するための直感的な方法を提供します。アプリケーションは、Tauriのユニークなアーキテクチャを活用して、Webベースのui柔軟性でネイティブパフォーマンスを提供します。',
    features: [
      'TauriのRustコアによるネイティブデスクトップパフォーマンス',
      'Vue 3とTypeScriptで構築された最新のWeb UI',
      'Sled組み込みデータベースとの直接統合',
      'リアルタイムデータベース参照とキーバリュー管理',
      'クロスプラットフォームサポート（Windows、macOS、Linux）',
      'Tauri APIを通じた安全なファイルシステムアクセス',
      'Tauriの最適化による軽量バンドルサイズ',
      'ホットリロード開発体験',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust', purpose: 'コアアプリケーションロジックとTauriバックエンド' },
          { name: 'Tauri', purpose: 'デスクトップアプリフレームワークとシステムAPI' },
          { name: 'Sled', purpose: '組み込みキーバリューデータベース統合' },
          { name: 'tokio', purpose: 'データベース操作の非同期ランタイム' },
        ],
      },
      {
        name: 'frontend',
        items: [
          { name: 'Vue 3', purpose: 'Composition APIを備えたリアクティブUIフレームワーク' },
          { name: 'TypeScript', purpose: '型安全なフロントエンド開発' },
          { name: 'Tailwind CSS', purpose: 'ユーティリティファーストスタイリングシステム' },
          { name: 'Vite', purpose: 'Tauri向けに最適化された高速ビルドツール' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Tauri CLI', purpose: 'ビルドと開発ツールチェーン' },
          { name: 'Cargo', purpose: 'Rustパッケージ管理' },
          { name: 'ESLint + Prettier', purpose: 'コード品質とフォーマット' },
        ],
      },
    ],
  },

  'onebot-github-webhook': {
    title: 'OneBot GitHub Webhook',
    description: 'OneBotプロトコル経由でGitHub WebhookをQQ通知サービスに接続',
    longDescription:
      'OneBot GitHub Webhookは、OneBotプロトコルを使用してGitHub webhookをQQグループにブリッジする強力なサービスです。GitHubリポジトリとQQグループ間のシームレスな統合を提供し、コード変更、Issues、Pull Requests、およびReleasesのリアルタイム通知を可能にします。このサービスは、高度なパターンマッチング、安全なwebhook検証、および柔軟な設定オプションを特徴としています。',
    features: [
      '安全なGitHub Webhook署名検証',
      'OneBotプロトコルサポート（WebSocketとHTTP）',
      'ワイルドカードを使用した高度なリポジトリとブランチマッチング',
      '柔軟なイベントフィルタリング（push、PR、issues、releases）',
      'カスタマイズ可能なメッセージフォーマットとテンプレート',
      'マルチグループとマルチボットサポート',
      '簡単なデプロイのためのDockerコンテナ化',
      '包括的なロギングとエラー処理',
      '予定：プライベートリポジトリ向けのGitHub APIポーリング',
      '予定：カスタムJinja2テンプレートシステム',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Python 3.8+', purpose: 'コアプログラミング言語' },
          { name: 'FastAPI', purpose: '高性能非同期Webフレームワーク' },
          { name: 'Uvicorn', purpose: '本番環境デプロイ用ASGIサーバー' },
          { name: 'Pydantic', purpose: 'データ検証と設定管理' },
          { name: 'aiohttp', purpose: 'OneBot通信用非同期HTTPクライアント' },
          { name: 'PyYAML', purpose: '設定ファイル解析' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: 'コンテナ化とデプロイメント' },
          { name: 'GitHub Actions', purpose: 'CI/CDパイプライン' },
          { name: 'Poetry', purpose: 'Python依存関係管理' },
          { name: 'pytest', purpose: 'ユニットテストフレームワーク' },
        ],
      },
    ],
    performance: [
      { name: '応答時間', value: '<100ms' },
      { name: 'メモリ使用量', value: '<100MB' },
      { name: 'イベント処理', value: '1000+/分' },
    ],
  },

  'vue-portfolio': {
    title: 'Vue Portfolio',
    description: 'Vue.jsと最新デザインで構築された個人ポートフォリオウェブサイト',
    longDescription:
      'プロジェクト、スキル、専門経験を紹介するレスポンシブで最新の個人ポートフォリオウェブサイト。Vue.js 3、TypeScript、Tailwind CSSで構築され、スムーズなアニメーション、レスポンシブデザイン、最適化されたパフォーマンスを特徴としています。',
    features: [
      'すべてのデバイスサイズに対応する完全レスポンシブデザイン',
      'スムーズなスクロールアニメーションとトランジション',
      'フィルタリング機能を備えたプロジェクトショーケース',
      'スキルと専門知識の可視化',
      'プロフェッショナルな経験タイムライン',
      'バリデーション付きコンタクトフォーム',
      'メタタグによるSEO最適化',
      '遅延読み込み画像による高速読み込み',
    ],
    techStack: [
      {
        name: 'frontend',
        items: [
          { name: 'Vue.js 3', purpose: 'プログレッシブWebフレームワーク' },
          { name: 'TypeScript', purpose: '型安全性と優れた開発体験' },
          { name: 'Tailwind CSS', purpose: 'ユーティリティファーストCSSフレームワーク' },
          { name: 'Vue Router', purpose: 'クライアントサイドルーティング' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Vite', purpose: '高速ビルドツールと開発サーバー' },
          { name: 'ESLint', purpose: 'コードリンティングとフォーマット' },
          { name: 'Prettier', purpose: 'コードフォーマット' },
        ],
      },
    ],
  },

  'wakatime-readme-updater': {
    title: 'WakaTime README Updater',
    description: 'WakaTimeコーディング統計をGitHub READMEに自動統合',
    longDescription:
      'WakaTimeコーディング統計をGitHub READMEファイルに自動的に統合する高性能Rustツール。これは以前のPython実装の完全な書き直しで、超高速パフォーマンス、メモリ安全性、ランタイム依存関係のない単一バイナリを提供します。GitHub Actions、Docker、スタンドアロンCLIを含む柔軟なデプロイメントオプションをサポートしています。',
    features: [
      'メモリ安全で超高速なRust実装',
      'ランタイム依存関係のない単一バイナリ',
      '柔軟なデプロイメント：GitHub Actions、Docker、またはCLI',
      '複数の設定方法：CLI引数、環境変数、またはTOML',
      'インテリジェント認証を備えた自動Gitワークフロー',
      'カスタマイズ可能な統計表示（言語、エディタ、OS）',
      '統計収集の設定可能な期間',
      '効率的なCI/CD統合のための小さなバイナリフットプリント',
    ],
    techStack: [
      {
        name: 'backend',
        items: [
          { name: 'Rust 1.90+', purpose: 'パフォーマンスと安全性のためのコア言語' },
          { name: 'WakaTime API', purpose: 'コーディング統計データソース' },
          { name: 'GitHub API', purpose: 'リポジトリ管理と更新' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: '柔軟なデプロイメントのためのコンテナ化' },
          { name: 'GitHub Actions', purpose: 'README自動更新' },
          { name: 'Cargo', purpose: 'Rustパッケージ管理とビルド' },
        ],
      },
    ],
  },

  'nginx-modsecurity': {
    title: 'Nginx with ModSecurity',
    description: 'NginxとOWASP ModSecurityを統合したエンタープライズグレードWAF Dockerイメージ',
    longDescription:
      'NginxとOWASP ModSecurity Web Application Firewallを組み合わせた軽量で強力なDockerイメージで、最新のWebアプリケーションにエンタープライズグレードの保護を提供します。Alpine Linuxをベースにセキュリティ強化が施されており、マルチアーキテクチャサポートと堅牢なセキュリティ機能のための完全な依存関係を提供します。',
    features: [
      '最新のNginx 1.28.0とModSecurity v3.0.14',
      '軽量なAlpine Linuxベース（約60MB）',
      'マルチアーキテクチャサポート（AMD64とARM64）',
      'ダイナミックモジュールとしてコンパイルされたModSecurity',
      '完全な依存関係：Lua 5.4、LMDB、YAJL、GeoIP',
      'OWASP Top 10脅威に対する保護',
      '攻撃面を削減するマルチステージビルド',
      'GitHub Actionsによる自動化CI/CD',
    ],
    techStack: [
      {
        name: 'infrastructure',
        items: [
          { name: 'Nginx 1.28.0', purpose: '高性能Webサーバー' },
          { name: 'ModSecurity v3.0.14', purpose: 'OWASP WAFエンジン' },
          { name: 'Alpine Linux', purpose: '軽量で安全なベースイメージ' },
          { name: 'Lua 5.4', purpose: '高度なルールのスクリプトサポート' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: 'コンテナ化とデプロイメント' },
          { name: 'GitHub Actions', purpose: '自動ビルドと公開' },
          { name: 'Multi-stage builds', purpose: 'イメージサイズとセキュリティの最適化' },
        ],
      },
    ],
    performance: [
      { name: 'イメージサイズ', value: '約60MB' },
      { name: 'アーキテクチャ', value: 'AMD64 + ARM64' },
    ],
  },

  'acme-docker-reloader': {
    title: 'ACME Docker Reloader',
    description: 'Dockerコンテナ向けの自動SSL証明書更新とサービスリロード',
    longDescription:
      'Dockerコンテナで実行されるacme.shがSSL証明書を自動的に要求および更新し、証明書更新時にNginxやCaddyなどのホストまたはコンテナサービスをシームレスにリロードできるようにするインテリジェントな自動化ソリューション。ソケットベースのIPC、包括的なエラー処理、およびすぐに使える機能を備えています。',
    features: [
      '3ステップセットアップですぐに使える機能',
      '自動更新機能を備えたコンテナ化されたacme.sh',
      'ソケットベースのプロセス間通信',
      'マルチサービスサポート設定',
      '自動サービスリロード（Nginx、Caddyなど）',
      '包括的なエラー処理とロギング',
      'シンプルなYAMLベースの設定',
      'systemdサービス統合',
    ],
    techStack: [
      {
        name: 'automation',
        items: [
          { name: 'Shell Script', purpose: 'コア自動化ロジック' },
          { name: 'acme.sh', purpose: 'ACMEプロトコルSSL証明書管理' },
          { name: 'systemd', purpose: 'サービス管理とデーモンプロセス' },
        ],
      },
      {
        name: 'tools',
        items: [
          { name: 'Docker', purpose: 'コンテナオーケストレーション' },
          { name: 'Docker Compose', purpose: 'マルチコンテナセットアップ' },
          { name: 'Unix Sockets', purpose: 'ホスト-コンテナ通信' },
        ],
      },
    ],
  },

  'uptime-verse': {
    title: 'Uptime Verse',
    description: 'インターネットの鼓動を聴く分散アップタイムネットワーク',
    longDescription:
      'Uptime Verseは、グローバルに分散されたノード間でインターネット接続とサービス可用性を追跡するように設計された分散アップタイム監視ネットワークを目指しています。プロジェクトは初期開発段階にあり、インターネットヘルスメトリクスを追跡するために分散ノード間のアップタイムを監視することに焦点を当てています。',
    features: [
      '分散アップタイム監視ネットワーク（予定）',
      'インターネットヘルスメトリクス追跡（予定）',
      'マルチノードサービス可用性監視（予定）',
      'リアルタイム接続パルス監視（予定）',
    ],
  },
}
