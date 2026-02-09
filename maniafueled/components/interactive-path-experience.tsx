"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
import {
  maniaSymptoms,
  depressionSymptoms,
  suicidalIdeationContent,
  crossCuttingStruggles,
  triggers,
  earlyWarningSigns,
} from "@/lib/content"

type Variant = "mania" | "depressive"

const CATEGORIES = [
  { id: "cognitive", label: "Cognitive" },
  { id: "emotional", label: "Emotional" },
  { id: "behavioral", label: "Behavioral" },
  { id: "physiological", label: "Physiological" },
] as const

const MANIA_CONFIG = {
  pathLabel: "STATE — MANIA",
  title: "The elevated side",
  beginLabel: "Step into it",
  feelingsTitle: "What it feels like",
  feelingsSubtitle: "Pick a dimension to explore.",
  extraTitle: "Early warning signs",
  extraSubtitle: "Signs that elevation may be building.",
  symptoms: maniaSymptoms,
  extraItems: earlyWarningSigns,
  hasIdeation: false,
  crossCutting: null,
  transitionDuration: 0.25,
  cardStagger: 0.08,
}

const DEPRESSIVE_CONFIG = {
  pathLabel: "STATE — DEPRESSIVE",
  title: "The low side",
  beginLabel: "Step into it",
  feelingsTitle: "What it feels like",
  feelingsSubtitle: "Pick a dimension to explore.",
  extraTitle: "Cross-cutting struggles",
  extraSubtitle: "Themes that run through both elevation and depletion.",
  symptoms: depressionSymptoms,
  extraItems: null,
  hasIdeation: true,
  ideation: suicidalIdeationContent,
  crossCutting: crossCuttingStruggles,
  transitionDuration: 0.5,
  cardStagger: 0.12,
}

type Step = "intro" | "feelings" | "feelings-cards" | "extra" | "triggers"

