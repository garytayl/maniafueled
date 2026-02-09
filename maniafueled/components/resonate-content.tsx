"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { resonantSongs, resonantVerses } from "@/lib/content"
import { parseStyledText } from "@/lib/parse-styled-text"

/** Group verses by book, then by chapter; each item keeps original index for selection */
function groupVersesByBookAndChapter(
  verses: Array<{ reference: string; translation?: string; text: string; note?: string; book?: string; chapter?: string }>
): Array<{ book: string; chapters: Array<{ chapter: string; verses: Array<{ verseIndex: number }> }> }> {
  const byBook = new Map<string, Map<string, number[]>>()
  verses.forEach((v, i) => {
    const book = "book" in v && v.book ? String(v.book) : v.reference.split(" ")[0] || "Other"
    const chapter = "chapter" in v && v.chapter ? String(v.chapter) : v.reference.split(":")[0]?.split(" ").pop() || "1"
    if (!byBook.has(book)) byBook.set(book, new Map())
    const bookChapters = byBook.get(book)!
    if (!bookChapters.has(chapter)) bookChapters.set(chapter, [])
    bookChapters.get(chapter)!.push(i)
  })
  return Array.from(byBook.entries()).map(([book, chapterMap]) => ({
    book,
    chapters: Array.from(chapterMap.entries()).map(([chapter, indices]) => ({
      chapter,
      verses: indices.map((verseIndex) => ({ verseIndex })),
    })),
  }))
}

type SelectedItem =
  | { type: "song"; songIndex: number; stanzaIndex: number; lineIndex: number; note: string }
  | { type: "songIntro"; songIndex: number; note: string }
  | { type: "verse"; verseIndex: number; note: string }
  | null

type ResonateMenu = "songs" | "verses"

