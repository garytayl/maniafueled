import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { ResourcesCatalog } from "@/components/resources-catalog"

export default function ResourcesPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <ResourcesCatalog />
      </main>
    </>
  )
}
