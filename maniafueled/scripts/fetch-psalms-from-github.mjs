#!/usr/bin/env node
/**
 * Fetches all 150 Psalms from TehShrike/world-english-bible (WEB, public domain)
 * and writes data/psalms.json. Single request, no rate limit.
 * Run from repo root: node maniafueled/scripts/fetch-psalms-from-github.mjs
 */

import { writeFileSync, mkdirSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = join(__dirname, "..", "data", "psalms.json")

const GITHUB_RAW =
  "https://raw.githubusercontent.com/TehShrike/world-english-bible/master/json/psalms.json"

function convert(rows) {
  const byChapter = new Map()
  for (const row of rows) {
    if (row.type !== "line text" || row.value == null) continue
    const ch = row.chapterNumber
    const v = row.verseNumber
    const text = String(row.value).trim()
    if (!byChapter.has(ch)) byChapter.set(ch, new Map())
    const verses = byChapter.get(ch)
    if (!verses.has(v)) verses.set(v, [])
    verses.get(v).push(text)
  }
  const psalms = []
  for (let n = 1; n <= 150; n++) {
    const verseMap = byChapter.get(n)
    const verses = []
    if (verseMap) {
      const nums = [...verseMap.keys()].sort((a, b) => a - b)
      for (const v of nums) {
        const parts = verseMap.get(v)
        verses.push({
          verseNumber: v,
          text: parts.join(" ").replace(/\s+/g, " ").trim(),
        })
      }
    }
    psalms.push({ number: n, verses })
  }
  return psalms
}

async function main() {
  process.stdout.write("Fetching psalms.json from GitHub...\n")
  const res = await fetch(GITHUB_RAW)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  const rows = await res.json()
  if (!Array.isArray(rows)) throw new Error("Expected JSON array")
  const psalms = convert(rows)
  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(psalms, null, 0))
  console.log("Wrote " + OUT_PATH + " (" + psalms.length + " Psalms)")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
