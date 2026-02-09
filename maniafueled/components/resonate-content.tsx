"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { resonantSongs, resonantVerses } from "@/lib/content"

type SelectedItem =
  | { type: "song"; songIndex: number; lineIndex: number; note: string }
  | { type: "songIntro"; songIndex: number; note: string }
  | { type: "verse"; verseIndex: number; note: string }
  | null

export function ResonateContent() {
  const [selected, setSelected] = useState<SelectedItem>(null)

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] pb-24 max-w-4xl mx-auto lg:max-w-none lg:flex lg:gap-12 lg:pr-[22rem]">
        <main className="min-w-0 flex-1 lg:min-w-0">
          <header className="mb-16">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-3 uppercase">
              WHAT RESONATES
            </p>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic leading-tight mb-4">
              Lyrics & verses
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
              Songs and Bible verses that put words to what I feel. Tap a highlighted line to see why it resonates.
            </p>
          </header>

          {/* Songs */}
          <section className="mb-20">
            <h2 className="font-mono text-xs tracking-[0.25em] text-white/50 mb-6 uppercase">
              Songs
            </h2>
            {resonantSongs.map((song, songIndex) => (
              <article key={`${song.artist}-${song.title}`} className="mb-14">
                <div className="mb-6">
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
                <div className="space-y-1 font-sans text-sm sm:text-base font-light text-white/85 leading-relaxed">
                  {song.lines.map((line, lineIndex) => (
                    <button
                      key={`${songIndex}-${lineIndex}`}
                      type="button"
                      onClick={() =>
                        line.note
                          ? setSelected(
                              selected?.type === "song" &&
                                selected.songIndex === songIndex &&
                                selected.lineIndex === lineIndex
                                ? null
                                : {
                                    type: "song",
                                    songIndex,
                                    lineIndex,
                                    note: line.note,
                                  }
                            )
                          : undefined
                      }
                      className={`block w-full text-left py-0.5 -mx-1 px-1 rounded ${
                        line.note
                          ? "hover:bg-white/10 cursor-pointer border-l-2 border-amber-500/50 pl-3 -ml-1"
                          : ""
                      }`}
                    >
                      {line.text}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </section>

          {/* Bible verses */}
          <section>
            <h2 className="font-mono text-xs tracking-[0.25em] text-white/50 mb-6 uppercase">
              Bible verses
            </h2>
            <div className="space-y-10">
              {resonantVerses.map((verse, verseIndex) => (
                <article
                  key={verse.reference}
                  className="border-l-2 border-white/20 pl-5 sm:pl-6"
                >
                  <p className="font-mono text-sm tracking-wider text-white/70 mb-2">
                    {verse.reference}
                  </p>
                  <p className="font-sans text-base sm:text-lg font-light text-white/90 leading-relaxed mb-3">
                    &ldquo;{verse.text}&rdquo;
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
              ))}
            </div>
          </section>
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
                  {selected.note}
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
              {selected.note}
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
