// GitHub-style alerts: a blockquote starting with [!IMPORTANT] or [!WARNING] gets class "callout callout--<kind>".
const MARKER = /^\[!(IMPORTANT|WARNING)\][ \t]*\n?/

export function calloutsPlugin(md: any) {
  // Before 'inline': the marker leaves the source text before any inline rule can turn it into an element
  md.core.ruler.before('inline', 'tnp_callouts', (state: any) => {
    const tokens = state.tokens
    for (let i = 0; i + 2 < tokens.length; i++) {
      if (tokens[i].type !== 'blockquote_open' || tokens[i + 1].type !== 'paragraph_open')
        continue
      const inline = tokens[i + 2]
      const match = inline.content.match(MARKER)
      if (!match)
        continue
      tokens[i].attrJoin('class', `callout callout--${match[1].toLowerCase()}`)
      inline.content = inline.content.slice(match[0].length)
    }
  })
}
