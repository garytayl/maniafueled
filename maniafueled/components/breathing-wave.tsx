"use client"

/**
 * A subtle wave band that "breathes" (opacity pulses). Variant changes pace and intensity.
 * Hero uses default; path pages use mania (fast), mixed (agitated), depressive (slow).
 */
export type WaveVariant = "default" | "mania" | "mixed" | "depressive"

const WAVE_GRAD_IDS: Record<WaveVariant, string> = {
  default: "hero-wave-grad",
  mania: "hero-wave-grad-mania",
  mixed: "hero-wave-grad-mixed",
  depressive: "hero-wave-grad-depressive",
}

export function BreathingWave({ variant = "default" }: { variant?: WaveVariant }) {
  const gradId = WAVE_GRAD_IDS[variant ?? "default"]
  const waveClass =
    variant === "mania"
      ? "hero-wave-breath hero-wave-mania"
      : variant === "mixed"
        ? "hero-wave-breath hero-wave-mixed"
        : variant === "depressive"
          ? "hero-wave-breath hero-wave-depressive"
          : "hero-wave-breath"

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        className={`absolute bottom-0 left-0 w-full ${waveClass}`}
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
          <linearGradient id="hero-wave-grad-mania" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="hero-wave-grad-mixed" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="55%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="hero-wave-grad-depressive" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          fill={gradId ? `url(#${gradId})` : "url(#hero-wave-grad)"}
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
