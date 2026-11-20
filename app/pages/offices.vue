<script setup lang="ts">
import { abroad, movingIn, officeFacts, officeFaqs, officeIncludes, offices, officesClose, officesHero, officesIntro, officesSeo } from '~/data/offices'
import { partners } from '~/data/partners'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Offices' }]
usePageSeo({ ...officesSeo, path: '/offices', breadcrumbs: crumbs, faqs: officeFaqs, image: officesHero.image.src.replace('-800', '-1600') })

// Grid (cards with photos) or list (one row per office, one under the other). The page is built as the grid;
// once someone switches, the new view shows at once instead of waiting for the scroll reveal again.
const view = ref<'grid' | 'list'>('grid')
const switched = ref(false)
const setView = (v: 'grid' | 'list') => { switched.value = true; view.value = v }
</script>

<template>
  <div>
    <PageHero :title="officesHero.title" :crumbs="crumbs" :image="officesHero.image" rating>
      <p v-for="p in officesHero.paragraphs" :key="p">{{ p }}</p>
      <template #actions>
        <Btn to="/contact-us?for=office" cta="offices_hero_quote">Get a quote</Btn>
        <Btn to="/contact-us?for=tour" variant="ghost" cta="offices_hero_tour">Book a tour</Btn>
      </template>
    </PageHero>

    <section class="facts-band" data-rv aria-label="The offices at a glance">
      <div class="wrap"><Facts :items="officeFacts" variant="spec" /></div>
    </section>

    <!-- The nine offices, on white: jump chips and the grid / list switch, then one card or one row per office
         (one address, nine anchors). #the-offices is where the Pricing card's link lands. -->
    <section class="sec on-white" data-rv aria-labelledby="nine-h">
      <div id="the-offices" class="wrap stack-lg offices-at">
        <div class="sec-top">
          <SectionHeading id="nine-h" label="The nine offices" :lines="[officesIntro.heading]" size="h3" />
          <p class="lead r-body">{{ officesIntro.text }}</p>
        </div>
        <div class="office-bar r-body">
          <nav aria-label="Jump to an office" class="chips">
            <a v-for="o in offices" :key="o.anchor" :href="`#${o.anchor}`" class="chip" :class="{ 'is-let': o.status === 'let' }">
              {{ o.name }} <small>· {{ o.chip }}</small>
            </a>
          </nav>
          <div class="tabs view-tg" role="group" aria-label="Show the offices as">
            <button type="button" class="tabbtn view-tg__b" :class="{ sel: view === 'grid' }" :aria-pressed="view === 'grid'" aria-label="Grid view" title="Grid view" @click="setView('grid')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" />
              </svg>
            </button>
            <button type="button" class="tabbtn view-tg__b" :class="{ sel: view === 'list' }" :aria-pressed="view === 'list'" aria-label="List view" title="List view" @click="setView('list')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="M9.5 6h11M9.5 12h11M9.5 18h11" /><rect x="3" y="4.5" width="3" height="3" fill="currentColor" stroke="none" /><rect x="3" y="10.5" width="3" height="3" fill="currentColor" stroke="none" /><rect x="3" y="16.5" width="3" height="3" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="view === 'grid'" class="cards" :class="{ 'is-now': switched }">
          <!-- Gatsby gets the reversed (black) card: the biggest office, the way the featured plan is reversed -->
          <OfficeCard v-for="(o, i) in offices" :key="o.anchor" :office="o" :featured="o.anchor === 'gatsby'" class="r-item" :style="{ '--i': i % 3 }" />
        </div>
        <div v-else class="olist is-now">
          <OfficeRow v-for="o in offices" :key="o.anchor" :office="o" />
        </div>
        <p class="cap">{{ officesIntro.footnote }}</p>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="inc-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="inc-h" :lines="officeIncludes.heading" />
          <div class="row r-body links">
            <TextLink v-for="l in officeIncludes.links" :key="l.to" :to="l.to" light>{{ l.label }}</TextLink>
          </div>
        </div>
        <IconGrid :items="officeIncludes.items" />
      </div>
    </section>

    <section class="sec steps-sec" data-rv aria-labelledby="move-h">
      <div class="wrap stack-lg">
        <SectionHeading id="move-h" :lines="movingIn.heading" />
        <div class="on-white panel steps-panel"><StepsList :steps="movingIn.steps" /></div>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="abroad-h">
      <div class="wrap abroad">
        <div class="stack">
          <SectionHeading id="abroad-h" :lines="abroad.heading" />
          <p class="lead muted r-body">{{ abroad.text }}</p>
          <div class="row r-btns links">
            <TextLink v-for="l in abroad.links" :key="l.to" :to="l.to" light>{{ l.label }}</TextLink>
          </div>
        </div>
        <LogoStrip :items="partners" class="r-media" />
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="oq-h">
      <div class="wrap faq-grid">
        <div class="stack">
          <SectionHeading id="oq-h" :lines="['Office', 'questions']" />
          <div class="r-btns"><TextLink to="/faq">All questions</TextLink></div>
        </div>
        <FaqList :items="officeFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand :lines="officesClose.lines" :text="officesClose.text" :actions="officesClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 26px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.facts-band { padding-bottom: clamp(48px, 6vw, 72px); }
.offices-at { scroll-margin-top: calc(var(--header-h) + 24px); }
.office-bar { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px 32px; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.view-tg { flex: none; }
.view-tg__b { display: inline-flex; padding: 9px 13px; line-height: 0; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 16px; }
.olist { border-top: 2px solid currentColor; }
/* After a switch the new view shows at once (a short fade), not after the scroll reveal's delay */
.is-now { animation: fadeup 320ms var(--ease-out) both; }
.cards.is-now .r-item { animation: none; }
@media (max-width: 720px) { .office-bar { flex-direction: column; } }
.links { gap: 10px 28px; }
.steps-panel { padding: clamp(28px, 4vw, 48px); }
.abroad { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
.faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
@media (max-width: 960px) { .abroad, .faq-grid { grid-template-columns: 1fr; } }
</style>
