export default {
  title: 'タイムライン',
  subtitle: '最近のアクティビティ、学習記録、日常の更新',
  viewAll: 'すべて表示',

  // タイムラインエントリタイプラベル
  types: {
    github: 'GitHubアクティビティ',
    learning: '学習記録',
    life: '日常更新',
  },

  // フィルター
  filters: {
    all: 'すべて',
    github: 'GitHub',
    learning: '学習',
    life: '日常',
  },

  // GitHubイベントタイプ
  githubEvents: {
    push: 'コードをプッシュ',
    pull_request: 'プルリクエスト',
    issue: 'Issue',
    release: 'バージョンをリリース',
    star: 'リポジトリにスター',
    fork: 'リポジトリをフォーク',
  },

  // 学習記録
  learning: {
    count: 4,
    records: {
      0: {
        date: '2025-11-20T15:00:00Z',
        title: 'Rust言語を学習',
        description:
          '所有権システム、trait、ライフタイムなどのコア概念を含むRust言語の特性を体系的に学習',
        topic: 'Rustプログラミング',
        source: 'The Rust Programming Language',
        tags: ['Rust', 'プログラミング言語', 'システムプログラミング'],
      },
      1: {
        date: '2025-01-15T10:00:00Z',
        title: 'Rustの所有権システムを深く学ぶ',
        description:
          'Rustの所有権、借用、ライフタイムの概念を学び、メモリ安全性への理解を深めました',
        topic: 'Rustプログラミング',
        source: 'The Rust Programming Language（公式ドキュメント）',
        tags: ['Rust', 'プログラミング言語', 'システムプログラミング'],
      },
      2: {
        date: '2025-01-10T14:30:00Z',
        title: 'Vue 3 Composition APIのベストプラクティスを学習',
        description:
          'Composition APIのデザインパターンと状態管理を研究し、コードの保守性を向上させました',
        topic: 'Vue.jsフレームワーク',
        source: 'Vue 3公式ドキュメントとコミュニティのベストプラクティス',
        tags: ['Vue.js', 'TypeScript', 'フロントエンド開発'],
      },
      3: {
        date: '2025-01-05T09:00:00Z',
        title: 'Dockerマルチステージビルドの最適化を研究',
        description:
          'マルチステージビルドを使用してイメージサイズを削減し、ビルド効率を向上させる方法を学びました',
        topic: 'Dockerコンテナ化',
        source: 'Docker公式ドキュメント',
        tags: ['Docker', 'DevOps', 'コンテナ化'],
      },
    },
  },

  // 日常更新
  life: {
    count: 4,
    updates: {
      0: {
        date: '2025-11-20T18:00:00Z',
        title: 'The ESAP Projectメンバーとの定例会議',
        description:
          'プロジェクトの進捗と次のフェーズの開発計画について議論し、チームコラボレーションが楽しかった',
        mood: '充実',
        icon: '👥',
        tags: ['チームコラボレーション', 'ESAP Project'],
      },
      1: {
        date: '2025-11-20T12:00:00Z',
        title: 'AutoBitsとのブレインストーミング',
        description:
          '自動化ツールの新しいアイデアを探求し、多くの興味深いコンセプトを生み出しました',
        mood: 'ワクワク',
        icon: '💡',
        tags: ['ブレインストーミング', 'AutoBits', 'イノベーション'],
      },
      2: {
        date: '2025-11-21T00:35:00Z',
        title: '個人ウェブサイトのアーキテクチャをリファクタリング',
        description:
          '一日中かけてウェブサイト全体をリファクタリングし、サイドバーレイアウトから単一カラムに変更、より清潔な見た目になりました',
        mood: '充実',
        icon: '💻',
        tags: ['プログラミング', 'ウェブ開発'],
      },
      3: {
        date: '2025-01-12T16:00:00Z',
        title: '新しい技術スタックの学習を開始',
        description:
          'RustとWebAssemblyの深い学習を決意し、パフォーマンス最適化で突破口を開きたいと思います',
        mood: 'ワクワク',
        icon: '🚀',
        tags: ['学習', '技術'],
      },
    },
  },

  // 空の状態
  empty: {
    title: 'アクティビティなし',
    description: 'まだタイムライン記録がありません',
  },

  // ロード中とエラー状態
  loading: '読み込み中...',
  loadError: '読み込み失敗',
  retry: '再試行',
}
