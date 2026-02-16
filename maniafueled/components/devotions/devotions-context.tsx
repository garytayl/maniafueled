"use client"

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react"
import { getStepIndexForDate, PSALMS_COUNT } from "@/lib/devotions"

export type Direction = 1 | -1

type DevotionsContextValue = {
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

const DevotionsContext = createContext<DevotionsContextValue | null>(null)

export function DevotionsProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<Direction>(1)
  const isTransitioning = useRef(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const todayStep = getStepIndexForDate(new Date())
    setStep(Math.min(Math.max(0, todayStep), PSALMS_COUNT - 1))
  }, [])

  const next = useCallback(() => {
    if (isTransitioning.current) return
    setDirection(1)
    setStep((s) => {
      if (s >= PSALMS_COUNT - 1) return s
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
    if (index < 0 || index >= PSALMS_COUNT) return
    setDirection(index > step ? 1 : -1)
    setStep(index)
  }, [step])

  const value: DevotionsContextValue = {
    step,
    totalSteps: PSALMS_COUNT,
    direction,
    next,
    prev,
    goToStep,
    canGoNext: step < PSALMS_COUNT - 1,
    canGoPrev: step > 0,
    isFirst: step === 0,
    isLast: step === PSALMS_COUNT - 1,
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
