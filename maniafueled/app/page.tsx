import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Baseline } from "@/components/baseline"
import { Experiences } from "@/components/experiences"
import { TechMarquee } from "@/components/tech-marquee"
import { Strengths } from "@/components/strengths"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { JourneyProvider } from "@/components/journey/journey-context"
import { JourneyShell } from "@/components/journey/journey-shell"
import { StepPanel } from "@/components/journey/step-panel"

function StepHero() {
  return <Hero />
}

function StepBaseline() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-8 md:px-12 pt-24 md:pt-32">
        <Baseline />
      </div>
    </StepPanel>
  )
}

function StepExperiences() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-8 md:px-12 pt-24 md:pt-32">
        <Experiences />
      </div>
    </StepPanel>
  )
}

function StepTriggers() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-8 md:px-12 pt-24 md:pt-32">
        <TechMarquee />
      </div>
    </StepPanel>
  )
}

function StepStrengths() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-8 md:px-12 pt-24 md:pt-32">
        <Strengths />
      </div>
    </StepPanel>
  )
}

function StepFooter() {
  return (
    <StepPanel fullHeight className="pb-24">
      <Footer />
    </StepPanel>
  )
}

const steps = [
  <StepHero key="hero" />,
  <StepBaseline key="baseline" />,
  <StepExperiences key="experiences" />,
  <StepTriggers key="triggers" />,
  <StepStrengths key="strengths" />,
  <StepFooter key="footer" />,
]

export default function Home() {
  return (
    <JourneyProvider>
      <CustomCursor />
      <Navbar />
      <JourneyShell>{steps}</JourneyShell>
    </JourneyProvider>
  )
}
