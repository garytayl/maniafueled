import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { ResonateContent } from "@/components/resonate-content"

export default function ResonatePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <ResonateContent />
      </main>
    </>
  )
}
