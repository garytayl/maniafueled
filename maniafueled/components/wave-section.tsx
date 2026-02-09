"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion"
import { useOptionalJourney } from "@/components/journey/journey-context"
import { waveSection, waveThoughts } from "@/lib/content"

const WIDTH = 1200
const HEIGHT = 280
const CENTER_Y = HEIGHT / 2
const WAVELENGTH_PX = 140
const POINT_STEP = 4
const WAVE_STEP_INDEX = 2

type ThoughtMode = "mania" | "baseline" | "depressive" | null

const INTERVAL_MS = {
  mania: 380,
  baseline: 1200,
  depressive: 2800,
} as const

const INTERVAL_MS_REDUCED = {
  mania: 900,
  baseline: 2200,
  depressive: 4500,
} as const

function buildPath(amplitude: number, phase: number): string {
  const points: [number, number][] = []
  for (let x = 0; x <= WIDTH + POINT_STEP; x += POINT_STEP) {
    const y = CENTER_Y + amplitude * Math.sin((x / WAVELENGTH_PX) * 2 * Math.PI + phase)
    points.push([x, y])
  }
  const d = points.reduce((acc, [x, y], i) => `${acc} ${i === 0 ? "M" : "L"} ${x},${y}`, "")
  return d
}

function pickThought(mode: ThoughtMode): string {
  if (!mode) return ""
  const list = waveThoughts[mode]
  return list[Math.floor(Math.random() * list.length)]
}

const PHASE_DURATION = 12 // seconds for one full wave cycle

export function WaveSection() {
  const journey = useOptionalJourney()
  const amplitude = useMotionValue(20)
  const phase = useMotionValue(0)
  const [mode, setMode] = useState<ThoughtMode>(null)
  const [thought, setThought] = useState("")

  const pathD = useTransform([amplitude, phase], ([a, p]) => buildPath(a, (p as number) * Math.PI * 2))

  // Continuous wave movement (phase drifts so the wave travels)
  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const controls = animate(phase, 1, {
      duration: PHASE_DURATION,
      repeat: Infinity,
      ease: "linear",
    })
    return () => controls.stop()
  }, [phase])

  // Wave animation (calm on mount / when on wave step)
  useEffect(() => {
    const shouldAnimate = journey ? journey.step === WAVE_STEP_INDEX : true
    if (!shouldAnimate) return
    amplitude.set(72)
    const controls = animate(amplitude, 20, {
      duration: 2.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    return () => controls.stop()
  }, [journey?.step, amplitude])

  // Wave reacts to thought mode: mania = bigger/faster, depressive = smaller, baseline = calm
  useEffect(() => {
    if (!mode) return
    const targetAmplitude = mode === "mania" ? 45 : mode === "depressive" ? 12 : 20
    const controls = animate(amplitude, targetAmplitude, {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    return () => controls.stop()
  }, [mode, amplitude])

  // Cycle thoughts at mode-specific speed
  const tick = useCallback(() => {
    if (!mode) return
    setThought(pickThought(mode))
  }, [mode])

  useEffect(() => {
    if (!mode) {
      setThought("")
      return
    }
    setThought(pickThought(mode))
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ms = reduced ? INTERVAL_MS_REDUCED[mode] : INTERVAL_MS[mode]
    const id = setInterval(tick, ms)
    return () => clearInterval(id)
  }, [mode, tick])

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[70vh] w-full px-6 py-20 md:py-28"
      aria-labelledby="wave-headline"
    >
      <div className="w-full max-w-4xl mx-auto text-center mb-10 md:mb-12">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          {waveSection.label}
        </p>
        <h2 id="wave-headline" className="font-sans text-3xl md:text-4xl lg:text-5xl font-light italic text-balance">
          {waveSection.headline}
        </h2>
        <p className="font-sans text-lg md:text-xl font-light text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
          {waveSection.subline}
        </p>
      </div>

      {/* Wave SVG */}
      <div className="w-full max-w-5xl mx-auto overflow-hidden">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="wave-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
            </linearGradient>
            <filter id="wave-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1={0}
            y1={CENTER_Y}
            x2={WIDTH}
            y2={CENTER_Y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#wave-gradient-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#wave-glow)"
          />
        </svg>
      </div>

      {/* Interactive: mode buttons + thought stream */}
      <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 mt-6 mb-6 uppercase">
        {waveSection.thoughtPrompt}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8">
        <button
          type="button"
          onClick={() => setMode((m) => (m === "mania" ? null : "mania"))}
          className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
            mode === "mania"
              ? "bg-white text-[#050505]"
              : "border border-white/30 text-white/80 hover:border-white/60 hover:text-white"
          }`}
        >
          {waveSection.maniaLabel}
        </button>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "baseline" ? null : "baseline"))}
          className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
            mode === "baseline"
              ? "bg-white text-[#050505]"
              : "border border-white/30 text-white/80 hover:border-white/60 hover:text-white"
          }`}
        >
          {waveSection.baselineLabel}
        </button>
        <button
          type="button"
          onClick={() => setMode((m) => (m === "depressive" ? null : "depressive"))}
          className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
            mode === "depressive"
              ? "bg-white text-[#050505]"
              : "border border-white/30 text-white/80 hover:border-white/60 hover:text-white"
          }`}
        >
          {waveSection.depressiveLabel}
        </button>
      </div>

      {/* Thought display — mimics pace of inner voice */}
      <div className="min-h-[4rem] md:min-h-[5rem] w-full max-w-2xl mx-auto flex items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {thought ? (
            <motion.p
              key={thought}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={`font-sans font-light text-xl md:text-2xl lg:text-3xl leading-snug ${
                mode === "mania"
                  ? "text-white"
                  : mode === "depressive"
                    ? "text-white/80 italic"
                    : "text-white/90"
              }`}
            >
              {thought}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm tracking-wider text-white/30"
            >
              —
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 mt-4 uppercase">
        Highs and lows → learning a calmer rhythm
      </p>
    </section>
  )
}
