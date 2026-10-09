<script setup lang="ts">
import CodexIcon from '~icons/devicon-plain/codex'
import ClaudeIcon from '~icons/simple-icons/claude'
import GoogleSlidesIcon from '~icons/simple-icons/googleslides'
import MarkdownIcon from '~icons/simple-icons/markdown'
import MicrosoftPowerPointIcon from '~icons/simple-icons/microsoftpowerpoint'
import NotebookLmIcon from '~icons/simple-icons/notebooklm'
import PrettierIcon from '~icons/simple-icons/prettier'
import StorybookIcon from '~icons/simple-icons/storybook'
import TypeScriptIcon from '~icons/simple-icons/typescript'
import { computed } from 'vue'
import type { Component } from 'vue'
import slidevIcon from '../../assets/brand/slidev.png'
import vueLogo from '../../assets/brand/vue.svg'

type BrandName =
  | 'powerpoint'
  | 'google-slides'
  | 'notebooklm'
  | 'slidev'
  | 'prettier'
  | 'typescript'
  | 'vue'
  | 'markdown'
  | 'claude'
  | 'codex'
  | 'storybook'

const props = defineProps<{
  name: BrandName | (string & {})
  afterText?: string
  href?: string
}>()

type Brand = {
  label: string
  icon?: Component
  image?: string
  fallbackText?: string
}

const brands: Record<BrandName, Brand> = {
  powerpoint: {
    label: 'Microsoft PowerPoint',
    icon: MicrosoftPowerPointIcon,
  },
  'google-slides': {
    label: 'Google Slides',
    icon: GoogleSlidesIcon,
  },
  notebooklm: {
    label: 'NotebookLM',
    icon: NotebookLmIcon,
  },
  slidev: {
    label: 'Slidev',
    image: slidevIcon,
  },
  prettier: {
    label: 'Prettier',
    icon: PrettierIcon,
  },
  typescript: {
    label: 'TypeScript',
    icon: TypeScriptIcon,
  },
  vue: {
    label: 'Vue.js',
    image: vueLogo,
  },
  markdown: {
    label: 'Markdown',
    icon: MarkdownIcon,
  },
  claude: {
    label: 'Claude',
    icon: ClaudeIcon,
  },
  codex: {
    label: 'Codex',
    icon: CodexIcon,
  },
  storybook: {
    label: 'Storybook',
    icon: StorybookIcon,
  },
}

const availableBrandNames = Object.keys(brands).sort()
const hasKnownBrand = computed(() =>
  Object.prototype.hasOwnProperty.call(brands, props.name),
)
const brand = computed<Brand>(() => {
  if (hasKnownBrand.value) {
    return brands[props.name as BrandName]
  }

  return {
    label: `Unknown brand "${props.name}". Available: ${availableBrandNames.join(', ')}`,
    fallbackText: '?',
  }
})
const brandModifier = computed(() => (hasKnownBrand.value ? props.name : 'unknown'))
const brandHelpText = computed(() => brand.value.label)
const hasAfterText = computed(() => Boolean(props.afterText))
</script>

<template>
  <a
    v-if="hasAfterText && href"
    class="brand-emoji-phrase"
    :href="href"
    :title="brandHelpText"
  >
    <span
      class="brand-emoji"
      :class="`brand-emoji--${brandModifier}`"
      aria-hidden="true"
    >
      <component
        v-if="brand.icon"
        :is="brand.icon"
        class="brand-emoji__icon"
        aria-hidden="true"
      />
      <img
        v-else-if="brand.image"
        class="brand-emoji__image"
        :src="brand.image"
        alt=""
        aria-hidden="true"
      />
      <span v-else class="brand-emoji__fallback" aria-hidden="true">
        {{ brand.fallbackText }}
      </span>
    </span>
    <span>{{ afterText }}</span>
  </a>
  <span
    v-else-if="hasAfterText"
    class="brand-emoji-phrase"
    :title="brandHelpText"
  >
    <span
      class="brand-emoji"
      :class="`brand-emoji--${brandModifier}`"
      aria-hidden="true"
    >
      <component
        v-if="brand.icon"
        :is="brand.icon"
        class="brand-emoji__icon"
        aria-hidden="true"
      />
      <img
        v-else-if="brand.image"
        class="brand-emoji__image"
        :src="brand.image"
        alt=""
        aria-hidden="true"
      />
      <span v-else class="brand-emoji__fallback" aria-hidden="true">
        {{ brand.fallbackText }}
      </span>
    </span>
    <span>{{ afterText }}</span>
  </span>
  <span
    v-else
    class="brand-emoji"
    :class="`brand-emoji--${brandModifier}`"
    role="img"
    :aria-label="brand.label"
    :title="brandHelpText"
  >
    <component
      v-if="brand.icon"
      :is="brand.icon"
      class="brand-emoji__icon"
      aria-hidden="true"
    />
    <img
      v-else-if="brand.image"
      class="brand-emoji__image"
      :src="brand.image"
      alt=""
      aria-hidden="true"
    />
    <span v-else class="brand-emoji__fallback" aria-hidden="true">
      {{ brand.fallbackText }}
    </span>
  </span>
</template>

<style scoped>
.brand-emoji-phrase {
  display: inline-flex;
  align-items: baseline;
  gap: 0.22em;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}

.brand-emoji {
  --brand-color: var(--color-text);
  --brand-surface: rgb(255 255 255 / 0.92);

  display: inline-flex;
  width: 1.3em;
  height: 1.3em;
  align-items: center;
  justify-content: center;
  padding: 0.2em;
  border-radius: 0.3em;
  background: var(--brand-surface);
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.72),
    0 0.16em 0.38em rgb(28 33 24 / 0.18);
  color: var(--brand-color);
  line-height: 1;
  vertical-align: -0.2em;
}

.brand-emoji__icon {
  width: 100%;
  height: 100%;
}

.brand-emoji__image {
  width: 112%;
  max-width: none;
  height: auto;
  object-fit: contain;
}

.brand-emoji__fallback {
  font-family: var(--font-mono);
  font-size: 0.8em;
  font-weight: 700;
  line-height: 1;
}

.brand-emoji--powerpoint {
  --brand-color: #d24726;
}

.brand-emoji--google-slides {
  --brand-color: #f4b400;
}

.brand-emoji--notebooklm {
  --brand-color: #4285f4;
}

.brand-emoji--slidev {
  --brand-surface: rgb(255 255 255 / 0.96);
}

.brand-emoji--prettier {
  --brand-color: #1a2b34;
  --brand-surface: #f7ba3e;
}

.brand-emoji--typescript {
  --brand-color: #ffffff;
  --brand-surface: #3178c6;
}

.brand-emoji--markdown {
  --brand-color: #24292f;
}

.brand-emoji--claude {
  --brand-color: #d97757;
}

.brand-emoji--codex {
  --brand-color: #111111;
}

.brand-emoji--storybook {
  --brand-color: #ff4785;
}

.brand-emoji--unknown {
  --brand-color: var(--color-text-on-light);
  --brand-surface: var(--color-accent-yellow);
}
</style>
