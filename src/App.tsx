import { useState } from 'react'
import { useLenis } from './lib/useLenis'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { FeaturedProperties } from './components/sections/FeaturedProperties'
import { PropertyFilter } from './components/sections/PropertyFilter'
import { Neighborhoods } from './components/sections/Neighborhoods'
import { AgentBio } from './components/sections/AgentBio'
import { Stats } from './components/sections/Stats'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { ChatWidget } from './components/chat/ChatWidget'

function App() {
  useLenis()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedProperties />
        <PropertyFilter />
        <Neighborhoods />
        <AgentBio />
        <Stats />
        <Testimonials />
        <Contact onOpenChat={() => setChatOpen(true)} />
      </main>
      <Footer onOpenChat={() => setChatOpen(true)} />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <ScrollProgress />
      <div aria-hidden="true" className="film-grain" />
    </>
  )
}

export default App
