import { LandingHero } from "@/components/landing-hero"
import { PathChoice } from "@/components/path-choice"
import { Baseline } from "@/components/baseline"
import { WaveSection } from "@/components/wave-section"
import { Experiences } from "@/components/experiences"
import { TechMarquee } from "@/components/tech-marquee"
import { Strengths } from "@/components/strengths"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <LandingHero />
        <PathChoice />
        <Baseline />
        <WaveSection />
        <Experiences />
        <TechMarquee />
        <Strengths />
        <Footer />
      </main>
    </>
  )
}
