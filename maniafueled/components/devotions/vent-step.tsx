"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useDevotions } from "./devotions-context"
import { getVentForDate, setVentForDate } from "@/lib/devotions"

const SAVE_DEBOUNCE_MS = 400

export function VentStep() {
  const { goToTodaysPsalm } = useDevotions()
  const [value, setValue] = useState("")
  const valueRef = useRef(value)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    scheduleSave()
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050505] overflow-hidden px-4 pt-12 pb-24">
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
          onClick={() => {
            if (saveTimeoutRef.current) {
              clearTimeout(saveTimeoutRef.current)
              saveTimeoutRef.current = null
            }
            setVentForDate(new Date(), valueRef.current)
            goToTodaysPsalm()
          }}
          className="min-h-[44px] w-full px-6 py-3 font-mono text-xs tracking-[0.2em] text-white/90 border border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Continue to Psalm"
        >
          Continue to Psalm
        </button>
      </div>
    </div>
  )
}
