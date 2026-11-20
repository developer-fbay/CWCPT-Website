<script setup lang="ts">
import { litLayers, strips } from '~/utils/strips'

/**
 * The white-pink LED neon strip from the office walls, one SVG per strip: a milky tube when off; lit, a wall
 * wash, glows, a lit edge, the diffuser and a hot core, then clear clips with screws, moulded end caps and a
 * power end. It is off until it scrolls into view, then flickers on and hums; a spark runs along it now and
 * then; the sag sways slowly. At most three on a page, never two in one view. `white` = on a white wall.
 * Decorative. Reduced motion: simply on.
 */
const props = defineProps<{ shape: keyof typeof strips; white?: boolean }>()
const s = computed(() => strips[props.shape])
const f = (n: number) => n.toFixed(1)
</script>

<template>
  <div class="strip sl-hover" data-rv aria-hidden="true">
    <svg class="sl" :class="{ 'sl-white': white }" :viewBox="`0 0 ${s.width} ${s.height}`" :width="s.width" :height="s.height" focusable="false">
      <g class="off">
        <path class="osh" :d="s.d" transform="translate(2 4)" />
        <path class="o" :d="s.d" />
        <path class="oh" :d="s.d" />
      </g>
      <g class="lit">
        <path v-for="layer in litLayers" :key="layer" :class="[layer, { sway: s.sway }]" :d="s.d" pathLength="1" />
        <circle v-for="([x, y], i) in s.bleeds" :key="`b${i}`" class="bleed" :cx="x" :cy="y" r="7" />
      </g>
      <path v-if="s.spark" class="spark" :class="{ sway: s.sway }" :d="s.d" pathLength="1" />
      <g v-for="([x, y, a], i) in s.clips" :key="`c${i}`" :transform="`translate(${f(x)} ${f(y)}) rotate(${f(a)})`">
        <rect class="clip-shadow" x="-4" y="-12" width="10" height="28" rx="3" />
        <rect class="clip-base" x="-5" y="-14" width="10" height="28" rx="3" />
        <rect class="clip-bridge" x="-5.5" y="-5.5" width="11" height="11" rx="3" />
        <circle class="screw" cx="0" cy="-10" r="2.2" />
        <circle class="screw" cx="0" cy="10" r="2.2" />
      </g>
      <g v-for="([x, y, a], i) in s.caps" :key="`k${i}`" :transform="`translate(${f(x)} ${f(y)}) rotate(${f(a)})`">
        <rect class="cap-body" x="-2" y="-5.25" width="14" height="10.5" rx="4" fill="url(#sl-cap)" />
        <rect class="cap-seam" x="-2" y="-5.25" width="2" height="10.5" rx="1" />
      </g>
      <g v-if="s.power" :transform="`translate(${f(s.power[0])} ${f(s.power[1])}) rotate(${f(s.power[2])})`">
        <path class="cable" d="M30 0 C40 0 46 -10 48 -46" />
        <path class="relief" d="M12 -4.4 L27 -2.6 L27 2.6 L12 4.4 Z" />
        <rect class="cap-body" x="-2" y="-5.25" width="15" height="10.5" rx="3.5" fill="url(#sl-cap)" />
        <rect class="cap-seam" x="-2" y="-5.25" width="2" height="10.5" rx="1" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.strip { position: relative; pointer-events: auto; }
.sl :deep(.relief) { fill: #252525; stroke: #3c3c3c; stroke-width: 0.6; }
.sl :deep(.cable) { stroke: #161616; stroke-width: 5; }
.sl-white :deep(.cable) { stroke: #1a1a1a; }
</style>
