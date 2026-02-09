"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  maniaSymptoms,
  depressionSymptoms,
  suicidalIdeationContent,
  crossCuttingStruggles,
} from "@/lib/content"

function SymptomList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4 list-disc text-muted-foreground font-sans font-light">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function Experiences() {
  return (
    <section id="experiences" className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          03 — EXPERIENCES
        </p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">
          The swing — mania, depression, and what runs through both
        </h2>
      </motion.div>

      <div className="space-y-20">
        {/* Mania-Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <h3 className="font-sans text-2xl md:text-4xl font-light mb-8">Mania / Hypomanic Side</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="mania-cognitive" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Cognitive
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.cognitive} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mania-emotional" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Emotional
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.emotional} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mania-behavioral" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Behavioral
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.behavioral} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mania-physiological" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Physiological
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={maniaSymptoms.physiological} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Depression-Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <h3 className="font-sans text-2xl md:text-4xl font-light mb-8">Depressive Side</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="dep-cognitive" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Cognitive
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={depressionSymptoms.cognitive} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dep-emotional" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Emotional
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={depressionSymptoms.emotional} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dep-behavioral" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Behavioral
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={depressionSymptoms.behavioral} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dep-physiological" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Physiological
              </AccordionTrigger>
              <AccordionContent>
                <SymptomList items={depressionSymptoms.physiological} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dep-ideation" className="border-white/10">
              <AccordionTrigger className="font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground py-6">
                Suicidal ideation
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 mb-4">
                  <p className="font-mono text-xs text-amber-200/90">
                    {suicidalIdeationContent.warning}
                  </p>
                </div>
                <SymptomList items={suicidalIdeationContent.points} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Cross-Cutting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <h3 className="font-sans text-2xl md:text-4xl font-light mb-8">Cross-Cutting Struggles</h3>
          <p className="text-muted-foreground mb-8 font-sans font-light">
            Present across states — the themes that run through both elevation and depletion.
          </p>
          <div className="space-y-8">
            {crossCuttingStruggles.map((struggle, i) => (
              <div key={i} className="border-l border-white/20 pl-6">
                <h4 className="font-mono text-sm tracking-wider text-foreground mb-2">
                  {struggle.title}
                </h4>
                <ul className="space-y-1 list-disc list-inside text-muted-foreground font-sans font-light text-sm">
                  {struggle.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10 mt-16" />
    </section>
  )
}
