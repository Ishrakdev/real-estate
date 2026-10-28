import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { SplitText } from '../ui/SplitText'
import { properties } from '../../lib/data/properties'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const rootElement = root.current
    if (!rootElement) return

    const context = gsap.context(() => {
      gsap.fromTo('.hero-image', { scale: reducedMotion ? 1 : 1.08 }, {
        scale: 1,
        duration: reducedMotion ? 0.45 : 2.4,
        ease: 'power2.out',
      })
      gsap.fromTo('.hero-kicker, .hero-bottom-bar', { y: 16 }, {
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: reducedMotion ? 0 : 0.35,
        ease: 'power2.out',
      })
      if (!reducedMotion) {
        gsap.to('.hero-image', {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: rootElement, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="hero-section" id="top" ref={root}>
      <div className="hero-image-wrap">
        <img
          className="hero-image"
          src={properties[0].image}
          alt={properties[0].imageAlt}
        />
      </div>
      <div className="hero-vignette" />
      <div className="hero-content">
        <p className="eyebrow hero-kicker"><span className="eyebrow-line" />A MORE PERSONAL KIND OF REAL ESTATE</p>
        <SplitText as="h1" className="hero-title" lines={['A sense of', 'somewhere.']} />
        <p className="hero-intro">Distinctive homes. Thoughtful counsel.<br />A life well placed in San Francisco.</p>
      </div>
      <div className="hero-bottom-bar">
        <a href="#properties" className="hero-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span>Discover a home that feels like yours</span>
          <span aria-hidden="true">↗</span>
        </a>
        <div className="hero-chips" aria-label="Explore by property type">
          {['Estates', 'Penthouses', 'By neighborhood'].map((label, index) => (
            <a href={index === 2 ? '#neighborhoods' : '#properties'} className="hero-chip" key={label}>{label}</a>
          ))}
        </div>
        <a className="hero-scroll" href="#properties"><span>SCROLL TO DISCOVER</span><i /></a>
      </div>
      <span className="hero-coordinate mono">37°47’ N &nbsp; 122°25’ W</span>
    </section>
  )
}
