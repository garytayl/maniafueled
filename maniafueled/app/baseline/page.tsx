import Link from "next/link"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Baseline } from "@/components/baseline"
import { WaveSection } from "@/components/wave-section"
import { CrossLinks, pathPageLinks } from "@/components/cross-links"

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
        <div className="px-8 md:px-12 pb-24 border-t border-white/10 pt-12">
          <CrossLinks links={pathPageLinks} className="mb-8" title="Explore further — follow the loop" />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/mania" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">The mania side</Link>
            <Link href="/mixed" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Mixed</Link>
            <Link href="/depressive" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">The depressive side</Link>
            <Link href="/from-the-inside" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">From the inside</Link>
            <Link href="/resonate" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Resonate</Link>
            <Link href="/story" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">My journey</Link>
            <Link href="/reach-out" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">Reach out</Link>
          </div>
        </div>
      </main>
    </>
  )
}
