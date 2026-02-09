import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { InteractivePathExperience } from "@/components/interactive-path-experience"

export default function DepressivePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <InteractivePathExperience variant="depressive" />
      </main>
    </>
  )
}
