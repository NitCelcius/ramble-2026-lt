<script setup lang="ts">
type SemanticToken = {
  text: string
  tone?: 'neutral' | 'deleted' | 'inserted'
}

defineProps<{
  title?: string
  beforeLabel?: string
  afterLabel?: string
  beforeTokens: SemanticToken[]
  afterTokens: SemanticToken[]
}>()
</script>

<template>
  <div class="unified-word-diff">
    <div class="unified-word-diff__header" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="unified-word-diff__line unified-word-diff__line--remove">
      <span class="unified-word-diff__prefix">-</span>
      <span v-if="beforeLabel" class="unified-word-diff__label">{{ beforeLabel }}</span>
      <span
        v-for="(token, index) in beforeTokens"
        :key="`before-${index}-${token.text}`"
        class="unified-word-diff__token"
        :class="{
          'unified-word-diff__token--deleted': token.tone === 'deleted',
        }"
      >
        {{ token.text }}
      </span>
    </div>
    <div class="unified-word-diff__line unified-word-diff__line--add">
      <span class="unified-word-diff__prefix">+</span>
      <span v-if="afterLabel" class="unified-word-diff__label">{{ afterLabel }}</span>
      <span
        v-for="(token, index) in afterTokens"
        :key="`after-${index}-${token.text}`"
        class="unified-word-diff__token"
        :class="{
          'unified-word-diff__token--inserted': token.tone === 'inserted',
        }"
      >
        {{ token.text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.unified-word-diff {
  margin-top: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(28, 33, 23, 0.68);
  box-shadow: 0 18px 40px rgba(18, 22, 15, 0.22);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.8;
}

.unified-word-diff__header,
.unified-word-diff__line {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0.7rem 0.95rem;
  white-space: pre-wrap;
}

.unified-word-diff__header {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.unified-word-diff__line--remove {
  background: rgba(218, 76, 52, 0.12);
}

.unified-word-diff__line--add {
  background: rgba(150, 192, 88, 0.14);
}

.unified-word-diff__prefix,
.unified-word-diff__label {
  flex: 0 0 auto;
  font-weight: 700;
  margin-right: 1rem;
}

.unified-word-diff__prefix {
  width: 1ch;
}

.unified-word-diff__label {
  color: rgba(255, 255, 255, 0.86);
  margin-right: 1rem;
}

.unified-word-diff__token {
  border-radius: 0.28rem;
  padding: 0.02rem 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.unified-word-diff__token--deleted {
  background: rgba(218, 76, 52, 0.32);
  color: #ffe6e1;
  padding-inline: 0.2rem;
}

.unified-word-diff__token--inserted {
  background: rgba(150, 192, 88, 0.32);
  color: #f4ffe6;
  padding-inline: 0.2rem;
}
</style>
