import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

type ChatMessage = {
  id: number
  sender: 'visitor' | 'concierge'
  text: string
}

type ChatPhase =
  | 'welcome'
  | 'viewing-reply'
  | 'viewing-form'
  | 'thank-you-reply'
  | 'suggestions'
  | 'final-reply'
  | 'ended'

type ChatWidgetProps = {
  open: boolean
  onClose: () => void
}

const welcomeMessage: ChatMessage = {
  id: 0,
  sender: 'concierge',
  text: 'Welcome to Aurelia Homes. How may I help you find your place in San Francisco?',
}

const viewingReply = 'I would be delighted to arrange a private viewing. Please leave your number at a convenient time and our team will be in touch.'
const submissionReply = 'Thank you for sharing that with me. I can connect you with our private clients team to explore the right homes and next steps.'
const finalReply = 'I would be happy to help share the best way to reach you. Our San Francisco team will follow up personally.'

const closingSuggestions = [
  'Looking forward to it',
  'Sounds perfect, thank you',
  'Speak soon',
]

export function ChatWidget({ open, onClose }: ChatWidgetProps) {
  const [phase, setPhase] = useState<ChatPhase>('welcome')
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [typing, setTyping] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const nextMessageId = useRef(1)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open && phase === 'viewing-form') inputRef.current?.focus()
  }, [open, phase])

  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages, typing])

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }, [])

  const addMessage = (sender: ChatMessage['sender'], text: string) => {
    setMessages((current) => [...current, {
      id: nextMessageId.current++,
      sender,
      text,
    }])
  }

  const scheduleReply = (reply: string, nextPhase: ChatPhase) => {
    setTyping(true)
    timerRef.current = window.setTimeout(() => {
      addMessage('concierge', reply)
      setTyping(false)
      setPhase(nextPhase)
      timerRef.current = null
    }, 1_050)
  }

  const chooseViewing = () => {
    if (phase !== 'welcome') return
    addMessage('visitor', 'Book a private viewing')
    setPhase('viewing-reply')
    scheduleReply(viewingReply, 'viewing-form')
  }

  const submitViewingRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (phase !== 'viewing-form') return
    addMessage('visitor', 'Private viewing details submitted.')
    setPhase('thank-you-reply')
    scheduleReply(submissionReply, 'suggestions')
  }

  const chooseClosingSuggestion = (suggestion: string) => {
    if (phase !== 'suggestions') return
    addMessage('visitor', suggestion)
    setPhase('final-reply')
    scheduleReply(finalReply, 'ended')
  }

  return (
    <div className={`chat-shell ${open ? 'chat-shell--open' : ''}`} aria-hidden={!open}>
      <button className="chat-backdrop" onClick={onClose} tabIndex={open ? 0 : -1} type="button" aria-label="Close chat" />
      <section
        aria-labelledby="chat-title"
        aria-modal="true"
        className="chat-panel"
        role="dialog"
      >
        <header className="chat-header">
          <div className="chat-brand">
            <span className="chat-monogram" aria-hidden="true">A</span>
            <div>
              <h2 id="chat-title">Aurelia Concierge</h2>
              <span><i aria-hidden="true" />HERE FOR YOU · SAN FRANCISCO</span>
            </div>
          </div>
          <button className="chat-close" onClick={onClose} type="button" aria-label="Close chat">×</button>
        </header>

        <div className="chat-intro">
          <span className="eyebrow">PRIVATE CLIENT SERVICES</span>
          <p>A more personal kind of conversation.</p>
        </div>

        <div className="chat-thread" ref={threadRef} aria-live="polite" aria-relevant="additions">
          <span className="chat-date">TODAY · SAN FRANCISCO</span>
          {messages.map((message) => (
            <div className={`chat-message chat-message--${message.sender}`} key={message.id}>
              {message.sender === 'concierge' && <span className="chat-message-sender">AURELIA CONCIERGE</span>}
              <p>{message.text}</p>
            </div>
          ))}
          {typing && (
            <div className="chat-message chat-message--concierge chat-typing" aria-label="Aurelia Concierge is typing">
              <span className="chat-message-sender">AURELIA CONCIERGE</span>
              <p><i /><i /><i /></p>
            </div>
          )}
        </div>

        {phase === 'welcome' && (
          <div className="chat-suggestions" aria-label="Suggested response">
            <button className="chat-suggestion" onClick={chooseViewing} type="button">Book a private viewing <span aria-hidden="true">↗</span></button>
          </div>
        )}

        {phase === 'viewing-form' && (
          <form className="chat-request-form" onSubmit={submitViewingRequest}>
            <label className="chat-field">
              <span>PHONE NUMBER</span>
              <input
                autoComplete="tel"
                inputMode="tel"
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="+1 (415) 555-0186"
                ref={inputRef}
                required
                type="tel"
                value={phoneNumber}
              />
            </label>
            <label className="chat-field">
              <span>PREFERRED TIME</span>
              <select onChange={(event) => setPreferredTime(event.target.value)} required value={preferredTime}>
                <option disabled value="">Choose a convenient time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Early evening">Early evening</option>
              </select>
            </label>
            <button className="chat-submit" type="submit">Submit request <span aria-hidden="true">↗</span></button>
          </form>
        )}

        {phase === 'suggestions' && (
          <div className="chat-suggestions chat-suggestions--closing" aria-label="Choose a response">
            {closingSuggestions.map((suggestion) => (
              <button
                className="chat-suggestion"
                key={suggestion}
                onClick={() => chooseClosingSuggestion(suggestion)}
                type="button"
              >
                {suggestion}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        )}

        {phase === 'ended' && (
          <div className="chat-ended" role="status" aria-live="polite">Conversation ended.</div>
        )}

        <p className="chat-disclaimer">A private conversation, handled with care.</p>
      </section>
    </div>
  )
}
