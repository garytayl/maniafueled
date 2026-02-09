"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { useJourney } from "./journey-context"
import { ChevronDown } from "lucide-react"

type StepPanelProps = {
  children: ReactNode
  /** Show a "Continue" button at the bottom */
  showContinue?: boolean
  /** Full height (100vh) or allow content to define height */
  fullHeight?: boolean
  /** Optional class for the inner content area */
  className?: string
}

export function StepPanel({
  children,
  showContinue = false,
  fullHeight = false,
  className = "",
}: StepPanelProps) {
  const { next, canGoNext } = useJourney()

  return (
    <div
      className={`w-full ${fullHeight ? "min-h-[100vh]" : "min-h-[100vh]"} flex flex-col ${className}`}
    >
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
      {showContinue && canGoNext && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pb-6 pt-4"
        >
          <motion.button
            type="button"
            onClick={next}
            data-cursor-hover
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-center gap-2 font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            <span className="uppercase">Continue</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
