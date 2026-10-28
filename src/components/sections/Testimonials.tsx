import { testimonials } from '../../lib/data/testimonials'

export function Testimonials() {
  const firstRow = [...testimonials, ...testimonials]
  const secondRow = [...testimonials].reverse()

  return (
    <section className="testimonials-section">
      <div className="testimonials-heading">
        <p className="eyebrow"><span className="eyebrow-line" />KIND WORDS, KEPT CLOSE</p>
        <h2>Good company<br /><em>speaks for itself.</em></h2>
      </div>
      <div className="testimonial-marquee testimonial-marquee--left">
        <div className="testimonial-track">
          {firstRow.map((testimonial, index) => (
            <article className="testimonial-card" key={`${testimonial.name}-${index}`}>
              <span className="testimonial-quote-mark">“</span>
              <p>“{testimonial.quote}”</p>
              <div><strong>{testimonial.name}</strong><span className="mono">{testimonial.detail}</span></div>
            </article>
          ))}
        </div>
      </div>
      <div className="testimonial-marquee testimonial-marquee--right">
        <div className="testimonial-track">
          {secondRow.map((testimonial, index) => (
            <article className="testimonial-card" key={`${testimonial.name}-reverse-${index}`}>
              <span className="testimonial-quote-mark">“</span>
              <p>“{testimonial.quote}”</p>
              <div><strong>{testimonial.name}</strong><span className="mono">{testimonial.detail}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
