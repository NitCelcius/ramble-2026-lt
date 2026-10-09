# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                                                    # 開発サーバー localhost:3030
pnpm build                                                  # 本番ビルド
pnpm export                                                 # PDF エクスポート
pnpm slidev export --format png --output ./screenshots/     # PNG エクスポート（目視確認用）
```

## Verification

```bash
# quick: ビルドが通るか（既定の出力先 dist/ は export を消すので必ず --out build.local）
pnpm exec slidev build --out build.local

# full: 変更前後のスライドごとの PNG を比べる（dist/ は git 管理外）
pnpm exec slidev export --format png --per-slide --output dist/export/<前>   # 変更前に取る
pnpm exec slidev export --format png --per-slide --output dist/export/<後>
node scripts/export-compare.mjs dist/export/<前> dist/export/<後> dist/compare-<名前>
```

- 過去の月は描き直さない方針。`changed:` に出たスライドはすべて意図した変更か画像で確認する。
- export は必ず `--per-slide` 同士で比べる。数分かかるのでバックグラウンドで実行する。
- CLI の export は他の export と並行すると問題が起きる。並行させたいときは、開発サーバーの `http://localhost:3030/export` からブラウザで書き出すとうまくいく（PNG のファイル名は 0 始まり）。

## 書き方（plain markdown）

HTML・`<style scoped>` を書かず markdown で書く。
見本は `tests/fixtures/authoring-sample.md`（`pnpm sample` で表示。`slides.md` には含めない）。

| こう書いていたもの | こう書く |
|---|---|
| `<br>`・行末の半角スペース2つ | そのまま改行（markdown `breaks: true`） |
| `layout: content` | 省略（`defaults.layout` が `content`） |
| グリッドの `<div>` ＋ `<style scoped>` | `::left::` / `::right::`（`content`・`vertical-split`）、幅は frontmatter の `cols` |
| `<blockquote class="…">` | `>`、強調は `> [!IMPORTANT]` / `> [!WARNING]` |
| `<figure>` ＋ `<figcaption>` | `![説明](/assets/ramble-4/x.png "キャプション")` |

3カラム以上やカード型のデザインは今のところ HTML で書く。

---

## アーキテクチャ

### Entry point と blank-slide 回避

`slides.md` の最初の `---...---` ブロックはグローバル config と cover スライドの frontmatter を兼ねる。
これは意図的な設計 — Slidev v52 + `theme: none` では両者を分離すると必ず空白の1枚目が発生する。

### レイアウト一覧

各レイアウトは `layouts/` にある Vue SFC。詳細ドキュメントは各ファイル冒頭のコメントを参照。

| レイアウト | 主な用途 | Slot |
|-----------|---------|------|
| `cover` | 1枚目カバー（左: 自己紹介、右: 初年次講義の扉スライド風に縦線＋タイトル＋会場ラベル。縦線は中央付近。背景は本文と同じ） | default（発表タイトル） |
| `section` | 章区切り | なし |
| `content` | フルワイド本文 | default |
| `content-right` | 左テキスト＋右画像 | default（左）、`right` |
| `content-top` | 上画像＋下テキスト | `top`、default（下） |

**共通 props（全レイアウト）**

| Prop | 型 | 説明 |
|------|----|------|
| `heading` | `string` | スライドタイトル（`cover` を除く全レイアウトで必須） |
| `subheading` | `string?` | サブタイトル（`section` は非対応） |
| `footerText` | `string?` | フッター文字列（省略時は `defaults.footerText`） |

**`cover` 固有 props**

| Prop | 型 | 説明 |
|------|----|------|
| `venue` | `string?` | 会場・イベント名（タイトル下の線の下） |

自己紹介の画像（`/assets/ramble-4/seshidesu.svg`・`/assets/icon.webp`・`/assets/ramble-4/at-nitcelcius.svg`）は発表者専用なので `layouts/cover.vue` にハードコードしている。

### 内部コンポーネント

| コンポーネント | 役割 |
|--------------|------|
| `SlideHeader` | タイトル行（`border-left` 縦線）＋サブタイトル |
| `SlideFooter` | 最下部の小さいフッターテキスト |
| `SlideDeco` | 右端の斜めストライプ装飾（`z-index: -1` でコンテンツの背後） |

---

## デザイントークン（`style.css`）

### タイポグラフィ（`--text-*`）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--text-hero` | `3.4rem` | section タイトル |
| `--text-name` | `3rem` | cover の氏名表示 |
| `--text-heading` | `2.5rem` | SlideHeader h1 |
| `--text-heading-secondary` | `2rem` | 本文内 h2・大きめの記号 |
| `--text-title` | `1.6rem` | cover の月テキスト |
| `--text-title-sm` | `1.3rem` | 本文内 h4 |
| `--text-body` | `1.25rem` | 本文エリア（content 系レイアウト） |
| `--text-fact` | `1.18rem` | FactList の値 |
| `--text-sub` | `1.05rem` | SlideHeader subheading |
| `--text-sm` | `1rem` | ふりがな・ハンドル |
| `--text-xs` | `0.85rem` | 所属・Badge |
| `--text-caption` | `0.72rem` | 画像キャプション |
| `--text-footer` | `0.65rem` | SlideFooter |
| `--text-citation` | `0.43rem` | 引用・出典の小さい注記 |

### レイアウトスペーシング（`--layout-*`）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--layout-px` | `2rem` | 全レイアウト共通の左右 padding |
| `--layout-footer-clearance` | `4.5rem` | 本文エリアの下 padding（フッター逃がし） |

