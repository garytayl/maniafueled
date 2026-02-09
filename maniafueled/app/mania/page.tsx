import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { InteractivePathExperience } from "@/components/interactive-path-experience"

export default function ManiaPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <InteractivePathExperience variant="mania" />
      </main>
    </>
  )
}
