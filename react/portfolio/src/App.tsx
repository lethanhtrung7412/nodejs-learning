import { ThemeProvider } from "@/components/theme"
import Header from "./components/nav/header"
import { useEffect, useState } from "react"
import { About } from "@/features/about/index"
import { Hero } from "./features/home/home"
import { Contact } from "./features/contact/contact"
import { Skills } from "./features/skills"

function App() {
  const [activeSection, setActiveSection] = useState("hero")
  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Get viewport height for percentage calculations
      const viewportHeight = window.innerHeight

      // Determine which section is currently most visible in the viewport
      const sections = ["hero", "about", "work", "skills", "contact"]
      let maxVisibleSection = sections[0]
      let maxVisiblePercentage = 0

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()

          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(viewportHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)

          // Calculate what percentage of the viewport this section occupies
          const visiblePercentage = visibleHeight / viewportHeight

          // If this section has more visible area than our current max, update
          if (visiblePercentage > maxVisiblePercentage) {
            maxVisiblePercentage = visiblePercentage
            maxVisibleSection = sectionId
          }
        }
      })

      // Only update state if the active section has changed
      if (maxVisibleSection !== activeSection) {
        setActiveSection(maxVisibleSection)
      }
    }

    // Initial check on mount
    handleScroll()

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="flex-1">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Contact />
      </main>
      </div>
    </ThemeProvider>
  )
}

export default App
