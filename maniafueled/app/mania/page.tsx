import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { ManiaExperience } from "@/components/mania-experience"

export default function ManiaPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <ManiaExperience />
      </main>
    </>
  )
}
