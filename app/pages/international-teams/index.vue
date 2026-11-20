<script setup lang="ts">
import { guides, handled, howFromAbroad, intlClose, intlFaqs, intlHero, intlSeo, whyCapeTown } from '~/data/international'
import { partners } from '~/data/partners'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'International Teams' }]
usePageSeo({ ...intlSeo, path: '/international-teams', breadcrumbs: crumbs, faqs: intlFaqs })

// Blocks still waiting for copy ([bracketed] briefs in app/data) and links to hidden pages stay out (PLAN.md)
const isHidden = useHiddenPages()
const handledItems = handled.items.filter((i) => filled(i.text))
const stepsReady = howFromAbroad.steps.every((s) => filled(s.text))
const guideCards = guides.filter((g) => !isHidden(g.to))
</script>

<template>
  <div>
    <PageHero :title="intlHero.title" :crumbs="crumbs" :image="intlHero.image" rating>
      <p v-if="filled(intlHero.intro)">{{ intlHero.intro }}</p>
      <template #actions>
        <Btn to="/contact-us?for=video" cta="intl_hero_video">Book a video walkthrough</Btn>
        <Btn to="/international-teams/offshore-team-cost" variant="ghost" cta="intl_hero_cost">What a Cape Town team costs</Btn>
      </template>
      <template #after><LogoStrip :items="partners" class="r-btns" /></template>
    </PageHero>

    <section class="sec" data-rv aria-labelledby="handled-h">
      <div class="wrap stack-lg">
        <SectionHeading id="handled-h" :lines="handled.heading" />
        <IconGrid :items="handledItems" />
      </div>
    </section>

    <section v-if="stepsReady" class="sec" data-rv aria-labelledby="how-h">
      <div class="wrap stack-lg">
        <SectionHeading id="how-h" :lines="howFromAbroad.heading" />
        <div class="on-white panel"><StepsList :steps="howFromAbroad.steps" /></div>
        <p class="muted r-body">Full detail on <NuxtLink to="/pricing">Pricing</NuxtLink>.<template v-if="!isHidden('/international-teams/offshore-team-cost')"> Seat-by-seat maths on <NuxtLink to="/international-teams/offshore-team-cost">what a Cape Town team costs</NuxtLink>.</template></p>
      </div>
    </section>

    <section v-if="guideCards.length" class="sec on-white" data-rv aria-labelledby="guides-h">
      <div class="wrap stack-lg">
        <SectionHeading id="guides-h" :lines="['Guides for', 'employers']" />
        <div class="guides">
          <NuxtLink v-for="(g, i) in guideCards" :key="g.to" :to="g.to" class="card-b lift guide r-item" :style="{ '--i': i }">
            <h3 class="mono guide__t">{{ g.title }}</h3>
            <p v-if="filled(g.text)" class="guide__p">{{ g.text }}</p>
            <span class="tlink tlink-light">Read the guide <span class="arr" aria-hidden="true"><svg viewBox="0 0 16 12"><path d="M1 6h13M9 1l5 5-5 5" /></svg></span></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="filled(whyCapeTown.text)" class="sec" data-rv aria-labelledby="whycpt-h">
      <div class="wrap split">
        <SectionHeading id="whycpt-h" :lines="whyCapeTown.heading" />
        <div class="stack">
          <p class="lead muted r-body">{{ whyCapeTown.text }}</p>
          <div class="r-btns"><TextLink to="/location" light>Location</TextLink></div>
        </div>
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="eq-h">
      <div class="wrap faq-grid">
        <div class="stack">
          <SectionHeading id="eq-h" :lines="['Employer', 'questions']" />
          <div class="r-btns"><TextLink to="/faq#international">All questions</TextLink></div>
        </div>
        <FaqList :items="intlFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand :lines="intlClose.lines" :actions="intlClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 22px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
.guides { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; }
.guide { padding: 32px; display: flex; flex-direction: column; gap: 16px; text-decoration: none; }
.guide__t { font-size: var(--fs-card); }
.guide__p { font-size: 15px; line-height: 1.55; color: #cfcfcf; flex: 1; }
.faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
@media (max-width: 960px) { .split, .faq-grid { grid-template-columns: 1fr; } }
</style>
