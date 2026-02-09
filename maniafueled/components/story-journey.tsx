"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { storyJourney } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"

export function StoryJourney() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] pb-24 max-w-3xl mx-auto">
        {/* Intro */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-muted-foreground mb-3">
            STORY
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic mb-4">
            {storyJourney.title}
          </h1>
          <p className="font-sans text-lg text-white/70 font-light leading-relaxed">
            {storyJourney.subtitle}
          </p>
        </motion.header>

        {/* Sections */}
        <div className="space-y-20 sm:space-y-28">
          {storyJourney.sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-24"
            >
              <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-muted-foreground mb-3">
                {String(index + 1).padStart(2, "0")} — {section.label.toUpperCase()}
              </p>
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-light italic mb-6">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans text-base sm:text-lg font-light text-white/90 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA + cross-links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <CrossLinks className="mb-8" title="Explore further — follow the loop" />
          <div className="flex flex-wrap gap-6">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Home</Link>
          <Link href="/baseline" className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors">Baseline</Link>
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
          </div>
        </motion.div>
      </div>
    </div>
  )
}
