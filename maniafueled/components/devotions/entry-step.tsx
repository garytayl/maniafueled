"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useDevotions } from "./devotions-context"

export function EntryStep() {
  const { next } = useDevotions()
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] px-4">
      <motion.div
        className="flex flex-col items-center justify-center text-center max-w-md"
        initial={{
          opacity: 0,
          y: reduced ? 0 : 8,
          scale: reduced ? 1 : 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <p className="font-sans text-2xl sm:text-3xl font-light text-white/95 leading-tight mb-10">
          A place of refuge
        </p>
        <button
          type="button"
          onClick={next}
          className="min-h-[44px] px-8 py-3 font-mono text-xs tracking-[0.2em] text-white/90 border border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Continue"
        >
          Continue
        </button>
      </motion.div>
    </div>
  )
}
