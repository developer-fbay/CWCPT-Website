<script setup lang="ts">
import type { Office } from '~/data/offices'

/**
 * One office as a row, for the list view on the Offices page: the name with "Available" (light bar) or "Let",
 * the desks or people, the price with rand beside, and the quote button. No photo and no extra line, so all nine
 * can be read one under the other. Let offices are greyed with "Tell me when it's free", as on the card.
 */
const props = defineProps<{ office: Office }>()
const let_ = computed(() => props.office.status === 'let')
</script>

<template>
  <article :id="office.anchor" class="orow" :class="{ 'is-let': let_ }">
    <div class="orow__name">
      <h3 class="mono">{{ office.name }}</h3>
      <Tag v-if="let_" variant="line">Let</Tag>
      <Tag v-else variant="solid-dark" bar>Available</Tag>
    </div>
    <dl class="orow__facts">
      <div><dt>{{ office.sizeLabel }}</dt><dd>{{ office.size }}</dd></div>
      <div><dt>Price</dt><dd>{{ office.price }} a month <span class="nowrap">({{ office.priceZar }})</span>, excl. VAT</dd></div>
    </dl>
    <div class="orow__act">
      <Btn v-if="let_" :to="`/contact-us?for=office&ref=${office.anchor}`" variant="ghost-dark" sm :cta="`office_${office.anchor}_waitlist`">Tell me when it's free</Btn>
      <Btn v-else :to="`/contact-us?for=office&ref=${office.anchor}`" variant="black" sm :cta="`office_${office.anchor}_quote`">{{ office.quoteLabel }}</Btn>
    </div>
  </article>
</template>

<style scoped>
.orow {
  display: grid; grid-template-columns: minmax(200px, 1fr) minmax(0, 2.4fr) auto; gap: 14px 32px; align-items: center;
  padding: 20px 0; border-bottom: 1px solid var(--line-light); scroll-margin-top: calc(var(--header-h) + 24px);
}
.orow__name { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }
.orow__name h3 { font-size: var(--fs-card); }
.orow__facts { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 12px 32px; margin: 0; }
.orow__facts dt { font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
.orow__facts dd { margin: 0; font-size: 15px; line-height: 1.45; }
.orow__act { justify-self: end; }
.is-let .orow__name, .is-let .orow__facts { opacity: 0.55; }
.nowrap { white-space: nowrap; }

@media (max-width: 860px) {
  .orow { grid-template-columns: 1fr; gap: 12px; }
  .orow__facts { grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); gap: 8px 20px; }
  .orow__act { justify-self: start; }
}
</style>
