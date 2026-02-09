import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { DepressivePathContent } from "@/components/depressive-path-content"

export default function DepressivePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <DepressivePathContent />
      </main>
    </>
  )
}
