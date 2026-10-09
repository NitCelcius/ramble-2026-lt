<script setup lang="ts">
defineProps<{
  heading: string
  subheading?: string
}>()
</script>

<template>
  <header class="slide-header">
    <div class="slide-header__title-row">
      <h1 class="slide-header__heading">{{ heading }}</h1>
    </div>
    <p v-if="subheading" class="slide-header__subheading">{{ subheading }}</p>
  </header>
</template>

<style scoped>
.slide-header {
  padding: 1.2rem var(--layout-px) 0.4rem;
  flex-shrink: 0;
}

.slide-header__title-row {
  display: flex;
  align-items: center;
}

.slide-header__heading {
  margin: 0;
  font-size: var(--text-heading);
  font-weight: 700;
  line-height: var(--line-heading);
  color: var(--color-text);
  border-left: 5px solid var(--color-bar);
  padding-left: 1rem;
}

.slide-header__subheading {
  padding-left: .4rem;
  margin: 0.25rem 0 0 1.1rem;
  font-size: var(--text-sub);
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}
</style>
