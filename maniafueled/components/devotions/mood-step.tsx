"use client"

import { useState, useEffect } from "react"
import { useDevotions } from "./devotions-context"
import {
  getMoodForDate,
  setMoodForDate,
  type MoodOption,
} from "@/lib/devotions"

const MOOD_OPTIONS: { value: MoodOption; label: string; className: string }[] = [
  { value: "mania", label: "MANIA", className: "border-white/30 text-white hover:bg-white/10" },
  { value: "mixed", label: "MIXED", className: "border-amber-400/30 text-amber-100 hover:bg-amber-500/10" },
  { value: "depressive", label: "DEPRESSIVE", className: "border-white/20 text-white/80 hover:bg-white/5" },
  { value: "baseline", label: "I'm doing okay", className: "border-white/25 text-white/90 hover:bg-white/10" },
  { value: "not_sure", label: "Not sure", className: "border-white/20 text-white/60 hover:bg-white/5" },
]

export function MoodStep() {
  const { next } = useDevotions()
  const [selected, setSelected] = useState<MoodOption | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mood = getMoodForDate(new Date())
    setSelected(mood)
  }, [mounted])

  const handleSelect = (value: MoodOption) => {
    setSelected(value)
    setMoodForDate(new Date(), value)
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050505] overflow-y-auto px-4 pt-12 pb-24">
      <div className="max-w-md mx-auto w-full">
        <h2 className="font-sans text-xl sm:text-2xl font-light text-white mb-8 text-center">
          How are you feeling?
        </h2>
        <div className="flex flex-col gap-3">
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`min-h-[48px] w-full rounded-lg border px-4 py-3 text-left font-sans text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 ${opt.className} ${
                selected === opt.value ? "ring-1 ring-white/40 bg-white/10" : ""
              }`}
              aria-pressed={selected === opt.value}
              aria-label={opt.label}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={selected === null}
          className="mt-10 w-full min-h-[44px] px-6 py-3 font-mono text-xs tracking-[0.2em] text-white/90 border border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Continue"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
