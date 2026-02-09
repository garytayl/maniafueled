import Link from "next/link"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Baseline } from "@/components/baseline"
import { WaveSection } from "@/components/wave-section"

export default function BaselinePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen bg-[#050505]">
        <div className="pt-[var(--navbar-offset)]">
          <Baseline />
        </div>
        <WaveSection />
        <div className="px-8 md:px-12 pb-24 flex flex-wrap gap-4 justify-center border-t border-white/10 pt-12">
          <Link
            href="/mania"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            The mania side
          </Link>
          <Link
            href="/depressive"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            The depressive side
          </Link>
          <Link
            href="/reach-out"
            className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          >
            Reach out
          </Link>
        </div>
      </main>
    </>
  )
}
