/**
 * Devotions calendar logic: map date ↔ Psalm index (1–150).
 * Uses day-of-year so each calendar day has one Psalm; cycles through 1–150.
 */

const PSALMS_COUNT = 150

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

export { PSALMS_COUNT }
