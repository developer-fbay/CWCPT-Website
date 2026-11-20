<script setup lang="ts">
import { privacyHero, privacyPolicy, privacySeo } from '~/data/privacy'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Privacy policy' }]
usePageSeo({ ...privacySeo, path: '/privacy-policy', breadcrumbs: crumbs })
</script>

<template>
  <div>
    <PageHero :title="privacyHero.title" :crumbs="crumbs">
      <p>{{ privacyHero.intro }}</p>
    </PageHero>
    <section class="sec on-white" data-rv aria-label="Policy">
      <div class="wrap">
        <div class="prose r-body policy">
          <template v-for="(b, i) in privacyPolicy" :key="i">
            <h2 v-if="'h' in b && b.h === 2" class="mono policy__h2">{{ b.text }}</h2>
            <h3 v-else-if="'h' in b" class="policy__h3">{{ b.text }}</h3>
            <p v-else-if="'p' in b">{{ b.p }}</p>
            <ul v-else-if="'list' in b" class="policy__list"><li v-for="li in b.list" :key="li">{{ li }}</li></ul>
            <address v-else-if="'address' in b" class="policy__addr">
              <span>{{ b.address[0] }}</span><span>{{ b.address[1] }}</span>
              <a href="mailto:info@coworkcapetown.com">{{ b.address[2] }}</a>
            </address>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.policy { max-width: 72ch; }
.policy > * + * { margin-top: 1em; }
.policy__h2 { font-size: var(--fs-h3); margin-top: 2em; }
.policy__h2:first-child { margin-top: 0; }
.policy__h3 { font-size: var(--fs-body); font-weight: 800; margin-top: 1.5em; }
.policy__list { padding-left: 1.2em; list-style: disc; }
.policy__list li + li { margin-top: 0.35em; }
.policy__addr { font-style: normal; display: flex; flex-direction: column; gap: 2px; }
</style>
