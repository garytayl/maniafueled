"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen, CalendarDays, LogOut } from "lucide-react"
import { useDevotions } from "./devotions-context"
import { lock } from "@/lib/devotions-auth"
import { REFUGE_STEPS, PSALMS_COUNT } from "@/lib/devotions"
import { JournalView } from "./journal-view"
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
    isRefugeStep,
  } = useDevotions()
  const [psalmsMenuOpen, setPsalmsMenuOpen] = useState(false)
  const [journalOpen, setJournalOpen] = useState(false)
  const showPsalmNav = !isRefugeStep

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
      {/* Progress bar — only on Psalm steps */}
      {showPsalmNav && (
        <div className="absolute top-0 left-0 right-0 z-50 h-0.5 bg-white/10 shrink-0">
          <motion.div
            className="h-full bg-white/60"
            initial={false}
            animate={{
              width: `${((step - REFUGE_STEPS + 1) / PSALMS_COUNT) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      )}

      {/* Top bar: Lock, Journal, (Psalms on Psalm steps), Leave always visible */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 min-h-[52px] sm:py-4 sm:px-6 md:px-12">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              lock()
              window.location.reload()
            }}
            className="min-h-[44px] min-w-[44px] flex items-center font-mono text-[10px] tracking-wider text-white/40 hover:text-white/70"
          >
            Lock
          </button>
          <Sheet open={journalOpen} onOpenChange={setJournalOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 min-h-[44px] font-mono text-[10px] tracking-wider text-white/40 hover:text-white/70"
                aria-label="View journal over time"
              >
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Journal</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[100vw] sm:w-[85vw] sm:max-w-md border-white/10 bg-[#0a0a0a] flex flex-col pb-[env(safe-area-inset-bottom)] [&>button]:text-white/50 [&>button]:hover:text-white"
            >
              <SheetHeader className="border-b border-white/10 px-4 py-3 shrink-0">
                <SheetTitle className="font-sans text-lg font-light text-white">
                  Over time
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 min-h-0 pt-4 px-4 pb-6">
                <JournalView />
              </div>
            </SheetContent>
          </Sheet>
          {showPsalmNav && (
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
                className="w-full max-w-[100vw] sm:w-[85vw] sm:max-w-sm border-white/10 bg-[#0a0a0a] p-0 pb-[env(safe-area-inset-bottom)] [&>button]:text-white/50 [&>button]:hover:text-white"
              >
                <SheetHeader className="border-b border-white/10 px-4 py-3 shrink-0">
                  <SheetTitle className="font-sans text-lg font-light text-white">
                    Jump to Psalm
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-1.5">
                    {Array.from({ length: PSALMS_COUNT }, (_, i) => {
                      const stepIndex = REFUGE_STEPS + i
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            goToStep(stepIndex)
                            setPsalmsMenuOpen(false)
                          }}
                          className={`min-h-[48px] sm:min-h-[44px] rounded-lg sm:rounded-md font-mono text-sm transition-colors touch-manipulation ${
                            stepIndex === step
                              ? "bg-white/20 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white active:bg-white/15"
                          }`}
                        >
                          {i + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {showPsalmNav && (
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
              Psalm {step - REFUGE_STEPS + 1} / {PSALMS_COUNT}
            </span>
          )}
          <Link
            href="/"
            className="flex items-center gap-1.5 min-h-[44px] min-w-[44px] font-mono text-[10px] tracking-wider text-white/40 hover:text-white/70"
            aria-label="Leave devotions"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Leave</span>
          </Link>
        </div>
      </div>

      {/* Step panels — below top bar; extra pt when Psalm nav so label doesn't overlap */}
      <div className="flex-1 min-h-0 relative flex flex-col pt-14 sm:pt-16">
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

      {/* Bottom nav: only on Psalm steps */}
      {showPsalmNav && (
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
              const idx =
                REFUGE_STEPS +
                Math.round((i / 14) * (PSALMS_COUNT - 1))
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToStep(idx)}
                  aria-label={`Go to Psalm ${idx - REFUGE_STEPS + 1}`}
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
      )}
    </div>
  )
}
