"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Copy,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { getPsalm } from "@/lib/psalms"
import { parseStyledText } from "@/lib/parse-styled-text"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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

const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const

const REFLECTION_PROMPTS = [
  "What line or phrase is staying with you?",
  "Where did you see yourself in this Psalm?",
  "One thing you want to carry from this into your day.",
  "What is this Psalm saying back to you?",
  "What do you want to remember from this?",
  "A word or image that fits how this lands.",
  "What are you sitting with after reading?",
]

function getReflectionPrompt(psalmIndex: number): string {
  const day =
    typeof window !== "undefined"
      ? Math.floor(
          (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
            864e5
        )
      : 0
  const i = (psalmIndex + day) % REFLECTION_PROMPTS.length
  return REFLECTION_PROMPTS[i] ?? REFLECTION_PROMPTS[0]
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (reduced: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.2 : 0.5,
      ease: easeSmooth,
    },
  }),
}

type DayCardProps = {
  psalmIndex: number
}

export function DayCard({ psalmIndex }: DayCardProps) {
  const psalm = getPsalm(psalmIndex)
  const [prayer, setPrayer] = useState("")
  const [reflection, setReflection] = useState("")
  const [showVerseByVerse, setShowVerseByVerse] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [currentVerse, setCurrentVerse] = useState(0)
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null)
  const [copiedPsalm, setCopiedPsalm] = useState(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const entry = loadEntry(psalmIndex)
    setPrayer(entry.prayer)
    setReflection(entry.reflection)
  }, [psalmIndex])

  useEffect(() => {
    if (!carouselApi) return
    setCurrentVerse(carouselApi.selectedScrollSnap())
    carouselApi.on("select", () => setCurrentVerse(carouselApi.selectedScrollSnap()))
  }, [carouselApi])

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

  const copyVerse = useCallback((verseNumber: number, text: string) => {
    const label = `Psalm ${psalm?.number ?? 0}:${verseNumber}`
    navigator.clipboard?.writeText(`${label} — ${text}`).then(() => {
      setCopiedVerse(verseNumber)
      setTimeout(() => setCopiedVerse(null), 2000)
    })
  }, [psalm?.number])

  const copyFullPsalm = useCallback(() => {
    if (!psalm) return
    const lines = psalm.verses.map(
      (v) => `${v.verseNumber}. ${v.text}`
    )
    navigator.clipboard?.writeText(`Psalm ${psalm.number}\n\n${lines.join("\n")}`).then(() => {
      setCopiedPsalm(true)
      setTimeout(() => setCopiedPsalm(false), 2000)
    })
  }, [psalm])

  if (!psalm) return null

  const verseCount = psalm.verses.length
  const stagger = reduced ? 0.02 : 0.08

  return (
    <div className="min-h-full">
      {/* Subtle atmosphere behind scripture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[min(100%,42rem)] h-[50vh] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(255,255,255,0.05), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-6 pb-32 sm:px-6 md:px-12 max-w-2xl mx-auto">
        {/* Header: Psalm number + reading mode toggle */}
        <motion.header
          className="flex items-center justify-between gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: stagger,
                delayChildren: reduced ? 0 : 0.15,
              },
            },
          }}
        >
          <motion.h2
            variants={fadeUp}
            custom={reduced}
            className="font-[var(--font-playfair)] text-3xl sm:text-4xl font-light text-white tracking-tight"
          >
            Psalm {psalm.number}
          </motion.h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyFullPsalm}
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/50 hover:text-white/80 transition-colors min-h-[44px] p-2 -m-2 rounded"
              aria-label="Copy full Psalm"
            >
              {copiedPsalm ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copy
            </button>
            <motion.button
              type="button"
              variants={fadeUp}
              custom={reduced}
              onClick={() => setReadingMode((m) => !m)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/50 hover:text-white/80 transition-colors min-h-[44px]"
              aria-label={readingMode ? "Show prayer and reflection" : "Reading mode — hide forms"}
            >
              {readingMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  Show forms
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  Reading mode
                </>
              )}
            </motion.button>
          </div>
        </motion.header>

        {!showVerseByVerse && (
          <motion.div
            className="mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: stagger,
                  delayChildren: reduced ? 0 : 0.2,
                },
              },
            }}
          >
            {psalm.verses.map((v, i) => (
              <motion.p
                key={v.verseNumber}
                variants={fadeUp}
                custom={reduced}
                className={`font-[var(--font-playfair)] text-white/92 leading-[1.85] mb-5 text-[1.05rem] sm:text-[1.12rem] ${
                  i === 0 ? "first-letter:text-2xl first-letter:sm:text-3xl first-letter:font-normal first-letter:mr-0.5 first-letter:float-left" : ""
                }`}
              >
                <span className="font-mono text-white/45 text-sm align-top mr-2 tabular-nums">
                  {v.verseNumber}.
                </span>
                {parseStyledText(v.text, `psalm-${psalm.number}-${v.verseNumber}`)}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* Verse-by-verse toggle */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.4, duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setShowVerseByVerse((v) => !v)}
            className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/50 hover:text-white/80 transition-colors min-h-[44px]"
          >
            {showVerseByVerse ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Show full Psalm
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                Verse by verse
              </>
            )}
          </button>
        </motion.div>

        {/* Verse-by-verse: focus cards with progress + copy */}
        {showVerseByVerse && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-wider text-white/50">
                Verse {currentVerse + 1} of {verseCount}
              </span>
              <div className="flex gap-1">
                {psalm.verses.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      i === currentVerse
                        ? "w-4 bg-white/70"
                        : "w-1.5 bg-white/25"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
            <Carousel
              opts={{ align: "center", loop: false }}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {psalm.verses.map((v) => (
                  <CarouselItem key={v.verseNumber} className="pl-2 basis-full">
                    <div className="relative rounded-2xl bg-white/[0.06] border border-white/15 p-6 sm:p-8 min-h-[180px] flex flex-col justify-center shadow-[0_0_40px_-12px_rgba(255,255,255,0.08)]">
                      <div className="absolute top-3 right-3">
                        <button
                          type="button"
                          onClick={() => copyVerse(v.verseNumber, v.text)}
                          className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                          aria-label="Copy verse"
                        >
                          {copiedVerse === v.verseNumber ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="font-mono text-[10px] tracking-widest text-white/45 mb-3">
                        Verse {v.verseNumber}
                      </p>
                      <p className="font-[var(--font-playfair)] text-white/95 text-lg sm:text-xl leading-[1.75]">
                        {parseStyledText(
                          v.text,
                          `dial-${psalm.number}-${v.verseNumber}`
                        )}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-white/20 text-white hover:bg-white/10 -left-2 sm:-left-12 bg-[#0a0a0a]/90" />
              <CarouselNext className="border-white/20 text-white hover:bg-white/10 -right-2 sm:-right-12 bg-[#0a0a0a]/90" />
            </Carousel>
          </motion.div>
        )}

        {/* Response — prayer + prompted reflection; hidden in reading mode */}
        {!readingMode && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.5 }}
          >
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="font-mono text-[10px] tracking-wider text-white/45 mb-3">
                After reading
              </p>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor={`prayer-${psalmIndex}`}
                    className="block font-sans text-sm font-light text-white/80 mb-1.5"
                  >
                    A prayer in your own words
                  </label>
                  <textarea
                    id={`prayer-${psalmIndex}`}
                    value={prayer}
                    onChange={handlePrayerChange}
                    onBlur={scheduleSave}
                    placeholder="Whatever you want to say—or leave blank"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-y transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`reflection-${psalmIndex}`}
                    className="block font-sans text-sm font-light text-white/80 mb-1.5"
                  >
                    {getReflectionPrompt(psalmIndex)}
                  </label>
                  <textarea
                    id={`reflection-${psalmIndex}`}
                    value={reflection}
                    onChange={handleReflectionChange}
                    onBlur={scheduleSave}
                    placeholder="Just a line or two—or nothing"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 resize-y transition-colors"
                  />
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  )
}
