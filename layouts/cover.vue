<!--
  layout: cover — カバースライド（1枚目専用）。

  左: 自己紹介（\せしです/・写真・@NitCelcius）。発表者本人専用なので画像はハードコード。
  右: 初年次講義の扉スライドを応用したタイトル。縦線＋発表タイトル（下線付き）＋会場ラベル。縦線がスライドの中央付近に来る。
  背景と右端の装飾は本文スライドと同じ。

  Slot (default): 発表タイトル。改行はそのまま改行になり、**強調** はアクセント色になる。

  Props: venue, footerText
-->
<script setup lang="ts">
import SlideFooter from '../components/internal/SlideFooter.vue'
import SlideDeco from '../components/internal/SlideDeco.vue'

interface CoverProps {
  /** 会場・イベント名。タイトルの下に表示 */
  venue?: string
  /** フッターテキスト。未指定時は defaults.footerText を使う */
  footerText?: string
}

defineProps<CoverProps>()
</script>

<template>
  <div class="cover-slide">
    <section class="cover-slide__intro">
      <img src="/assets/ramble-4/seshidesu.svg" class="cover-slide__nickname" alt="せしです" />
      <img src="/assets/icon.webp" class="cover-slide__photo" alt="プロフィール写真" />
      <img src="/assets/ramble-4/at-nitcelcius.svg" class="cover-slide__handle" alt="@NitCelcius" />
    </section>

    <section class="cover-slide__talk">
      <div class="cover-slide__leadline" aria-hidden="true" />
      <div class="cover-slide__main">
        <div class="cover-slide__title"><slot /></div>
        <p v-if="venue" class="cover-slide__venue">{{ venue }}</p>
      </div>
    </section>

    <SlideFooter :text="footerText" class="cover-slide__footer" />
    <SlideDeco />
  </div>
</template>

<style scoped>
.cover-slide {
  position: relative;
  display: grid;
  grid-template-columns: 21rem minmax(0, 1fr);
  column-gap: 1rem;
  align-items: center;
  height: 100%;
  padding: 0 var(--layout-pr) 0 var(--layout-px);
  box-sizing: border-box;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-ja);
  overflow: hidden;
}

/* 左: 自己紹介 */
.cover-slide__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.cover-slide__nickname {
  width: 16.2rem;
  height: auto;
}

.cover-slide__photo {
  width: 12.75rem;
  height: 12.75rem;
  border-radius: 50%;
  box-shadow: 0 0 1.5rem 0.35rem rgb(255 255 255 / 0.35);
  object-fit: cover;
}

.cover-slide__handle {
  width: 14.4rem;
  height: auto;
}

/* 右: 扉スライド風のタイトル */
.cover-slide__talk {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 1.5rem;
  align-items: center;
}

.cover-slide__leadline {
  width: 0.38rem;
  height: 16rem;
  background-color: var(--color-bar);
}

.cover-slide__main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cover-slide__venue {
  margin: 0;
  font-size: var(--text-title);
  line-height: 1;
  letter-spacing: 0.13em;
  color: var(--color-text-muted);
}

.cover-slide__title {
  align-self: flex-start;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--color-text-muted);
  font-size: var(--text-heading);
  font-weight: 700;
  line-height: 1.3;
}

.cover-slide__title :deep(p) {
  margin: 0;
}

/* --color-accent is too dark on the slide background at this size */
.cover-slide__title :deep(strong) {
  color: #d2f0a0;
  text-shadow: 0 0.04em 0.18em rgb(0 0 0 / 0.3);
}

.cover-slide__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
