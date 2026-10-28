import { useEffect, useState } from 'react'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 70)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-nav ${menuOpen ? 'site-nav--open' : ''} ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <a className="wordmark" href="#top" aria-label="Aurelia Homes home" onClick={closeMenu}>
        <span className="wordmark-mark">A</span>
        <span>AURELIA <small>HOMES</small></span>
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#properties" onClick={closeMenu}>The collection</a>
        <a href="#neighborhoods" onClick={closeMenu}>Neighborhoods</a>
        <a href="#about" onClick={closeMenu}>Our approach</a>
      </nav>
      <a className="nav-cta" href="#contact">Private viewing <span aria-hidden="true">↗</span></a>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className="nav-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <span />
        <span />
      </button>
    </header>
  )
}
