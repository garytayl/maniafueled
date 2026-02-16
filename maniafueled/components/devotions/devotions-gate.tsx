"use client"

import { useState, useEffect, type ReactNode } from "react"
import { PinScreen } from "./pin-screen"
import { isUnlocked } from "@/lib/devotions-auth"

type DevotionsGateProps = {
  children: ReactNode
}

export function DevotionsGate({ children }: DevotionsGateProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUnlocked(isUnlocked())
  }, [])

  const handleUnlocked = () => setUnlocked(true)

  if (!mounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050505]">
        <span className="font-mono text-xs tracking-widest text-white/40">
          Loading…
        </span>
      </div>
    )
  }

  if (!unlocked) {
    return <PinScreen onUnlocked={handleUnlocked} />
  }

  return <>{children}</>
}
