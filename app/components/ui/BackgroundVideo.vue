<script setup lang="ts">
/**
 * A muted, looping video filling its parent (which needs `position: relative`), with a still image first.
 * Vimeo for now, in background mode with do-not-track. The player only loads once the page has finished
 * loading, so it never slows the first paint, and not at all under reduced motion or data saver:
 * those visitors keep the still.
 */
const props = withDefaults(
  defineProps<{
    vimeoId: string
    poster: { src: string; srcset?: string }
    /** How wide the still is drawn, so the browser picks the right file from srcset (it is cropped to cover the box) */
    sizes?: string
  }>(),
  { sizes: '100vw' },
)

const load = ref(false)
const visible = ref(false)
const frame = ref<HTMLIFrameElement | null>(null)
const VIMEO = 'https://player.vimeo.com'

// Ask the player to tell us when the video is really playing. Until it says so, the still stays on top, so a
// player that fails (a refused request, a blocker, a privacy change) never turns the block black.
function listen() {
  for (const value of ['play', 'playProgress', 'timeupdate']) {
    frame.value?.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value }), VIMEO)
  }
}

function onMessage(e: MessageEvent) {
  if (e.origin !== VIMEO || e.source !== frame.value?.contentWindow) return
  let data: { event?: string } = {}
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
  if (data.event === 'ready') listen()
  else if (data.event === 'play' || data.event === 'playProgress' || data.event === 'timeupdate') {
    visible.value = true
    window.removeEventListener('message', onMessage)
  }
}

onMounted(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  if (reduce || saveData) return
  window.addEventListener('message', onMessage)
  const start = () => { load.value = true }
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start, { once: true })
})

onBeforeUnmount(() => window.removeEventListener('message', onMessage))

const src = computed(
  () => `https://player.vimeo.com/video/${props.vimeoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`,
)
</script>

<template>
  <div class="bgv" aria-hidden="true">
    <img
      class="bgv__poster"
      :src="poster.src"
      :srcset="poster.srcset"
      :sizes="sizes"
      width="1920"
      height="1080"
      alt=""
      fetchpriority="high"
      decoding="async"
    >
    <iframe
      v-if="load"
      ref="frame"
      class="bgv__frame"
      :class="{ 'is-visible': visible }"
      :src="src"
      title="Background video"
      allow="autoplay; fullscreen; picture-in-picture"
      tabindex="-1"
      @load="listen"
    />
  </div>
</template>

<style scoped>
.bgv { position: absolute; inset: 0; overflow: hidden; container-type: size; pointer-events: none; }
.bgv__poster { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* 16:9 player scaled to cover the box, like object-fit: cover */
.bgv__frame {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max(100cqw, 177.78cqh);
  height: max(100cqh, 56.25cqw);
  border: 0;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 1s ease;
}
.bgv__frame.is-visible { opacity: 1; }
</style>
