"use client"

import { useState, useCallback } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { checkPin } from "@/lib/devotions-auth"

const PIN_LENGTH = 6

type PinScreenProps = {
  onUnlocked: () => void
}

export function PinScreen({ onUnlocked }: PinScreenProps) {
  const [pin, setPinValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    if (pin.length !== PIN_LENGTH) {
      setError("Enter 6 digits")
      return
    }
    setError(null)
    const ok = await checkPin(pin)
    if (ok) onUnlocked()
    else setError("Wrong PIN")
  }, [pin, onUnlocked])

  const handleChange = useCallback(
    (value: string) => {
      setPinValue(value)
      setError(null)
      if (value.length === PIN_LENGTH) {
        setTimeout(() => {
          checkPin(value).then((ok) => (ok ? onUnlocked() : setError("Wrong PIN")))
        }, 100)
      }
    },
    [onUnlocked]
  )

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] px-4">
      <p className="font-mono text-xs tracking-[0.2em] text-white/50 mb-2">
        DEVOTIONS
      </p>
      <h1 className="font-sans text-xl font-light text-white mb-8 text-center">
        Enter your PIN
      </h1>

      <div className="flex flex-col items-center gap-4">
        <InputOTP
          maxLength={PIN_LENGTH}
          value={pin}
          onChange={handleChange}
          containerClassName="gap-1"
        >
          <InputOTPGroup className="bg-white/5 border border-white/10 rounded-lg p-2">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="border-white/20 text-white text-lg w-10 h-12 rounded"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <p className="font-mono text-xs text-red-400/90" role="alert">
            {error}
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="mt-2 border-white/20 text-white hover:bg-white/10"
          onClick={handleSubmit}
          disabled={pin.length !== PIN_LENGTH}
        >
          Unlock
        </Button>
      </div>
    </div>
  )
}
