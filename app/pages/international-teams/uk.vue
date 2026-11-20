<script setup lang="ts">
import { seatCost, ukClient, ukClose, ukFaqs, ukHero, ukSeo, workingDay } from '~/data/international'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'International Teams', to: '/international-teams' }, { label: 'UK' }]
usePageSeo({ ...ukSeo, path: '/international-teams/uk', breadcrumbs: crumbs, faqs: ukFaqs })
</script>

<template>
  <div>
    <PageHero :title="ukHero.title" :crumbs="crumbs" :image="ukHero.image" rating>
      <p v-if="filled(ukHero.intro)">{{ ukHero.intro }}</p>
      <template #actions>
        <Btn to="/contact-us?for=video" cta="uk_hero_video">Book a video walkthrough (9 to 5 UK)</Btn>
        <Btn to="/international-teams/offshore-team-cost" variant="ghost" cta="uk_hero_cost">Seat costs in pounds</Btn>
      </template>
    </PageHero>

    <section class="sec" data-rv aria-labelledby="day-h">
      <div class="wrap stack-lg">
        <SectionHeading id="day-h" :lines="workingDay.heading" />
        <DataTable
          :columns="['', 'London', 'Cape Town', '']"
          :rows="workingDay.rows.map((r) => [r.season, r.london, r.capeTown, r.note])"
          caption="The working day in London and Cape Town"
        />
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="seat-h">
      <div class="wrap split">
        <SectionHeading id="seat-h" :lines="seatCost.heading" />
        <div class="stack">
          <dl class="lines r-body">
            <template v-for="l in seatCost.lines" :key="l.label"><dt>{{ l.label }}</dt><dd>{{ l.value }}</dd></template>
          </dl>
          <p v-if="filled(seatCost.compare)" class="r-body">{{ seatCost.compare }}</p>
          <div class="r-btns"><TextLink to="/international-teams/offshore-team-cost">What a Cape Town team costs</TextLink></div>
        </div>
      </div>
    </section>

    <section v-if="filled(ukClient)" class="sec" data-rv aria-labelledby="client-h">
      <div class="wrap split">
        <SectionHeading id="client-h" :lines="['A UK client', 'here']" />
        <p class="lead muted r-body">{{ ukClient }}</p>
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="ukq-h">
      <div class="wrap faq-grid">
        <div class="stack">
          <SectionHeading id="ukq-h" :lines="['UK employer', 'questions']" />
          <div class="row r-btns links">
            <TextLink to="/faq#international">All questions</TextLink>
            <TextLink to="/international-teams">Back to international teams</TextLink>
          </div>
        </div>
        <FaqList :items="ukFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand :lines="ukClose.lines" :actions="ukClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 22px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
.lines { display: grid; grid-template-columns: 160px 1fr; margin: 0; border-top: 2px solid var(--black); }
.lines > * { padding: 16px 0; border-bottom: 1px solid #d8d8d8; margin: 0; font-size: 16px; line-height: 1.5; }
.lines dt { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding-top: 19px; }
.links { gap: 10px 28px; }
.faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
@media (max-width: 960px) { .split, .faq-grid { grid-template-columns: 1fr; } }
</style>
