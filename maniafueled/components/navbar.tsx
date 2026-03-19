"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const routeLinks = [
  { label: "Home", href: "/" },
  { label: "Devotions", href: "/devotions" },
  { label: "From the inside", href: "/from-the-inside" },
  { label: "Analogies", href: "/analogies" },
  { label: "Story", href: "/story" },
  { label: "Baseline", href: "/baseline" },
  { label: "Resonate", href: "/resonate" },
  { label: "Resources", href: "/resources" },
  { label: "Reach out", href: "/reach-out" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const body = document.body
    const html = document.documentElement
    const scrollY = window.scrollY
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflowY: body.style.overflowY,
    }
    const previousHtmlOverflow = html.style.overflow

    // iOS-friendly scroll lock: freeze page in place while menu is open.
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflowY = "scroll"
    html.style.overflow = "hidden"

    return () => {
      body.style.position = previousBody.position
      body.style.top = previousBody.top
      body.style.left = previousBody.left
      body.style.right = previousBody.right
      body.style.width = previousBody.width
      body.style.overflowY = previousBody.overflowY
      html.style.overflow = previousHtmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [isMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 pt-[env(safe-area-inset-top)] bg-[#050505] md:bg-background/80 md:backdrop-blur-md"
      >
        <nav className="flex items-center justify-between min-h-[3.25rem] px-4 py-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-6 sm:py-4 md:px-12 md:py-5">
          <Link href="/" className="group flex items-center gap-2" aria-label="Home">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">BIPOLAR I</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {routeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative font-mono text-xs tracking-wider transition-colors duration-300 ${
                    pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">A PERSONAL STORY</span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative -mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-foreground/90 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav-menu"
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div
              id="mobile-nav-menu"
              className="h-full overflow-y-auto overscroll-contain pt-[calc(var(--navbar-offset)+1rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            >
              <nav className="mx-auto flex w-full max-w-lg flex-col gap-2 px-6">
                {routeLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block min-h-[56px] rounded-lg px-4 py-3 text-left text-3xl font-sans tracking-tight transition-colors sm:text-4xl ${
                        pathname === link.href
                          ? "bg-white/5 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 flex items-center gap-3 px-4 pb-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground">A PERSONAL STORY</span>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
