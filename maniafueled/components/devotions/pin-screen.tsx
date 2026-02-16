"use client"

import { useState, useCallback } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { setPin, checkPin, hasPinSet } from "@/lib/devotions-auth"

const PIN_LENGTH = 6

type PinScreenProps = {
  onUnlocked: () => void
}

export function PinScreen({ onUnlocked }: PinScreenProps) {
  const [pin, setPinValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSettingUp, setIsSettingUp] = useState(false)

  const isSetup = typeof window !== "undefined" && hasPinSet()

  const handleSubmit = useCallback(async () => {
    if (pin.length !== PIN_LENGTH) {
      setError("Enter 6 digits")
      return
    }
    setError(null)
    if (isSettingUp || !isSetup) {
      await setPin(pin)
      onUnlocked()
    } else {
      const ok = await checkPin(pin)
      if (ok) onUnlocked()
      else setError("Wrong PIN")
    }
  }, [pin, isSettingUp, isSetup, onUnlocked])

  const handleChange = useCallback((value: string) => {
    setPinValue(value)
    setError(null)
    if (value.length === PIN_LENGTH) {
      if (isSettingUp || !isSetup) {
        setTimeout(() => {
          setPin(value).then(() => onUnlocked())
        }, 100)
      } else {
        setTimeout(() => {
          checkPin(value).then((ok) => (ok ? onUnlocked() : setError("Wrong PIN")))
        }, 100)
      }
    }
  }, [isSettingUp, isSetup, onUnlocked])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050505] px-4">
      <p className="font-mono text-xs tracking-[0.2em] text-white/50 mb-2">
        DEVOTIONS
      </p>
      <h1 className="font-sans text-xl font-light text-white mb-8 text-center">
        {isSettingUp ? "Enter new 6-digit PIN" : isSetup ? "Enter your PIN" : "Set a 6-digit PIN"}
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
          {isSettingUp ? "Set new PIN" : isSetup ? "Unlock" : "Set PIN"}
        </Button>

        {isSetup && (
          <button
            type="button"
            className="font-mono text-[10px] text-white/40 hover:text-white/60 mt-4"
            onClick={() => {
              setIsSettingUp(true)
              setPinValue("")
              setError(null)
            }}
          >
            Set a new PIN instead
          </button>
        )}
      </div>

      {!isSetup && (
        <p className="mt-8 text-center font-mono text-[10px] text-white/40 max-w-xs">
          Your PIN is stored only on this device. It is not sent anywhere.
        </p>
      )}
    </div>
  )
}
