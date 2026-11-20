<script setup lang="ts">
/**
 * A grid of things included or handled, each with the original glowing icon, a heavy title and a line.
 * On black the icon glows at rest; on white (`onWhite`) it sits in a black square, because glow lives on black.
 * On hover the icon stutters like a tube catching.
 */
defineProps<{ items: { icon: string; title: string; text: string }[]; onWhite?: boolean }>()
</script>

<template>
  <ul class="ig">
    <li v-for="(item, i) in items" :key="item.title" class="ig__item usp r-item" :style="{ '--i': i }">
      <span v-if="onWhite" class="icon-sq"><img class="ic" :src="`/icons/${item.icon}.svg`" alt="" width="30" height="30"></span>
      <img v-else class="ic" :src="`/icons/${item.icon}.svg`" alt="" width="30" height="30">
      <h3 class="ig__t">{{ item.title }}</h3>
      <p class="ig__p">{{ item.text }}</p>
    </li>
  </ul>
</template>

<style scoped>
.ig { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 0 40px; border-top: 2px solid currentColor; }
.ig__item { display: flex; flex-direction: column; gap: 12px; padding: 28px 0; border-bottom: 1px solid var(--line-mid); }
.on-white .ig__item { border-color: #d8d8d8; }
.ig__t { font-size: 20px; font-weight: 800; font-stretch: 106%; line-height: 1.25; }
.ig__p { font-size: 16px; line-height: 1.6; opacity: 0.82; }
</style>