export function ResonateContent() {
  const [selected, setSelected] = useState<SelectedItem>(null)
  const [menu, setMenu] = useState<ResonateMenu>("songs")
  const [selectedSongIndex, setSelectedSongIndex] = useState(0)
  const versesByBookAndChapter = useMemo(() => groupVersesByBookAndChapter(resonantVerses), [])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] pb-24 max-w-4xl mx-auto lg:max-w-none lg:flex lg:gap-12 lg:pr-[22rem]">
        <main className="min-w-0 flex-1 lg:min-w-0">
          <header className="mb-10">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-3 uppercase">
              WHAT RESONATES
            </p>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic leading-tight mb-4">
              Lyrics & verses
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mb-8">
              Songs and Bible verses that put words to what I feel. Tap a highlighted line to see why it resonates.
            </p>

            {/* Split menu: Songs | Bible verses — align tab underline with nav bottom */}
            <nav className="flex border-b border-white/15" aria-label="Resonate sections">
              <button
                type="button"
                onClick={() => setMenu("songs")}
                className={`font-mono text-xs sm:text-sm tracking-widest uppercase py-3 pr-6 border-b-2 transition-colors -mb-px ${
                  menu === "songs"
                    ? "border-white text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                Songs
              </button>
              <button
                type="button"
                onClick={() => setMenu("verses")}
                className={`font-mono text-xs sm:text-sm tracking-widest uppercase py-3 pl-6 border-b-2 transition-colors -mb-px ${
                  menu === "verses"
                    ? "border-white text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                Bible verses
              </button>
            </nav>
          </header>

          {/* Songs */}
          {menu === "songs" && (
          <section className="mb-20">
            <h2 className="font-mono text-xs tracking-[0.25em] text-white/50 mb-6 uppercase">
              Songs
            </h2>
            {resonantSongs.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {resonantSongs.map((song, idx) => (
                  <button
                    key={`${song.artist}-${song.title}`}
                    type="button"
                    onClick={() => setSelectedSongIndex(idx)}
                    className={`font-mono text-xs tracking-wider uppercase py-2 px-4 rounded-full border transition-colors ${
                      selectedSongIndex === idx
                        ? "border-white text-white bg-white/10"
                        : "border-white/30 text-white/70 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {song.title}
                  </button>
                ))}
              </div>
            )}
            {resonantSongs.map((song, songIndex) =>
              resonantSongs.length > 1 && songIndex !== selectedSongIndex ? null : (
              <article key={`${song.artist}-${song.title}`} className="mb-14">
                <div className="mb-8">
                  <p className="font-mono text-sm tracking-wider text-white/60">
                    {song.artist}
                  </p>
                  <h3 className="font-sans text-xl sm:text-2xl font-light italic">
                    {song.title}
                  </h3>
                  {song.songNote && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelected(
                          selected?.type === "songIntro" && selected.songIndex === songIndex
                            ? null
                            : { type: "songIntro", songIndex, note: song.songNote }
                        )
                      }
                      className="mt-3 text-left font-sans text-sm text-amber-200/90 hover:text-amber-200 underline underline-offset-2"
                    >
                      Why this song resonates
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  {song.stanzas.map((stanza, stanzaIndex) => (
                    <div key={`${songIndex}-${stanzaIndex}`} className="space-y-1">
                      {stanza.label && (
                        <p className="font-mono text-xs tracking-wider text-white/50 mb-2 uppercase">
                          {stanza.label}
                        </p>
                      )}
                      <div className="font-sans text-base sm:text-lg font-light text-white/95 leading-relaxed">
                        {stanza.lines.map((line, lineIndex) => (
                          <button
                            key={`${songIndex}-${stanzaIndex}-${lineIndex}`}
                            type="button"
                            onClick={() =>
                              line.note
                                ? setSelected(
                                    selected?.type === "song" &&
                                      selected.songIndex === songIndex &&
                                      selected.stanzaIndex === stanzaIndex &&
                                      selected.lineIndex === lineIndex
                                      ? null
                                      : {
                                          type: "song",
                                          songIndex,
                                          stanzaIndex,
                                          lineIndex,
                                          note: line.note,
                                        }
                                  )
                                : undefined
                            }
                            className={`block w-full text-left py-1 -mx-1 px-1 rounded ${
                              line.note
                                ? "hover:bg-white/10 cursor-pointer border-l-2 border-amber-500/50 pl-3 -ml-1"
                                : ""
                            }`}
                          >
                            {parseStyledText(line.text, `song-${songIndex}-${stanzaIndex}-${lineIndex}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )
            )}
          </section>
          )}

          {/* Bible verses — grouped by chapter */}
          {menu === "verses" && (
          <section>
            <h2 className="font-mono text-xs tracking-[0.25em] text-white/50 mb-6 uppercase">
              Bible verses
            </h2>
            {versesByBookAndChapter.map(({ book, chapters }) => (
              <div key={book} className="mb-14">
                <h3 className="font-mono text-sm tracking-wider text-white/70 mb-8 uppercase border-b border-white/15 pb-3">
                  {book}
                </h3>
                {chapters.map(({ chapter, verses: verseItems }) => (
                  <div key={`${book}-${chapter}`} className="mb-10">
                    <h4 className="font-mono text-xs tracking-wider text-white/50 mb-6 uppercase">
                      Chapter {chapter}
                    </h4>
                    <div className="space-y-10">
                      {verseItems.map(({ verseIndex }) => {
                        const verse = resonantVerses[verseIndex]
                        return (
                          <article
                            key={verse.reference}
                            className="border-l-2 border-white/20 pl-5 sm:pl-6"
                          >
                            <p className="font-mono text-sm tracking-wider text-white/70 mb-2">
                              {verse.reference}
                              {"translation" in verse && verse.translation && (
                                <span className="text-white/50 font-normal"> · {verse.translation}</span>
                              )}
                            </p>
                            <p className="font-sans text-base sm:text-lg font-light text-white/90 leading-relaxed mb-3">
                              &ldquo;{parseStyledText(verse.text, `verse-${verseIndex}`)}&rdquo;
                            </p>
                            {verse.note && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelected(
                                    selected?.type === "verse" && selected.verseIndex === verseIndex
                                      ? null
                                      : { type: "verse", verseIndex, note: verse.note }
                                  )
                                }
                                className="font-sans text-sm text-amber-200/90 hover:text-amber-200 underline underline-offset-2"
                              >
                                Why this resonates
                              </button>
                            )}
                          </article>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
          )}
        </main>

        {/* Sidebar — desktop only */}
        <aside
          className="hidden lg:block fixed right-0 top-0 bottom-0 w-[22rem] border-l border-white/10 bg-[#050505] z-30 overflow-y-auto pt-[var(--navbar-offset)]"
          aria-label="Why this resonates"
        >
          <div className="p-6 sticky top-0">
            <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
              Why this resonates
            </p>
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={JSON.stringify(selected)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans text-base font-light text-white/90 leading-relaxed"
                >
                  {parseStyledText(selected.note, "note")}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-sans text-sm text-white/40 italic"
                >
                  Click a highlighted lyric or &ldquo;Why this resonates&rdquo; to see why it hits.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>

      {/* Mobile: bottom panel when something selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[40vh] overflow-y-auto"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
              Why this resonates
            </p>
            <p className="font-sans text-sm font-light text-white/90 leading-relaxed">
              {parseStyledText(selected.note, "note-mobile")}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-3 font-mono text-xs tracking-widest uppercase text-white/50 hover:text-white"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 md:px-12 flex flex-wrap gap-6">
        <Link href="/" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/story" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">
          My journey
        </Link>
        <Link href="/reach-out" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">
          Reach out
        </Link>
      </footer>
    </div>
  )
}
