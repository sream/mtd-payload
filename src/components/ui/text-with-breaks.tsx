import * as React from 'react'

type BreakPoint = 'mobile' | 'desktop'

const matcher = /\[\[br(?::(mobile|desktop))?\]\]/g

function brClass(breakpoint: BreakPoint) {
  switch (breakpoint) {
    case 'mobile':
      return 'md:hidden'
    case 'desktop':
      return 'hidden lg:block'
  }
}

export function TextWithBreaks({ text }: { text: string }) {
  if (!text) return

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let index = 0

  for (const match of text.matchAll(matcher)) {
    const matchIndex = match.index ?? 0
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex))
    }

    const breakpoint = match[1] as BreakPoint
    nodes.push(<br key={`br-${index++}`} className={brClass(breakpoint)} />)

    lastIndex = matchIndex + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <>{nodes}</>
}
