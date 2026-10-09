---
theme: none
transition: null
title: Authoring sample
defaults:
  footerText: 'authoring sample'
  layout: content
layout: section
heading: 書き方の見本
---

---
heading: 改行と既定レイアウト
---

layout を書かないスライドは content になる
段落内の改行はそのまま改行になる

- 箇条書きは今までどおり

---
heading: 2カラム
subheading: 'content の ::left:: / ::right::'
---

カラムの上に置く導入文

::left::

**左カラム**

- 項目 A
- 項目 B

::right::

**右カラム**

| | 1番目 | 2番目 |
|---|---|---|
| 前 | グー | チョキ |

---
heading: 幅を変えた2カラム
cols: 'minmax(0, 2fr) minmax(0, 1fr)'
---

::left::

左を広く (2:1)

::right::

右

---
layout: vertical-split
heading: vertical-split の下段カラム
---

::top::

![キャプション付きの画像](./assets/icon.png "画像のタイトルがキャプションになる")

::left::

- 下段の左

::right::

- 下段の右

---
heading: 引用とコールアウト
---

> ふつうの引用

> [!IMPORTANT]
> 大事なこと

> [!WARNING]
> 注意すること
