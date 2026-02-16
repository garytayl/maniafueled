/**
 * Client-only devotions auth: PIN hash in localStorage, session in sessionStorage.
 * No server; for private use only.
 */

const PIN_HASH_KEY = "devotions-pin-hash"
const UNLOCKED_KEY = "devotions-unlocked"

export function hasPinSet(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(PIN_HASH_KEY)
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(UNLOCKED_KEY) === "1"
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(pin)
  const buffer = await crypto.subtle.digest("SHA-256", data)
  return toHex(buffer)
}

export async function setPin(pin: string): Promise<void> {
  const h = await hashPin(pin)
  localStorage.setItem(PIN_HASH_KEY, h)
  sessionStorage.setItem(UNLOCKED_KEY, "1")
}

export async function checkPin(pin: string): Promise<boolean> {
  const stored = localStorage.getItem(PIN_HASH_KEY)
  if (!stored) return false
  const h = await hashPin(pin)
  if (h !== stored) return false
  sessionStorage.setItem(UNLOCKED_KEY, "1")
  return true
}

export function lock(): void {
  sessionStorage.removeItem(UNLOCKED_KEY)
}
