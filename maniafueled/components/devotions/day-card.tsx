"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getPsalm } from "@/lib/psalms"
import { parseStyledText } from "@/lib/parse-styled-text"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const STORAGE_KEY_PREFIX = "devotions-psalm-"

function loadEntry(psalmIndex: number): { prayer: string; reflection: string } {
  if (typeof window === "undefined") return { prayer: "", reflection: "" }
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${psalmIndex}`)
    if (!raw) return { prayer: "", reflection: "" }
    const parsed = JSON.parse(raw) as { prayer?: string; reflection?: string }
    return {
      prayer: parsed.prayer ?? "",
      reflection: parsed.reflection ?? "",
    }
  } catch {
    return { prayer: "", reflection: "" }
  }
}

function saveEntry(
  psalmIndex: number,
  data: { prayer: string; reflection: string }
): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${psalmIndex}`,
      JSON.stringify(data)
    )
  } catch {
    // ignore
  }
}

type DayCardProps = {
  psalmIndex: number
}

export function DayCard({ psalmIndex }: DayCardProps) {
  const psalm = getPsalm(psalmIndex)
  const [prayer, setPrayer] = useState("")
  const [reflection, setReflection] = useState("")
  const [showVerseByVerse, setShowVerseByVerse] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const entry = loadEntry(psalmIndex)
    setPrayer(entry.prayer)
    setReflection(entry.reflection)
  }, [psalmIndex])

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null
      saveEntry(psalmIndex, { prayer, reflection })
    }, 400)
  }, [psalmIndex, prayer, reflection])

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [])

  const handlePrayerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrayer(e.target.value)
    scheduleSave()
  }

  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflection(e.target.value)
    scheduleSave()
  }

  if (!psalm) return null

  return (
    <div className="px-4 py-6 pb-32 sm:px-6 md:px-12 max-w-2xl mx-auto">
      <h2 className="font-sans text-2xl font-light text-white mb-6">
        Psalm {psalm.number}
      </h2>
      {!showVerseByVerse && (
        <div className="prose prose-invert prose-p:text-white/90 prose-p:leading-relaxed space-y-3 mb-4">
          {psalm.verses.map((v) => (
            <p key={v.verseNumber} className="text-white/90">
              <span className="font-mono text-white/50 text-sm mr-2">
                {v.verseNumber}.
              </span>
              {parseStyledText(v.text, `psalm-${psalm.number}-${v.verseNumber}`)}
            </p>
          ))}
        </div>
      )}

      <div className="mb-10">
        <button
          type="button"
          onClick={() => setShowVerseByVerse((v) => !v)}
          className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/50 hover:text-white/70 mb-3"
        >
          {showVerseByVerse ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Show full Psalm
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show verse by verse
            </>
          )}
        </button>
        {showVerseByVerse && (
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {psalm.verses.map((v) => (
                <CarouselItem key={v.verseNumber} className="pl-2 basis-full">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4 min-h-[120px] flex flex-col justify-center">
                    <p className="font-mono text-[10px] text-white/50 mb-2">
                      Verse {v.verseNumber}
                    </p>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {parseStyledText(
                        v.text,
                        `dial-${psalm.number}-${v.verseNumber}`
                      )}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-white/20 text-white hover:bg-white/10 -left-2 sm:-left-12" />
            <CarouselNext className="border-white/20 text-white hover:bg-white/10 -right-2 sm:-right-12" />
          </Carousel>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor={`prayer-${psalmIndex}`}
            className="block font-mono text-[10px] tracking-wider text-white/50 mb-2"
          >
            Prayer
          </label>
          <textarea
            id={`prayer-${psalmIndex}`}
            value={prayer}
            onChange={handlePrayerChange}
            onBlur={scheduleSave}
            placeholder="Optional"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-y"
          />
        </div>
        <div>
          <label
            htmlFor={`reflection-${psalmIndex}`}
            className="block font-mono text-[10px] tracking-wider text-white/50 mb-2"
          >
            Reflection
          </label>
          <textarea
            id={`reflection-${psalmIndex}`}
            value={reflection}
            onChange={handleReflectionChange}
            onBlur={scheduleSave}
            placeholder="Optional"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-y"
          />
        </div>
      </div>
    </div>
  )
}
