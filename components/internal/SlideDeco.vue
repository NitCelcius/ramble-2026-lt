<template>
  <div class="slide-deco" aria-hidden="true">
    <div class="slide-deco__mid" />
    <div class="slide-deco__light" />
  </div>
</template>

<style scoped>
.slide-deco {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 192px;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.slide-deco__mid {
  position: absolute;
  inset: 0;
  background: var(--color-deco-mid);
  clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 38% 100%);
}

.slide-deco__light {
  position: absolute;
  inset: 0;
  background: var(--color-deco-light);
  clip-path: polygon(87% 0%, 100% 0%, 100% 100%, 80% 100%);
}
</style>
