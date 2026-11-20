<script setup lang="ts">
import { faqCategories, faqHero, faqSeo } from '~/data/faq'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'FAQ' }]
usePageSeo({ ...faqSeo, path: '/faq', breadcrumbs: crumbs, faqs: faqCategories.flatMap((c) => c.items) })
</script>

<template>
  <div>
    <PageHero :title="faqHero.title" :crumbs="crumbs">
      <p>{{ faqHero.intro }}</p>
      <template #after>
        <nav aria-label="Question categories" class="chips r-btns">
          <a v-for="c in faqCategories" :key="c.id" :href="`#${c.id}`" class="chip">{{ c.title }}</a>
        </nav>
      </template>
    </PageHero>

    <section class="sec on-white" data-rv aria-label="Questions by category">
      <div class="wrap cats">
        <div v-for="c in faqCategories" :id="c.id" :key="c.id" class="cat">
          <h2 class="mono h3 cat__h">{{ c.title }}<span class="dot">.</span></h2>
          <FaqList :items="c.items" :first-open="false" />
        </div>
      </div>
    </section>

    <section class="sec" data-rv aria-label="More help">
      <div class="wrap help">
        <div class="help__item">
          <h2 class="mono h3">Still have a question<span class="dot">?</span></h2>
          <p class="muted">[Line from the FAQ copy.]</p>
          <Btn to="/contact-us?for=question" cta="faq_ask">Ask a question</Btn>
        </div>
        <div class="help__item">
          <h2 class="mono h3">Rather just see it<span class="dot">?</span></h2>
          <p class="muted">[Line from the FAQ copy.]</p>
          <Btn to="/contact-us?for=tour" variant="ghost" cta="faq_tour">Book a tour</Btn>
        </div>
        <div class="help__item">
          <h2 class="mono h3">Related<span class="dot">.</span></h2>
          <div class="links">
            <TextLink to="/pricing" light>Pricing</TextLink>
            <TextLink to="/offices" light>The nine offices</TextLink>
            <TextLink to="/meeting-rooms" light>Meeting rooms</TextLink>
            <TextLink to="/location" light>Location and parking</TextLink>
          </div>
        </div>
      </div>
    </section>

    <ClosingBand />
  </div>
</template>

<style scoped>
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.cats { display: flex; flex-direction: column; gap: 64px; }
.cat { display: grid; grid-template-columns: 1fr 1.8fr; gap: 48px; scroll-margin-top: calc(var(--header-h) + 24px); }
.cat__h { position: sticky; top: calc(var(--header-h) + 24px); align-self: start; }
.help { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 40px; }
.help__item { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; border-top: 2px solid currentColor; padding-top: 22px; }
.links { display: flex; flex-direction: column; gap: 4px; }
@media (max-width: 960px) { .cat { grid-template-columns: 1fr; gap: 20px; } .cat__h { position: static; } }
</style>
