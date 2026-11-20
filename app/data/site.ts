// Site-wide content: one place for the business facts, menu, footer and contact details.
// Facts from the approved copy (Location v9, Offices v8, Pricing v4); anything unconfirmed stays in [brackets].
export const site = {
  name: 'Co Work Cape Town',
  email: 'info@coworkcapetown.com',
  phone: '+27 79 803 3902', // the approved Location copy writes +2779 803 3902; spaced as the international format (QA, 2026-11-20)
  phoneHref: 'tel:+27798033902',
  address: {
    line: 'Co Work Cape Town, Wembley Square, Solan Rd, Cape Town, 8001, South Africa',
    street: 'Wembley Square, Solan Rd',
    area: 'Gardens',
    locality: 'Cape Town',
    postalCode: '8001',
    country: 'ZA',
  },
  hours: {
    members: 'Members: 24 hours a day, every day, with an access tag.',
    staff: 'Staff on site: 7am to 7pm on weekdays.',
    tours: 'Tours 7am to 7pm',
  },
  rating: '4.6',
  // The logo from the live site's media library (`npm run images`). White for black, black for white.
  logo: {
    light: { src: '/images/brand/logo-transparent.webp', width: 600, height: 340 },
    dark: { src: '/images/brand/logo-black.webp', width: 600, height: 340 },
  },
  // The member booking system (noindex); its address is to confirm with Codi.
  bookingSystem: '[booking system address]',
}

// Pages built ahead of their content: hidden (404, unlinked, not in the sitemap) until the content is written.
// PLAN.md "Hidden until built" lists what each one needs. Take a path out of this list to publish it.
// The blog hides itself until the first post exists (no need to list it here).
export const hiddenPages: string[] = ['/international-teams/offshore-team-cost', '/office-cost-cape-town']

// Until there is a Coworking page, "Coworking" opens the Pricing page at its hero ("Coworking and office pricing
// in Gardens, Cape Town") and "Pricing" goes straight to the plan cards (Jesse, 2026-11-19).
export const mainNav = [
  { label: 'Offices', to: '/offices' },
  { label: 'Coworking', to: '/pricing' },
  { label: 'Meeting Rooms', to: '/meeting-rooms' },
  { label: 'International Teams', to: '/international-teams' },
  { label: 'Pricing', to: '/pricing#plans' },
  { label: 'Contact', to: '/contact-us' },
]

export const footerColumns = [
  {
    title: 'Workspace',
    links: [
      { label: 'Private offices', to: '/offices' },
      { label: 'Dedicated desks', to: '/pricing#dedicated-desks' },
      { label: 'Meeting rooms', to: '/meeting-rooms' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'For International Teams',
    links: [
      { label: 'Office space for your South African team', to: '/international-teams' },
      { label: 'UK employers', to: '/international-teams/uk' },
      { label: 'What a Cape Town team costs', to: '/international-teams/offshore-team-cost' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Location and parking', to: '/location' },
      { label: 'Book a tour', to: '/contact-us?for=tour' },
      { label: 'Contact', to: '/contact-us' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Co Work Cape Town', to: '/about' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Office cost guide', to: '/office-cost-cape-town' },
      { label: 'Blog', to: '/blog' },
    ],
  },
]

// The 404 page. The message shows once it is written.
export const notFound = { message: '[404 message from the approved copy.]' }

// The closing band at the bottom of most pages (design canvas, HomeBW).
export const closingBand = {
  label: site.hours.tours,
  lines: ['Book', 'your desk'],
  actions: [
    { label: 'Book a tour', to: '/contact-us?for=tour', cta: 'band_book_tour' },
    { label: 'Enquire now', to: '/contact-us', cta: 'band_enquire', variant: 'ghost' as const },
  ],
}
