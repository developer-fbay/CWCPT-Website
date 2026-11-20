<script setup lang="ts">
/**
 * Key facts. `strip` = big heavy values with a label, divided by rules (the fact strip); `big` = a 2 by 2 block
 * of large figures; `spec` = label first, then the value as words, for facts the copy gives as phrases
 * ("Power: Backup power and backup internet").
 */
withDefaults(defineProps<{ items: { value: string; label: string }[]; variant?: 'strip' | 'big' | 'spec' }>(), { variant: 'strip' })
</script>

<template>
  <dl v-if="variant === 'spec'" class="spec">
    <div v-for="(f, i) in items" :key="f.label" class="spec__item r-item" :style="{ '--i': i }">
      <dt class="spec__l">{{ f.label }}</dt>
      <dd class="spec__v">{{ f.value }}</dd>
    </div>
  </dl>
  <dl v-else :class="variant === 'big' ? 'bigf' : 'facts'">
    <div v-for="(f, i) in items" :key="f.label" :class="{ fact: variant === 'strip' }" class="r-item" :style="{ '--i': i }">
      <dt class="mono v">{{ f.value }}</dt>
      <dd class="l">{{ f.label }}</dd>
    </div>
  </dl>
</template>

<style scoped>
dl, dd { margin: 0; }
.spec { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr)); border-top: 2px solid currentColor; }
.spec__item { display: flex; flex-direction: column; gap: 6px; padding: 18px 20px 18px 0; border-bottom: 1px solid var(--line-mid); }
.spec__l { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.spec__v { font-size: 17px; font-weight: 800; line-height: 1.35; }
</style>
