import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Baseline } from "@/components/baseline"
import { Experiences } from "@/components/experiences"
import { TechMarquee } from "@/components/tech-marquee"
import { Strengths } from "@/components/strengths"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionBlend />
        <Baseline />
        <Experiences />
        <TechMarquee />
        <Strengths />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
