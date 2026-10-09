<script setup lang="ts">
import { computed } from 'vue'

type ImageCollageItem =
  | string
  | {
      src: string
      alt?: string
      caption?: string
      note?: string
      fit?: 'cover' | 'contain'
      background?: string
      objectPosition?: string
      crop?: string
    }

const props = withDefaults(
  defineProps<{
    images: ImageCollageItem[]
    rows?: number
    columns?: number
    altPrefix?: string
    fit?: 'cover' | 'contain'
  }>(),
  {
    rows: 2,
    columns: 2,
    altPrefix: 'Collage image',
    fit: 'cover',
  },
)

const cellCount = computed(() => props.rows * props.columns)
const visibleImages = computed(() =>
  props.images.slice(0, cellCount.value).map((image, index) => {
    if (typeof image === 'string') {
      return {
        key: `${image}-${index}`,
        src: image,
        alt: `${props.altPrefix} ${index + 1}`,
        caption: undefined,
        note: undefined,
        fit: props.fit,
        background: undefined,
        objectPosition: 'center',
      }
    }

    return {
      key: `${image.src}-${index}`,
      src: image.src,
      alt: image.alt || `${props.altPrefix} ${index + 1}`,
      caption: image.caption,
      note: image.note,
      fit: image.fit || props.fit,
      background: image.background,
      objectPosition: image.crop || image.objectPosition || 'center',
    }
  }),
)

const gridStyle = computed(() => ({
  '--image-collage-default-columns': `repeat(${props.columns}, minmax(0, 1fr))`,
  '--image-collage-default-rows': `repeat(${props.rows}, minmax(0, 1fr))`,
}))
</script>

<template>
  <div class="image-collage__frame">
    <div class="image-collage" :style="gridStyle">
      <figure
        v-for="image in visibleImages"
        :key="image.key"
        class="image-collage__item"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="image-collage__image"
          :style="{
            objectFit: image.fit,
            objectPosition: image.objectPosition,
            background: image.background,
          }"
        />
        <figcaption v-if="image.caption" class="image-collage__caption">
          {{ image.caption }}<sup v-if="image.note">{{ image.note }}</sup>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.image-collage__frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-collage {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  gap: var(--image-collage-gap, 0);
  grid-template-columns:
    var(--image-collage-columns, var(--image-collage-default-columns));
  grid-template-rows: var(--image-collage-rows, var(--image-collage-default-rows));
  background: var(--image-collage-background, rgba(15, 18, 12, 0.2));
}

.image-collage__item {
  min-width: 0;
  min-height: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.image-collage__image {
  width: 100%;
  height: var(--image-collage-image-height, 100%);
  min-height: 0;
  flex: 1 1 auto;
  display: block;
  background: var(--image-collage-image-background, transparent);
  border-radius: var(--image-collage-image-radius, 0);
}

.image-collage__caption {
  margin-top: var(--image-collage-caption-gap, 0.35rem);
  font-size: var(--image-collage-caption-size, var(--text-xs));
  line-height: 1.35;
  text-align: center;
}
</style>
