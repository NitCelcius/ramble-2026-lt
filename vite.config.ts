import { calloutsPlugin } from './markdown/callouts.ts'
import { figuresPlugin } from './markdown/figures.ts'

const HTML_BR = /^<br\s*\/?>$/i

export default {
  slidev: {
    markdown: {
      // Passing markdownOptions here would replace Slidev's defaults (html: true …), so set options on the instance
      markdownSetup(md: any) {
        md.set({ breaks: true })
        md.use(calloutsPlugin)
        md.use(figuresPlugin)

        // A newline right after a hand-written <br> must not add a second break (older slides end lines with <br>)
        const softbreak = md.renderer.rules.softbreak
        md.renderer.rules.softbreak = (tokens: any[], idx: number, options: any, env: any, self: any) => {
          const prev = tokens[idx - 1]
          if (prev?.type === 'html_inline' && HTML_BR.test(prev.content.trim()))
            return '\n'
          return softbreak(tokens, idx, options, env, self)
        }
      },
    },
  },
}
