<!--
  layout: section — 章区切りスライド

  Slot: なし

  Frontmatter 例:
    ---
    layout: section
    heading: サークル関連
    ---
-->
<script setup lang="ts">
import SlideFooter from '../components/internal/SlideFooter.vue'
import SlideDeco from '../components/internal/SlideDeco.vue'

interface SectionProps {
  /** セクションタイトル。大きく中央表示する */
  heading: string
  /** フッターテキスト。未指定時は defaults.footerText を使う */
  footerText?: string
}

defineProps<SectionProps>()
</script>

<template>
  <div class="section-slide">
    <div class="section-slide__body">
      <h1 class="section-slide__title" lang="ja">{{ heading }}</h1>
    </div>
    <SlideFooter :text="footerText" />
    <SlideDeco />
  </div>
</template>

<style scoped>
.section-slide__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Symmetric so a one-line title stays centered on the slide; long titles wrap clear of SlideDeco */
  padding: 0 var(--layout-pr);
}

.section-slide__title {
  display: inline-block;
  margin: 0;
  text-align: center;
  text-wrap: balance;
  word-break: auto-phrase;
  font-size: var(--text-hero);
  font-weight: 700;
  color: var(--color-text);
  font-family: var(--font-ja);
  line-height: var(--line-heading);
  border-bottom: 2px solid var(--color-text);
  padding-bottom: 0.3rem;
  position: relative;
}

.section-slide__title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 4rem;
  height: 2px;
  background: var(--color-text);
}
</style>
