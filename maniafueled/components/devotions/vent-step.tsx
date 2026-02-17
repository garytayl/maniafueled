"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { useDevotions } from "./devotions-context"
import { getVentForDate, setVentForDate } from "@/lib/devotions"

const SAVE_DEBOUNCE_MS = 400
const BREATHE_SECONDS = 4

export function VentStep() {
  const { goToTodaysPsalm } = useDevotions()
  const [value, setValue] = useState("")
  const [showBreathe, setShowBreathe] = useState(false)
  const valueRef = useRef(value)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const breatheTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  valueRef.current = value

  useEffect(() => {
    const initial = getVentForDate(new Date())
    setValue(initial)
    valueRef.current = initial
  }, [])

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null
      setVentForDate(new Date(), valueRef.current)
    }, SAVE_DEBOUNCE_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      if (breatheTimeoutRef.current) clearTimeout(breatheTimeoutRef.current)
    }
  }, [])

  const goToPsalm = useCallback(() => {
    if (breatheTimeoutRef.current) clearTimeout(breatheTimeoutRef.current)
    setShowBreathe(false)
    goToTodaysPsalm()
  }, [goToTodaysPsalm])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    scheduleSave()
  }

  const handleContinueToPsalm = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }
    setVentForDate(new Date(), valueRef.current)
    setShowBreathe(true)
    breatheTimeoutRef.current = setTimeout(goToPsalm, BREATHE_SECONDS * 1000)
  }, [goToPsalm])

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050505] overflow-hidden px-4 pt-12 pb-24">
      {/* Breathe transition overlay */}
      {showBreathe && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={goToPsalm}
            className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-white/45 hover:text-white/70"
            aria-label="Skip"
          >
            Skip
          </button>
          <motion.p
            className="font-sans text-xl sm:text-2xl font-light text-white/90 mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Take a breath
          </motion.p>
          <motion.div
            className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: BREATHE_SECONDS / 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden
          />
        </motion.div>
      )}
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 min-h-0">
        <h2 className="font-sans text-xl sm:text-2xl font-light text-white mb-4 text-center">
          Bring it to God
        </h2>
        <p className="font-mono text-[10px] tracking-wider text-white/50 mb-4 text-center">
          Vent — whatever is on your heart
        </p>
        <textarea
          value={value}
          onChange={handleChange}
          onBlur={scheduleSave}
          placeholder="Whatever is on your heart…"
          rows={8}
          className="flex-1 min-h-[200px] w-full bg-white/5 border border-white/10 rounded-lg p-4 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-y mb-6"
          aria-label="Vent — bring it to God"
        />
        <button
          type="button"
          onClick={handleContinueToPsalm}
          className="min-h-[44px] w-full px-6 py-3 font-mono text-xs tracking-[0.2em] text-white/90 border border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Continue to Psalm"
        >
          Continue to Psalm
        </button>
        <button
          type="button"
          onClick={goToTodaysPsalm}
          className="mt-3 font-mono text-[10px] tracking-wider text-white/45 hover:text-white/70 transition-colors underline underline-offset-2"
          aria-label="Skip to Psalm"
        >
          Skip to Psalm
        </button>
      </div>
    </div>
  )
}
