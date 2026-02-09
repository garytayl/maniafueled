"use client"

import { motion } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"
import { BreathingWave } from "./breathing-wave"
import { hero } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function LandingHero() {
  const scrollToPath = () => {
    const el = document.getElementById("path-choice")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 opacity-[0.18] sm:opacity-25 md:opacity-30">
        <SentientSphere />
      </div>
      <BreathingWave />

      <div className="relative z-10 min-h-screen min-h-[100dvh] flex flex-col justify-center items-center p-5 pt-[var(--navbar-offset)] pb-[max(7.5rem,calc(env(safe-area-inset-bottom)+6rem))] sm:p-8 md:p-12">
        <motion.div
          className="text-center max-w-xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-tight"
          >
            {hero.line}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
            <motion.button
              type="button"
              onClick={scrollToPath}
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 min-h-[48px] border border-white/25 rounded-full font-mono text-sm tracking-widest uppercase bg-transparent backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300"
            >
              {hero.cta}
            </motion.button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-sans text-xs text-white/35 italic"
          >
            By: Gary Taylor
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
