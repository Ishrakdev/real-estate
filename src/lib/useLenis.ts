import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger, gsap } from './gsap'
import { useReducedMotion } from './useReducedMotion'

export function useLenis() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.075,
      smoothWheel: true,
    })
    const syncScroll = () => ScrollTrigger.update()
    const tick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', syncScroll)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      gsap.ticker.remove(tick)
      lenis.off('scroll', syncScroll)
      lenis.destroy()
    }
  }, [reducedMotion])
}
