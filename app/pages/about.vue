<script setup lang="ts">
import { aboutFacts, aboutHero, aboutSeo, factsChecked, group, mentions, people, whyItExists } from '~/data/about'
import { partners } from '~/data/partners'
import { reviews } from '~/data/reviews'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'About' }]
usePageSeo({ ...aboutSeo, path: '/about', breadcrumbs: crumbs })
</script>

<template>
  <div>
    <PageHero :title="aboutHero.title" :crumbs="crumbs" rating>
      <p>{{ aboutHero.intro }}</p>
      <template #actions>
        <Btn to="/contact-us?for=tour" cta="about_hero_tour">Book A Tour</Btn>
        <Btn to="/pricing" variant="ghost" cta="about_hero_pricing">See Pricing</Btn>
      </template>
    </PageHero>

    <!-- The facts: short, stable, dated; every other page quotes these numbers -->
    <section class="sec on-white" data-rv aria-labelledby="facts-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="facts-h" :lines="['The', 'facts']" />
          <p class="cap r-body">{{ factsChecked }}</p>
        </div>
        <dl class="facts-grid">
          <div v-for="(f, i) in aboutFacts" :key="f.label" class="fg r-item" :style="{ '--i': i % 5 }">
            <dt class="fg__l">{{ f.label }}</dt>
            <dd class="fg__v">{{ f.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="why-h">
      <div class="wrap split">
        <SectionHeading id="why-h" :lines="whyItExists.heading" />
        <div class="prose muted r-body"><p v-for="p in whyItExists.paragraphs" :key="p">{{ p }}</p></div>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="people-h">
      <div class="wrap stack-lg">
        <SectionHeading id="people-h" :lines="['The', 'people']" />
        <ul class="people">
          <li v-for="(p, i) in people" :key="p.role" class="person r-item" :style="{ '--i': i }">
            <div class="person__img" aria-hidden="true">[Photo]</div>
            <p class="person__n">{{ p.name }}</p>
            <p class="muted">{{ p.role }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="reviews" class="sec reviews" data-rv aria-labelledby="rev-h">
      <div class="wrap">
        <div class="sec-top">
          <SectionHeading id="rev-h" label="Reviews" :lines="['Members', 'say']" />
          <div class="row r-body rev-meta"><Rating /></div>
        </div>
      </div>
      <ReviewsMarquee :reviews="reviews" class="rev-marq" />
    </section>

    <section class="sec" data-rv aria-labelledby="group-h">
      <div class="wrap split">
        <div class="stack">
          <SectionHeading id="group-h" :lines="group.heading" />
          <p class="lead muted r-body">{{ group.text }}</p>
        </div>
        <LogoStrip :items="partners" class="r-media" />
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="mentions-h">
      <div class="wrap split">
        <SectionHeading id="mentions-h" :lines="['Mentions']" />
        <p class="lead muted r-body">{{ mentions }}</p>
      </div>
    </section>

    <ClosingBand :lines="['See it for', 'yourself']" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 22px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: start; }
.facts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); margin: 0; border-top: 2px solid var(--black); }
.fg { padding: 22px 20px 22px 0; border-bottom: 1px solid #d8d8d8; display: flex; flex-direction: column; gap: 6px; }
.fg__l { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted-dark); }
.fg__v { margin: 0; font-size: 18px; font-weight: 800; line-height: 1.35; }
.people { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 24px; }
.person { display: flex; flex-direction: column; gap: 8px; }
.person__img { aspect-ratio: 1 / 1; border-radius: var(--radius); background: #111111; border: 1px dashed #333333; display: flex; align-items: center; justify-content: center; color: var(--grey); font-size: 13px; }
.person__n { font-weight: 800; font-size: 18px; }
.reviews { overflow: hidden; }
.rev-meta { justify-content: flex-end; }
.rev-marq { margin-top: 44px; }
@media (max-width: 960px) { .split { grid-template-columns: 1fr; } .rev-meta { justify-content: flex-start; } }
</style>
