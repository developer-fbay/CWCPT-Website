<script setup lang="ts">
/**
 * A label over a heavy heading that ends in a full stop (lit on black, plain black on white).
 * Each line rises out of its own mask when the section scrolls in. `lines` are the heading's lines.
 */
withDefaults(
  defineProps<{ label?: string; lines: string[]; as?: 'h1' | 'h2' | 'h3'; size?: 'h1' | 'h2' | 'h3'; id?: string }>(),
  { as: 'h2', size: 'h2' },
)
</script>

<template>
  <div class="sh">
    <p v-if="label" class="label r-label">{{ label }}</p>
    <component :is="as" :id="id" class="mono" :class="size">
      <span v-for="(line, i) in lines" :key="i" class="mask">
        <span :style="{ '--l': i }">{{ line }}<span v-if="i === lines.length - 1" class="dot">.</span></span>
      </span>
    </component>
    <slot />
  </div>
</template>
