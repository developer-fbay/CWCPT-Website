// Scroll reveal, as the design system specifies: content is visible by default. A tiny inline script in the
// head (app.vue, `revealBoot`) arms it before first paint with <html class="rv-ready">, reveals what is already
// on screen straight away, and reveals everything after 4s whatever happens. This plugin then gives each
// [data-rv] block data-in (plays once) when 20% of it scrolls into view; also anything in view after 700ms.
// Reduced motion or no IntersectionObserver: never armed, so everything is simply there.
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  if (!root.classList.contains('rv-ready')) return

  const seen = new WeakSet<Element>()
  const reveal = (el: Element) => el.setAttribute('data-in', '')

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          reveal(e.target)
          io.unobserve(e.target)
        }
      }
    },
    { threshold: 0.2 },
  )

  const inView = (el: Element) => {
    const r = el.getBoundingClientRect()
    return r.top < innerHeight && r.bottom > 0
  }

  const scan = () => {
    const blocks = document.querySelectorAll('[data-rv]:not([data-in])')
    blocks.forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      io.observe(el)
    })
    setTimeout(() => blocks.forEach((el) => inView(el) && reveal(el)), 700)
    setTimeout(() => document.querySelectorAll('[data-rv]:not([data-in])').forEach(reveal), 4000)
  }

  nuxtApp.hook('app:mounted', () => requestAnimationFrame(scan))
  nuxtApp.hook('page:finish', () => requestAnimationFrame(scan))
})
