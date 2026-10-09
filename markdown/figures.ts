// A paragraph holding only ![alt](src "caption") renders as <figure class="md-figure"> with the title as <figcaption>.
// Images without a title stay plain <p><img></p>.
export function figuresPlugin(md: any) {
  md.core.ruler.after('inline', 'tnp_figures', (state: any) => {
    const tokens = state.tokens
    for (let i = 0; i + 2 < tokens.length; i++) {
      if (tokens[i].type !== 'paragraph_open' || tokens[i + 2].type !== 'paragraph_close')
        continue
      const children = tokens[i + 1].children ?? []
      if (children.length !== 1 || children[0].type !== 'image')
        continue
      const image = children[0]
      const caption = image.attrGet('title')
      if (!caption)
        continue

      image.attrs = image.attrs.filter(([name]: [string]) => name !== 'title')
      const figcaption = new state.Token('html_inline', '', 0)
      figcaption.content = `<figcaption>${md.utils.escapeHtml(caption)}</figcaption>`
      children.push(figcaption)
      // The class keeps caption styles off hand-written <figure> elements
      tokens[i].tag = 'figure'
      tokens[i].attrSet('class', 'md-figure')
      tokens[i + 2].tag = 'figure'
    }
  })
}