### スライドデザイン用（`--color-*`）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--color-bg` | `#727B5F`（dark: `#424837`） | スライド背景 |
| `--color-text` | `#ffffff` | 本文テキスト |
| `--color-text-muted` | `#dddddd` | サブタイトル・補足テキスト |
| `--color-bar` | `#ffffff` | SlideHeader の縦線 |
| `--color-deco-mid` | `#B5CAA0` | SlideDeco 緑ストライプ |
| `--color-deco-light` | `#F3F6F0` | SlideDeco 白ストライプ |
| `--color-accent` | `#96C058` | アクセント（緑）・写真枠線 |
| `--color-accent-red` | `#DA4C34` | アクセント（赤） |
| `--color-accent-orange` | `#EA935E` | アクセント（橙） |
| `--color-accent-yellow` | `#FACF64` | アクセント（黄） |
| `--color-accent-cyan` | `#5BC4B8` | アクセント（シアン） |
| `--color-accent-purple` | `#8B6DB5` | アクセント（紫） |
| `--color-media-surface` | `#F4F6F2` | contain 画像の淡い背景 |
| `--color-text-on-light` | `#333333` | 明るい背景上の文字色 |
| `--color-badge-default` | `#3a3f33` | Badge デフォルト背景 |
| `--font-ja` | `'Noto Sans JP', sans-serif` | 和文フォント |
| `--font-mono` | `'JetBrains Mono', monospace` | 等幅フォント |

### 言語ブランド用（`--lang-*`）

スライドデザインとは独立。`<LanguageBadge lang="php" />` で参照される。
テキストが暗くなる必要がある言語には `--lang-*-text` も定義（現在: `javascript`）。

| トークン | 値 | 言語 |
|---------|-----|------|
| `--lang-c` | `#5C7ABA` | C |
| `--lang-cpp` | `#00599C` | C++ |
| `--lang-csharp` | `#68217A` | C# |
| `--lang-php` | `#777BB4` | PHP |
| `--lang-ruby` | `#CC342D` | Ruby |
| `--lang-java` | `#ED8B00` | Java |
| `--lang-kotlin` | `#7F52FF` | Kotlin |
| `--lang-rust` | `#CE422B` | Rust |
| `--lang-python` | `#3776AB` | Python |
| `--lang-go` | `#00ACD7` | Go |
| `--lang-r` | `#276DC2` | R |
| `--lang-javascript` | `#F7DF1E` | JavaScript（text: `#333333`） |
| `--lang-typescript` | `#3178C6` | TypeScript |
| `--lang-dart` | `#0175C2` | Dart |
| `--lang-flutter` | `#0553B1` | Flutter |
| `--lang-react` | `#149ECA` | React |
| `--lang-nextjs` | `#4A4A4A` | Next.js |
| `--lang-vuejs` | `#42B883` | Vue.js |
| `--lang-nuxt` | `#007A45` | Nuxt |
| `--lang-mysql` | `#4479A1` | MySQL |
| `--lang-matlab` | `#0076A8` | MATLAB |
| `--lang-mermaid` | `#CC2255` | Mermaid |
| `--lang-erlang` | `#A90533` | erlang |
| `--lang-vbnet` | `#512BD4` | VB.NET |
| `--lang-mcfunction` | `#5B8A38` | mcfunction |
| `--lang-smilebasic` | `#E85A0C` | SmileBASIC |
| `--lang-fermium` | `#8B6DB5` | Fermium |

---

## Badge コンポーネント

**デザインカラー**（`color` prop — スライドの配色に従う）

```html
<Badge>default（ダーク）</Badge>
<Badge color="accent">緑</Badge>
<Badge color="accent-red">赤</Badge>
<Badge color="accent-orange">橙</Badge>
<Badge color="accent-yellow">黄</Badge>
<Badge color="accent-cyan">シアン</Badge>
<Badge color="accent-purple">紫</Badge>
```

## LanguageBadge コンポーネント

**言語ブランドカラー**（`lang` prop — デザインから独立、上記 `--lang-*` を参照）

```html
<LanguageBadge lang="python" />
<LanguageBadge lang="typescript" />
<LanguageBadge lang="react" />
```

ラベルはコンポーネント側で定義。将来的にアイコンもここへ追加する。

---

## アセット構造

```
public/assets/
  icon.webp       ← プロフィール写真（cover）
  ramble-4/       ← このデッキの画像
assets/
  icon.png        ← 見本（tests/fixtures/authoring-sample.md）用
  brand/          ← BrandEmoji が import するアイコン
```

スライドの画像は `public/assets/ramble-4/` に置き、絶対パスで参照する。

```markdown
![説明](/assets/ramble-4/image.png "キャプション")
```

---

## CSS 注意事項

### `theme: none` では `.slidev-layout` が付かない

カスタムレイアウトのルート要素に `.slidev-layout` クラスは付与されない。
`style.css` では `.slidev-layout` と各レイアウトクラス（`.content-right-slide` 等）の両方にルールを書いている。
実際に効くのはレイアウトクラス側のみ。

### `ul` の箇条書き

UnoCSS の preflight が `list-style: none` をリセットするため `list-style: disc !important` が必要。`style.css` で対応済み。

---

## Slot 構文（月次ファイル内）

```markdown
::right::
右カラムのコンテンツ

::default::        ← 名前付き slot の後に default に戻る場合のみ必要
```

`::default::` を書き忘れると以降の内容が全て名前付き slot に入る。

## HTML ブロック内の Markdown

`<div>` 内の `- item` は Markdown として解釈されない。グリッド内に箇条書きを書く場合は各 `<div>` を独立させ、リストの前後に空行を入れる。

```html
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem">
<div>

- 左カラム

</div>
<div>

- 右カラム

</div>
</div>
```

`grid-cols-2`（UnoCSS）ではなく `minmax(0, 1fr)` のインライン style を使うこと（カラム overflow 防止）。
