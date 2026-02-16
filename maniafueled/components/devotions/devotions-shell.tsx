"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { useDevotions } from "./devotions-context"
import { lock } from "@/lib/devotions-auth"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
  const [psalmsMenuOpen, setPsalmsMenuOpen] = useState(false)

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
    <div className="fixed inset-0 flex flex-col bg-[#050505] overflow-hidden min-h-0">
      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 z-50 h-0.5 bg-white/10 shrink-0">
        <motion.div
          className="h-full bg-white/60"
          initial={false}
          animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      {/* Lock / Psalms menu / Psalm label — top */}
      <div className="absolute top-4 right-4 left-4 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
          <Sheet open={psalmsMenuOpen} onOpenChange={setPsalmsMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/40 hover:text-white/70"
                aria-label="Open Psalms list"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Psalms
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85vw] max-w-sm border-white/10 bg-[#0a0a0a] p-0 [&>button]:text-white/50 [&>button]:hover:text-white"
            >
              <SheetHeader className="border-b border-white/10 px-4 py-3">
                <SheetTitle className="font-sans text-lg font-light text-white">
                  Jump to Psalm
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-1">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        goToStep(i)
                        setPsalmsMenuOpen(false)
                      }}
                      className={`min-h-[44px] rounded-md font-mono text-sm transition-colors ${
                        i === step
                          ? "bg-white/20 text-white"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
          Psalm {step + 1} / {totalSteps}
        </span>
      </div>

      {/* Step panels — one visible at a time; bottom padding so content doesn't sit under nav */}
      <div className="flex-1 min-h-0 relative flex flex-col pt-10">
        <div className="flex-1 min-h-0 relative overflow-hidden">
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
              className="absolute inset-0 z-0 overflow-y-auto overflow-x-hidden"
            >
              {children[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav: back / dots / next — separate flex row so it never overlaps content */}
      <div
        className="shrink-0 relative z-50 flex items-center justify-between px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 md:px-12 md:py-5 bg-[#050505] border-t border-white/5"
        aria-label="Devotions navigation"
      >
        <button
          type="button"
          onClick={() => canGoPrev && prev()}
          disabled={!canGoPrev}
          className="flex items-center gap-2 min-h-[44px] min-w-[72px] justify-start font-mono text-xs tracking-widest text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Previous Psalm"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          Back
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 justify-center flex-wrap">
          {Array.from({ length: 15 }).map((_, i) => {
            const idx = Math.round((i / 14) * (totalSteps - 1))
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToStep(idx)}
                aria-label={`Go to Psalm ${idx + 1}`}
                className="group p-2.5 sm:p-1.5 rounded-full transition-colors min-w-[28px] min-h-[44px] flex items-center justify-center cursor-pointer"
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
          onClick={() => canGoNext && next()}
          disabled={!canGoNext}
          className="flex items-center gap-2 min-h-[44px] min-w-[72px] justify-end font-mono text-xs tracking-widest text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Next Psalm"
        >
          Next
          <ChevronRight className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </div>
  )
}
