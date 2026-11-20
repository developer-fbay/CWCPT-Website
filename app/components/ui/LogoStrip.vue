<script setup lang="ts">
/**
 * A row of partner logos (white on transparent, trimmed to the logo itself). Logos come in very different
 * shapes (The Legends Agency is about 2.5:1, FBX about 7:1), so instead of one width for all, each gets the
 * same visual area: wide logos sit lower, tall ones narrower, and the row reads as even. Wraps on small screens.
 */
const props = defineProps<{ items: { name: string; src: string; width?: number; height?: number }[]; label?: string }>()
// Each logo's height in px at full size, so width x height = AREA. --logo-scale shrinks the row on phones.
const AREA = 6400
const logos = computed(() => props.items.map((i) => {
  const ratio = (i.width ?? 600) / (i.height ?? 150)
  return { ...i, h: Math.round(Math.sqrt(AREA / ratio)) }
}))
</script>

<template>
  <div class="logos">
    <p v-if="label" class="label">{{ label }}</p>
    <ul class="logos__list">
      <li v-for="item in logos" :key="item.name">
        <img class="logos__img" :src="item.src" :alt="item.name" :width="item.width" :height="item.height" :style="{ '--h': item.h }" loading="lazy" decoding="async">
      </li>
    </ul>
  </div>
</template>

<style scoped>
.logos { --logo-scale: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
.logos__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px clamp(1.5rem, 4vw, 3rem);
  margin: 0;
}
.logos__img { height: calc(var(--h) * 1px * var(--logo-scale)); width: auto; opacity: 0.85; transition: opacity var(--dur-quick) var(--ease-out); }
@media (hover: hover) {
  .logos__img:hover { opacity: 1; }
}
@media (max-width: 560px) { .logos { --logo-scale: 0.8; } }
</style>
