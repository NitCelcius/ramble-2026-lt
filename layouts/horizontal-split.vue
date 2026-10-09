<!--
  layout: horizontal-split — 左右2カラムに分割するスライド

  Slots:
    left   左カラム
    right  右カラム

  Frontmatter 例:
    ---
    layout: horizontal-split
    heading: 自己紹介をしよう
    subheading: ようこそ TNP へ
    ---
    ::left::
    - 本文テキスト

    ::right::
    ![画像](../assets/2026-4/image.png)
-->
<script setup lang="ts">
import SlideFooter from '../components/internal/SlideFooter.vue'
import SlideHeader from '../components/internal/SlideHeader.vue'
import SlideDeco from '../components/internal/SlideDeco.vue'

interface HorizontalSplitProps {
  /** スライドタイトル */
  heading: string
  /** サブタイトル。省略可 */
  subheading?: string
  /** フッターテキスト。未指定時は defaults.footerText を使う */
  footerText?: string
}

defineProps<HorizontalSplitProps>()
</script>

<template>
  <div class="horizontal-split-slide">
    <SlideHeader :heading="heading" :subheading="subheading" />
    <div class="horizontal-split-slide__body">
      <main class="horizontal-split-slide__left">
        <slot name="left" />
      </main>
      <aside class="horizontal-split-slide__right">
        <slot name="right" />
      </aside>
    </div>
    <SlideFooter :text="footerText" />
    <SlideDeco />
  </div>
</template>

<style scoped>
.horizontal-split-slide__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem var(--layout-pr) var(--layout-footer-clearance) var(--layout-px);
  overflow: hidden;
  min-height: 0;
}

.horizontal-split-slide__left {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.horizontal-split-slide__right {
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  text-align: left;
  overflow: hidden;
  padding-top: 0.5rem;
}

.horizontal-split-slide__right :deep(img) {
  height: auto;
  margin: 0 auto;
}

.horizontal-split-slide__right :deep(p) {
  margin: 0 0 0.75rem;
}
</style>
