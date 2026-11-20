<script setup lang="ts">
import { officeCost, officeCostSeo } from '~/data/guides'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Office cost guide' }]
const path = '/office-cost-cape-town'
usePageSeo({ ...officeCostSeo, path, breadcrumbs: crumbs, schema: [articleSchema({ headline: officeCost.title, description: officeCostSeo.description, path })] })
</script>

<template>
  <div>
    <PageHero :title="officeCost.title" :crumbs="crumbs">
      <p>{{ officeCost.intro }}</p>
      <p class="cap">{{ officeCost.updated }}</p>
    </PageHero>

    <section class="sec on-white" data-rv aria-labelledby="rent-h">
      <div class="wrap stack-lg">
        <SectionHeading id="rent-h" :lines="officeCost.table.heading" />
        <DataTable :columns="officeCost.table.columns" :rows="officeCost.table.rows" caption="Rent by area, per m² per month" />
        <p class="cap r-body">{{ officeCost.table.note }}</p>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="ours-h">
      <div class="wrap split">
        <SectionHeading id="ours-h" :lines="officeCost.ours.heading" size="h3" />
        <div class="stack">
          <p v-for="l in officeCost.ours.lines" :key="l" class="lead r-body">{{ l }}</p>
          <div class="row r-btns links">
            <TextLink to="/pricing" light>Full pricing</TextLink>
            <TextLink to="/offices" light>See the nine offices</TextLink>
          </div>
        </div>
      </div>
    </section>

    <section v-for="(s, i) in officeCost.sections" :key="i" class="sec" data-rv>
      <div class="wrap split">
        <SectionHeading :lines="s.heading" size="h3" />
        <p class="lead muted r-body">{{ s.text }}</p>
      </div>
    </section>

    <ClosingBand :lines="['Want the number', 'for your team?']" :actions="[{ label: 'Get a quote', to: '/contact-us?for=office', cta: 'officecost_band_quote' }, { label: 'See the offices', to: '/offices', cta: 'officecost_band_offices', variant: 'ghost' }]" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 18px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
.links { gap: 10px 28px; }
@media (max-width: 960px) { .split { grid-template-columns: 1fr; } }
</style>
