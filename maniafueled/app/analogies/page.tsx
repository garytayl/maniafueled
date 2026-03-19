import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { AnalogiesContent } from "@/components/analogies-content"

export default function AnalogiesPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <AnalogiesContent />
      </main>
    </>
  )
}
