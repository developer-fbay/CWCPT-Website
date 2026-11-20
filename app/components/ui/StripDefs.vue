<template>
  <!-- Filters and gradients every StripLight uses: in the layout once, so strips stay small. -->
  <svg width="0" height="0" style="position: absolute" aria-hidden="true" focusable="false">
    <defs>
      <filter
        v-for="[id, sd] in filters"
        :id="id"
        :key="id"
        filterUnits="userSpaceOnUse"
        x="-300"
        y="-300"
        width="2100"
        height="1400"
      >
        <feGaussianBlur :stdDeviation="sd" />
      </filter>
      <linearGradient id="sl-cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6f6f6" />
        <stop offset="0.5" stop-color="#d9d9d9" />
        <stop offset="1" stop-color="#9f9f9f" />
      </linearGradient>
      <radialGradient id="sl-screw" cx="0.35" cy="0.35" r="0.75">
        <stop offset="0" stop-color="#e2e2e2" />
        <stop offset="1" stop-color="#6d6d6d" />
      </radialGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
const filters: [string, number][] = [
  ['sl-wash', 26], ['sl-far', 11], ['sl-near', 3.5], ['sl-spark', 2.2], ['sl-soft', 0.7], ['sl-shadow', 2.4],
]
</script>
