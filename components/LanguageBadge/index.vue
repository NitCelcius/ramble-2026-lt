<script setup lang="ts">
import CIcon from '~icons/simple-icons/c'
import CppIcon from '~icons/simple-icons/cplusplus'
import CsharpIcon from '~icons/simple-icons/csharp'
import DartIcon from '~icons/simple-icons/dart'
import DotnetIcon from '~icons/simple-icons/dotnet'
import ErlangIcon from '~icons/simple-icons/erlang'
import FlutterIcon from '~icons/simple-icons/flutter'
import GoIcon from '~icons/simple-icons/go'
import JavaIcon from '~icons/simple-icons/openjdk'
import JavascriptIcon from '~icons/simple-icons/javascript'
import KotlinIcon from '~icons/simple-icons/kotlin'
import MermaidIcon from '~icons/simple-icons/mermaid'
import MysqlIcon from '~icons/simple-icons/mysql'
import NextjsIcon from '~icons/simple-icons/nextdotjs'
import NuxtIcon from '~icons/simple-icons/nuxt'
import PhpIcon from '~icons/simple-icons/php'
import PythonIcon from '~icons/simple-icons/python'
import RIcon from '~icons/simple-icons/r'
import ReactIcon from '~icons/simple-icons/react'
import RubyIcon from '~icons/simple-icons/ruby'
import RustIcon from '~icons/simple-icons/rust'
import TypescriptIcon from '~icons/simple-icons/typescript'
import VuejsIcon from '~icons/simple-icons/vuedotjs'
import { computed } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  lang: string
}>()

const languageLabels: Record<string, string> = {
  c: 'C',
  cpp: 'C++',
  csharp: 'C#',
  dart: 'Dart',
  erlang: 'erlang',
  fermium: 'Fermium',
  flutter: 'Flutter',
  go: 'Go',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  matlab: 'MATLAB',
  mcfunction: 'mcfunction',
  mermaid: 'Mermaid',
  mysql: 'MySQL',
  nextjs: 'Next.js',
  nuxt: 'Nuxt',
  php: 'PHP',
  python: 'Python',
  r: 'R',
  react: 'React',
  ruby: 'Ruby',
  rust: 'Rust',
  smilebasic: 'SmileBASIC',
  typescript: 'TypeScript',
  vbnet: 'VB.NET',
  vuejs: 'Vue.js',
}

const languageIcons: Record<string, Component> = {
  c: CIcon,
  cpp: CppIcon,
  csharp: CsharpIcon,
  dart: DartIcon,
  erlang: ErlangIcon,
  flutter: FlutterIcon,
  go: GoIcon,
  java: JavaIcon,
  javascript: JavascriptIcon,
  kotlin: KotlinIcon,
  mermaid: MermaidIcon,
  mysql: MysqlIcon,
  nextjs: NextjsIcon,
  nuxt: NuxtIcon,
  php: PhpIcon,
  python: PythonIcon,
  r: RIcon,
  react: ReactIcon,
  ruby: RubyIcon,
  rust: RustIcon,
  typescript: TypescriptIcon,
  vbnet: DotnetIcon,
  vuejs: VuejsIcon,
}

const languageIconFallbacks: Record<string, string> = {
  fermium: 'F',
  matlab: 'M',
  mcfunction: 'MC',
  smilebasic: 'SB',
}

const languageLabel = computed(() => languageLabels[props.lang] ?? props.lang)
const languageIcon = computed(() => languageIcons[props.lang])
const languageIconFallback = computed(() => languageIconFallbacks[props.lang])
</script>

<template>
  <span
    class="language-badge"
    :style="{
      backgroundColor: `var(--lang-${lang})`,
      color: `var(--lang-${lang}-text, var(--color-text))`,
    }"
  >
    <component
      v-if="languageIcon"
      :is="languageIcon"
      class="language-badge__icon"
      aria-hidden="true"
    />
    <span
      v-else-if="languageIconFallback"
      class="language-badge__fallback-icon"
      aria-hidden="true"
    >
      {{ languageIconFallback }}
    </span>
    {{ languageLabel }}
  </span>
</template>

<style scoped>
.language-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: 500;
  font-family: var(--font-ja);
  color: var(--color-text);
  white-space: nowrap;
}

.language-badge__icon {
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
}

.language-badge__fallback-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1em;
  height: 1em;
  flex: 0 0 auto;
  font-family: var(--font-mono);
  font-size: 0.72em;
  font-weight: 700;
  line-height: 1;
}
</style>
