"use client"

import { useState, useEffect } from "react"
import {
  getAllDevotionDates,
  getMoodForDate,
  getVentForDate,
  parseDateKey,
  type MoodOption,
} from "@/lib/devotions"

const MOOD_LABELS: Record<MoodOption, string> = {
  mania: "MANIA",
  mixed: "MIXED",
  depressive: "DEPRESSIVE",
  baseline: "I'm doing okay",
  not_sure: "Not sure",
}

function formatDate(key: string): string {
  const d = parseDateKey(key)
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function JournalView() {
  const [dates, setDates] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    setDates(getAllDevotionDates())
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <p className="font-mono text-[10px] tracking-wider text-white/50 px-1 mb-3">
        Stored on this device only (localStorage). Mood and vent are saved by
        date; prayer & reflection on each Psalm are saved per Psalm (not by
        date). Newest first.
      </p>
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {dates.length === 0 ? (
          <p className="text-white/50 text-sm">No entries yet.</p>
        ) : (
          dates.map((key) => {
            const date = parseDateKey(key)
            const mood = getMoodForDate(date)
            const vent = getVentForDate(date)
            return (
              <article
                key={key}
                className="border-b border-white/10 pb-4 last:border-0"
              >
                <time
                  className="font-mono text-[10px] tracking-wider text-white/60 block mb-2"
                  dateTime={key}
                >
                  {formatDate(key)}
                </time>
                {mood && (
                  <p className="text-xs font-medium text-white/80 mb-1">
                    {MOOD_LABELS[mood]}
                  </p>
                )}
                {vent.trim() ? (
                  <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
                    {vent}
                  </p>
                ) : (
                  !mood && (
                    <p className="text-white/40 text-xs italic">No vent written</p>
                  )
                )}
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}
