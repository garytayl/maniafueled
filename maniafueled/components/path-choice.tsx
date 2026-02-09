"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { pathChoice } from "@/lib/content"
import { ArrowRight, ArrowLeft, ArrowDown } from "lucide-react"

export function PathChoice() {
  return (
    <section id="state-choice" className="relative flex flex-col w-full pb-24 md:pb-0" aria-label="Choose a state">
      {/* Intro: prompt to choose a state for a glimpse */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0a0a0a] border-b border-white/10 py-6 sm:py-8 px-4 sm:px-8 md:px-12 text-center"
      >
        <p className="font-sans text-sm sm:text-base text-white/80 font-light max-w-xl mx-auto">
          {pathChoice.intro}
        </p>
      </motion.div>

      <div className="relative flex flex-col md:flex-row flex-1 min-h-[calc(100vh-8rem)] md:min-h-screen pb-12 sm:pb-16 md:pb-0">
      {/* Left — MANIA (white) */}
      <Link
        href="/mania"
        className="relative flex-1 flex flex-col items-center justify-center min-h-[33vh] min-h-[33dvh] md:min-h-screen bg-white text-[#0a0a0a] group overflow-hidden py-10 px-4 sm:py-12 sm:px-6"
        data-cursor-hover
      >
        <motion.div
          className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          aria-hidden
        />
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0a0a0a]/60 mb-4"
        >
          {pathChoice.prompt}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tight"
        >
          {pathChoice.mania.label}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-3 font-sans text-xs md:text-sm font-light text-[#0a0a0a]/70 max-w-xs text-center px-4"
        >
          {pathChoice.mania.description}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] group-hover:gap-3 transition-all"
        >
          Enter
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </Link>

      <div className="hidden md:block w-px bg-[#0a0a0a]/20 shrink-0 z-10" aria-hidden />
      <div className="md:hidden w-full h-px bg-amber-500/30 shrink-0" aria-hidden />

      {/* Center — MIXED (amber-tinted dark, highest risk) */}
      <Link
        href="/mixed"
        className="relative flex-1 flex flex-col items-center justify-center min-h-[33vh] min-h-[33dvh] md:min-h-screen bg-[#1a1410] text-amber-100 group overflow-hidden py-10 px-4 sm:py-12 sm:px-6 border-y md:border-y-0 md:border-x border-amber-500/20"
        data-cursor-hover
      >
        <motion.div
          className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden
        />
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-200/60 mb-4"
        >
          {pathChoice.prompt}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-amber-50"
        >
          {pathChoice.mixed.label}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-3 font-sans text-xs md:text-sm font-light text-amber-200/80 max-w-xs text-center px-4"
        >
          {pathChoice.mixed.description}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-amber-200/50 group-hover:text-amber-200 group-hover:gap-3 transition-all"
        >
          Enter
          <ArrowDown className="w-4 h-4 md:hidden" />
          <ArrowRight className="w-4 h-4 hidden md:block" />
        </motion.span>
      </Link>

      <div className="hidden md:block w-px bg-white/20 shrink-0 z-10" aria-hidden />
      <div className="md:hidden w-full h-px bg-white/20 shrink-0" aria-hidden />

      {/* Right — DEPRESSIVE (black) */}
      <Link
        href="/depressive"
        className="relative flex-1 flex flex-col items-center justify-center min-h-[33vh] min-h-[33dvh] md:min-h-screen bg-[#050505] text-white group overflow-hidden py-10 px-4 sm:py-12 sm:px-6"
        data-cursor-hover
      >
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          aria-hidden
        />
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4"
        >
          {pathChoice.prompt}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
        >
          {pathChoice.depressive.label}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-3 font-sans text-xs md:text-sm font-light text-white/70 max-w-xs text-center px-4"
        >
          {pathChoice.depressive.description}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/50 group-hover:text-white group-hover:gap-3 transition-all"
        >
          Enter
          <ArrowLeft className="w-4 h-4" />
        </motion.span>
      </Link>

      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0f0f0f] border-t border-white/10 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 px-4 sm:px-6">
        <div className="flex justify-center md:justify-start md:pl-12 md:pr-0">
          <Link
            href="/baseline"
            className="font-mono text-[11px] sm:text-[10px] tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase py-3 min-h-[44px] flex items-center"
          >
            {pathChoice.baselineLink}
          </Link>
        </div>
        <div className="flex justify-center md:justify-end md:pl-0 md:pr-12">
          <Link
            href="/story"
            className="font-mono text-[11px] sm:text-[10px] tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase py-3 min-h-[44px] flex items-center"
          >
            {pathChoice.fullStoryLink}
          </Link>
        </div>
      </div>
    </section>
  )
}
