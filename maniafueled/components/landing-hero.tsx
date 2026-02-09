"use client"

import { motion } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"
import { siteConfig, summaryQuote } from "@/lib/content"

export function LandingHero() {
  const scrollToPath = () => {
    const el = document.getElementById("path-choice")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0">
        <SentientSphere />
      </div>

      <div className="relative z-10 min-h-screen min-h-[100dvh] flex flex-col justify-between p-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4rem))] sm:p-8 md:p-12 md:py-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center md:text-left"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">
            01 — A PERSONAL STORY
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance">
            {siteConfig.title}
            <br />
            <span className="italic">{siteConfig.subtitle}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 max-w-2xl md:max-w-3xl px-4 text-center"
        >
          <blockquote className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90 italic">
            &ldquo;{summaryQuote}&rdquo;
          </blockquote>
          <motion.button
            type="button"
            onClick={scrollToPath}
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 sm:mt-8 px-6 py-3.5 min-h-[48px] min-w-[180px] sm:px-8 sm:py-4 border border-white/20 rounded-full font-mono text-sm tracking-widest uppercase bg-transparent backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-500 inline-flex items-center justify-center"
          >
            Choose a path
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end text-right"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
