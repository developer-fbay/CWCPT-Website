<script setup lang="ts">
/**
 * Screen guides, for checking how each section sits in one screen at different window sizes and zoom levels
 * (2026-11-20). Turned on with ?folds in the address (utils/folds.ts); this code only loads when asked.
 *
 * - A white line at the top of every section, with its name, its height and its height in screens.
 * - One screen = the window's height minus the header: what a visitor sees when the section's top sits just
 *   under the header. Up to one screen the label says how much room is left; over it, it turns pink and says by
 *   how much.
 * - In a section taller than a screen, a dashed pink line marks where each screen ends.
 * - Bottom left: the window size, the header and one screen's height. Browser zoom and Windows scaling change
 *   the window size, so a 1920 x 1080 screen at 125% reads about 1536 wide.
 */
interface Row { key: string; name: string; top: number; h: number; ratio: number; ends: number[] }

const rows = ref<Row[]>([])
const win = reactive({ w: 0, h: 0, header: 0, screen: 0 })
const route = useRoute()

const clean = (s: string) => s.replace(/\s+/g, ' ').trim()
function nameOf(el: Element): string {
  if (el.tagName === 'FOOTER') return 'Footer'
  const by = el.getAttribute('aria-labelledby')
  const heading = (by && document.getElementById(by)) || el.querySelector('h1, h2')
  // Headings set in lines (.mask spans) get a space between the lines; textContent keeps the real case
  const lines = heading ? [...heading.querySelectorAll('.mask')] : []
  const text = heading ? clean(lines.length ? lines.map((l) => l.textContent).join(' ') : heading.textContent ?? '') : ''
  return (text || el.getAttribute('aria-label') || el.classList[0] || el.tagName.toLowerCase()).slice(0, 40)
}

function measure() {
  const main = document.getElementById('main')
  if (!main) return
  // Pages have one root element holding their sections; the footer counts as the last section
  const root = main.children.length === 1 && main.firstElementChild ? main.firstElementChild : main
  win.w = innerWidth
  win.h = innerHeight
  win.header = document.querySelector<HTMLElement>('.hdr')?.offsetHeight ?? 0
  win.screen = win.h - win.header
  const els = [...root.children, document.querySelector('footer')].filter((el): el is Element => !!el)
  rows.value = els
    .map((el, i) => {
      const b = el.getBoundingClientRect()
      const top = Math.round(b.top + scrollY)
      const h = Math.round(b.height)
      const ends: number[] = []
      for (let y = top + win.screen; y < top + h - 8; y += win.screen) ends.push(y)
      return { key: `${i}-${top}`, name: nameOf(el), top, h, ratio: h / win.screen, ends }
    })
    .filter((r) => r.h > 8)
}

const note = (r: Row) => (r.ratio <= 1 ? `fits, ${win.screen - r.h}px spare` : `${r.h - win.screen}px over one screen`)

// Measure again whenever the page changes size (images, fonts, a new page, the window)
let raf = 0
const schedule = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(measure)
}
let ro: ResizeObserver | undefined
onMounted(() => {
  measure()
  ro = new ResizeObserver(schedule)
  ro.observe(document.body)
  addEventListener('resize', schedule)
})
watch(() => route.fullPath, () => nextTick(() => setTimeout(schedule, 100)))
onBeforeUnmount(() => {
  ro?.disconnect()
  removeEventListener('resize', schedule)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <Teleport to="body">
    <div class="fg" aria-hidden="true">
      <template v-for="r in rows" :key="r.key">
        <div class="fg__top" :style="{ top: `${r.top}px` }">
          <span class="fg__tag" :class="{ 'is-over': r.ratio > 1 }">
            {{ r.name }} · {{ r.h }}px · {{ r.ratio.toFixed(2) }} screens · {{ note(r) }}
          </span>
        </div>
        <div v-for="(y, k) in r.ends" :key="y" class="fg__end" :style="{ top: `${y}px` }">
          <span class="fg__tag is-over">End of screen {{ k + 1 }}</span>
        </div>
      </template>
    </div>
    <p class="fg__tag fg__info" aria-hidden="true">
      Window {{ win.w }} × {{ win.h }} · header {{ win.header }} · one screen {{ win.screen }}px · ?folds=off hides this
    </p>
  </Teleport>
</template>

<style scoped>
/* A testing tool: it sits under the header, like the page does, and never catches a click */
.fg { position: absolute; top: 0; left: 0; width: 100%; height: 0; pointer-events: none; }
.fg__top, .fg__end { position: absolute; left: 0; right: 0; height: 0; z-index: 45; }
/* White over black, so the line shows on black and on white sections */
.fg__top { border-top: 2px solid var(--white); box-shadow: 0 2px 0 var(--black); }
.fg__end { border-top: 2px dashed var(--pink); }
.fg__tag {
  position: absolute; left: 8px; top: 6px; max-width: calc(100% - 16px); overflow: hidden; text-overflow: ellipsis;
  padding: 4px 8px; border: 1px solid var(--white); border-radius: var(--radius-sm); background: var(--black);
  color: var(--white); font: 700 12px/1.3 var(--font-sans); white-space: nowrap; pointer-events: none;
}
.fg__tag.is-over { border-color: var(--pink); color: var(--pink); }
.fg__end .fg__tag { left: auto; right: 8px; }
.fg__info { position: fixed; top: auto; bottom: 8px; z-index: 60; margin: 0; }
</style>
