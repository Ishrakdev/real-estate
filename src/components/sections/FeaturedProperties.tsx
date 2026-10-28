import { useLayoutEffect, useRef } from 'react'
import { properties } from '../../lib/data/properties'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { PropertyCard } from '../ui/PropertyCard'

export function FeaturedProperties() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const rootElement = root.current
    const trackElement = track.current
    if (!rootElement || !trackElement) return

    const context = gsap.context(() => {
      gsap.fromTo('.featured-heading > *', { opacity: 0, y: 22 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: { trigger: rootElement, start: 'top 75%' },
      })

      const media = gsap.matchMedia()
      media.add('(min-width: 768px)', () => {
        if (reducedMotion || !trackElement.isConnected || !rootElement.isConnected) return
        const distance = () => Math.max(0, trackElement.scrollWidth - window.innerWidth + 80)
        const scrollRange = () => distance() + window.innerHeight
        gsap.to(trackElement, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootElement,
            start: 'top top',
            end: () => `+=${scrollRange()}`,
            pin: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        gsap.to('.featured-progress-track span', {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: rootElement,
            start: 'top top',
            end: () => `+=${scrollRange()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })
      return () => media.revert()
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="featured-section" id="properties" ref={root}>
      <div className="featured-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />A SELECT FEW</p>
          <h2>Homes with a<br /><em>point of view.</em></h2>
        </div>
        <p className="section-aside">A considered collection of San Francisco’s most exceptional homes, chosen for their character as much as their address.</p>
      </div>
      <div className="featured-track-viewport">
        <div className="featured-track" ref={track}>
          {properties.map((property, index) => <PropertyCard key={property.id} property={property} index={index} featured />)}
          <a className="featured-end-card" href="#contact">
            <span className="eyebrow">THE RIGHT HOME IS PERSONAL</span>
            <span className="featured-end-title">Let’s find<br /><em>your place.</em></span>
            <span className="featured-end-link">Speak with our team <b aria-hidden="true">↗</b></span>
          </a>
        </div>
      </div>
      <div className="featured-progress">
        <span className="mono">THE COLLECTION</span>
        <div className="featured-progress-track"><span /></div>
        <span className="mono">{String(properties.length).padStart(2, '0')} RESIDENCES</span>
      </div>
    </section>
  )
}
