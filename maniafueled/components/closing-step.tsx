"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Share2 } from "lucide-react"
import { siteConfig, closingStep, practicalHelp } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"

export function ClosingStep() {
  const [hoverPrimary, setHoverPrimary] = useState(false)
  const hasEmail = Boolean(siteConfig.contactEmail?.trim())

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: siteConfig.title,
        text: siteConfig.tagline,
        url: shareUrl,
      }).catch(() => {})
    } else {
      void navigator.clipboard?.writeText(shareUrl)
    }
  }

  return (
    <footer id="contact" className="relative flex flex-col min-h-full w-full">
      {/* Main closing content — centered, one screen */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-[var(--navbar-offset)] pb-16 sm:px-6 sm:pt-20 sm:pb-20 md:py-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6"
        >
          {closingStep.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance max-w-2xl mb-6"
        >
          {closingStep.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-base sm:text-lg md:text-xl font-light text-muted-foreground max-w-xl mb-10 sm:mb-14"
        >
          {closingStep.subline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {hasEmail && (
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              data-cursor-hover
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              className="group relative flex items-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-mono text-sm tracking-widest uppercase overflow-hidden bg-white text-[#050505] hover:bg-white/90 transition-colors"
            >
              <span className="relative z-10">{closingStep.ctaPrimary}</span>
              <motion.span
                animate={{ rotate: hoverPrimary ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.span>
            </a>
          )}
          <button
            type="button"
            onClick={handleShare}
            data-cursor-hover
            className="flex items-center gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-mono text-sm tracking-widest uppercase border border-white/30 text-white/90 hover:border-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            {closingStep.ctaShare}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 max-w-xl mx-auto"
        >
          <CrossLinks title="Explore further — follow the loop" />
        </motion.div>

        {/* Practical help — for people who want to support */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-14 sm:mt-16 max-w-2xl mx-auto text-left border-t border-white/10 pt-10"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-3">
            {practicalHelp.title}
          </p>
          <p className="font-sans text-sm text-muted-foreground mb-8">
            {practicalHelp.intro}
          </p>
          <ul className="space-y-8">
            {practicalHelp.items.map((item, i) => (
              <li key={i}>
                <h3 className="font-sans text-base font-medium text-white/95 mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[10px] tracking-widest text-white/30 mt-6">
            {practicalHelp.footnote}
          </p>
        </motion.section>

        {/* Back to start — subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors uppercase py-2 inline-block min-h-[44px] flex items-center justify-center"
          >
            Back to start
          </Link>
        </motion.div>
      </div>

      {/* Crisis resources — clear, calm block */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-4 sm:px-6 py-6 sm:py-8 md:py-10 border-t border-white/10 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase text-center mb-4">
          {closingStep.crisisHeading}
        </p>
        <p className="font-sans text-sm text-muted-foreground text-center mb-5">
          {closingStep.crisisNote}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <a
            href="https://988lifeline.org"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors"
          >
            988 Lifeline
          </a>
          <a
            href="https://www.nami.org"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors"
          >
            NAMI
          </a>
        </div>
        <p className="font-mono text-[10px] tracking-widest text-white/30 text-center mt-6">
          © {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  )
}
