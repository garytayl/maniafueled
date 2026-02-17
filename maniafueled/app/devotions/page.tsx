import type { Metadata } from "next"
import { DevotionsGate } from "@/components/devotions/devotions-gate"
import { DevotionsProvider } from "@/components/devotions/devotions-context"
import { DevotionsShell } from "@/components/devotions/devotions-shell"
import { EntryStep } from "@/components/devotions/entry-step"
import { MoodStep } from "@/components/devotions/mood-step"
import { VentStep } from "@/components/devotions/vent-step"
import { DayCard } from "@/components/devotions/day-card"
import { PSALMS_COUNT } from "@/lib/devotions"

export const metadata: Metadata = {
  title: "Devotions — One Psalm a day",
  description:
    "Private devotion: refuge flow, mood check, vent, then one Psalm per day with prayer and reflection.",
}

export default function DevotionsPage() {
  const refugeSteps = [
    <EntryStep key="entry" />,
    <MoodStep key="mood" />,
    <VentStep key="vent" />,
  ]
  const dayCards = Array.from({ length: PSALMS_COUNT }, (_, i) => (
    <DayCard key={`psalm-${i}`} psalmIndex={i + 1} />
  ))
  const children = [...refugeSteps, ...dayCards]

  return (
    <DevotionsGate>
      <DevotionsProvider>
        <DevotionsShell>{children}</DevotionsShell>
      </DevotionsProvider>
    </DevotionsGate>
  )
}
