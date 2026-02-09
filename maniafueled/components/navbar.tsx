"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useJourney } from "@/components/journey/journey-context"

const navLinks = [
  { label: "Intro", step: 0 },
  { label: "Baseline", step: 1 },
  { label: "Experiences", step: 2 },
  { label: "Triggers", step: 3 },
  { label: "Strengths", step: 4 },
  { label: "Contact", step: 5 },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { step, goToStep } = useJourney()

  const goTo = (stepIndex: number) => {
    setIsMenuOpen(false)
    goToStep(stepIndex)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/5"
      >
        <nav className="flex items-center justify-between px-6 py-4 my-0 md:px-12 md:py-5">
          {/* Logo — go to intro */}
          <button
            type="button"
            onClick={() => goTo(0)}
            className="group flex items-center gap-2"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">BIPOLAR I</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
          </button>

          {/* Desktop Navigation — jump to step */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => goTo(link.step)}
                  className={`group relative font-mono text-xs tracking-wider transition-colors duration-300 ${
                    step === link.step ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-accent mr-1">{String(link.step + 1).padStart(2, "0")}</span>
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* Status */}
          <div className="hidden md:flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">A PERSONAL STORY</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-px bg-foreground"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => goTo(link.step)}
                  className={`group text-4xl font-sans tracking-tight ${step === link.step ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span className="text-accent font-mono text-sm mr-2">{String(link.step + 1).padStart(2, "0")}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mt-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-mono text-xs tracking-wider text-muted-foreground">A PERSONAL STORY</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
