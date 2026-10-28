import { useLayoutEffect, useRef } from 'react'
import { stats } from '../../lib/data/stats'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

export function Stats() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const rootElement = root.current
    if (!rootElement) return

    const context = gsap.context(() => {
      const values = gsap.utils.toArray<HTMLElement>('.stat-value')
      values.forEach((element, index) => {
        const target = stats[index].value
        const trigger = { trigger: rootElement, start: 'top 82%', once: true }
        if (reducedMotion) {
          gsap.fromTo(element, { opacity: 0 }, {
            opacity: 1,
            duration: 0.45,
            scrollTrigger: trigger,
          })
          return
        }

        const counter = { value: 0 }
        gsap.fromTo(counter, { value: 0 }, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: trigger,
          onUpdate: () => { element.textContent = `${Math.round(counter.value).toLocaleString()}${stats[index].suffix}` },
          onComplete: () => { element.textContent = `${target}${stats[index].suffix}` },
        })
      })
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="stats-section" ref={root}>
      <div className="stats-intro">
        <p className="eyebrow"><span className="eyebrow-line" />A PRACTICE BUILT ON TRUST</p>
        <p>Quietly consistent.<br />Carefully considered.</p>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-value">{stat.value}{stat.suffix}</span>
            <span className="stat-label mono">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
