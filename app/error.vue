<script setup lang="ts">
import { notFound } from '~/data/site'

const props = defineProps<{ error: { statusCode?: number } }>()
const code = computed(() => props.error?.statusCode || 404)
useSeoMeta({ title: `${code.value} | Co Work Cape Town`, robots: 'noindex, follow' })
</script>

<template>
  <NuxtLayout>
    <section class="nf">
      <div class="wrap nf__inner">
        <div class="nf__sq" aria-hidden="true"><div class="line-mask nf__line" /></div>
        <div class="nf__text">
          <p class="label">Error {{ code }}</p>
          <h1 class="mono h1">{{ code === 404 ? 'Not here' : 'Something broke' }}<span class="dot">.</span></h1>
          <p v-if="filled(notFound.message)" class="lead muted">{{ notFound.message }}</p>
          <div class="row">
            <Btn to="/">Back home</Btn>
            <Btn to="/pricing" variant="ghost">See pricing</Btn>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.nf { padding: clamp(56px, 9vw, 120px) 0; }
.nf__inner { display: grid; grid-template-columns: minmax(0, 360px) 1fr; gap: clamp(32px, 5vw, 64px); align-items: center; }
.nf__sq { position: relative; aspect-ratio: 1 / 1; background: #111111; overflow: hidden; }
.nf__line { position: absolute; inset: 0; }
.nf__text { display: flex; flex-direction: column; gap: 22px; }
@media (max-width: 760px) { .nf__inner { grid-template-columns: 1fr; } .nf__sq { max-width: 220px; } }
</style>
