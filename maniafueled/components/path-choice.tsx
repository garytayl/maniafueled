"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { pathChoice } from "@/lib/content"
import { ArrowRight, ArrowLeft } from "lucide-react"

export function PathChoice() {
  return (
    <section id="path-choice" className="relative flex flex-col md:flex-row min-h-screen w-full" aria-label="Choose a path">
      {/* Left — MANIA (white) */}
      <Link
        href="/mania"
        className="relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen bg-white text-[#0a0a0a] group overflow-hidden"
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
          className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight"
        >
          {pathChoice.mania.label}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 font-sans text-sm md:text-base font-light text-[#0a0a0a]/70 max-w-xs text-center px-4"
        >
          {pathChoice.mania.description}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] group-hover:gap-3 transition-all"
        >
          Enter
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </Link>

      {/* Divider — vertical line */}
      <div
        className="hidden md:block w-px bg-[#0a0a0a]/20 shrink-0 z-10"
        aria-hidden
      />
      <div className="md:hidden w-full h-px bg-[#0a0a0a]/20 shrink-0" aria-hidden />

      {/* Right — DEPRESSIVE (black) */}
      <Link
        href="/depressive"
        className="relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen bg-[#050505] text-white group overflow-hidden"
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
          className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight"
        >
          {pathChoice.depressive.label}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 font-sans text-sm md:text-base font-light text-white/70 max-w-xs text-center px-4"
        >
          {pathChoice.depressive.description}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/50 group-hover:text-white group-hover:gap-3 transition-all"
        >
          Enter
          <ArrowLeft className="w-4 h-4" />
        </motion.span>
      </Link>

      {/* Bottom bar: neutral background so links are readable on both white & black halves */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0f0f0f] border-t border-white/10 py-4 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <Link
            href="/baseline"
            className="font-mono text-[10px] tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase"
          >
            {pathChoice.baselineLink}
          </Link>
          <span className="text-white/30 hidden sm:inline" aria-hidden>·</span>
          <Link
            href="/story"
            className="font-mono text-[10px] tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase"
          >
            {pathChoice.fullStoryLink}
          </Link>
        </div>
      </div>
    </section>
  )
}
