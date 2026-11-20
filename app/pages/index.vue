<script setup lang="ts">
import { features, homeFacts, homeFaqs, homeSeo, locationTeaser, officesLead, whyLayout, whyLead } from '~/data/home'
import { offices } from '~/data/offices'
import { plans, plansHomeLead } from '~/data/plans'
import { reviews } from '~/data/reviews'
import { site } from '~/data/site'
import { photo, type BlogCard } from '~/data/types'
import { maps } from '~/data/location'

// Structure: wireframe HomeB. Look: the HomeBW board. Facts: approved copy. See _context/03-pages.md.
const { siteUrl } = useRuntimeConfig().public
usePageSeo({
  title: homeSeo.title,
  description: homeSeo.description,
  path: '/',
  faqs: homeFaqs,
  schema: [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: siteUrl },
    { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: siteUrl, logo: siteUrl + site.logo.dark.src, email: site.email },
  ],
})

const { data: posts } = await useFetch('/api/blog', { key: 'blog-latest', transform: (p: BlogCard[]) => p.slice(0, 3) })

const officePhotos = [
  photo('photos', 'aweh-office-5519', 'Aweh, a private office at Co Work Cape Town'),
  photo('photos', 'office-for-sale-6536', 'A private office at Co Work Cape Town'),
  photo('photos', 'office-for-sale-6542', 'A private office with desks at Co Work Cape Town'),
]
</script>

<template>
  <div>
    <HomeHero />

    <!-- More than just desks, WhyBlack A or B: the fact strip, the heading on one line, then the reasons:
         B = a still ruled grid, four across; A = one strip drifting past -->
    <section v-if="whyLayout !== 'C'" class="why-a" data-rv>
      <div class="why-a__facts">
        <div class="wrap">
          <Facts :items="homeFacts" class="why-a__strip" />
        </div>
      </div>
      <div class="wrap why-a__head">
        <SectionHeading label="Why members stay" :lines="['More than just desks']">
          <p v-if="filled(whyLead)" class="lead muted r-body why-a__lead">{{ whyLead }}</p>
        </SectionHeading>
      </div>
      <ReasonsBand v-if="whyLayout === 'A'" :items="features" class="why-a__band r-body" />
      <div v-else class="wrap why-a__grid"><FeatureList :items="features" grid /></div>
    </section>

    <!-- WhyBlack C: big facts left, the eight reasons as a ruled list right -->
    <section v-else class="sec why" data-rv>
      <div class="wrap why__grid">
        <div class="why__lead">
          <SectionHeading label="Why members stay" :lines="['More than', 'just desks']">
            <p v-if="filled(whyLead)" class="lead muted r-body">{{ whyLead }}</p>
          </SectionHeading>
          <Facts :items="homeFacts" variant="big" />
        </div>
        <FeatureList :items="features" />
      </div>
    </section>

    <!-- Plans, under the sagging strip light -->
    <section class="plans-sec" data-rv aria-labelledby="plans-h">
      <div class="plans-sl"><StripLight shape="sag" /></div>
      <div class="wrap stack">
        <div class="sec-top">
          <SectionHeading id="plans-h" label="Pricing" :lines="['Pick your', 'plan']" />
          <div class="r-body plans-more">
            <TextLink to="/pricing" light cta="home_pricing">Full pricing and what's included</TextLink>
          </div>
        </div>
        <PlanCards :plans="plans" />
        <p class="muted r-body plans-note">{{ plansHomeLead }}</p>
      </div>
    </section>

    <!-- The nine offices, on white, under the mountain bracket (trial) -->
    <section class="sec on-white" data-rv aria-labelledby="offices-h">
      <div class="wrap offices__grid">
        <div class="stack">
          <div class="sh">
            <p class="label r-label">Private offices</p>
            <h2 id="offices-h" class="mono h2 bracket">
              <span class="bracket__sl" aria-hidden="true"><StripLight shape="bracket" white /></span>
              <span class="mask"><span style="--l: 0">The nine</span></span>
              <span class="mask"><span style="--l: 1">offices<span class="dot">.</span></span></span>
            </h2>
          </div>
          <p class="lead r-body">{{ officesLead }}</p>
          <div class="chips">
            <NuxtLink
              v-for="(o, i) in offices"
              :key="o.anchor"
              :to="`/offices#${o.anchor}`"
              class="chip r-item"
              :class="{ 'is-let': o.status === 'let' }"
              :style="{ '--i': i }"
            >{{ o.name }} <small>{{ o.status === 'let' ? 'let' : o.chip }}</small></NuxtLink>
          </div>
          <div class="row r-btns">
            <Btn to="/offices" variant="black" cta="home_offices">See the offices</Btn>
            <TextLink to="/contact-us?for=office" cta="home_offices_quote">Get a quote</TextLink>
          </div>
        </div>
        <div class="offices__photos r-media">
          <div v-for="(p, i) in officePhotos" :key="p.src" class="zoom" :class="{ tall: i === 0 }">
            <img :src="p.src" :srcset="p.srcset" sizes="(max-width: 960px) 50vw, 360px" :alt="p.alt" width="800" height="600" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <!-- Location with the map (wireframe HomeB) -->
    <section class="sec" data-rv aria-labelledby="loc-h">
      <div class="wrap loc__grid">
        <div class="stack">
          <SectionHeading id="loc-h" label="Location" :lines="['Find us at', 'Wembley Square']" />
          <p class="lead r-body"><b>{{ locationTeaser.address }}</b></p>
          <p v-if="filled(locationTeaser.text)" class="lead muted r-body">{{ locationTeaser.text }}</p>
          <div class="row r-btns">
            <Btn to="/contact-us?for=tour" cta="home_location_tour">Book a tour</Btn>
            <TextLink to="/location" light cta="home_directions">Directions and parking</TextLink>
          </div>
        </div>
        <MapEmbed :src="maps.embed" :link="maps.link" class="r-media" />
      </div>
    </section>

    <!-- Trial: the reasons grid's thin rule as a divider, since Location and Reviews are both on black -->
    <div class="wrap"><hr class="divider"></div>

    <!-- Reviews drifting past -->
    <section class="sec reviews" data-rv aria-labelledby="reviews-h">
      <div class="wrap">
        <div class="sec-top">
          <SectionHeading id="reviews-h" label="Reviews" :lines="['Members', 'say']" />
          <div class="row r-body reviews__meta">
            <Rating />
            <TextLink to="/about#reviews" light cta="home_reviews">Read all reviews</TextLink>
          </div>
        </div>
      </div>
      <ReviewsMarquee :reviews="reviews" class="reviews__marq" />
    </section>

    <!-- The three newest blog posts (wireframe HomeB); hidden until there are posts -->
    <section v-if="posts?.length" class="sec" data-rv aria-labelledby="blog-h">
      <div class="wrap stack">
        <div class="sec-top">
          <SectionHeading id="blog-h" label="Blog" :lines="['From the', 'blog']" />
          <div class="r-body"><TextLink to="/blog" light cta="home_blog">All posts</TextLink></div>
        </div>
        <div class="post-grid">
          <PostCard v-for="(p, i) in posts" :key="p.slug" :post="p" class="r-item" :style="{ '--i': i }" />
        </div>
      </div>
    </section>

    <!-- Questions, on white -->
    <section class="sec on-white" data-rv aria-labelledby="faq-h">
      <div class="wrap faq__grid">
        <div class="stack">
          <SectionHeading id="faq-h" label="Questions" :lines="['Good to', 'know']" />
          <div class="r-btns"><TextLink to="/faq" cta="faq_all">All questions</TextLink></div>
        </div>
        <FaqList :items="homeFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 26px; }

