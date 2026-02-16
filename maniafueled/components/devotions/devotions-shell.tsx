"use client"

import { useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDevotions } from "./devotions-context"
import { lock } from "@/lib/devotions-auth"

const slideVariants = {
  enter: (direction: number) => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return {
      x: reduced ? 0 : direction > 0 ? "100%" : "-100%",
      opacity: reduced ? 0 : 0.3,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return {
      x: reduced ? 0 : direction < 0 ? "100%" : "-100%",
      opacity: reduced ? 0 : 0.3,
    }
  },
}

type DevotionsShellProps = {
  children: ReactNode[]
}

export function DevotionsShell({ children }: DevotionsShellProps) {
  const {
    step,
    totalSteps,
    direction,
    next,
    prev,
    goToStep,
    canGoNext,
    canGoPrev,
  } = useDevotions()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest("input, textarea, [contenteditable]")) return
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        if (canGoNext) next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        if (canGoPrev) prev()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [canGoNext, canGoPrev, next, prev])

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050505] overflow-hidden">
      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 z-50 h-0.5 bg-white/10">
        <motion.div
          className="h-full bg-white/60"
          initial={false}
          animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      {/* Lock / Psalm label — top right */}
      <div className="absolute top-4 right-4 left-4 z-30 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            lock()
            window.location.reload()
          }}
          className="font-mono text-[10px] tracking-wider text-white/40 hover:text-white/70"
        >
          Lock
        </button>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
          Psalm {step + 1} / {totalSteps}
        </span>
      </div>

      {/* Step panels — one visible at a time */}
      <div className="flex-1 relative overflow-hidden pt-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          >
            {children[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav: back / dots / next */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:px-6 md:px-12 md:py-5 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent"
        aria-label="Devotions navigation"
      >
        <button
          type="button"
          onClick={prev}
          disabled={!canGoPrev}
          className="flex items-center gap-2 min-h-[44px] min-w-[72px] justify-start font-mono text-xs tracking-widest text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          Back
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 justify-center">
          {Array.from({ length: 15 }).map((_, i) => {
            const idx = Math.round((i / 14) * (totalSteps - 1))
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToStep(idx)}
                aria-label={`Psalm ${idx + 1}`}
                className="group p-2.5 sm:p-1.5 rounded-full transition-colors min-w-[28px] min-h-[44px] flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    idx === step
                      ? "w-6 sm:w-8 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/30 group-hover:bg-white/50"
                  }`}
                />
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={!canGoNext}
          className="flex items-center gap-2 min-h-[44px] min-w-[72px] justify-end font-mono text-xs tracking-widest text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next day"
        >
          Next
          <ChevronRight className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </div>
  )
}
