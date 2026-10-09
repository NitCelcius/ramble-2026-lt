<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <footer class="slide-footer">
    <span class="slide-footer__text">{{ text }}</span>
  </footer>
</template>

<style scoped>
.slide-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem var(--layout-px);
  font-family: var(--font-mono);
  font-size: var(--text-footer);
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.slide-footer__text {
  text-align: center;
}
</style>
