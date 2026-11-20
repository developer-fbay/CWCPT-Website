// Sections settle into view (Jesse, 2026-11-20). When a scroll stops with the next section's top a little way
// ahead (in the direction of the scroll), the page glides the rest of the way, so that section sits just under
// the header. When a scroll stops just past a section's top it crossed, it settles back onto it. Anywhere else
// the page stays exactly where the visitor left it, so slow scrolling, the arrow keys and long sections (the
// offices list) are never pulled back.
//
// Not CSS scroll-snap: with sections close to a screen tall, browsers snapped every small wheel step back to
// the same place, so the page could not be scrolled past a section with a mouse wheel.
//
// Laptops and desktops only: on phones sections are taller than the screen. Never for visitors who turn
// animations off, and never after a scroll the visitor didn't make (a link to an anchor, a new page).
// Check how sections fit one screen with ?folds (README).
export default defineNuxtPlugin((nuxtApp) => {
  const allowed = matchMedia('(min-width: 961px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)')
  const REACH = 0.3 // of a screen: how far ahead a section's top can be and still pull the page to it
  const SLACK = 0.1 // of a screen: how far past a section's top a scroll can stop and still settle back onto it
  const INPUT_MS = 1500 // only after the visitor's own wheel, touch or keys in this long

  let settled = scrollY // where the last scroll stopped
  let lastInput = 0
  let gliding = false
  let timer: ReturnType<typeof setTimeout> | undefined

  const headerH = () => document.querySelector<HTMLElement>('.hdr')?.offsetHeight ?? 0

  // Where each section's top sits just under the header
  function stops(header: number) {
    const max = document.documentElement.scrollHeight - innerHeight
    return [...document.querySelectorAll('#main > * > section, #main > section')]
      .map((s) => Math.max(0, Math.round(s.getBoundingClientRect().top + scrollY - header)))
      .filter((p) => p <= max)
  }

  function onStop() {
    const y = scrollY
    const from = settled
    settled = y
    if (gliding) {
      gliding = false
      return
    }
    if (!allowed.matches || performance.now() - lastInput > INPUT_MS) return
    const dir = Math.sign(y - from)
    if (!dir) return
    const header = headerH()
    const screen = innerHeight - header
    const ps = stops(header)
    const nearest = (list: number[]) => list.sort((a, b) => Math.abs(a - y) - Math.abs(b - y))[0]
    // Just past a section's top this scroll went over: back onto it
    const crossed = ps.filter((p) => (dir > 0 ? from < p && p < y && y - p <= screen * SLACK : y < p && p < from && p - y <= screen * SLACK))
    // A section's top a little way ahead: on to it
    const ahead = ps.filter((p) => (dir > 0 ? p > y && p - y <= screen * REACH : p < y && y - p <= screen * REACH))
    const target = nearest(crossed) ?? nearest(ahead)
    if (target === undefined || Math.abs(target - y) < 2) return
    gliding = true
    scrollTo({ top: target, behavior: 'smooth' })
  }

  const input = () => {
    lastInput = performance.now()
    gliding = false
  }
  const SCROLL_KEYS = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'])
  addEventListener('wheel', input, { passive: true })
  addEventListener('touchmove', input, { passive: true })
  addEventListener('keydown', (e) => { if (SCROLL_KEYS.has(e.key)) input() })

  if ('onscrollend' in window) addEventListener('scrollend', onStop)
  else {
    addEventListener('scroll', () => {
      clearTimeout(timer)
      timer = setTimeout(onStop, 160)
    }, { passive: true })
  }

  // A new page starts from wherever the router put it
  nuxtApp.hook('page:finish', () => {
    lastInput = 0
    gliding = false
    settled = scrollY
  })
})
