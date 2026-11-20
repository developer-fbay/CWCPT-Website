<script setup lang="ts">
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Privacy policy' }]
usePageSeo({
  title: 'Privacy policy',
  description: 'How Co Work Cape Town collects and uses personal information.',
  path: '/privacy-policy',
  breadcrumbs: crumbs,
})
</script>

<template>
  <div>
    <PageHero title="Privacy policy" :crumbs="crumbs">
      <p>How Co Work Cape Town collects and uses personal information.</p>
    </PageHero>
    <section class="sec on-white" data-rv aria-label="Policy">
      <div class="wrap">
        <div class="prose r-body policy">
          <p>[The privacy policy goes here once it has been reviewed. A GDPR and POPIA draft from the first rebuild is waiting for legal review: it is not published until it is signed off.]</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.policy { max-width: 72ch; }
</style>
