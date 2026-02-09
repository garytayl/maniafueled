"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fromTheInsideContent, coreEmotionalTruth, episodesDurationClarification } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"

function FadeBlock({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FromTheInsideContent() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 pt-[var(--navbar-offset)] pb-24">
        <header className="py-16 md:py-24">
          <p className="font-mono text-xs tracking-[0.3em] text-white/40 mb-4 uppercase">
            A reflection
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic leading-tight mb-6">
            {fromTheInsideContent.title}
          </h1>
          <p className="font-sans text-lg text-white/70 font-light leading-relaxed">
            {fromTheInsideContent.subtitle}
          </p>
        </header>

        <FadeBlock className="mb-16">
          <p className="font-sans text-base sm:text-lg text-white/80 font-light leading-relaxed">
            {fromTheInsideContent.intro}
          </p>
          <p className="font-mono text-xs tracking-wider text-white/50 mt-4">
            {episodesDurationClarification}
          </p>
        </FadeBlock>

        {/* Core emotional truth — pullquote */}
        <FadeBlock className="my-20 py-10 border-y border-white/15">
          <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light italic text-white text-center leading-relaxed">
            &ldquo;{coreEmotionalTruth}&rdquo;
          </p>
        </FadeBlock>

        <div className="space-y-16 md:space-y-20">
          {fromTheInsideContent.sections.map((section, i) => (
            <FadeBlock key={i} className="border-l-2 border-white/20 pl-6 sm:pl-8">
              <h2 className="font-mono text-sm sm:text-base tracking-wider text-white/90 mb-4">
                {section.title}
              </h2>
              <p className="font-sans text-base sm:text-lg font-light text-white/85 leading-relaxed">
                {section.body}
              </p>
            </FadeBlock>
          ))}
        </div>

        <FadeBlock className="mt-20 pt-12 border-t border-white/15">
          <p className="font-sans text-base sm:text-lg font-light text-white/90 leading-relaxed">
            {fromTheInsideContent.closing}
          </p>
        </FadeBlock>

        <CrossLinks className="mt-16 pt-8 border-t border-white/10" title="Explore further — follow the loop" />
        <footer className="mt-8 flex flex-wrap gap-6">
          <Link href="/" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/story" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">My journey</Link>
          <Link href="/resonate" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Resonate</Link>
          <Link href="/#state-choice" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Choose a state</Link>
          <Link href="/baseline" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Baseline</Link>
          <Link href="/reach-out" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Reach out</Link>
        </footer>
      </article>
    </div>
  )
}
