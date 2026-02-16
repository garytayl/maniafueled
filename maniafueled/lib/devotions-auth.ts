/**
 * Client-only devotions auth: single hard-coded PIN, session in sessionStorage.
 * No server; for private use only.
 */

const UNLOCKED_KEY = "devotions-unlocked"

/** Hard-coded PIN; no way to set or change it. */
const DEVOTIONS_PIN = "202001"

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(UNLOCKED_KEY) === "1"
}

export function checkPin(pin: string): Promise<boolean> {
  if (pin !== DEVOTIONS_PIN) return Promise.resolve(false)
  if (typeof window !== "undefined") sessionStorage.setItem(UNLOCKED_KEY, "1")
  return Promise.resolve(true)
}

export function lock(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(UNLOCKED_KEY)
}
