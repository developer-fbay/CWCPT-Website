<script setup lang="ts">
import { mainNav, site } from '~/data/site'

/**
 * White logo, white links whose underline draws in, one white button. On phones the menu is a full black
 * screen of heavy links: it wipes down from the header (420ms snap), the links rise 70ms apart, the button
 * comes last, and the current page carries the lit full stop. Closing is one 280ms wipe up.
 * Keyboard: opening moves focus to the first link, Tab stays inside the open menu, Escape closes it and returns
 * focus to the burger. The page behind is inert while the menu is open, so screen readers stay in the menu.
 */
const open = ref(false)
const route = useRoute()
const burger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
watch(() => route.fullPath, () => { open.value = false })
watch(open, (v) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = v ? 'hidden' : ''
  for (const el of [document.getElementById('main'), document.querySelector('footer')]) if (el) el.inert = v
  if (v) nextTick(() => menu.value?.querySelector<HTMLElement>('a')?.focus())
})
const isCurrent = (to: string) => route.path === to.split('#')[0]!.split('?')[0]

function close() {
  open.value = false
  nextTick(() => burger.value?.focus())
}
function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') return close()
  if (e.key !== 'Tab' || !menu.value || !burger.value) return
  // Keep Tab inside the burger and the menu
  const items = [burger.value, ...menu.value.querySelectorAll<HTMLElement>('a, button')]
  const i = items.indexOf(document.activeElement as HTMLElement)
  if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1]!.focus() }
  else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0]!.focus() }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="hdr">
    <div class="wrap hdr__inner">
      <NuxtLink to="/" class="logo" aria-label="Co Work Cape Town home">
        <img :src="site.logo.light.src" :width="site.logo.light.width" :height="site.logo.light.height" :alt="site.name" fetchpriority="high">
      </NuxtLink>

      <nav class="nav nav-desk" aria-label="Main">
        <NuxtLink v-for="item in mainNav" :key="item.label" :to="item.to">{{ item.label }}</NuxtLink>
      </nav>
      <Btn to="/contact-us?for=tour" class="hdr__btn" cta="header_book_tour">Book a tour</Btn>

      <button ref="burger" class="burger" type="button" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open">
        <span /><span />
      </button>
    </div>

    <Transition name="menu">
      <div v-if="open" id="mobile-menu" ref="menu" class="menu">
        <nav class="menu__nav" aria-label="Main">
          <span v-for="(item, i) in mainNav" :key="item.label" class="mask">
            <NuxtLink :to="item.to" class="mono menu__link" :style="{ '--i': i }">
              {{ item.label }}<span v-if="isCurrent(item.to)" class="dot">.</span>
            </NuxtLink>
          </span>
        </nav>
        <div class="menu__foot" :style="{ '--i': mainNav.length }">
          <Btn to="/contact-us?for=tour" cta="menu_book_tour">Book a tour</Btn>
          <a :href="`mailto:${site.email}`" class="menu__mail">{{ site.email }}</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hdr { position: sticky; top: 0; z-index: 50; background: rgba(0, 0, 0, 0.92); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border-bottom: 1px solid #1c1c1c; }
.hdr__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; min-height: calc(var(--header-h) - 1px); padding-block: 12px; }
.logo { display: block; flex: none; line-height: 0; }
.logo img { height: 44px; width: auto; }
.nav-desk { display: flex; gap: 28px; }
.burger { display: none; }

@media (max-width: 1080px) {
  .nav-desk, .hdr__btn { display: none; }
  .logo img { height: 42px; }
  .burger {
    all: unset; position: relative; display: block; width: 44px; height: 44px; cursor: pointer;
  }
  .burger:focus-visible { box-shadow: var(--tube); border-radius: var(--radius-sm); }
  .burger span {
    position: absolute; left: 8px; width: 28px; height: 3px; background: var(--white);
    transition: transform var(--dur-grow) var(--ease-snap), top var(--dur-grow) var(--ease-snap);
  }
  .burger span:first-child { top: 16px; }
  .burger span:last-child { top: 25px; }
  .burger[aria-expanded='true'] span:first-child { top: 21px; transform: rotate(45deg); }
  .burger[aria-expanded='true'] span:last-child { top: 21px; transform: rotate(-45deg); }
}

.menu {
  position: fixed; inset: var(--header-h) 0 0; z-index: 49; background: var(--black);
  display: flex; flex-direction: column; justify-content: space-between; gap: 32px;
  padding: 24px var(--gutter) 40px; overflow-y: auto;
}
.menu__nav { display: flex; flex-direction: column; gap: 4px; }
.menu__link { display: block; font-size: clamp(36px, 10vw, 48px); text-decoration: none; padding: 8px 0; }
.menu__foot { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
.menu__mail { font-weight: 800; }

/* Wipe down 420ms; links rise 70ms apart; the button last. Close: one 280ms wipe up. */
.menu-enter-active { animation: wipe-down var(--dur-panel) var(--ease-snap) both; }
.menu-enter-active .menu__link { animation: rise var(--dur-reveal) var(--ease-snap) calc(120ms + var(--i) * 70ms) both; }
.menu-enter-active .menu__foot { animation: fadeup 520ms var(--ease-out) calc(120ms + var(--i) * 70ms) both; }
.menu-leave-active { animation: wipe-down var(--dur-grow) var(--ease-snap) reverse both; }
@keyframes wipe-down { from { clip-path: inset(0 0 100% 0) } to { clip-path: inset(0 0 0 0) } }
</style>
