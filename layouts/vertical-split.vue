<!--
  layout: vertical-split — 上下2エリアに分割するスライド

  Slots:
    top     上エリア（画像・グラフ。高さ約42%）
    bottom  下エリア（箇条書き等）
    left    下エリアの2カラム（左）。省略可
    right   下エリアの2カラム（右）。省略可

  Frontmatter 例:
    ---
    layout: vertical-split
    heading: 春休み、なにしてた？
    cols: 'minmax(0, 2fr) minmax(0, 1fr)'   # 省略時は 1:1
    ---
    ::top::
    ![円グラフ](../assets/2026-4/chart.png)

    ::left::
    - 左カラム項目

    ::right::
    - 右カラム項目
-->
<script setup lang="ts">
import SlideFooter from '../components/internal/SlideFooter.vue'
import SlideHeader from '../components/internal/SlideHeader.vue'
import SlideDeco from '../components/internal/SlideDeco.vue'

interface VerticalSplitProps {
  /** スライドタイトル */
  heading: string
  /** サブタイトル。省略可 */
  subheading?: string
  /** フッターテキスト。未指定時は defaults.footerText を使う */
  footerText?: string
  /** 下エリアの ::left:: / ::right:: の grid-template-columns。省略時は 1:1 */
  cols?: string
}

defineProps<VerticalSplitProps>()
</script>

<template>
  <div class="vertical-split-slide">
    <SlideHeader :heading="heading" :subheading="subheading" />
    <div class="vertical-split-slide__body">
      <div class="vertical-split-slide__top">
        <slot name="top" />
      </div>
      <main class="vertical-split-slide__bottom">
        <slot name="bottom" />
        <div v-if="$slots.left || $slots.right" class="slide-cols" :style="{ gridTemplateColumns: cols }">
          <div><slot name="left" /></div>
          <div><slot name="right" /></div>
        </div>
      </main>
    </div>
    <SlideFooter :text="footerText" />
    <SlideDeco />
  </div>
</template>

<style scoped>
.vertical-split-slide__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem var(--layout-pr) var(--layout-footer-clearance) var(--layout-px);
  gap: 0.75rem;
  overflow: hidden;
  min-height: 0;
}

.vertical-split-slide__top {
  flex: 0 0 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.vertical-split-slide__top :deep(img) {
  height: auto;
}

.vertical-split-slide__top :deep(p) {
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-split-slide__bottom {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
