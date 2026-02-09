"use client"

import { useState, useCallback } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

const DICT_API = "https://api.dictionaryapi.dev/api/v2/entries/en"

type DictEntry = {
  word: string
  meanings?: Array<{
    partOfSpeech?: string
    definitions?: Array<{ definition?: string }>
  }>
}

const cache = new Map<string, string>()

function getDefinitionFromEntry(entry: DictEntry): string {
  const firstMeaning = entry.meanings?.[0]
  if (!firstMeaning?.definitions?.length) return ""
  const part = firstMeaning.partOfSpeech ? `(${firstMeaning.partOfSpeech}) ` : ""
  return part + (firstMeaning.definitions[0].definition ?? "")
}

export function DefinitionWord({
  word,
  keyId,
  className = "",
}: {
  word: string
  keyId: string
  className?: string
}) {
  const [definition, setDefinition] = useState<string | null>(() => cache.get(word) ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchDefinition = useCallback(async () => {
    if (definition !== null || loading) return
    const cached = cache.get(word)
    if (cached) {
      setDefinition(cached)
      return
    }
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`${DICT_API}/${encodeURIComponent(word)}`)
      if (!res.ok) {
        setError(true)
        return
      }
      const data: DictEntry[] = await res.json()
      const text = data?.[0] ? getDefinitionFromEntry(data[0]) : ""
      if (text) {
        cache.set(word, text)
        setDefinition(text)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [word, definition, loading])

  const label = loading
    ? "Loading…"
    : error
      ? "Definition unavailable"
      : definition ?? "Click for definition"

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="button"
            tabIndex={0}
            onMouseEnter={fetchDefinition}
            onFocus={fetchDefinition}
            onClick={(e) => {
              e.preventDefault()
              fetchDefinition()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                fetchDefinition()
              }
            }}
            className={`border-b border-dotted border-white/40 cursor-help hover:border-white/70 ${className}`}
            aria-label={definition ?? `Definition for ${word}`}
          >
            {word}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px] text-left">
          {loading && !definition ? (
            <span className="text-white/70">Loading definition…</span>
          ) : error && !definition ? (
            <span className="text-white/70">Could not load definition.</span>
          ) : (
            <span>{definition}</span>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
