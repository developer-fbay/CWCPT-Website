<script setup lang="ts">
import type { Office } from '~/data/offices'

/**
 * One office: photo (zooms inside its frame), heavy name, "Available" with the light bar or a plain "Let",
 * a detail table (desks or people, price with rand beside), the one line from the approved copy, buttons.
 * Let offices are greyed with "Tell me when it's free". `featured` = reversed (black with a white outline).
 */
const props = defineProps<{ office: Office; featured?: boolean }>()
const let_ = computed(() => props.office.status === 'let')
</script>

<template>
  <article :id="office.anchor" class="lift oc" :class="featured ? 'card-b' : 'card-w'">
    <div class="zoom oc__img">
      <img
        :src="office.image.src"
        :srcset="office.image.srcset"
        sizes="(max-width: 720px) 92vw, 380px"
        :alt="office.image.alt"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        :class="{ 'oc__img--let': let_ }"
      >
    </div>
    <div class="oc__body">
      <div class="oc__top">
        <h3 class="mono oc__name">{{ office.name }}</h3>
        <Tag v-if="let_" variant="line">Let</Tag>
        <Tag v-else :variant="featured ? 'line' : 'solid-dark'" bar>Available</Tag>
      </div>
      <dl class="dt">
        <dt>{{ office.sizeLabel }}</dt><dd>{{ office.size }}</dd>
        <dt>Price</dt><dd>{{ office.price }} a month <span class="nowrap">({{ office.priceZar }})</span>, excl. VAT</dd>
      </dl>
      <p class="oc__line">{{ office.line }}</p>
      <div class="row oc__actions">
        <template v-if="let_">
          <Btn :to="`/contact-us?for=office&ref=${office.anchor}`" :variant="featured ? 'ghost' : 'ghost-dark'" sm :cta="`office_${office.anchor}_waitlist`">Tell me when it's free</Btn>
        </template>
        <template v-else>
          <Btn :to="`/contact-us?for=office&ref=${office.anchor}`" :variant="featured ? 'white' : 'black'" sm :cta="`office_${office.anchor}_quote`">{{ office.quoteLabel }}</Btn>
          <TextLink v-if="office.tourLink" :to="`/contact-us?for=tour&ref=${office.anchor}`" :light="featured">See it on a tour</TextLink>
        </template>
      </div>
    </div>
  </article>
</template>

<style scoped>
.oc { display: flex; flex-direction: column; scroll-margin-top: calc(var(--header-h) + 24px); }
.oc__img { height: var(--card-img); border-radius: var(--radius); }
.oc__img--let { filter: grayscale(1) contrast(1.05); }
.oc__body { padding: 22px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
.oc__top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.oc__name { font-size: var(--fs-card); }
.oc__line { font-size: 15px; line-height: 1.55; color: var(--ink-2); }
.card-b .oc__line { color: #cfcfcf; }
.oc__actions { margin-top: auto; }
.nowrap { white-space: nowrap; }
</style>
