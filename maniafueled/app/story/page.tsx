import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { StoryJourney } from "@/components/story-journey"

export default function StoryPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <StoryJourney />
      </main>
    </>
  )
}
