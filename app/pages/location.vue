<script setup lang="ts">
import { around, gettingHere, hours, inside, locationClose, locationHero, locationSeo, maps } from '~/data/location'
import { site } from '~/data/site'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Location' }]
usePageSeo({ ...locationSeo, titleWhole: true, path: '/location', breadcrumbs: crumbs })
</script>

<template>
  <div>
    <PageHero :title="locationHero.title" :crumbs="crumbs" :image="locationHero.image">
      <p><b class="addr">{{ locationHero.address }}</b></p>
      <p>{{ locationHero.text }}</p>
      <template #actions>
        <Btn :to="maps.link" cta="location_maps">Open in Google Maps</Btn>
        <Btn to="/contact-us?for=tour" variant="ghost" cta="location_hero_tour">Book a tour</Btn>
      </template>
    </PageHero>

    <section class="sec getting" data-rv aria-label="Getting here">
      <div class="wrap split">
        <MapEmbed :src="maps.embed" :link="maps.link" class="r-media" />
        <dl class="ways">
          <div v-for="(w, i) in gettingHere" :key="w.title" class="way r-item" :style="{ '--i': i }">
            <dt class="way__t">{{ w.title }}</dt>
            <dd class="way__d">{{ w.text }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="around-h">
      <div class="wrap stack-lg">
        <div class="split">
          <div class="stack">
            <SectionHeading id="around-h" :lines="around.heading" size="h3" />
            <p class="lead muted r-body">{{ around.intro }}</p>
          </div>
          <div class="stack quotes r-body">
            <figure v-for="q in around.quotes" :key="q.lead" class="quote">
              <figcaption class="label">{{ q.lead }}</figcaption>
              <blockquote>"{{ q.quote }}"</blockquote>
            </figure>
            <p class="muted">{{ around.venues.before }}<a :href="around.venues.link.to" target="_blank" rel="noopener">{{ around.venues.link.label }}</a>{{ around.venues.after }}</p>
            <ul class="nearby">
              <li v-for="n in around.nearby" :key="n">{{ n }}</li>
            </ul>
          </div>
        </div>
        <div class="photos r-media">
          <div v-for="p in around.photos" :key="p.src" class="zoom"><img :src="p.src" :srcset="p.srcset" sizes="(max-width: 720px) 50vw, 300px" :alt="p.alt" width="800" height="600" loading="lazy" decoding="async"></div>
        </div>
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="inside-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="inside-h" :lines="inside.heading" />
          <p class="lead r-body">{{ inside.intro }}</p>
        </div>
        <div class="gallery">
          <figure v-for="(z, i) in inside.zones" :key="z.caption" class="zone r-item" :style="{ '--i': i % 3 }">
            <div class="zoom zone__img"><img :src="z.img.src" :srcset="z.img.srcset" sizes="(max-width: 720px) 92vw, 380px" :alt="z.img.alt" width="800" height="600" loading="lazy" decoding="async"></div>
            <figcaption class="zone__cap">{{ z.caption }} <NuxtLink v-if="z.link" :to="z.link.to">{{ z.link.label }}</NuxtLink></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="sec" data-rv aria-label="Hours, access and contact">
      <div class="wrap split">
        <div class="stack">
          <SectionHeading :lines="hours.heading" />
          <p class="lead muted r-body">{{ hours.text }}</p>
        </div>
        <div class="stack">
          <SectionHeading :lines="['Contact']" />
          <dl class="contact r-body">
            <dt>Email</dt><dd><a :href="`mailto:${site.email}`">{{ site.email }}</a></dd>
            <dt>Phone</dt><dd><a :href="site.phoneHref">{{ site.phone }}</a></dd>
            <dt>Address</dt><dd>{{ site.address.line }}</dd>
          </dl>
          <div class="r-btns"><Btn to="/contact-us?for=tour" cta="location_contact_tour">Book a tour</Btn></div>
        </div>
      </div>
    </section>

    <ClosingBand :lines="locationClose.lines" :actions="locationClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 22px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.addr { font-weight: 800; color: var(--white); }
.getting { padding-top: 0; }
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.ways { margin: 0; border-top: 2px solid currentColor; }
.way { padding: 24px 0; border-bottom: 1px solid var(--line-mid); display: flex; flex-direction: column; gap: 8px; }
.way__t { font-size: 20px; font-weight: 800; font-stretch: 106%; }
.way__d { margin: 0; font-size: 16px; line-height: 1.6; color: var(--muted); }
.quotes { gap: 18px; }
.quote { display: flex; flex-direction: column; gap: 8px; }
.quote blockquote { font-size: 19px; line-height: 1.55; font-weight: 500; }
.nearby { padding-left: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 16px; }
.photos { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 12px; }
.photos .zoom { aspect-ratio: 4 / 3; border-radius: var(--radius); }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 24px 16px; }
.zone { display: flex; flex-direction: column; gap: 12px; }
.zone__img { aspect-ratio: 3 / 2; border-radius: var(--radius); }
.zone__cap { font-size: 15px; font-weight: 700; line-height: 1.45; }
.zone__cap a { text-underline-offset: 3px; }
.contact { display: grid; grid-template-columns: 110px 1fr; margin: 0; border-top: 2px solid currentColor; }
.contact > * { padding: 14px 0; border-bottom: 1px solid var(--line-mid); margin: 0; font-size: 16px; }
.contact dt { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding-top: 17px; }
@media (max-width: 960px) {
  .split { grid-template-columns: 1fr; }
  .photos { grid-auto-flow: row; grid-template-columns: repeat(2, 1fr); }
  .photos .zoom:last-child:nth-child(odd) { grid-column: span 2; aspect-ratio: 8 / 3; }
}
</style>
