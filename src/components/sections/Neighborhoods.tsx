import { useLayoutEffect, useRef } from 'react'
import { neighborhoods } from '../../lib/data/neighborhoods'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

export function Neighborhoods() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const rootElement = root.current
    if (!rootElement) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 768px)', () => {
        if (reducedMotion || !rootElement.isConnected) return
        const slides = gsap.utils.toArray<HTMLElement>('.neighborhood-slide')
        const steps = gsap.utils.toArray<HTMLElement>('.neighborhood-step')
        if (slides.length < 2) return
        gsap.set(slides.slice(1), { autoAlpha: 0 })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootElement,
            start: 'top top',
            end: () => `+=${window.innerHeight * neighborhoods.length}`,
            pin: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        slides.slice(1).forEach((slide, index) => {
          timeline
            .to(steps[index], { opacity: 0.35, duration: 0.1 }, index)
            .to(steps[index + 1], { opacity: 1, duration: 0.1 }, index)
            .fromTo(slide, { autoAlpha: 0, clipPath: 'inset(0 0 0 100%)' }, {
              autoAlpha: 1,
              clipPath: 'inset(0 0 0 0%)',
              duration: 0.6,
            }, index)
            .to(slides[index], { autoAlpha: 0, duration: 0.35 }, index + 0.25)
        })
        return () => timeline.kill()
      })
      return () => media.revert()
    }, rootElement)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="neighborhood-section" id="neighborhoods" ref={root}>
      <div className="neighborhood-intro">
        <p className="eyebrow"><span className="eyebrow-line" />THE CITY, MORE CLOSELY</p>
        <h2>Four ways to<br /><em>feel at home.</em></h2>
        <p className="neighborhood-intro-copy">A home is more than its four walls. It is the morning walk, the familiar corner and the view on your way back.</p>
      </div>
      <div className="neighborhood-story">
        <div className="neighborhood-stage">
          {neighborhoods.map((neighborhood, index) => (
            <article className={`neighborhood-slide ${index === 0 ? 'neighborhood-slide--first' : ''}`} key={neighborhood.name}>
              <img src={neighborhood.image} alt={neighborhood.imageAlt} loading="lazy" />
              <div className="neighborhood-image-shade" />
              <div className="neighborhood-slide-copy">
                <span className="mono">0{index + 1} / 04</span>
                <h3>{neighborhood.name}</h3>
                <p>{neighborhood.blurb}</p>
                <div className="neighborhood-average">
                  <span className="mono">AVG. SALE / SQ FT</span>
                  <strong>{neighborhood.averagePrice}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="neighborhood-steps" aria-label="Neighborhoods">
          {neighborhoods.map((neighborhood, index) => (
            <div className={`neighborhood-step ${index === 0 ? 'neighborhood-step--active' : ''}`} key={neighborhood.name}>
              <span>{neighborhood.number}</span>
              <span className="neighborhood-step-name">{neighborhood.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="neighborhood-mobile-list">
        {neighborhoods.map((neighborhood) => (
          <article className="neighborhood-mobile-card" key={neighborhood.name}>
            <img src={neighborhood.image} alt={neighborhood.imageAlt} loading="lazy" />
            <div>
              <span className="mono">{neighborhood.number} / 04</span>
              <h3>{neighborhood.name}</h3>
              <p>{neighborhood.blurb}</p>
              <strong className="mono">AVG. SALE / SQ FT &nbsp; {neighborhood.averagePrice}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
