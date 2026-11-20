// Home page content. There is no approved Home copy yet: text here is the live site's (word for word), the
// approved facts from the other pages, or a visible [placeholder] from the wireframe. Replace it when the
// approved Home task arrives.
import type { Faq } from './types'

export const homeSeo = {
  // The wireframe's target: "coworking space cape town". To replace with the approved Home copy's SEO table.
  title: 'Coworking Space in Gardens, Cape Town | Co Work Cape Town',
  description:
    'Dedicated desks, nine private offices and meeting rooms at Wembley Square, Gardens, Cape Town, with backup power, backup internet and 24/7 access.',
}

export const hero = {
  // The H1 is the keyword line (Jesse, 2026-11-18); the big name is decoration. Wording from wireframe HomeB.
  h1: 'Coworking space in Gardens, Cape Town',
  nameLines: ['Co Work', 'Cape', 'Town'],
  // The rotating line, word for word from the live site: "is the Bomb", "is Bangin'"...
  rotatingPrefix: 'is',
  rotatingWords: ['the Bomb', "Bangin'", 'Lekker', 'Boss', 'Kiff', 'Mint', 'Vibes', 'Ace', 'Kwaai', 'Sick'],
  intro:
    'Co Work Cape Town takes remote working out of isolation. No more load-shedding headaches or flaky Wi-Fi, just reliable connectivity, great coffee, focused workspaces, and a buzzing community where ideas happen. Good vibes, hard work, and Cape Town charm included.',
  // Button wording from the wireframe (Jesse, 2026-11-18)
  actions: [
    { label: 'Book a tour', to: '/contact-us?for=tour', cta: 'hero_book_tour', variant: 'white' as const },
    { label: 'Get a quote', to: '/contact-us?for=quote', cta: 'hero_quote', variant: 'ghost' as const },
  ],
  // The live site's Vimeo video, for now, playing in the logo's block. The still is its old fallback image.
  video: {
    vimeoId: '1123499521',
    label: "Aerial view of Lion's Head and Table Mountain",
    poster: {
      src: '/images/hero/home-hero-poster-960.webp',
      srcset: '/images/hero/home-hero-poster-960.webp 960w, /images/hero/home-hero-poster-1920.webp 1920w',
    },
    // Parts of the video to skip, in seconds: at `at` the player jumps to `to`. Hides the YouTube subscribe badge
    // in the licensed footage (Jesse, 2026-11-20). Find the seconds with ?video-time in the address; start `at`
    // half a second before the badge appears. To cut the end off instead, jump back to 0.
    // The badge shows from 42s to 49s (Jesse, 2026-11-20): jump half a second early, land half a second after.
    jumps: [{ at: 41.5, to: 49.5 }] as { at: number; to: number }[],
  },
  card: { label: 'Access', value: '24/7', note: 'Tap your tag' },
}

// "More than just desks" layout, from the WhyBlack board. All three keep the fact strip or big facts and the
// heading; the reasons are: 'B' a still ruled grid, four across (chosen 2026-11-19); 'A' one strip drifting past;
// 'C' a ruled list beside big facts.
export const whyLayout: 'A' | 'B' | 'C' = 'B'

// Four big facts, all from approved copy (Pricing v4, Offices v8, Location v9)
export const homeFacts = [
  { value: '24/7', label: 'Access and security' },
  { value: '£174.12', label: 'Dedicated desk a month, excl. VAT' },
  { value: '9', label: 'Private offices' },
  { value: '46', label: 'Coworking desks' },
]

// The eight reasons, word for word from the live site, with the original glowing icons
export const features = [
  { icon: 'support', label: '24/7/365 expert global business support' },
  { icon: 'power', label: 'Uninterrupted power, no load shedding issues' },
  { icon: 'wifi', label: 'Seamless, high-speed Wi-Fi, always reliable' },
  { icon: 'location', label: 'Prime location in Central Gardens, Cape Town' },
  { icon: 'spaces', label: 'Versatile spaces for teamwork and solo focus' },
  { icon: 'office', label: 'Private offices for your dedicated workspace' },
  { icon: 'coffee', label: 'Bold, quality coffee to fuel any meeting' },
  { icon: 'security', label: 'Top-tier, enterprise-grade security measures' },
]

export const whyLead =
  '[SEO copy, about 150 words, from the approved Home copy: backup power and backup internet, 24/7 access and security, coffee, meeting booths and breakout spots.]'

export const officesLead = 'Office space to rent in Gardens, from 6 to 42 desks.' // approved Offices v8

export const locationTeaser = {
  // Address from the approved Location copy; the paragraph is the wireframe's placeholder
  address: 'Wembley Square, Solan Rd, Gardens, Cape Town, 8001',
  text: '[SEO copy, about 60 words, from the approved Home copy: Central Gardens, Table Mountain as the backdrop and secure parking on site.]',
}

// Four questions (wireframe HomeB), answers word for word from the live site and the approved Offices copy
export const homeFaqs: Faq[] = [
  { q: 'What hours can I access the space?', a: "Our doors are open 24/7 with 24/7 security. Whether you're on Cape Town time or working late to match a foreign team, you can come in whenever you need.", link: { label: 'Hours and access', to: '/location' } },
  { q: 'Do you have backup power?', a: 'Yes. We run on backup power, so the lights, Wi-Fi, and coffee machines keep going even when the grid doesn\'t. You can work without worrying about outages. We guarantee that your work day won\'t be impacted by the infamous "Load-Shedding".', link: { label: 'See pricing', to: '/pricing' } },
  { q: 'Is there parking and security at Wembley Square?', a: "Yes. On-site secure parking is available, and the building has 24/7 security that you'll only be able to get through if you are registered with Co Work Cape Town. You'll feel safe arriving early, leaving late, or stepping out for a break.", link: { label: 'Directions and parking', to: '/location' } },
  { q: 'Can a UK or US company rent an office for its South African staff?', a: 'Yes. We bill in GBP, USD, EUR or ZAR. See our International Teams hub for more.', link: { label: 'Office space for your South African team', to: '/international-teams' } },
]
