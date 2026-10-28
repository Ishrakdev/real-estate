import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

type SplitTextProps = {
  lines: string[]
  as?: 'h1' | 'h2' | 'p'
  className?: string
  children?: ReactNode
}

export function SplitText({ lines, as = 'h2', className = '' }: SplitTextProps) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const Tag = as

  useLayoutEffect(() => {
    const rootElement = root.current
    if (!rootElement) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '.split-line',
        { clipPath: reducedMotion ? 'inset(0)' : 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0)',
          immediateRender: false,
          duration: reducedMotion ? 0.45 : 1,
          stagger: reducedMotion ? 0.08 : 0.12,
          ease: 'power3.out',
          scrollTrigger: reducedMotion ? undefined : { trigger: rootElement, start: 'top 82%' },
        },
      )
      gsap.fromTo(
        '.split-line-inner',
        { yPercent: reducedMotion ? 0 : 34, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          immediateRender: false,
          duration: reducedMotion ? 0.45 : 1,
          stagger: reducedMotion ? 0.08 : 0.12,
          ease: 'power3.out',
          scrollTrigger: reducedMotion ? undefined : { trigger: rootElement, start: 'top 82%' },
        },
      )
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion, lines])

  return (
    <Tag ref={root as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={className}>
      {lines.map((line) => (
        <span className="split-line" key={line}>
          <span className="split-line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}
