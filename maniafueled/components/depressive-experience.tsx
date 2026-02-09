"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  waveThoughts,
  depressionSymptoms,
  depressionSymptomExplanations,
  suicidalIdeationContent,
  crossCuttingStruggles,
  episodesDurationClarification,
} from "@/lib/content"
import { ChevronRight } from "lucide-react"
import { CrossLinks, pathPageLinks } from "@/components/cross-links"
import { SentientSphere } from "@/components/sentient-sphere"
import { BreathingWave } from "@/components/breathing-wave"

const DEPRESSIVE_PHRASES = [
  ...waveThoughts.depressive,
  ...depressionSymptoms.cognitive,
  ...depressionSymptoms.emotional,
  ...depressionSymptoms.behavioral,
  ...depressionSymptoms.physiological,
]

function SlowRevealBlock({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4, once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function DepressiveExperience() {
  const [expandedCrossCutting, setExpandedCrossCutting] = useState<number | null>(null)

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white">
      {/* Top section only: hero-style background, depressive variant = slow, subdued */}
      <section className="relative min-h-[70vh] min-h-[70dvh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] sm:opacity-20 md:opacity-25">
          <SentientSphere variant="depressive" />
        </div>
        <BreathingWave variant="depressive" />
        <header className="relative z-10 pt-[var(--navbar-offset)] pb-16 px-4 sm:px-8 md:px-12 max-w-3xl mx-auto">
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 uppercase">
            PATH — DEPRESSIVE
          </p>
          <p className="font-mono text-[10px] tracking-wider text-white/40 mb-4 mt-1">
            {episodesDurationClarification}
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic leading-tight">
            The low side
          </h1>
        </header>
      </section>

      <div className="space-y-0">
        {DEPRESSIVE_PHRASES.map((phrase, i) => (
          <SlowRevealBlock
            key={`depressive-${i}`}
            className="min-h-[70vh] min-h-[70dvh] flex items-center justify-center px-4 sm:px-8 md:px-12"
          >
            <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white/90 leading-relaxed text-center max-w-2xl">
              {phrase}
            </p>
          </SlowRevealBlock>
        ))}
      </div>

      {/* Symptoms explained in my words — clear explanations with personal analogies */}
      <section className="px-4 sm:px-8 md:px-12 py-20 sm:py-28 max-w-3xl mx-auto border-t border-white/10">
        <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
          In depression I experience
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-12">
          What it's really like
        </h2>
        <div className="space-y-14 sm:space-y-16">
          {depressionSymptomExplanations.map((item, i) => (
            <SlowRevealBlock key={item.title} className="border-l-2 border-white/20 pl-6 sm:pl-8">
              <h3 className="font-mono text-sm sm:text-base tracking-wider text-white/90 mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-light text-white/85 leading-relaxed">
                {item.explanation}
              </p>
            </SlowRevealBlock>
          ))}
        </div>
      </section>

      {/* Suicidal ideation — one careful block with warning */}
      <section className="px-4 sm:px-8 md:px-12 py-20 sm:py-28 max-w-3xl mx-auto">
        <SlowRevealBlock className="space-y-6">
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-5 py-4">
            <p className="font-mono text-sm text-amber-200/90">
              {suicidalIdeationContent.warning}
            </p>
          </div>
          <ul className="space-y-4 pl-4 list-disc text-white/80 font-sans font-light text-base sm:text-lg leading-relaxed">
            {suicidalIdeationContent.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </SlowRevealBlock>
      </section>

      {/* Cross-cutting struggles — optional, sparse */}
      <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-3xl mx-auto border-t border-white/10">
        <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
          Themes that run through both elevation and depletion
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-10">
          Cross-cutting struggles
        </h2>
        <div className="space-y-4">
          {crossCuttingStruggles.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="border-l-2 border-white/20 pl-5 py-2"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedCrossCutting(expandedCrossCutting === i ? null : i)
                }
                className="font-mono text-sm sm:text-base tracking-wider text-left w-full flex items-center justify-between gap-2 py-1"
              >
                {s.title}
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    expandedCrossCutting === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expandedCrossCutting === i && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-1 list-disc list-inside text-muted-foreground font-sans font-light text-sm sm:text-base"
                >
                  {s.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto w-full">
        <CrossLinks links={pathPageLinks} className="mb-6" title="Explore further — follow the loop" />
        <div className="flex flex-wrap gap-6 sm:gap-8">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/baseline" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Baseline</Link>
          <Link href="/mania" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">The mania side</Link>
          <Link href="/reach-out" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Reach out</Link>
        </div>
      </footer>
    </div>
  )
}
