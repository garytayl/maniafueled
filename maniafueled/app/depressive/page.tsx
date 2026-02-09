import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { DepressiveExperience } from "@/components/depressive-experience"

export default function DepressivePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <DepressiveExperience />
      </main>
    </>
  )
}
