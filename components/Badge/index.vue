<script setup lang="ts">
defineProps<{
  color?: 'accent' | 'accent-red' | 'accent-orange' | 'accent-yellow' | 'accent-cyan' | 'accent-purple'
}>()
</script>

<template>
  <span
    class="badge"
    :class="color ? `badge--${color}` : 'badge--default'"
  >
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.2em 0.7em;
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: 500;
  font-family: var(--font-ja);
  color: var(--color-text);
  white-space: nowrap;
}

.badge--default {
  background-color: var(--color-badge-default);
}

.badge--accent {
  background-color: var(--color-accent);
}

.badge--accent-red {
  background-color: var(--color-accent-red);
}

.badge--accent-orange {
  background-color: var(--color-accent-orange);
}

.badge--accent-yellow {
  background-color: var(--color-accent-yellow);
  color: var(--color-text-on-light);
}

.badge--accent-cyan {
  background-color: var(--color-accent-cyan);
}

.badge--accent-purple {
  background-color: var(--color-accent-purple);
}
</style>
