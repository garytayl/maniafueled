import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { FromTheInsideContent } from "@/components/from-the-inside-content"

export default function FromTheInsidePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <FromTheInsideContent />
      </main>
    </>
  )
}
