"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { catalogResources, type CatalogResource } from "@/lib/content"
import { CrossLinks } from "@/components/cross-links"

const typeLabels: Record<CatalogResource["type"], string> = {
  article: "Article",
  research: "Research",
  insight: "Insight",
}

function FadeBlock({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15, once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ResourcesCatalog() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 pt-[var(--navbar-offset)] pb-24">
        <header className="py-16 md:py-24">
          <p className="font-mono text-xs tracking-[0.3em] text-white/40 mb-4 uppercase">
            A catalog
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Resources
          </h1>
          <p className="font-sans text-lg text-white/70 font-light leading-relaxed">
            Articles, research, and insights I&apos;ve found helpful. A library to dig into — and sometimes a deeper breakdown when a paper is too dense.
          </p>
        </header>

        <ul className="space-y-10 md:space-y-12">
          {catalogResources.map((resource, i) => (
            <FadeBlock key={resource.slug}>
              <li className="group border-b border-white/10 pb-10 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                    {typeLabels[resource.type]}
                  </span>
                  {resource.date && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="font-mono text-[10px] tracking-wider text-white/40">
                        {resource.date}
                      </span>
                    </>
                  )}
                  <span className="text-white/30">·</span>
                  <span className="font-mono text-[10px] tracking-wider text-white/50">
                    {resource.source}
                  </span>
                </div>
                <h2 className="font-sans text-xl sm:text-2xl font-light text-white mb-3">
                  {resource.title}
                </h2>
                <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed mb-4">
                  {resource.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                  >
                    Read
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  {resource.hasDetailPage && (
                    <Link
                      href={`/resources/${resource.slug}`}
                      className="font-mono text-xs tracking-widest uppercase text-amber-200/90 hover:text-amber-200 transition-colors"
                    >
                      Deep dive
                    </Link>
                  )}
                </div>
              </li>
            </FadeBlock>
          ))}
        </ul>

        <FadeBlock className="mt-16 pt-10 border-t border-white/10">
          <CrossLinks className="mt-0" title="Explore further — follow the loop" />
        </FadeBlock>
      </article>
    </div>
  )
}
