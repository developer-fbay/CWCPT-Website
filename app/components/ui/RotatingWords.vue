<script setup lang="ts">
/**
 * The one lit script word on a page: the home hero's "is Lekker", word for word from the original site.
 * A new word every `interval` ms; each one fades in from the left (600ms, the house curve). The first word
 * is in the HTML; rotation starts only in the browser, never under reduced motion. Screen readers hear
 * the first word only.
 */
const props = withDefaults(defineProps<{ words: string[]; interval?: number }>(), { interval: 3000 })
const index = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (props.words.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => { index.value = (index.value + 1) % props.words.length }, props.interval)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <span class="rot-wrap">
    <span class="sr-only">{{ words[0] }}</span>
    <Transition name="rot" mode="out-in">
      <span :key="index" class="rot script" aria-hidden="true">{{ words[index] }}</span>
    </Transition>
  </span>
</template>

<style scoped>
.rot-wrap { display: inline-block; }
.rot { display: inline-block; font-size: var(--fs-script); line-height: 1.1; white-space: nowrap; }
.rot-enter-active { transition: opacity 600ms var(--ease-snap), translate 600ms var(--ease-snap); }
.rot-leave-active { transition: opacity 160ms var(--ease-out); }
.rot-enter-from { opacity: 0; translate: -36px 0; }
.rot-leave-to { opacity: 0; }
</style>
