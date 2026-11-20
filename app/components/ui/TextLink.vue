<script setup lang="ts">
/**
 * Words and a drawn arrow on one centre line. The underline draws from the left on hover and the arrow
 * steps 6px; on black (`light`) the arrow also lights.
 */
const props = defineProps<{ to: string; light?: boolean; cta?: string }>()
const external = computed(() => /^(https?:|mailto:|tel:)/.test(props.to))
</script>

<template>
  <a v-if="external" :href="to" class="tlink" :class="{ 'tlink-light': light }" :data-cta="cta" :rel="to.startsWith('http') ? 'noopener' : undefined">
    <slot />
    <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9 1l5 5-5 5" /></svg></span>
  </a>
  <NuxtLink v-else :to="to" class="tlink" :class="{ 'tlink-light': light }" :data-cta="cta">
    <slot />
    <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9 1l5 5-5 5" /></svg></span>
  </NuxtLink>
</template>
