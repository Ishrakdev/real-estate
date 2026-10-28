import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { SplitText } from '../ui/SplitText'

export function AgentBio() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const rootElement = root.current
    if (!rootElement) return

    const context = gsap.context(() => {
      gsap.fromTo('.agent-portrait', { y: reducedMotion ? 0 : 34, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: reducedMotion ? 0.45 : 1,
        scrollTrigger: reducedMotion ? undefined : { trigger: rootElement, start: 'top 72%' },
      })
      if (!reducedMotion) {
        gsap.to('.agent-portrait img', {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: rootElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="agent-section" id="about" ref={root}>
      <div className="agent-portrait">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1300&q=85"
          alt="Quiet, refined luxury interior with sculptural architectural details"
          loading="lazy"
        />
        <span className="agent-image-caption mono">SAN FRANCISCO, ALWAYS</span>
        <div className="agent-image-label"><span>A</span><small>PERSONAL<br />BY DESIGN</small></div>
      </div>
      <div className="agent-copy">
        <p className="eyebrow"><span className="eyebrow-line" />A DIFFERENT PERSPECTIVE</p>
        <SplitText className="agent-title" lines={['Good advice', 'feels personal.']} />
        <p className="agent-description">I’m Alexandra Aurelia. For nearly two decades, I’ve helped people find their place in San Francisco—not simply the right property, but the right next chapter.</p>
        <p className="agent-description agent-description-secondary">My practice is intentionally small. That means considered advice, honest perspective and an advocate who knows these streets as well as she knows the market.</p>
        <div className="agent-signature">Alexandra Aurelia</div>
        <div className="agent-credentials mono">
          <span>FOUNDER &amp; PRINCIPAL BROKER</span>
          <span>CA DRE #01928471</span>
          <span>SOTHEBY’S INTERNATIONAL REALTY®</span>
        </div>
        <a className="text-link" href="#contact">A little more about Alexandra <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
