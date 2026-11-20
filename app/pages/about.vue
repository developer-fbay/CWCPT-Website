<script setup lang="ts">
import { aboutFacts, aboutHero, aboutSeo, factsChecked, group, mentions, people, whyItExists } from '~/data/about'
import { partners } from '~/data/partners'
import { reviews } from '~/data/reviews'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'About' }]
usePageSeo({ ...aboutSeo, path: '/about', breadcrumbs: crumbs })

// Blocks still waiting for copy ([bracketed] briefs in app/data) stay out until written (PLAN.md)
const why = whyItExists.paragraphs.filter((p) => filled(p))
const team = people.filter((p) => filled(p.name))
</script>

<template>
  <div>
    <PageHero :title="aboutHero.title" :crumbs="crumbs" :image="aboutHero.image" rating>
      <p v-if="filled(aboutHero.intro)">{{ aboutHero.intro }}</p>
      <template #actions>
        <Btn to="/contact-us?for=tour" cta="about_hero_tour">Book a tour</Btn>
        <Btn to="/pricing" variant="ghost" cta="about_hero_pricing">See pricing</Btn>
      </template>
    </PageHero>

    <!-- The facts: short, stable, dated; every other page quotes these numbers -->
    <section class="sec on-white" data-rv aria-labelledby="facts-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="facts-h" :lines="['The', 'facts']" />
          <p v-if="filled(factsChecked)" class="cap r-body">{{ factsChecked }}</p>
        </div>
        <dl class="facts-grid">
          <div v-for="(f, i) in aboutFacts" :key="f.label" class="fg r-item" :style="{ '--i': i % 5 }">
            <dt class="fg__l">{{ f.label }}</dt>
            <dd class="fg__v">{{ f.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section v-if="why.length" class="sec" data-rv aria-labelledby="why-h">
      <div class="wrap split">
        <SectionHeading id="why-h" :lines="whyItExists.heading" />
        <div class="prose muted r-body"><p v-for="p in why" :key="p">{{ p }}</p></div>
      </div>
    </section>

    <section v-if="team.length" class="sec" data-rv aria-labelledby="people-h">
      <div class="wrap stack-lg">
        <SectionHeading id="people-h" :lines="['The', 'people']" />
        <ul class="people">
          <li v-for="(p, i) in team" :key="p.role" class="person r-item" :style="{ '--i': i }">
            <img v-if="p.photo" class="person__img" :src="p.photo.src" :alt="p.photo.alt" width="400" height="400" loading="lazy" decoding="async">
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

    <section v-if="filled(group.text)" class="sec" data-rv aria-labelledby="group-h">
      <div class="wrap split">
        <div class="stack">
          <SectionHeading id="group-h" :lines="group.heading" />
          <p class="lead muted r-body">{{ group.text }}</p>
        </div>
        <LogoStrip :items="partners" class="r-media" />
      </div>
    </section>

    <section v-if="filled(mentions)" class="sec" data-rv aria-labelledby="mentions-h">
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
.person__img { display: block; width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: cover; border-radius: var(--radius); background: #111111; }
.person__n { font-weight: 800; font-size: 18px; }
.reviews { overflow: hidden; }
.rev-meta { justify-content: flex-end; }
.rev-marq { margin-top: 44px; }
@media (max-width: 960px) { .split { grid-template-columns: 1fr; } .rev-meta { justify-content: flex-start; } }
</style>
