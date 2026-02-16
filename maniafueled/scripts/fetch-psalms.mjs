#!/usr/bin/env node
/**
 * Fetches all 150 Psalms from bible-api.com (World English Bible, public domain)
 * and writes data/psalms.json for the devotions feature.
 * Run from repo root: node maniafueled/scripts/fetch-psalms.mjs
 */

import { writeFileSync, mkdirSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = join(__dirname, "..", "data", "psalms.json")

const API = "https://bible-api.com"

async function fetchPsalm(n) {
  const url = `${API}/psalms%20${n}?translation=web`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Psalm ${n}: ${res.status}`)
  const data = await res.json()
  const verses = (data.verses || []).map((v) => ({
    verseNumber: v.verse,
    text: (v.text || "").trim().replace(/\n/g, " "),
  }))
  return { number: n, verses }
}

async function main() {
  const psalms = []
  for (let n = 1; n <= 150; n++) {
    process.stdout.write(`Fetching Psalm ${n}...\r`)
    const psalm = await fetchPsalm(n)
    psalms.push(psalm)
    await new Promise((r) => setTimeout(r, 1500))
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(psalms, null, 0))
  console.log("\nWrote " + OUT_PATH)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
