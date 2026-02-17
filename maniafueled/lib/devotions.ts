/**
 * Devotions calendar logic: map date ↔ Psalm index (1–150).
 * Uses day-of-year so each calendar day has one Psalm; cycles through 1–150.
 * Also mood/vent storage keys and helpers (client-only, localStorage).
 */

const PSALMS_COUNT = 150

/** Refuge flow: mood choice for "How are you feeling?" */
export type MoodOption =
  | "mania"
  | "mixed"
  | "depressive"
  | "baseline"
  | "not_sure"

/** YYYY-MM-DD for a date (local time). */
function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

/** localStorage key for mood on a given day. */
export function getMoodStorageKey(date: Date): string {
  return `devotions-mood-${toDateKey(date)}`
}

/** localStorage key for vent text on a given day. */
export function getVentStorageKey(date: Date): string {
  return `devotions-vent-${toDateKey(date)}`
}

/** Read mood for date (client-only). Returns null if none or not in browser. */
export function getMoodForDate(date: Date): MoodOption | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(getMoodStorageKey(date))
    if (!raw) return null
    const v = raw as MoodOption
    if (
      v === "mania" ||
      v === "mixed" ||
      v === "depressive" ||
      v === "baseline" ||
      v === "not_sure"
    )
      return v
    return null
  } catch {
    return null
  }
}

/** Save mood for date (client-only). */
export function setMoodForDate(date: Date, mood: MoodOption): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(getMoodStorageKey(date), mood)
  } catch {
    // ignore
  }
}

/** Read vent text for date (client-only). */
export function getVentForDate(date: Date): string {
  if (typeof window === "undefined") return ""
  try {
    return localStorage.getItem(getVentStorageKey(date)) ?? ""
  } catch {
    return ""
  }
}

/** Save vent text for date (client-only). */
export function setVentForDate(date: Date, text: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(getVentStorageKey(date), text)
  } catch {
    // ignore
  }
}

/** How far back to look for devotion dates (days). */
const JOURNAL_DAYS_BACK = 730

/**
 * All dates that have at least one devotion entry (mood or vent), newest first.
 * Client-only; scans last JOURNAL_DAYS_BACK days.
 */
export function getAllDevotionDates(): string[] {
  if (typeof window === "undefined") return []
  const seen = new Set<string>()
  const today = new Date()
  for (let i = 0; i < JOURNAL_DAYS_BACK; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = toDateKey(d)
    const hasMood = getMoodForDate(d) !== null
    const hasVent = getVentForDate(d).trim() !== ""
    if (hasMood || hasVent) seen.add(key)
  }
  return [...seen].sort((a, b) => b.localeCompare(a))
}

/** Parse YYYY-MM-DD to a Date at local midnight. */
export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

/** Day of year 1–366. */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 864e5
  return Math.floor(diff / oneDay)
}

/**
 * Psalm index 1–150 for a given date. Same date always returns the same Psalm.
 * Day 1 of year → Psalm 1, day 2 → Psalm 2, … day 150 → Psalm 150, day 151 → Psalm 1, etc.
 */
export function getPsalmIndexForDate(date: Date): number {
  const day = getDayOfYear(date)
  const index = ((day - 1) % PSALMS_COUNT) + 1
  return Math.min(Math.max(1, index), PSALMS_COUNT)
}

/**
 * Step index 0–149 for the devotions shell (one step per Psalm).
 */
export function getStepIndexForDate(date: Date): number {
  return getPsalmIndexForDate(date) - 1
}

export function getDateForStep(stepIndex: number): Date {
  const d = new Date()
  const startOfYear = new Date(d.getFullYear(), 0, 1)
  const dayOfYear = (stepIndex % PSALMS_COUNT) + 1
  const date = new Date(startOfYear)
  date.setDate(date.getDate() + dayOfYear - 1)
  return date
}

/** Number of refuge steps before Psalms (Entry, Mood, Vent). */
export const REFUGE_STEPS = 3

/** Shell step index (0–152) for today's Psalm. Steps 0–2 are refuge; 3–152 are Psalm 1–150. */
export function getStepIndexForTodaysPsalm(date: Date): number {
  return REFUGE_STEPS + getStepIndexForDate(date)
}

export { PSALMS_COUNT }
