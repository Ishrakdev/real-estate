import { useEffect, useState } from 'react'

function sanFranciscoTime() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(new Date())
}

type FooterProps = {
  onOpenChat: () => void
}

export function Footer({ onOpenChat }: FooterProps) {
  const [time, setTime] = useState(sanFranciscoTime)

  useEffect(() => {
    const interval = window.setInterval(() => setTime(sanFranciscoTime()), 1_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <a className="wordmark footer-wordmark" href="#top" aria-label="Aurelia Homes home">
          <span className="wordmark-mark">A</span>
          <span>AURELIA <small>HOMES</small></span>
        </a>
        <a className="back-to-top" href="#top">
          <span>BACK TO TOP</span>
          <span className="back-to-top-arrow" aria-hidden="true">↑</span>
        </a>
      </div>

      <div className="footer-hero">
        <p className="eyebrow"><span className="eyebrow-line" />A MORE PERSONAL KIND OF REAL ESTATE</p>
        <h2>Let’s find<br /><em>your home.</em></h2>
        <button className="footer-conversation" onClick={onOpenChat} type="button">
          START A CONVERSATION <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="footer-grid">
        <div className="footer-column">
          <span className="footer-label">VISIT</span>
          <p>1960 Jackson Street<br />San Francisco, CA 94109</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">GET IN TOUCH</span>
          <a href="mailto:hello@aureliahomes.com">hello@aureliahomes.com</a>
          <a href="tel:+14155550186">+1 415 555 0186</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">FOLLOW ALONG</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
        <div className="footer-column footer-clock">
          <span className="footer-label"><i aria-hidden="true" />SAN FRANCISCO · LOCAL TIME</span>
          <time>{time}</time>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2025 AURELIA HOMES</span>
        <span>Thoughtfully at home in San Francisco.</span>
        <a href="#top">BACK TO THE BEGINNING ↑</a>
      </div>
    </footer>
  )
}
