# Project Setup Guide

## 🚀 技術スタック
- **フレームワーク**: Next.js
- **スタイリング**: Tailwind CSS
- **モックサーバー**: json-server
- **パッケージマネージャー**: Bun

## 🔧 前提条件
- [Bun](https://bun.sh/) がインストールされていること
- ポート 3000, 3001, 3002 が利用可能であること
  > 注意: ポートが使用中の場合は、後述の手順で環境に合わせて変更可能

## 📋 環境設定

### 1. 必要なパッケージのインストール
```bash
bun install
```

### 2. 環境変数の設定 (.env.local)
以下の環境変数を設定してください:

```env
# ユーザーAPI URL
USERS_URL=http://localhost:3001/users

# プロジェクトAPI URL
PROJECT_URL=http://localhost:3002/projects

# セキュリティ用秘密鍵 (推奨: 大文字、小文字、数字、特殊記号を含む)
AUTH_SECRET_KEY=your_auth_secret_key
DATABASE_SECRET_KEY=your_database_secret_key
COOKIE_SECRET_KEY=your_cookie_secret_key
```

> 💡 **ヒント**: 秘密鍵は以下のような形式を推奨
> - 最低12文字以上
> - 大文字、小文字、数字、特殊記号を含む
> - 例: `P@ssw0rd!2024Secret`

### 3. サーバーの起動

#### 必要なターミナルを3つ開いて以下を実行:

1. メインアプリケーション:
```bash
bun --bun run dev
```

2. ユーザーサーバー:
```bash
bun --bun run users
```

3. プロジェクトサーバー:
```bash
bun --bun run projects
```

## 🔐 認証フロー
1. 新規登録ページで新しいアカウントを作成
2. 作成したアカウントでログイン
3. アプリケーションの機能を利用開始

## 🛠 トラブルシューティング

### ポート番号の変更
`package.json`と`.env.local`ファイルで以下を調整:
- メインアプリ: デフォルト 3000
- ユーザーサーバー: デフォルト 3001
- プロジェクトサーバー: デフォルト 3002

### 共通エラー
- パッケージインストールエラー: `bun install`を再実行
- ポート使用中エラー: 別のポート番号を使用
- 環境変数エラー: `.env.local`の設定を確認

## 📦 推奨拡張機能
- VSCode用 Tailwind CSS IntelliSense
- ESLint
- Prettier

## 🚨 セキュリティノート
- 秘密鍵は絶対に公開しないでください
- `.env.local`は`.gitignore`に追加済み