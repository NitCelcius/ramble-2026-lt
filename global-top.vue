<!--
  全スライド共通の QR コード（デッキ自体の URL）。
  右端 --layout-pr の余白（本文が入らない帯）の右下に置く。
-->
<template>
  <img class="deck-qr" src="/assets/ramble-4/qr-deck.svg" alt="このスライドの URL の QR コード" />
</template>

<style scoped>
.deck-qr {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  width: 7rem;
  height: 7rem;
  image-rendering: pixelated;
  pointer-events: none;
}
</style>
