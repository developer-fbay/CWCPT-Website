<script setup lang="ts">
/** Numbered steps as heavy numerals over a thick rule ("How moving in works"). The numbers do the work. */
defineProps<{ steps: { title: string; text: string }[] }>()
</script>

<template>
  <ol class="steps">
    <li v-for="(s, i) in steps" :key="s.title" class="step r-item" :style="{ '--i': i }">
      <span class="mono step-n" aria-hidden="true">{{ i + 1 }}</span>
      <h3 class="mono h3">{{ s.title }}</h3>
      <p class="steps__text">{{ s.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.steps__text { font-size: 15px; line-height: 1.55; opacity: 0.8; }
</style>
