"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { waveThoughts, maniaSymptoms, earlyWarningSigns } from "@/lib/content"

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
          aria-label="See early warning signs"
        >
          Early warning signs ↓
        </motion.button>
      </section>

      {/* Early warning signs — slightly calmer beat */}
      <AnimatePresence>
        {showEarlyWarning && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t border-white/10 px-4 sm:px-8 md:px-12 py-16 sm:py-24"
            aria-label="Early warning signs"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
              Signs that elevation may be building
            </p>
            <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-10">
              Early warning signs
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {earlyWarningSigns.map((sign, i) => (
                <motion.span
                  key={sign}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="font-mono text-sm sm:text-base tracking-wider px-5 py-3 rounded-full border border-white/20 text-white/90 bg-white/5"
                >
                  {sign}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto w-full flex flex-wrap gap-6 sm:gap-8">
        <Link
          href="/"
          className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          href="/baseline"
          className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          Baseline
        </Link>
        <Link
          href="/depressive"
          className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          The depressive side
        </Link>
        <Link
          href="/reach-out"
          className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          Reach out
        </Link>
      </footer>
    </div>
  )
}
