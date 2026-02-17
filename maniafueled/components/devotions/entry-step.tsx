"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDevotions } from "./devotions-context"
import { getStreak } from "@/lib/devotions"

export function EntryStep() {
  const { next, goToTodaysPsalm } = useDevotions()
  const [streak, setStreak] = useState(0)
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  )

  useEffect(() => {
    setStreak(getStreak())
  }, [])

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
        {streak >= 2 && (
          <p className="font-mono text-[10px] tracking-widest text-white/50 mb-6">
            You’ve come back {streak} days in a row
          </p>
        )}
        <p className="font-sans text-2xl sm:text-3xl font-light text-white/95 leading-tight mb-10">
          A place of refuge
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={next}
            className="min-h-[44px] px-8 py-3 font-mono text-xs tracking-[0.2em] text-white/90 border border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
            aria-label="Continue"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={goToTodaysPsalm}
            className="font-mono text-[10px] tracking-wider text-white/45 hover:text-white/70 transition-colors underline underline-offset-2"
            aria-label="Skip to today’s Psalm"
          >
            Skip to Psalm
          </button>
        </div>
      </motion.div>
    </div>
  )
}
