<script setup lang="ts">
/**
 * Questions with answers: rules between them; the plus turns into a cross (420ms). The open question stays
 * plain: only its closing "?" lights, as a neon tube that flickers on. Answers are always in the HTML (for
 * Google and FAQPage schema); the first is open. Answers may hold a link deeper (`link`).
 * Text is word for word from approved or live copy; questions are given without their "?".
 */
interface Faq { q: string; a: string; link?: { label: string; to: string } }
const props = withDefaults(defineProps<{ items: Faq[]; firstOpen?: boolean }>(), { firstOpen: true })
const open = ref<number | null>(props.firstOpen ? 0 : null)
const uid = useId()
const toggle = (i: number) => { open.value = open.value === i ? null : i }
const qText = (q: string) => q.replace(/\?\s*$/, '')
</script>

<template>
  <div class="faq">
    <div v-for="(f, i) in items" :key="f.q" class="faq-item" :class="{ 'is-open': open === i }">
      <h3 style="margin: 0; font: inherit">
        <button
          :id="`${uid}-q${i}`"
          type="button"
          class="faq-q"
          :aria-expanded="open === i"
          :aria-controls="`${uid}-a${i}`"
          @click="toggle(i)"
        >
          <span>{{ qText(f.q) }}<span class="qm">?<span class="qm-core" aria-hidden="true">?</span></span></span>
          <span class="plus" aria-hidden="true" />
        </button>
      </h3>
      <div :id="`${uid}-a${i}`" class="faq-a" role="region" :aria-labelledby="`${uid}-q${i}`">
        <div>
          <div class="prose">
            <p>{{ f.a }}</p>
            <p v-if="f.link"><TextLink :to="f.link.to">{{ f.link.label }}</TextLink></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
