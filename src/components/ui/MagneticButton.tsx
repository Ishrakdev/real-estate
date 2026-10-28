import { useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  href: string
  className?: string
  arrow?: boolean
}

export function MagneticButton({ children, href, className = '', arrow = true }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    setOffset({
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
    })
  }

  return (
    <a
      className={`magnetic-button ${className}`}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      ref={ref}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      <span>{children}</span>
      {arrow && <span aria-hidden="true" className="button-arrow">↗</span>}
    </a>
  )
}
