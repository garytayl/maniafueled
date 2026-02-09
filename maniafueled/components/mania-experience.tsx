"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { waveThoughts, maniaSymptoms, maniaSymptomExplanations, earlyWarningSigns, episodesDurationClarification } from "@/lib/content"
import { CrossLinks, pathPageLinks } from "@/components/cross-links"
import { SentientSphere } from "@/components/sentient-sphere"
import { BreathingWave } from "@/components/breathing-wave"

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
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  useEffect(() => {
    setThought(pickPhrase())
    const ms = reduced ? THOUGHT_INTERVAL_REDUCED_MS : THOUGHT_INTERVAL_MS
    const id = setInterval(() => setThought(pickPhrase()), ms)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white flex flex-col">
      {/* Top section only: hero-style background (sphere + wave), mania variant = fast, chaotic */}
      <section
        className="relative min-h-[70vh] min-h-[70dvh] flex flex-col px-4 sm:px-8 py-[var(--navbar-offset)] pb-20 overflow-hidden"
        aria-label="What mania feels like"
      >
        <div className="absolute inset-0 opacity-[0.2] sm:opacity-25 md:opacity-30">
          <SentientSphere variant="mania" />
        </div>
        <BreathingWave variant="mania" />
        <p className="relative z-10 shrink-0 font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 uppercase text-center">
          STATE — MANIA
        </p>
        <p className="relative z-10 shrink-0 font-mono text-[10px] tracking-wider text-white/40 text-center mt-1 mb-6">
          {episodesDurationClarification}
        </p>
        <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-4xl mx-auto text-center min-h-[14rem] sm:min-h-[16rem]">
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
      </section>

      {/* Symptoms explained — always visible, no click */}
      <section
        className="border-t border-white/10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-3xl mx-auto w-full"
        aria-label="Symptoms in my words"
      >
        <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
          In mania I experience
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-12">
          What it&apos;s really like
        </h2>

        <div className="space-y-14 sm:space-y-16">
          {maniaSymptomExplanations.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
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
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto w-full">
        <p className="font-mono text-[10px] tracking-widest text-white/40 mb-2 uppercase">Other states</p>
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
          <Link href="/mixed" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Mixed</Link>
          <Link href="/depressive" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Depressive</Link>
        </div>
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
