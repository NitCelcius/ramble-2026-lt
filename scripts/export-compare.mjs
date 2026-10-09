// Compare two PNG export directories produced by `slidev export --format png`.
// Usage: node scripts/export-compare.mjs <beforeDir> <afterDir> [outDir]
// Prints changed / missing / added files and writes <outDir>/index.html with changed slides side by side.
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const [beforeArg, afterArg, outArg = 'dist/compare'] = process.argv.slice(2)
if (!beforeArg || !afterArg) {
  console.error('usage: node scripts/export-compare.mjs <beforeDir> <afterDir> [outDir]')
  process.exit(2)
}
const beforeDir = resolve(beforeArg)
const afterDir = resolve(afterArg)
const outDir = resolve(outArg)

const bySlideNumber = (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10)
const pngs = dir => readdirSync(dir).filter(name => name.endsWith('.png')).sort(bySlideNumber)
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex')

const before = pngs(beforeDir)
const after = new Set(pngs(afterDir))
const changed = []
const missing = []
for (const name of before) {
  if (!after.delete(name)) {
    missing.push(name)
    continue
  }
  if (hash(join(beforeDir, name)) !== hash(join(afterDir, name)))
    changed.push(name)
}
const added = [...after]

mkdirSync(outDir, { recursive: true })
const img = (dir, name) => `<img src="${relative(outDir, join(dir, name)).replaceAll('\\', '/')}" loading="lazy">`
const rows = changed.map(name => `<tr><th>${name}</th><td>${img(beforeDir, name)}</td><td>${img(afterDir, name)}</td></tr>`)
writeFileSync(join(outDir, 'index.html'), `<!doctype html><meta charset="utf-8"><title>export compare</title>
<style>body{font-family:sans-serif;background:#222;color:#eee}img{width:640px}th{vertical-align:top;padding:4px 8px}</style>
<p>${changed.length} changed, ${missing.length} missing in after, ${added.length} only in after</p>
<table><tr><th></th><th>${beforeArg}</th><th>${afterArg}</th></tr>${rows.join('\n')}</table>`)

console.log(`unchanged: ${before.length - changed.length - missing.length}`)
console.log(`changed:   ${changed.length}${changed.length ? ` (${changed.join(', ')})` : ''}`)
if (missing.length || added.length) {
  console.log(`missing:   ${missing.join(', ') || '-'}`)
  console.log(`added:     ${added.join(', ') || '-'}`)
  process.exitCode = 1
}
console.log(`report:    ${relative(process.cwd(), join(outDir, 'index.html'))}`)
