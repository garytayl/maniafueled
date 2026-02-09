"use client"

import { createContext, useContext, useCallback, useState, useRef, type ReactNode } from "react"

const TOTAL_STEPS = 6

export type Direction = 1 | -1

type JourneyContextValue = {
  step: number
  totalSteps: number
  direction: Direction
  next: () => void
  prev: () => void
  goToStep: (index: number) => void
  canGoNext: boolean
  canGoPrev: boolean
  isFirst: boolean
  isLast: boolean
}

const JourneyContext = createContext<JourneyContextValue | null>(null)

export function JourneyProvider({ children }: { children: ReactNode }) {
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

  const value: JourneyContextValue = {
    step,
    totalSteps: TOTAL_STEPS,
    direction,
    next,
    prev,
    goToStep,
    canGoNext: step < TOTAL_STEPS - 1,
    canGoPrev: step > 0,
    isFirst: step === 0,
    isLast: step === TOTAL_STEPS - 1,
  }

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider")
  return ctx
}

export { TOTAL_STEPS }
