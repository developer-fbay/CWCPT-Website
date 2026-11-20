<script setup lang="ts">
/**
 * The Google map, loaded only when someone asks for it: until then nothing is fetched from Google (faster, and
 * no Google cookies before consent). Shown in black and white to sit in the design. Always offers the link out.
 */
defineProps<{ src: string; link: string; title?: string }>()
const shown = ref(false)
</script>

<template>
  <div class="map">
    <iframe
      v-if="shown"
      class="map__frame"
      :src="src"
      :title="title ?? 'Map of Wembley Square, Gardens, Cape Town'"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />
    <div v-else class="map__facade">
      <img src="/images/photos/entrance-2-5563-800.webp" alt="" width="800" height="600" loading="lazy" decoding="async">
      <div class="map__cta">
        <button type="button" class="btn btn-white" @click="shown = true">Show the map</button>
        <a :href="link" class="tlink tlink-light" target="_blank" rel="noopener">Open in Google Maps
          <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9 1l5 5-5 5" /></svg></span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map { position: relative; aspect-ratio: 3 / 2; border-radius: var(--radius); overflow: hidden; background: #111111; }
.map__frame { width: 100%; height: 100%; border: 0; filter: grayscale(1) invert(0.92) contrast(0.9); }
.map__facade { position: absolute; inset: 0; }
.map__facade img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.45); }
.map__cta { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; color: var(--white); }
</style>
