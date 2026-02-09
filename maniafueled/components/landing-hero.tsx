"use client"

import { motion } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"
import { BreathingWave } from "./breathing-wave"
import { siteConfig, summaryQuote } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

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
      <BreathingWave />

      <div className="relative z-10 min-h-screen min-h-[100dvh] flex flex-col justify-between p-5 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[max(6rem,calc(env(safe-area-inset-bottom)+4rem))] sm:p-8 md:p-12 md:py-20 md:pb-28">
        {/* Top — staggered line reveal */}
        <motion.div
          className="text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2"
          >
            01 — A PERSONAL STORY
          </motion.p>
          <motion.h1
            className="font-sans text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-balance"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span variants={fadeUp} className="block">
              {siteConfig.title}
            </motion.span>
            <motion.span variants={fadeUp} className="block italic mt-1">
              {siteConfig.subtitle}
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Center — quote and CTA with staggered reveal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 max-w-2xl md:max-w-3xl px-4 text-center w-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.4,
              },
            },
          }}
        >
          <motion.blockquote
            variants={fadeUp}
            className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/90 italic"
          >
            &ldquo;{summaryQuote}&rdquo;
          </motion.blockquote>
          <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
            <motion.button
              type="button"
              onClick={scrollToPath}
              data-cursor-hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3.5 min-h-[48px] min-w-[180px] sm:px-8 sm:py-4 border border-white/20 rounded-full font-mono text-sm tracking-widest uppercase bg-transparent backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-500 inline-flex items-center justify-center"
            >
              Choose a path
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom — tagline */}
        <motion.div
          className="self-end text-right"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
