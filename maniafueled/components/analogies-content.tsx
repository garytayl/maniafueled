"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { analogies } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"

export function AnalogiesContent() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-[var(--navbar-offset)] sm:px-6 md:px-8">
        <header className="py-16 md:py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">A translation tool</p>
          <h1 className="mb-6 font-sans text-3xl font-light italic leading-tight sm:text-4xl md:text-5xl">
            Analogies
          </h1>
          <p className="font-sans text-lg font-light leading-relaxed text-white/70">
            Some experiences are easier to understand through comparison. This page is dedicated to the analogies that
            help explain what bipolar and related mental health struggles can feel like from the inside.
          </p>
        </header>

        <div className="space-y-10">
          {analogies.map((analogy, index) => (
            <motion.section
              key={analogy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
              className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
            >
              <p className="font-mono text-xs tracking-[0.22em] text-white/50">ANALOGY {String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-sans text-2xl font-light text-white sm:text-3xl">{analogy.title}</h2>
              <p className="mt-5 border-l border-white/30 pl-4 font-sans text-lg font-light italic leading-relaxed text-white/90 sm:text-2xl">
                &ldquo;{analogy.summary}&rdquo;
              </p>
              <p className="mt-5 font-sans text-base font-light leading-relaxed text-white/75 sm:text-lg">
                {analogy.description}
              </p>
            </motion.section>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 sm:p-8"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-white/45">NEXT</p>
          <p className="mt-3 font-sans text-base font-light leading-relaxed text-white/70 sm:text-lg">
            More analogies can be added here as they come up, so this page becomes a growing library of plain-language
            translations.
          </p>
        </motion.section>

        <CrossLinks className="mt-16 border-t border-white/10 pt-8" title="Explore further — follow the loop" />
        <footer className="mt-8 flex flex-wrap gap-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/from-the-inside"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            From the inside
          </Link>
          <Link
            href="/story"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            My journey
          </Link>
          <Link
            href="/resources"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Resources
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Reach out
          </Link>
        </footer>
      </article>
    </div>
  )
}
