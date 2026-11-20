<script setup lang="ts">
/**
 * Small square label badge, echoing the logo's block: "Available", "Let", "Never shared".
 * `bar` adds the light bar (a 3px lit tube on its left edge): only on the one badge worth noticing.
 */
withDefaults(defineProps<{ variant?: 'solid' | 'solid-dark' | 'line'; bar?: boolean }>(), { variant: 'solid-dark' })
</script>

<template>
  <span class="tag" :class="[`tag-${variant}`, { 'tag-bar': bar }]"><slot /></span>
</template>
