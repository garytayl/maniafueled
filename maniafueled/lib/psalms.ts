import type { Psalm } from "./psalms.types"
import psalmsData from "@/data/psalms.json"

export type { Psalm, PsalmVerse } from "./psalms.types"

export const PSALMS = psalmsData as Psalm[]

export function getPsalm(number: number): Psalm | undefined {
  return PSALMS.find((p) => p.number === number)
}