.why-a { padding-bottom: var(--sec-y); }
.why-a__facts { padding: 40px 0 36px; border-bottom: 1px solid var(--line-mid); }
.why-a__strip { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.why-a__strip :deep(.fact) { border-left-color: var(--line-strong); }
.why-a__head { padding-top: clamp(48px, 6vw, 72px); }
.why-a__lead { max-width: 720px; }
.why-a__band { margin-top: 40px; }
.why-a__grid { margin-top: 40px; }
@media (max-width: 960px) { .why-a__strip { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) {
  .why-a__strip { grid-template-columns: 1fr; gap: 0; }
  .why-a__strip :deep(.fact) { padding: 16px 0; border-left: 0; border-top: 2px solid var(--line-strong); }
}

.why { padding-top: clamp(40px, 6vw, 72px); }
.why__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: start; }
.why__lead { display: flex; flex-direction: column; gap: 48px; }

.plans-sec { padding: 0 0 var(--sec-y); }
.plans-sl { max-width: var(--sl-max); margin: 0 auto; }
/* "Full pricing" ends on the cards' right edge; the VAT and billing note sits centred under the cards */
.plans-more { justify-self: end; }
.plans-note { font-size: 14px; text-align: center; }

.offices__grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: start; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.offices__photos { display: grid; grid-template-columns: 1.3fr 1fr; grid-template-rows: repeat(2, clamp(150px, 26vh, 210px)); gap: 14px; }
.offices__photos .zoom { border-radius: var(--radius); }
.offices__photos .tall { grid-row: span 2; }
/* The mountain bracket over "The nine offices." (trial) */
.bracket { position: relative; display: inline-block; margin: 0 0 18px; isolation: isolate; white-space: nowrap; }
/* Sized in em so it follows the heading: drawn round a 76px heading at -130, -116, 610 x 277px, then moved up and
   left (2026-11-19) so the line clears the "Private offices" label and the heading's first letters */
.bracket__sl { position: absolute; left: -1.9em; top: -1.78em; width: 8.03em; height: 3.64em; z-index: -1; pointer-events: none; }

.loc__grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }

.reviews { overflow: hidden; }
.reviews__meta { justify-content: flex-end; gap: 18px; }
.reviews__marq { margin-top: 44px; }

.post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; }

.faq__grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }

@media (max-width: 960px) {
  .why__grid, .offices__grid, .loc__grid, .faq__grid { grid-template-columns: 1fr; }
  .bracket { white-space: normal; margin: 0; }
  .bracket__sl { display: none; }
  .reviews__meta { justify-content: flex-start; }
  .plans-more { justify-self: start; }
  .offices__photos { grid-template-rows: 180px 180px; }
}
</style>
