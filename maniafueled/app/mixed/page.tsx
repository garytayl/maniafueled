import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { MixedExperience } from "@/components/mixed-experience"

export default function MixedPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <MixedExperience />
      </main>
    </>
  )
}
