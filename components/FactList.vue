<template>
  <dl class="fact-list">
    <slot />
  </dl>
</template>

<style scoped>
.fact-list {
  width: 100%;
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: var(--fact-list-column-gap, 1rem);
  row-gap: var(--fact-list-row-gap, 0.35rem);
  align-items: baseline;
  margin: 0;
}

.fact-list :slotted(dt) {
  min-width: 0;
  margin: 0;
  font-size: var(--text-sub);
  line-height: var(--line-heading);
  font-weight: 700;
  color: var(--color-text-muted);
}

.fact-list :slotted(dd) {
  min-width: 0;
  margin: 0;
  font-size: var(--fact-list-value-size, var(--text-fact));
  line-height: 1.45;
  font-weight: 700;
}
</style>
