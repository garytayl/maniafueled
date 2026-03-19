"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, HandHelping, Lightbulb, Package } from "lucide-react"
import { analogies, type AnalogyEntry, type HelpContrast } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function compareLoadMessage(score: number): string {
  if (score <= 3) return "This is a lighter-load day. Still effort, but more room to breathe."
  if (score <= 6) return "This is a medium-load day. Movement is possible, but it costs concentration."
  if (score <= 8) return "This is a heavy-load day. Every small task can feel like a major lift."
  return "This is overload. Even basic actions can feel like carrying furniture uphill."
}

function BulletDeck({
  title,
  items,
  tone = "neutral",
}: {
  title: string
  items: string[]
  tone?: "neutral" | "inside" | "help"
}) {
  if (items.length === 0) return null

  const toneClasses =
    tone === "inside"
      ? "border-amber-400/20 bg-amber-500/[0.06] text-amber-100/90"
      : tone === "help"
        ? "border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-100/90"
        : "border-white/10 bg-black/25 text-white/80"

  return (
    <div className="space-y-3">
      <p className="font-mono text-xs tracking-[0.2em] text-white/55">{title}</p>
      <ul className="grid gap-3">
        {items.map((line, idx) => (
          <motion.li
            key={line}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className={`rounded-lg border p-3 text-sm font-light leading-relaxed sm:text-base ${toneClasses}`}
          >
            {line}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function HelpLayerDeck({ items }: { items: HelpContrast[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (items.length === 0) return null

  const active = items[Math.min(activeIndex, items.length - 1)]

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs tracking-[0.2em] text-white/55">PERFORMATIVE VS ACTUAL HELP</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button
            key={item.prompt}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`rounded-md border px-3 py-1.5 text-left text-xs transition-colors ${
              idx === activeIndex
                ? "border-white/40 bg-white/12 text-white"
                : "border-white/15 bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
            }`}
          >
            {item.prompt}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-red-400/20 bg-red-500/[0.07] p-4">
          <p className="font-mono text-[11px] tracking-[0.18em] text-red-100/80">PERFORMATIVE</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-red-100/90 sm:text-base">{active.performative}</p>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] p-4">
          <p className="font-mono text-[11px] tracking-[0.18em] text-emerald-100/80">ACTUAL HELP</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-emerald-100/90 sm:text-base">{active.actual}</p>
        </div>
      </div>
      <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-light text-white/75">
        <span className="font-mono text-[11px] tracking-[0.16em] text-white/60">IMPACT:</span> {active.impact}
      </p>
    </div>
  )
}

function AnalogyCard({ analogy, index }: { analogy: AnalogyEntry; index: number }) {
  const [loadScore, setLoadScore] = useState(8)
  const lampScore = 2
  const message = useMemo(() => compareLoadMessage(loadScore), [loadScore])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

      <p className="relative font-mono text-xs tracking-[0.22em] text-white/50">ANALOGY {String(index + 1).padStart(2, "0")}</p>
      <h2 className="relative mt-3 font-sans text-2xl font-light text-white sm:text-3xl">{analogy.title}</h2>
      <p className="relative mt-5 border-l border-white/30 pl-4 font-sans text-lg font-light italic leading-relaxed text-white/90 sm:text-2xl">
        &ldquo;{analogy.summary}&rdquo;
      </p>
      <p className="relative mt-5 font-sans text-base font-light leading-relaxed text-white/75 sm:text-lg">
        {analogy.description}
      </p>

      <div className="relative mt-7 rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5">
        <p className="font-mono text-xs tracking-[0.2em] text-white/55">INTERACTIVE LOAD CHECK</p>
        <p className="mt-2 text-sm font-light text-white/70 sm:text-base">
          Drag this to reflect how heavy the couch feels today.
        </p>
        <div className="mt-4 space-y-3">
          <label htmlFor={`load-score-${index}`} className="font-mono text-xs tracking-[0.16em] text-white/60">
            COUCH WEIGHT: {loadScore}/10
          </label>
          <input
            id={`load-score-${index}`}
            type="range"
            min={1}
            max={10}
            value={loadScore}
            onChange={(e) => setLoadScore(Number(e.target.value))}
            className="w-full accent-amber-300"
          />
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Lamp load
                </span>
                <span>{lampScore}/10</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-sky-300/80" style={{ width: `${lampScore * 10}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" />
                  Couch load
                </span>
                <span>{loadScore}/10</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-amber-300/90" style={{ width: `${loadScore * 10}%` }} />
              </div>
            </div>
          </div>
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-light text-white/75">
            {message}
          </p>
        </div>
      </div>

      <Tabs defaultValue="outside" className="relative mt-8">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 sm:grid-cols-5">
          <TabsTrigger value="outside" className="font-mono text-[11px] tracking-wider data-[state=active]:bg-white/10">
            Outside words
          </TabsTrigger>
          <TabsTrigger value="inside" className="font-mono text-[11px] tracking-wider data-[state=active]:bg-white/10">
            Inside feel
          </TabsTrigger>
          <TabsTrigger value="deeper" className="font-mono text-[11px] tracking-wider data-[state=active]:bg-white/10">
            Dig deeper
          </TabsTrigger>
          <TabsTrigger value="help" className="font-mono text-[11px] tracking-wider data-[state=active]:bg-white/10">
            What helps
          </TabsTrigger>
          <TabsTrigger value="layer" className="font-mono text-[11px] tracking-wider data-[state=active]:bg-white/10">
            Help layer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="outside" className="mt-5">
          <BulletDeck title="WHAT PEOPLE MIGHT SAY" items={analogy.peopleMightSay ?? []} />
        </TabsContent>

        <TabsContent value="inside" className="mt-5">
          <BulletDeck title="HOW IT FEELS IN THIS ANALOGY" items={analogy.howItFeels ?? []} tone="inside" />
        </TabsContent>

        <TabsContent value="deeper" className="mt-5">
          {analogy.analogyExpansions && analogy.analogyExpansions.length > 0 ? (
            <div className="space-y-3">
              <p className="font-mono text-xs tracking-[0.2em] text-white/55">WAYS THIS ANALOGY SHOWS UP</p>
              <Accordion type="single" collapsible className="rounded-xl border border-white/10 bg-black/25 px-4">
                {analogy.analogyExpansions.map((item) => (
                  <AccordionItem key={item.title} value={item.title} className="border-white/10">
                    <AccordionTrigger className="font-mono text-xs tracking-[0.14em] text-white/85 hover:text-white hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm font-light leading-relaxed text-white/75 sm:text-base">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="help" className="mt-5">
          <BulletDeck title="WHAT ACTUALLY HELPS" items={analogy.whatActuallyHelps ?? []} tone="help" />
        </TabsContent>

        <TabsContent value="layer" className="mt-5">
          <HelpLayerDeck items={analogy.helpContrasts ?? []} />
        </TabsContent>
      </Tabs>
    </motion.section>
  )
}

export function AnalogiesContent() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <article className="mx-auto max-w-4xl px-4 pb-24 pt-[var(--navbar-offset)] sm:px-6 md:px-8">
        <header className="py-16 md:py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">Interactive translation tool</p>
          <h1 className="mb-6 font-sans text-3xl font-light italic leading-tight sm:text-4xl md:text-6xl">
            Analogies
          </h1>
          <p className="font-sans text-lg font-light leading-relaxed text-white/70">
            Some experiences are easier to understand through comparison. This page is dedicated to the analogies that
            help explain what bipolar and related mental health struggles can feel like from the inside.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/55">INTERACT</p>
              <p className="mt-1 text-sm text-white/75">Use tabs to switch perspectives quickly.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/55">DIG IN</p>
              <p className="mt-1 text-sm text-white/75">Open accordion sections for deeper context.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/55">FEEL THE LOAD</p>
              <p className="mt-1 text-sm text-white/75">Use the slider to compare lamp vs couch weight.</p>
            </div>
          </div>
        </header>

        <div className="space-y-10">
          {analogies.map((analogy, index) => (
            <AnalogyCard key={analogy.title} analogy={analogy} index={index} />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 sm:p-8"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-white/45">NEXT</p>
          <p className="mt-3 font-sans text-base font-light leading-relaxed text-white/70 sm:text-lg">
            More analogies can be added here with this same interactive pattern so the page keeps growing into a
            hands-on library, not just static text.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/70">
            <HandHelping className="h-4 w-4" />
            <span>Future analogies can include scenario cards, response drills, and practical support prompts.</span>
          </div>
        </motion.section>

        <CrossLinks className="mt-16 border-t border-white/10 pt-8" title="Explore further — follow the loop" />
        <footer className="mt-8 flex flex-wrap gap-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/from-the-inside"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            From the inside
          </Link>
          <Link
            href="/story"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            My journey
          </Link>
          <Link
            href="/resources"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Resources
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Reach out
          </Link>
          <Link
            href="/#state-choice"
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
          >
            Choose a state
            <ArrowRight className="h-3 w-3" />
          </Link>
        </footer>
      </article>
    </div>
  )
}
