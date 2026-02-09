import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { ClosingStep } from "@/components/closing-step"

export default function ReachOutPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen bg-[#050505]">
        <ClosingStep />
      </main>
    </>
  )
}
