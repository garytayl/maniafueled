"use client"

import { motion } from "framer-motion"
import { strengths, strengthsNote } from "@/lib/content"

export function Strengths() {
  return (
    <section id="strengths" className="relative py-32 px-8 md:px-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          05 — WHAT PEOPLE MISS
        </p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Strengths</h2>
      </motion.div>

      {/* Strengths List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <ul className="space-y-3">
          {strengths.map((strength, i) => (
            <li
              key={i}
              className="font-sans text-lg md:text-xl font-light text-white/90 border-l-2 border-white/20 pl-6 py-1"
            >
              {strength}
            </li>
          ))}
        </ul>
        <p className="font-sans text-base md:text-lg font-light italic text-muted-foreground mt-8">
          {strengthsNote}
        </p>
      </motion.div>
    </section>
  )
}
