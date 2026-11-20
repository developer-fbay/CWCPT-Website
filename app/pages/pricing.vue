<script setup lang="ts">
import { included, plans, pricesHeading, pricingClose, pricingFaqs, pricingHero, pricingSeo, terms } from '~/data/plans'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Pricing' }]
usePageSeo({ ...pricingSeo, path: '/pricing', breadcrumbs: crumbs, faqs: pricingFaqs })
</script>

<template>
  <div>
    <PageHero :title="pricingHero.title" :crumbs="crumbs">
      <p v-for="p in pricingHero.paragraphs" :key="p">{{ p }}</p>
    </PageHero>

    <!-- The three plans, under the sagging strip light, with the display-only currency switch -->
    <section class="plans-sec" data-rv aria-labelledby="prices-h">
      <div class="plans-sl"><StripLight shape="sag" /></div>
      <div class="wrap stack-lg">
        <SectionHeading id="prices-h" label="Pricing" :lines="pricesHeading" />
        <!-- #plans: where "Pricing" in the menu lands, so the whole row of cards is on screen -->
        <div id="plans" class="plans-at"><PlanCards :plans="plans" switcher detailed /></div>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="inc-h">
      <div class="wrap stack-lg">
        <SectionHeading id="inc-h" :lines="included.heading" />
        <DataTable :columns="['', ...included.columns]" :rows="included.rows" caption="What's included with each plan" />
        <p class="muted r-body note">{{ included.note }}</p>
      </div>
    </section>

    <section class="sec steps-sec" data-rv aria-labelledby="terms-h">
      <div class="wrap stack-lg">
        <SectionHeading id="terms-h" :lines="terms.heading" />
        <dl class="terms">
          <div v-for="(t, i) in terms.items" :key="t.title" class="terms__item r-item" :style="{ '--i': i }">
            <dt class="terms__t">{{ t.title }}</dt>
            <dd class="terms__d">
              {{ t.text }}
              <TextLink v-if="t.link" :to="t.link.to" light>{{ t.link.label }}</TextLink>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="pq-h">
      <div class="wrap faq-grid">
        <div class="stack">
          <SectionHeading id="pq-h" :lines="['Pricing', 'questions']" />
          <div class="row r-btns links">
            <TextLink to="/faq">All questions</TextLink>
            <TextLink to="/office-cost-cape-town">How this compares with a lease</TextLink>
          </div>
        </div>
        <FaqList :items="pricingFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand :lines="pricingClose.lines" :text="pricingClose.text" :actions="pricingClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 26px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.plans-sec { padding: 0 0 var(--sec-y); }
.plans-sl { max-width: var(--sl-max); margin: 0 auto; }
.plans-at { scroll-margin-top: calc(var(--header-h) + 24px); }
.note { font-size: 15px; }
.terms { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 0 40px; border-top: 2px solid currentColor; margin: 0; }
.terms__item { padding: 26px 0; border-bottom: 1px solid var(--line-mid); display: flex; flex-direction: column; gap: 10px; }
.terms__t { font-size: 20px; font-weight: 800; font-stretch: 106%; }
.terms__d { margin: 0; font-size: 16px; line-height: 1.6; color: var(--muted); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
.links { gap: 10px 28px; }
.faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
@media (max-width: 960px) { .faq-grid { grid-template-columns: 1fr; } }
</style>
