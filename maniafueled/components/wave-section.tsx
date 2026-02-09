"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useOptionalJourney } from "@/components/journey/journey-context"
import { waveSection } from "@/lib/content"

const WIDTH = 1200
const HEIGHT = 280
const CENTER_Y = HEIGHT / 2
const WAVELENGTH_PX = 140
const POINT_STEP = 4
const WAVE_STEP_INDEX = 2

function buildPath(amplitude: number): string {
  const points: [number, number][] = []
  for (let x = 0; x <= WIDTH + POINT_STEP; x += POINT_STEP) {
    const y = CENTER_Y + amplitude * Math.sin((x / WAVELENGTH_PX) * 2 * Math.PI)
    points.push([x, y])
  }
  const d = points.reduce((acc, [x, y], i) => `${acc} ${i === 0 ? "M" : "L"} ${x},${y}`, "")
  return d
}

export function WaveSection() {
  const journey = useOptionalJourney()
  const amplitude = useMotionValue(20)

  const pathD = useTransform(amplitude, (a) => buildPath(a))

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

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[70vh] w-full px-6 py-20 md:py-28"
      aria-labelledby="wave-headline"
    >
      <div className="w-full max-w-4xl mx-auto text-center mb-12 md:mb-16">
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

      {/* Wave SVG — highs and lows calming toward baseline */}
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
          {/* Baseline reference — the goal line */}
          <line
            x1={0}
            y1={CENTER_Y}
            x2={WIDTH}
            y2={CENTER_Y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
          {/* The wave — amplitude animates from high to low (lesser highs, lesser lows) */}
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

      {/* Legend hint */}
      <p className="font-mono text-[10px] tracking-[0.25em] text-white/30 mt-6 uppercase">
        Highs and lows → learning a calmer rhythm
      </p>
    </section>
  )
}
