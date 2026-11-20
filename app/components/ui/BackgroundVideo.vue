<script setup lang="ts">
/**
 * A muted, looping video filling its parent (which needs `position: relative`), with a still image first.
 * Vimeo for now, in background mode with do-not-track. The player only loads once the page has finished
 * loading, so it never slows the first paint, and not at all under reduced motion or data saver:
 * those visitors keep the still.
 *
 * `jumps` skips parts of the video: when playback reaches `at` seconds it jumps to `to` (every loop). A jump
 * forward skips up to `to`; a jump back (for example to 0) cuts the end off. Start `at` about half a second
 * before the part to hide: the player reports the time about four times a second.
 * Add ?video-time to the page's address to see the playing time on the video, to find those seconds.
 */
const props = withDefaults(
  defineProps<{
    vimeoId: string
    poster: { src: string; srcset?: string }
    /** How wide the still is drawn, so the browser picks the right file from srcset (it is cropped to cover the box) */
    sizes?: string
    jumps?: { at: number; to: number }[]
  }>(),
  { sizes: '100vw', jumps: () => [] },
)

const load = ref(false)
const visible = ref(false)
const frame = ref<HTMLIFrameElement | null>(null)
const showTime = ref(false)
const now = ref(0)
const VIMEO = 'https://player.vimeo.com'

const post = (method: string, value?: unknown) =>
  frame.value?.contentWindow?.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), VIMEO)

// Ask the player to tell us when the video is really playing. Until it says so, the still stays on top, so a
// player that fails (a refused request, a blocker, a privacy change) never turns the block black.
function listen() {
  for (const value of ['play', 'playProgress', 'timeupdate']) post('addEventListener', value)
}

// The jump whose window holds this second: forward jumps cover [at, to), backward ones [at, end of video)
let jumping = false
function jumpFor(seconds: number) {
  return props.jumps.find((j) => seconds >= j.at && (j.to > j.at ? seconds < j.to : true))
}

function onMessage(e: MessageEvent) {
  if (e.origin !== VIMEO || e.source !== frame.value?.contentWindow) return
  let data: { event?: string; data?: { seconds?: number } } = {}
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
  if (data.event === 'ready') return listen()
  if (data.event !== 'play' && data.event !== 'playProgress' && data.event !== 'timeupdate') return
  visible.value = true
  const seconds = data.data?.seconds
  if (typeof seconds !== 'number') return
  now.value = seconds
  const jump = jumpFor(seconds)
  if (jump && !jumping) {
    jumping = true
    post('setCurrentTime', jump.to)
    setTimeout(() => { jumping = false }, 600)
  }
}

onMounted(() => {
  showTime.value = new URLSearchParams(location.search).has('video-time')
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
    <span v-if="showTime && visible" class="bgv__time">{{ now.toFixed(2) }}s</span>
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
/* Only with ?video-time in the address: the playing time, to find the seconds for `jumps` */
.bgv__time { position: absolute; left: 10px; top: 10px; z-index: 2; padding: 4px 8px; border-radius: var(--radius-sm); background: var(--black); color: var(--white); font: 700 14px/1 var(--font-sans); font-variant-numeric: tabular-nums; }
</style>
