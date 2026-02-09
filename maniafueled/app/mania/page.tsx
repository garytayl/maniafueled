import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { ManiaPathContent } from "@/components/mania-path-content"

export default function ManiaPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <ManiaPathContent />
      </main>
    </>
  )
}
