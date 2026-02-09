"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { waveThoughts, mixedStateContent } from "@/lib/content"

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

export function MixedExperience() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white">
      {/* Crisis warning first */}
      <header className="pt-[var(--navbar-offset)] pb-12 px-4 sm:px-8 md:px-12 max-w-3xl mx-auto">
        <div className="rounded-lg border-2 border-amber-500/50 bg-amber-500/10 px-5 py-4 mb-10">
          <p className="font-mono text-sm font-medium text-amber-200">
            {mixedStateContent.warning}
          </p>
        </div>
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/40 mb-4 uppercase">
          PATH — MIXED
        </p>
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic leading-tight">
          The overlap — agitated and hopeless at once
        </h1>
      </header>

      {/* Stream of mixed-state thoughts */}
      <div className="space-y-0">
        {waveThoughts.mixed.map((phrase, i) => (
          <SlowRevealBlock
            key={`mixed-${i}`}
            className="min-h-[60vh] min-h-[60dvh] flex items-center justify-center px-4 sm:px-8 md:px-12"
          >
            <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white/90 leading-relaxed text-center max-w-2xl">
              {phrase}
            </p>
          </SlowRevealBlock>
        ))}
      </div>

      {/* What mixed state is and why it's dangerous */}
      <section className="px-4 sm:px-8 md:px-12 py-20 sm:py-28 max-w-3xl mx-auto border-t border-white/10">
        <p className="font-mono text-xs tracking-[0.25em] text-white/50 mb-2 uppercase">
          Why mixed states matter
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl font-light italic mb-8">
          {mixedStateContent.headline}
        </h2>
        <SlowRevealBlock>
          <p className="font-sans text-base sm:text-lg font-light text-white/85 leading-relaxed mb-10">
            {mixedStateContent.description}
          </p>
          <ul className="space-y-4 pl-4 list-disc text-white/80 font-sans font-light text-base sm:text-lg leading-relaxed">
            {mixedStateContent.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </SlowRevealBlock>
      </section>

      {/* Crisis CTA */}
      <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-20 max-w-3xl mx-auto">
        <SlowRevealBlock>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-5 py-4">
            <p className="font-sans text-base font-light text-amber-200/95 leading-relaxed">
              {mixedStateContent.crisisNote}
            </p>
          </div>
        </SlowRevealBlock>
      </section>

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
          href="/mania"
          className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          The mania side
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
