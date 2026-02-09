"use client"

/**
 * A subtle wave band that "breathes" (opacity pulses) at the bottom of the hero.
 * Ties the landing to the site's wave / highs-and-lows metaphor.
 */
export function BreathingWave() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        className="absolute bottom-0 left-0 w-full hero-wave-breath"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ height: "35%", minHeight: 180 }}
      >
        <defs>
          <linearGradient id="hero-wave-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="60%" stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor="white" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hero-wave-grad)"
          d="M0,200 L0,120 Q300,40 600,120 T1200,120 L1200,200 Z"
        />
        <path
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          d="M0,130 Q300,70 600,130 T1200,130"
        />
      </svg>
    </div>
  )
}
