<script setup lang="ts">
import { offshore, offshoreSeo } from '~/data/guides'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'International Teams', to: '/international-teams' }, { label: 'Offshore team cost' }]
const path = '/international-teams/offshore-team-cost'
usePageSeo({ ...offshoreSeo, path, breadcrumbs: crumbs, schema: [articleSchema({ headline: offshore.title, description: offshoreSeo.description, path })] })
</script>

<template>
  <div>
    <PageHero :title="offshore.title" :crumbs="crumbs">
      <p>{{ offshore.intro }}</p>
      <p class="cap">{{ offshore.updated }}</p>
      <template #actions>
        <Btn to="/contact-us?for=quote" cta="offshore_hero_quote">Get a workspace quote</Btn>
        <Btn to="#worked-example" variant="ghost" cta="offshore_hero_example">Jump to the worked example</Btn>
      </template>
    </PageHero>

    <section class="sec on-white" data-rv aria-labelledby="lines-h">
      <div class="wrap stack-lg">
        <SectionHeading id="lines-h" :lines="offshore.table.heading" />
        <DataTable :columns="offshore.table.columns" :rows="offshore.table.rows" caption="The four lines per seat" />
        <p class="cap r-body">{{ offshore.table.note }}</p>
      </div>
    </section>

    <section v-for="(s, i) in offshore.sections" :id="i === 2 ? 'worked-example' : undefined" :key="i" class="sec" data-rv>
      <div class="wrap split">
        <SectionHeading :lines="s.heading" size="h3" />
        <p class="lead muted r-body">{{ s.text }}</p>
      </div>
    </section>

    <ClosingBand :lines="['Want the workspace line', 'priced for your team?']" :actions="[{ label: 'Get a quote', to: '/contact-us?for=quote', cta: 'offshore_band_quote' }]" />
  </div>
</template>

<style scoped>
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; scroll-margin-top: calc(var(--header-h) + 24px); }
@media (max-width: 960px) { .split { grid-template-columns: 1fr; } }
</style>
