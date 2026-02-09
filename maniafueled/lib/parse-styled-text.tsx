import React from "react"
import Link from "next/link"

/**
 * Inline formatting for lyrics, verses, and notes. Use in content.ts:
 * - **bold**
 * - *italic*
 * - ~~strikethrough~~
 * - [label](url) for links (internal /path or external https://)
 */
export function parseStyledText(text: string, keyPrefix = "st"): React.ReactNode {
  const segments: React.ReactNode[] = []
  let i = 0
  let keyIndex = 0

  while (i < text.length) {
    // [label](url) link — check before ** so brackets in link text don't break
    if (text[i] === "[") {
      const endBracket = text.indexOf("]", i + 1)
      if (endBracket !== -1 && text[endBracket + 1] === "(") {
        const endParen = text.indexOf(")", endBracket + 2)
        if (endParen !== -1) {
          const label = text.slice(i + 1, endBracket)
          const url = text.slice(endBracket + 2, endParen)
          const isInternal = url.startsWith("/") || url.startsWith("#")
          segments.push(
            isInternal ? (
              <Link
                key={`${keyPrefix}-${keyIndex++}`}
                href={url}
                className="text-amber-200/90 hover:text-amber-200 underline underline-offset-2"
              >
                {label}
              </Link>
            ) : (
              <a
                key={`${keyPrefix}-${keyIndex++}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200/90 hover:text-amber-200 underline underline-offset-2"
              >
                {label}
              </a>
            )
          )
          i = endParen + 1
          continue
        }
      }
    }

    // **bold**
    if (text.slice(i).startsWith("**")) {
      const end = text.indexOf("**", i + 2)
      if (end !== -1) {
        segments.push(
          <strong key={`${keyPrefix}-${keyIndex++}`} className="font-semibold text-inherit">
            {text.slice(i + 2, end)}
          </strong>
        )
        i = end + 2
        continue
      }
    }

    // ~~strikethrough~~
    if (text.slice(i).startsWith("~~")) {
      const end = text.indexOf("~~", i + 2)
      if (end !== -1) {
        segments.push(
          <span key={`${keyPrefix}-${keyIndex++}`} className="line-through opacity-80">
            {text.slice(i + 2, end)}
          </span>
        )
        i = end + 2
        continue
      }
    }

    // *italic* (single * not part of ** or ~~)
    if (
      text[i] === "*" &&
      (i === 0 || text[i - 1] !== "*") &&
      (i === text.length - 1 || text[i + 1] !== "*")
    ) {
      let end = -1
      for (let p = i + 1; p < text.length; p++) {
        if (
          text[p] === "*" &&
          (p === 0 || text[p - 1] !== "*") &&
          (p === text.length - 1 || text[p + 1] !== "*")
        ) {
          end = p
          break
        }
      }
      if (end !== -1) {
        segments.push(
          <em key={`${keyPrefix}-${keyIndex++}`} className="italic">
            {text.slice(i + 1, end)}
          </em>
        )
        i = end + 1
        continue
      }
    }

    // No delimiter: take everything until the next **, ~~, *, or [
    const nextBold = text.indexOf("**", i)
    const nextStrike = text.indexOf("~~", i)
    const nextStar = text.indexOf("*", i)
    const nextBracket = text.indexOf("[", i)

    let next = text.length
    if (nextBold !== -1) next = Math.min(next, nextBold)
    if (nextStrike !== -1) next = Math.min(next, nextStrike)
    if (nextStar !== -1) next = Math.min(next, nextStar)
    if (nextBracket !== -1) next = Math.min(next, nextBracket)

    const plain = text.slice(i, next)
    if (plain) segments.push(plain)
    i = next
  }

  return <>{segments}</>
}
