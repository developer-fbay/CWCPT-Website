<script setup lang="ts">
/**
 * A real <table> with black-and-white rules: the first column names each row, figures are never lit.
 * Scrolls sideways inside its box on phones instead of squashing.
 */
defineProps<{ columns: string[]; rows: string[][]; caption?: string }>()
</script>

<template>
  <div class="dtab r-body">
    <table>
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>
      <thead>
        <tr><th v-for="(c, i) in columns" :key="i" scope="col">{{ c }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(r, ri) in rows" :key="ri">
          <th scope="row">{{ r[0] }}</th>
          <td v-for="(cell, ci) in r.slice(1)" :key="ci">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.dtab { overflow-x: auto; -webkit-overflow-scrolling: touch; }
table { width: 100%; min-width: 640px; border-collapse: collapse; border-top: 2px solid currentColor; }
th, td { text-align: left; vertical-align: top; padding: 16px 16px 16px 0; border-bottom: 1px solid var(--line-mid); font-size: 15px; line-height: 1.5; }
.on-white th, .on-white td { border-color: #d8d8d8; }
thead th { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
tbody th { font-weight: 800; }
</style>
