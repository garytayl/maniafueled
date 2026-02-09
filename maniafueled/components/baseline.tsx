"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { baselineStatements } from "@/lib/content"

const MARQUEE_DURATION = 35

export function Baseline() {
  const duplicated = [...baselineStatements, ...baselineStatements]
  const progress = useMotionValue(0)
  const x = useTransform(progress, [0, 1], ["0%", "-50%"])

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const controls = animate(progress, [0, 1], {
      duration: MARQUEE_DURATION,
      repeat: Infinity,
      ease: "linear",
    })
    return () => controls.stop()
  }, [progress])

  return (
    <section id="baseline" className="relative py-20 sm:py-32 overflow-hidden md:py-0">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-4 sm:px-8 md:px-12 mb-0 py-12 sm:py-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          02 — BASELINE
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl font-light italic">
          When things are relatively okay
        </h2>
      </motion.div>

      {/* Horizontal scrolling strip — Framer Motion so it always runs */}
      <div className="relative flex items-center overflow-hidden py-0 gap-0 h-14 sm:h-16">
        <motion.div
          style={{ x, width: "fit-content" as const }}
          className="flex gap-12 sm:gap-16 md:gap-24 px-4 sm:px-8 md:px-12 whitespace-nowrap"
        >
          {duplicated.map((statement, index) => (
            <p
              key={index}
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white/90 shrink-0"
              style={{
                WebkitTextStroke: index % 2 === 0 ? "none" : "1px rgba(255,255,255,0.3)",
                color: index % 2 === 0 ? "inherit" : "transparent",
              }}
            >
              {statement}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-16 mx-8 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
    </section>
  )
}
