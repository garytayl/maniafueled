"use client"

import Link from "next/link"

export type CrossLinkItem = { label: string; href: string }

const DEFAULT_LINKS: CrossLinkItem[] = [
  { label: "From the inside", href: "/from-the-inside" },
  { label: "My journey", href: "/story" },
  { label: "Resonate", href: "/resonate" },
  { label: "Choose a path", href: "/#path-choice" },
  { label: "Baseline", href: "/baseline" },
  { label: "Resources", href: "/resources" },
  { label: "Reach out", href: "/reach-out" },
]

type CrossLinksProps = {
  /** Override the default set (e.g. omit current page). Order preserved. */
  links?: CrossLinkItem[]
  /** Optional title above the links */
  title?: string
  className?: string
}

export function CrossLinks({ links = DEFAULT_LINKS, title = "Explore further", className = "" }: CrossLinksProps) {
  return (
    <nav aria-label="Explore related pages" className={className}>
      <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/40 mb-3 uppercase">
        {title}
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-6">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-mono text-xs tracking-wider text-white/60 hover:text-white transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Links for path pages (Mania / Mixed / Depressive) — each other, baseline, story, resonate, from the inside, reach out */
export const pathPageLinks: CrossLinkItem[] = [
  { label: "Mania", href: "/mania" },
  { label: "Mixed", href: "/mixed" },
  { label: "Depressive", href: "/depressive" },
  { label: "Baseline", href: "/baseline" },
  { label: "From the inside", href: "/from-the-inside" },
  { label: "My journey", href: "/story" },
  { label: "Resonate", href: "/resonate" },
  { label: "Resources", href: "/resources" },
  { label: "Reach out", href: "/reach-out" },
]
