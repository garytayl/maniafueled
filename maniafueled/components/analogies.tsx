"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { analogies } from "@/lib/content"

export function Analogies() {
  return (
    <section id="analogies" className="relative px-8 py-24 md:px-12 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">04 — ANALOGIES</p>
        <h2 className="font-sans text-3xl font-light italic md:text-5xl">How it feels in plain language</h2>
        <p className="mt-4 max-w-3xl font-sans text-base font-light text-white/70">
          Analogies help translate what is hard to explain directly. This section starts with your couch-versus-lamp
          framing and can grow with more examples over time.
        </p>
      </motion.div>

      <div className="space-y-6">
        {analogies.map((analogy, index) => (
          <motion.article
            key={analogy.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground">ANALOGY {index + 1}</p>
            <h3 className="mt-3 font-sans text-2xl font-light text-white md:text-4xl">{analogy.title}</h3>
            <p className="mt-4 border-l border-white/30 pl-4 font-sans text-lg font-light italic text-white/90 md:text-2xl">
              “{analogy.summary}”
            </p>
            <p className="mt-5 max-w-3xl font-sans text-base font-light leading-relaxed text-white/70 md:text-lg">
              {analogy.description}
            </p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8"
      >
        <Link
          href="/analogies"
          className="inline-flex min-h-[44px] items-center rounded-md border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Open dedicated analogies page
        </Link>
      </motion.div>
    </section>
  )
}
