<!--
  layout: content — コンテンツスライド

  Slots:
    default  本文エリア全体。Markdown 箇条書き・HTML 混在可。
    left     本文の下の2カラム（左）。省略可
    right    本文の下の2カラム（右）。省略可

  Frontmatter 例:
    ---
    layout: content
    heading: 活動まとめ
    subheading: 2025年4月
    cols: 'minmax(0, 2fr) minmax(0, 1fr)'   # 省略時は 1:1
    ---
    導入文

    ::left::
    - 左カラム

    ::right::
    - 右カラム
-->
<script setup lang="ts">
import SlideFooter from '../components/internal/SlideFooter.vue'
import SlideHeader from '../components/internal/SlideHeader.vue'
import SlideDeco from '../components/internal/SlideDeco.vue'

interface ContentProps {
  /** スライドタイトル */
  heading: string
  /** サブタイトル。省略可 */
  subheading?: string
  /** フッターテキスト。未指定時は defaults.footerText を使う */
  footerText?: string
  /** ::left:: / ::right:: の grid-template-columns。省略時は 1:1 */
  cols?: string
}

defineProps<ContentProps>()
</script>

<template>
  <div class="content-slide">
    <SlideHeader :heading="heading" :subheading="subheading" />
    <main class="content-slide__main">
      <slot />
      <div v-if="$slots.left || $slots.right" class="slide-cols" :style="{ gridTemplateColumns: cols }">
        <div><slot name="left" /></div>
        <div><slot name="right" /></div>
      </div>
    </main>
    <SlideFooter :text="footerText" />
    <SlideDeco />
  </div>
</template>

<style scoped>
.content-slide__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem var(--layout-pr) var(--layout-footer-clearance) var(--layout-px);
  overflow: hidden;
  flex-direction: column;
}
</style>
