<script setup lang="ts">
import type { Plan } from '~/data/plans'

/**
 * The three plans as cards: white cards on black, the featured one reversed (black with a white outline),
 * never pink. Each badge has the light bar (one reason per plan). `detailed` shows the approved Pricing copy
 * instead of the short points; `switcher` adds the display-only currency switch (GBP, ZAR, USD): it changes
 * what is shown, never what is billed.
 */
const props = defineProps<{ plans: Plan[]; switcher?: boolean; detailed?: boolean }>()
const currencies = ['GBP', 'ZAR', 'USD'] as const
type Currency = (typeof currencies)[number]
const currency = ref<Currency>('GBP')
const shown = computed<Currency>(() => (props.switcher ? currency.value : 'GBP'))
</script>

<template>
  <div class="plans">
    <div v-if="switcher" class="plans__switch">
      <div class="seg" role="group" aria-label="Show prices in">
        <button
          v-for="c in currencies"
          :key="c"
          type="button"
          class="tabbtn"
          :class="{ sel: currency === c }"
          :aria-pressed="currency === c"
          @click="currency = c"
        >{{ c }}</button>
      </div>
      <p class="cap">Currency: display only. Billing in GBP, USD, ZAR or EUR.</p>
    </div>
    <div class="plans__grid">
      <article
        v-for="(p, i) in plans"
        :id="p.id"
        :key="p.id"
        class="lift r-item plan"
        :class="p.featured ? 'card-b' : 'card-w'"
        :style="{ '--i': i }"
      >
        <div class="plan__top">
          <h3 class="label">{{ p.name }}</h3>
          <Tag :variant="p.featured ? 'line' : 'solid-dark'" bar>{{ p.tag }}</Tag>
        </div>
        <p class="mono plan__price">{{ p.prices[shown] }}</p>
        <p class="plan__note" :class="p.featured ? 'muted' : 'muted-dark'">{{ p.notes[shown] }}</p>
        <div v-if="detailed" class="plan__text">
          <p v-for="t in p.text.slice(1)" :key="t">{{ t }}</p>
        </div>
        <ul v-else class="plan__list">
          <li v-for="item in p.list" :key="item">{{ item }}</li>
        </ul>
        <div class="row plan__actions">
          <Btn :to="p.action.to" :variant="p.featured ? 'white' : 'black'" :cta="p.action.cta">{{ p.action.label }}</Btn>
          <TextLink v-if="p.link" :to="p.link.to" :light="p.featured">{{ p.link.label }}</TextLink>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.plans { display: flex; flex-direction: column; gap: 24px; }
.plans__switch { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.plans__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; align-items: stretch; }
.plan { padding: 32px; display: flex; flex-direction: column; gap: 14px; scroll-margin-top: calc(var(--header-h) + 24px); }
.plan__top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.plan__price { font-size: var(--fs-figure); }
.plan__note { margin-top: -6px; font-size: 14px; }
.plan__list { margin: 8px 0 0; display: flex; flex-direction: column; gap: 8px; font-size: 15px; list-style: none; padding: 0; opacity: 0.85; }
.plan__text { display: flex; flex-direction: column; gap: 10px; font-size: 15px; line-height: 1.55; opacity: 0.88; }
.plan__actions { margin-top: auto; padding-top: 8px; }
@media (max-width: 720px) { .plans__switch { align-items: flex-start; } }
</style>
