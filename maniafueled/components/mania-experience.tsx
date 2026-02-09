"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { waveThoughts, maniaSymptoms, maniaSymptomExplanations, earlyWarningSigns } from "@/lib/content"
import { CrossLinks, pathPageLinks } from "@/components/cross-links"

const MANIA_PHRASES = [
  ...waveThoughts.mania,
  ...maniaSymptoms.cognitive,
  ...maniaSymptoms.emotional,
  ...maniaSymptoms.behavioral,
  ...maniaSymptoms.physiological,
]

const THOUGHT_INTERVAL_MS = 220
const THOUGHT_INTERVAL_REDUCED_MS = 500

function pickPhrase(): string {
  return MANIA_PHRASES[Math.floor(Math.random() * MANIA_PHRASES.length)]
}

export function ManiaExperience() {
  const [thought, setThought] = useState("")
  const [showEarlyWarning, setShowEarlyWarning] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  // Rapid thought stream — provokes anxious, wired feeling
  useEffect(() => {
    setThought(pickPhrase())
    const ms = reduced ? THOUGHT_INTERVAL_REDUCED_MS : THOUGHT_INTERVAL_MS
    const id = setInterval(() => setThought(pickPhrase()), ms)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white flex flex-col">
      {/* Rapid thought stream — full viewport, dense and fast */}
      <section
        className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-[var(--navbar-offset)] pb-20 min-h-[70vh]"
        aria-label="What mania feels like"
      >
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-6 uppercase">
          PATH — MANIA
        </p>
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl mx-auto text-center min-h-[12rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={thought}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/95 leading-tight px-4"
            >
              {thought}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.button
          type="button"
          onClick={() => setShowEarlyWarning(true)}
          className="font-mono text-xs sm:text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors py-3"
          aria-label="See what it's really like"
        >
          What it's really like ↓
        </motion.button>
      </section>

      {/* Symptoms explained in my words — clear explanations with personal analogies */}
      <AnimatePresence>
        {showEarlyWarning && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t border-white/10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-3xl mx-auto w-full"
            aria-label="Symptoms in my words"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
              In mania I experience
            </p>
            <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-12">
              What it's really like
            </h2>

            <div className="space-y-14 sm:space-y-16">
              {maniaSymptomExplanations.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="border-l-2 border-white/20 pl-6 sm:pl-8"
                >
                  <h3 className="font-mono text-sm sm:text-base tracking-wider text-white/90 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base sm:text-lg font-light text-white/85 leading-relaxed">
                    {item.explanation}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/10">
              <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-3 uppercase">
                Signs that elevation may be building
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {earlyWarningSigns.map((sign) => (
                  <span
                    key={sign}
                    className="font-mono text-xs sm:text-sm tracking-wider px-3 py-1.5 rounded-full border border-white/15 text-white/70"
                  >
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto w-full">
        <CrossLinks links={pathPageLinks} className="mb-6" title="Explore further — follow the loop" />
        <div className="flex flex-wrap gap-6 sm:gap-8">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/baseline" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Baseline</Link>
          <Link href="/depressive" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">The depressive side</Link>
          <Link href="/reach-out" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Reach out</Link>
        </div>
      </footer>
    </div>
  )
}
