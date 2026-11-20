<script setup lang="ts">
/**
 * The reasons, each with the original site's glowing icon (lit at rest; on hover the icon stutters like a tube
 * catching). Default: a ruled list. `grid`: a ruled grid, four across with the icon on top (WhyBlack option B);
 * two across on tablets, back to the list on phones. `onWhite` puts each icon in a black square, because glow
 * lives on black.
 */
defineProps<{ items: { icon: string; label: string }[]; onWhite?: boolean; grid?: boolean }>()
</script>

<template>
  <ul :class="[grid ? 'rgrid' : 'why-list', { 'why-list--white': onWhite }]">
    <li v-for="(item, i) in items" :key="item.label" class="usp r-item" :class="grid ? 'rgrid__cell' : 'row'" :style="{ '--i': i }">
      <span v-if="onWhite" class="icon-sq"><img class="ic" :src="`/icons/${item.icon}.svg`" alt="" width="30" height="30"></span>
      <img v-else class="ic" :src="`/icons/${item.icon}.svg`" alt="" width="30" height="30">
      <p>{{ item.label }}</p>
    </li>
  </ul>
</template>

<style scoped>
.why-list--white .row { border-color: #d8d8d8; }

/* B: a ruled grid, no cards */
.rgrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--line-mid); }
.rgrid__cell {
  display: flex; flex-direction: column; gap: 18px; padding: 26px 24px 28px;
  border-bottom: 1px solid var(--line-mid); border-left: 1px solid var(--line-mid);
}
.rgrid__cell:nth-child(4n + 1) { border-left: 0; padding-left: 0; }
.rgrid__cell .ic { width: 32px; height: 32px; }
.rgrid__cell p { font-size: var(--fs-lead); font-weight: 800; line-height: 1.3; }

@media (max-width: 960px) {
  .rgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rgrid__cell:nth-child(4n + 1) { border-left: 1px solid var(--line-mid); padding-left: 24px; }
  .rgrid__cell:nth-child(2n + 1) { border-left: 0; padding-left: 0; }
}
@media (max-width: 560px) {
  .rgrid { grid-template-columns: 1fr; }
  .rgrid__cell { flex-direction: row; align-items: center; gap: 18px; padding: 20px 0; border-left: 0; }
  .rgrid__cell:nth-child(4n + 1) { border-left: 0; padding-left: 0; }
  .rgrid__cell .ic { width: 30px; height: 30px; }
}
</style>
