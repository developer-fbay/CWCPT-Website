<script setup lang="ts">
import { site } from '~/data/site'
import { revealArm, revealVisible } from '~/utils/revealBoot'

const { siteUrl } = useRuntimeConfig().public

useHead({
  script: [
    // Scroll reveal: armed before first paint (see plugins/reveal.client.ts)
    { innerHTML: revealArm, tagPosition: 'head' },
    { innerHTML: revealVisible, tagPosition: 'bodyClose' },
    // The business itself, on every page: a coworking space (a kind of LocalBusiness)
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CoworkingSpace',
        '@id': `${siteUrl}/#business`,
        name: site.name,
        url: siteUrl,
        logo: siteUrl + site.logo.dark.src,
        image: siteUrl + site.logo.dark.src,
        email: site.email,
        telephone: site.phoneHref.replace('tel:', ''),
        priceRange: '£174.12 to £7,313.22 a month, excl. VAT',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: 'Western Cape',
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        // Members get in 24/7 (approved Location copy)
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        }],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
