import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Baseline } from "@/components/baseline"
import { WaveSection } from "@/components/wave-section"
import { Experiences } from "@/components/experiences"
import { TechMarquee } from "@/components/tech-marquee"
import { Strengths } from "@/components/strengths"
import { ClosingStep } from "@/components/closing-step"
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
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] md:pt-32">
        <Baseline />
      </div>
    </StepPanel>
  )
}

function StepWave() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="pt-[var(--navbar-offset)]">
        <WaveSection />
      </div>
    </StepPanel>
  )
}

function StepExperiences() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] md:pt-32">
        <Experiences />
      </div>
    </StepPanel>
  )
}

function StepTriggers() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] md:pt-32">
        <TechMarquee />
      </div>
    </StepPanel>
  )
}

function StepStrengths() {
  return (
    <StepPanel showContinue fullHeight className="pb-24">
      <div className="px-4 sm:px-8 md:px-12 pt-[var(--navbar-offset)] md:pt-32">
        <Strengths />
      </div>
    </StepPanel>
  )
}

function StepClosing() {
  return (
    <StepPanel fullHeight className="pb-24">
      <ClosingStep />
    </StepPanel>
  )
}

const steps = [
  <StepHero key="hero" />,
  <StepBaseline key="baseline" />,
  <StepWave key="wave" />,
  <StepExperiences key="experiences" />,
  <StepTriggers key="triggers" />,
  <StepStrengths key="strengths" />,
  <StepClosing key="closing" />,
]

export default function StoryPage() {
  return (
    <JourneyProvider>
      <CustomCursor />
      <Navbar />
      <JourneyShell>{steps}</JourneyShell>
    </JourneyProvider>
  )
}
