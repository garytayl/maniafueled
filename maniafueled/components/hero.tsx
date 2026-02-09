"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"
import { siteConfig, summaryQuote } from "@/lib/content"
import { useJourney } from "@/components/journey/journey-context"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { next } = useJourney()

  return (
    <section ref={containerRef} className="relative h-full min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0">
        <SentientSphere />
      </div>

      {/* Typography Overlay */}
      <div className="relative z-10 h-full min-h-screen flex flex-col justify-between pt-[var(--navbar-offset)] p-8 md:p-12 md:px-12 md:py-20 pb-28">
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center md:text-left"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">
            01 — A PERSONAL STORY
          </p>
          <h1 className="font-sans text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance leading-tight">
            {siteConfig.title}
            <br />
            <span className="italic">{siteConfig.subtitle}</span>
          </h1>
        </motion.div>

        {/* Center — Summary Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 max-w-2xl md:max-w-3xl px-4 text-center"
        >
          <blockquote className="font-sans text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90 italic">
            &ldquo;{summaryQuote}&rdquo;
          </blockquote>
          <motion.button
            onClick={next}
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 border border-white/20 rounded-full font-mono text-sm tracking-widest uppercase bg-transparent backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-500"
          >
            Begin
          </motion.button>
        </motion.div>

        {/* Bottom — Tagline + keyboard hint */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end text-right"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/30 mt-2">
            Use arrow keys or the nav below to move through the story
          </p>
        </motion.div>
      </div>
    </section>
  )
}
