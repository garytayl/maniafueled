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
  pathLabel: "PATH — MANIA",
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
  pathLabel: "PATH — DEPRESSIVE",
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
      <div className="flex-1 flex flex-col px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-32 max-w-4xl mx-auto w-full">
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
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors mb-8 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
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
              className="flex flex-col items-start"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">
                {config.pathLabel}
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic mb-8 sm:mb-12">
                {config.title}
              </h1>
              <p className="font-sans text-lg text-white/70 font-light mb-12 max-w-xl">
                {isMania
                  ? "Energy, clarity, and the cost. Explore one dimension at a time."
                  : "Depletion, pain, and what runs through it. Explore one dimension at a time."}
              </p>
              <button
                onClick={() => setStep("feelings")}
                className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors py-3 px-0 border-b border-white/30 hover:border-white"
                data-cursor-hover
              >
                {config.beginLabel}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-2xl font-light mb-2">
                  {config.feelingsTitle}
                </h2>
                <p className="text-muted-foreground font-sans font-light text-sm">
                  {config.feelingsSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setCardIndex(0)
                      setStep("feelings-cards")
                    }}
                    className="font-mono text-sm tracking-wider px-5 py-3 rounded-full border border-white/25 text-white/90 hover:bg-white/10 hover:border-white/40 transition-all"
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
                    className="font-mono text-sm tracking-wider px-5 py-3 rounded-full border border-amber-500/40 text-amber-200/90 hover:bg-amber-500/10 transition-all"
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
              className="flex flex-col min-h-[280px]"
            >
              {selectedCategory === "ideation" && config.hasIdeation && config.ideation ? (
                <div className="space-y-6">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                    <p className="font-mono text-xs text-amber-200/90">
                      {config.ideation.warning}
                    </p>
                  </div>
                  <ul className="space-y-3 pl-4 list-disc text-white/80 font-sans font-light">
                    {config.ideation.points.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setStep("extra")
                    }}
                    className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white mt-6"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-mono text-xs tracking-wider text-white/50 mb-4">
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
                      className="flex-1 flex flex-col justify-center"
                    >
                      <p className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-relaxed">
                        {items[cardIndex]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <span className="font-mono text-xs text-white/40">
                      {cardIndex + 1} / {totalCards}
                    </span>
                    <div className="flex gap-4">
                      <button
                        onClick={goPrevCard}
                        disabled={cardIndex === 0}
                        className="p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goNextCard}
                        className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors py-2"
                        data-cursor-hover
                      >
                        {cardIndex < totalCards - 1 ? "Next" : "Continue"}
                        <ChevronRight className="w-4 h-4" />
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
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-2xl font-light mb-2">
                  {config.extraTitle}
                </h2>
                <p className="text-muted-foreground font-sans font-light text-sm">
                  {config.extraSubtitle}
                </p>
              </div>

              {isMania ? (
                <div className="flex flex-wrap gap-3">
                  {config.extraItems?.map((sign, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="font-mono text-sm tracking-wider px-4 py-2.5 rounded-full border border-white/20 text-white/90 bg-white/5"
                    >
                      {sign}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {config.crossCutting?.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="border-l border-white/20 pl-5 py-2"
                    >
                      <button
                        onClick={() =>
                          setExpandedStruggle(expandedStruggle === i ? null : i)
                        }
                        className="font-mono text-sm tracking-wider text-left w-full flex items-center justify-between gap-2"
                        data-cursor-hover
                      >
                        {s.title}
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
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
                            className="overflow-hidden space-y-1 list-disc list-inside text-muted-foreground font-sans font-light text-sm mt-2"
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
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white mt-6"
                data-cursor-hover
              >
                Continue to triggers
                <ChevronRight className="w-4 h-4" />
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
              className="space-y-8"
            >
              <div>
                <h2 className="font-sans text-2xl font-light mb-2">
                  Triggers
                </h2>
                <p className="text-muted-foreground font-sans font-light text-sm">
                  Factors that can push toward elevation or depletion.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {triggers.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    className="font-mono text-sm tracking-wider px-4 py-2 rounded-full border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40 transition-colors cursor-default"
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
          className="border-t border-white/10 py-6 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto w-full flex flex-wrap gap-6"
        >
          <Link
            href="/baseline"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            Explore baseline
          </Link>
          <Link
            href={isMania ? "/depressive" : "/mania"}
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            {isMania ? "The depressive side" : "The mania side"}
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            Reach out
          </Link>
        </motion.div>
      )}
    </div>
  )
}