export function InteractivePathExperience({ variant }: { variant: Variant }) {
  const config = variant === "mania" ? MANIA_CONFIG : DEPRESSIVE_CONFIG
  const [step, setStep] = useState<Step>("intro")
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof maniaSymptoms | "ideation" | null>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [expandedStruggle, setExpandedStruggle] = useState<number | null>(null)

  const items =
    selectedCategory && selectedCategory !== "ideation"
      ? config.symptoms[selectedCategory]
      : []
  const totalCards = items.length
  const isMania = variant === "mania"

  const goBackFromCards = () => {
    setSelectedCategory(null)
    setCardIndex(0)
    setStep("feelings")
  }

  const goNextCard = () => {
    if (cardIndex < totalCards - 1) setCardIndex((i) => i + 1)
    else {
      setCardIndex(0)
      setSelectedCategory(null)
      setStep("extra")
    }
  }

  const goPrevCard = () => {
    if (cardIndex > 0) setCardIndex((i) => i - 1)
    else goBackFromCards()
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white flex flex-col">
      <div className="flex-1 flex flex-col px-5 sm:px-10 md:px-14 pt-[var(--navbar-offset)] sm:pt-28 pb-32 max-w-5xl mx-auto w-full">
        {/* Persistent back / nav */}
        {step !== "intro" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              if (step === "feelings-cards") goBackFromCards()
              else if (step === "feelings") setStep("intro")
              else if (step === "extra") setStep("feelings")
              else if (step === "triggers") setStep("extra")
            }}
            className="flex items-center gap-3 font-mono text-sm sm:text-base tracking-widest uppercase text-white/50 hover:text-white transition-colors mb-10 self-start py-2 -ml-1 min-h-[48px] items-center"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            Back
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {/* ——— INTRO ——— */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start flex-1 justify-center max-w-2xl"
            >
              <p className="font-mono text-sm sm:text-base tracking-[0.3em] text-muted-foreground mb-4">
                {config.pathLabel}
              </p>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic mb-8 sm:mb-10 leading-tight">
                {config.title}
              </h1>
              <p className="font-sans text-xl sm:text-2xl text-white/70 font-light mb-12 sm:mb-14 max-w-xl leading-relaxed">
                {isMania
                  ? "Energy, clarity, and the cost. Explore one dimension at a time."
                  : "Depletion, pain, and what runs through it. Explore one dimension at a time."}
              </p>
              <button
                onClick={() => setStep("feelings")}
                className="group flex items-center gap-3 font-mono text-sm sm:text-base tracking-widest uppercase text-white/70 hover:text-white transition-colors py-4 px-0 border-b-2 border-white/30 hover:border-white min-h-[52px] items-center"
                data-cursor-hover
              >
                {config.beginLabel}
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* ——— FEELINGS: category picker ——— */}
          {step === "feelings" && (
            <motion.div
              key="feelings"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: config.transitionDuration }}
              className="flex flex-col flex-1 justify-center space-y-10 sm:space-y-12"
            >
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light mb-3">
                  {config.feelingsTitle}
                </h2>
                <p className="text-muted-foreground font-sans font-light text-base sm:text-lg">
                  {config.feelingsSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setCardIndex(0)
                      setStep("feelings-cards")
                    }}
                    className="font-mono text-base sm:text-lg tracking-wider px-8 py-4 sm:px-10 sm:py-5 rounded-full border-2 border-white/25 text-white/90 hover:bg-white/10 hover:border-white/40 transition-all min-h-[52px] sm:min-h-[56px]"
                    data-cursor-hover
                  >
                    {cat.label}
                  </button>
                ))}
                {config.hasIdeation && (
                  <button
                    onClick={() => {
                      setSelectedCategory("ideation")
                      setCardIndex(0)
                      setStep("feelings-cards")
                    }}
                    className="font-mono text-base sm:text-lg tracking-wider px-8 py-4 sm:px-10 sm:py-5 rounded-full border-2 border-amber-500/40 text-amber-200/90 hover:bg-amber-500/10 transition-all min-h-[52px] sm:min-h-[56px]"
                    data-cursor-hover
                  >
                    Suicidal ideation
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ——— FEELINGS: card carousel ——— */}
          {step === "feelings-cards" && selectedCategory && (
            <motion.div
              key="feelings-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col flex-1 min-h-[50vh]"
            >
              {selectedCategory === "ideation" && config.hasIdeation && "ideation" in config && config.ideation ? (
                <div className="flex flex-col flex-1 justify-center space-y-8">
                  <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 px-6 py-4 sm:px-8 sm:py-5">
                    <p className="font-mono text-sm sm:text-base text-amber-200/90">
                      {config.ideation.warning}
                    </p>
                  </div>
                  <ul className="space-y-4 pl-6 list-disc text-white/80 font-sans font-light text-base sm:text-lg leading-relaxed">
                    {config.ideation.points.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setStep("extra")
                    }}
                    className="flex items-center gap-3 font-mono text-sm sm:text-base tracking-widest uppercase text-white/60 hover:text-white mt-8 min-h-[52px]"
                    data-cursor-hover
                  >
                    Continue
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-mono text-sm sm:text-base tracking-wider text-white/50 mb-6">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? ""}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cardIndex}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{
                        duration: isMania ? 0.2 : 0.35,
                        ease: "easeOut",
                      }}
                      className="flex-1 flex flex-col justify-center py-8"
                    >
                      <p className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/95 leading-relaxed break-words">
                        {items[cardIndex]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-between mt-8 pt-8 border-t-2 border-white/10">
                    <span className="font-mono text-sm sm:text-base text-white/40">
                      {cardIndex + 1} / {totalCards}
                    </span>
                    <div className="flex gap-5">
                      <button
                        onClick={goPrevCard}
                        disabled={cardIndex === 0}
                        className="p-3 sm:p-4 rounded-full border-2 border-white/20 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none transition-all min-h-[52px] min-w-[52px] flex items-center justify-center"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                      </button>
                      <button
                        onClick={goNextCard}
                        className="flex items-center gap-2 font-mono text-sm sm:text-base tracking-widest uppercase text-white/70 hover:text-white transition-colors py-3 min-h-[52px]"
                        data-cursor-hover
                      >
                        {cardIndex < totalCards - 1 ? "Next" : "Continue"}
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ——— EXTRA: early warning (mania) or cross-cutting (depressive) ——— */}
          {step === "extra" && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: config.transitionDuration }}
              className="flex flex-col flex-1 justify-center space-y-10 sm:space-y-12"
            >
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light mb-3">
                  {config.extraTitle}
                </h2>
                <p className="text-muted-foreground font-sans font-light text-base sm:text-lg">
                  {config.extraSubtitle}
                </p>
              </div>

              {isMania ? (
                <div className="flex flex-wrap gap-4 sm:gap-5">
                  {config.extraItems?.map((sign, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="font-mono text-base sm:text-lg tracking-wider px-6 py-4 sm:px-8 sm:py-5 rounded-full border-2 border-white/20 text-white/90 bg-white/5 min-h-[52px] flex items-center"
                    >
                      {sign}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {config.crossCutting?.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="border-l-2 border-white/20 pl-6 sm:pl-8 py-3"
                    >
                      <button
                        onClick={() =>
                          setExpandedStruggle(expandedStruggle === i ? null : i)
                        }
                        className="font-mono text-base sm:text-lg tracking-wider text-left w-full flex items-center justify-between gap-3 min-h-[52px] py-2"
                        data-cursor-hover
                      >
                        {s.title}
                        <ChevronRight
                          className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform ${
                            expandedStruggle === i ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedStruggle === i && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-2 list-disc list-inside text-muted-foreground font-sans font-light text-base sm:text-lg mt-3 leading-relaxed"
                          >
                            {s.items.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setStep("triggers")}
                className="flex items-center gap-3 font-mono text-sm sm:text-base tracking-widest uppercase text-white/60 hover:text-white mt-8 min-h-[52px]"
                data-cursor-hover
              >
                Continue to triggers
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </motion.div>
          )}

          {/* ——— TRIGGERS ——— */}
          {step === "triggers" && (
            <motion.div
              key="triggers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: config.transitionDuration }}
              className="flex flex-col flex-1 justify-center space-y-10 sm:space-y-12"
            >
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light mb-3">
                  Triggers
                </h2>
                <p className="text-muted-foreground font-sans font-light text-base sm:text-lg">
                  Factors that can push toward elevation or depletion.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                {triggers.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    className="font-mono text-base sm:text-lg tracking-wider px-6 py-4 sm:px-8 sm:py-5 rounded-full border-2 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40 transition-colors cursor-default min-h-[52px] flex items-center"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer links — show when past intro */}
      {step !== "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t-2 border-white/10 py-8 px-5 sm:px-10 md:px-14 max-w-5xl mx-auto w-full flex flex-wrap gap-8 sm:gap-10"
        >
          <Link
            href="/baseline"
            className="font-mono text-sm sm:text-base tracking-widest uppercase text-white/60 hover:text-white transition-colors py-2 min-h-[48px] flex items-center"
          >
            Explore baseline
          </Link>
          <Link
            href={isMania ? "/depressive" : "/mania"}
            className="font-mono text-sm sm:text-base tracking-widest uppercase text-white/60 hover:text-white transition-colors py-2 min-h-[48px] flex items-center"
          >
            {isMania ? "The depressive side" : "The mania side"}
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-sm sm:text-base tracking-widest uppercase text-white/60 hover:text-white transition-colors py-2 min-h-[48px] flex items-center"
          >
            Reach out
          </Link>
        </motion.div>
      )}
    </div>
  )
}
