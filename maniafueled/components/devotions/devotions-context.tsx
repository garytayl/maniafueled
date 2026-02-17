"use client"

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  type ReactNode,
} from "react"
import {
  PSALMS_COUNT,
  REFUGE_STEPS,
  getStepIndexForTodaysPsalm,
} from "@/lib/devotions"

export type Direction = 1 | -1

const TOTAL_STEPS = REFUGE_STEPS + PSALMS_COUNT

type DevotionsContextValue = {
  step: number
  totalSteps: number
  direction: Direction
  next: () => void
  prev: () => void
  goToStep: (index: number) => void
  goToTodaysPsalm: () => void
  canGoNext: boolean
  canGoPrev: boolean
  isFirst: boolean
  isLast: boolean
  isRefugeStep: boolean
}

const DevotionsContext = createContext<DevotionsContextValue | null>(null)

export function DevotionsProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<Direction>(1)
  const isTransitioning = useRef(false)

  const next = useCallback(() => {
    if (isTransitioning.current) return
    setDirection(1)
    setStep((s) => {
      if (s >= TOTAL_STEPS - 1) return s
      isTransitioning.current = true
      return s + 1
    })
    setTimeout(() => {
      isTransitioning.current = false
    }, 600)
  }, [])

  const prev = useCallback(() => {
    if (isTransitioning.current) return
    setDirection(-1)
    setStep((s) => {
      if (s <= 0) return s
      isTransitioning.current = true
      return s - 1
    })
    setTimeout(() => {
      isTransitioning.current = false
    }, 600)
  }, [])

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_STEPS) return
    setDirection(index > step ? 1 : -1)
    setStep(index)
  }, [step])

  const goToTodaysPsalm = useCallback(() => {
    const idx = getStepIndexForTodaysPsalm(new Date())
    goToStep(idx)
  }, [goToStep])

  const value: DevotionsContextValue = {
    step,
    totalSteps: TOTAL_STEPS,
    direction,
    next,
    prev,
    goToStep,
    goToTodaysPsalm,
    canGoNext: step < TOTAL_STEPS - 1,
    canGoPrev: step > 0,
    isFirst: step === 0,
    isLast: step === TOTAL_STEPS - 1,
    isRefugeStep: step < REFUGE_STEPS,
  }

  return (
    <DevotionsContext.Provider value={value}>{children}</DevotionsContext.Provider>
  )
}

export function useDevotions() {
  const ctx = useContext(DevotionsContext)
  if (!ctx) throw new Error("useDevotions must be used within DevotionsProvider")
  return ctx
}
