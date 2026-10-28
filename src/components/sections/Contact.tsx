type ContactProps = {
  onOpenChat: () => void
}

export function Contact({ onOpenChat }: ContactProps) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-main">
        <p className="eyebrow"><span className="eyebrow-line" />A GOOD CONVERSATION STARTS HERE</p>
        <h2>Book a private<br /><em>viewing.</em></h2>
        <div className="contact-bottom">
          <p>Some things are better experienced in person.<br />Tell us what you’re looking for.</p>
          <button className="magnetic-button contact-button" onClick={onOpenChat} type="button">
            <span>Begin a conversation</span>
            <span aria-hidden="true" className="button-arrow">↗</span>
          </button>
        </div>
      </div>
      <aside className="contact-details">
        <span className="mono">PRIVATE CLIENT ENQUIRIES</span>
        <a href="mailto:hello@aureliahomes.com">hello@aureliahomes.com</a>
        <a href="tel:+14155550186">+1 415 555 0186</a>
        <span className="contact-separator" />
        <span className="mono">SAN FRANCISCO OFFICE</span>
        <p>1960 Jackson Street<br />San Francisco, CA 94109</p>
      </aside>
    </section>
  )
}
