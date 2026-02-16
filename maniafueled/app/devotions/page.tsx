import type { Metadata } from "next"
import { DevotionsGate } from "@/components/devotions/devotions-gate"
import { DevotionsProvider } from "@/components/devotions/devotions-context"
import { DevotionsShell } from "@/components/devotions/devotions-shell"
import { DayCard } from "@/components/devotions/day-card"
import { PSALMS_COUNT } from "@/lib/devotions"

export const metadata: Metadata = {
  title: "Devotions — One Psalm a day",
  description: "Private devotion: one Psalm per day with prayer and reflection.",
}

export default function DevotionsPage() {
  const cards = Array.from({ length: PSALMS_COUNT }, (_, i) => (
    <DayCard key={i} psalmIndex={i + 1} />
  ))

  return (
    <DevotionsGate>
      <DevotionsProvider>
        <DevotionsShell>{cards}</DevotionsShell>
      </DevotionsProvider>
    </DevotionsGate>
  )
}
