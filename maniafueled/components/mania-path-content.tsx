"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { maniaSymptoms, earlyWarningSigns, triggers } from "@/lib/content"

function SymptomList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4 list-disc text-muted-foreground font-sans font-light">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function ManiaPathContent() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#050505] text-white">
      <div className="px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-20 sm:pb-24 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2"
        >
          PATH — MANIA
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-3xl sm:text-4xl md:text-5xl font-light italic mb-12 sm:mb-16"
        >
          The elevated side
        </motion.h1>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-sans text-2xl font-light mb-6">What it feels like</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cognitive" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Cognitive
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.cognitive} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="emotional" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Emotional
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.emotional} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="behavioral" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Behavioral
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.behavioral} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="physiological" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Physiological
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.physiological} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-sans text-2xl font-light mb-4">Early warning signs</h2>
          <p className="text-muted-foreground font-sans font-light mb-6">
            Signs that elevation may be building.
          </p>
          <ul className="flex flex-wrap gap-3">
            {earlyWarningSigns.map((sign, i) => (
              <li
                key={i}
                className="font-mono text-sm tracking-wider px-4 py-2 rounded-full border border-white/20 text-white/90"
              >
                {sign}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-sans text-2xl font-light mb-4">Triggers</h2>
          <p className="text-muted-foreground font-sans font-light mb-6">
            Factors that can push toward elevation or instability.
          </p>
          <ul className="flex flex-wrap gap-3">
            {triggers.map((t, i) => (
              <li
                key={i}
                className="font-mono text-sm tracking-wider px-4 py-2 rounded-full border border-white/20 text-white/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 pt-8 border-t border-white/10"
        >
          <Link
            href="/baseline"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            Explore baseline
          </Link>
          <Link
            href="/depressive"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            The depressive side
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            Reach out
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
