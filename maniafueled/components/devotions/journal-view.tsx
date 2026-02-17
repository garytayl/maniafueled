"use client"

import { useState, useEffect, useRef } from "react"
import { Download, Upload } from "lucide-react"
import {
  getAllDevotionDates,
  getMoodForDate,
  getVentForDate,
  parseDateKey,
  exportDevotionsData,
  importDevotionsData,
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
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const refresh = () => setDates(getAllDevotionDates())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    refresh()
  }, [mounted])

  const handleExport = () => {
    const data = exportDevotionsData()
    if (!data) return
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `devotions-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result as string)
        const count = importDevotionsData(payload)
        refresh()
        setImportMessage(count ? `Imported ${count} entries.` : "No valid entries in file.")
        setTimeout(() => setImportMessage(null), 4000)
      } catch {
        setImportMessage("Invalid file.")
        setTimeout(() => setImportMessage(null), 3000)
      }
    }
    reader.readAsText(file)
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 min-h-[44px] px-3 py-2 font-mono text-[10px] tracking-wider text-white/60 hover:text-white/90 border border-white/20 rounded-md"
          aria-label="Export journal"
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 min-h-[44px] px-3 py-2 font-mono text-[10px] tracking-wider text-white/60 hover:text-white/90 border border-white/20 rounded-md"
          aria-label="Import journal"
        >
          <Upload className="w-3.5 h-3.5" />
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          className="sr-only"
          aria-hidden
        />
      </div>
      {importMessage && (
        <p className="font-mono text-xs text-white/70 mb-2" role="status">
          {importMessage}
        </p>
      )}
      <p className="font-mono text-[10px] tracking-wider text-white/50 px-1 mb-3">
        Stored on this device only (localStorage). Export to backup; import to
        restore. Newest first.
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
