// Pricing: the approved copy, draft v4 (Google Doc 1psOYHgNE076KA2LJsZFf1u_OWizh5iOtTPaQq8TOKOM, approved
// 13 Nov 2026), word for word. All prices exclude VAT. The display switch shows GBP and ZAR only (Jesse, 2026-11-20).
// The office card's line under the price carries the rand beside the pounds, like the desk card (QA, 2026-11-20).
import { photo, type Faq } from './types'

export interface Plan {
  id: string
  name: string
  tag: string
  prices: { GBP: string; ZAR: string }
  /** The line under the price, per currency shown */
  notes: { GBP: string; ZAR: string }
  /** Short points for the Home cards (from the approved facts) */
  list: string[]
  /** The approved Pricing copy, for the Pricing page */
  text: string[]
  action: { label: string; to: string; cta: string }
  link?: { label: string; to: string }
  featured?: boolean
}

export const pricingSeo = {
  title: 'Coworking Cape Town Prices',
  description:
    "Coworking Cape Town prices at Wembley Square, Gardens: desks, nine private offices and meeting rooms, with what's included and the terms in plain words.",
}

export const pricingHero = {
  image: photo('photos', 'hot-desking-space-192019', 'A dedicated desk with two screens at Co Work Cape Town'),
  title: 'Coworking and office pricing in Gardens, Cape Town',
  paragraphs: [
    'Coworking Cape Town prices at Co Work Cape Town start at £174.12 a month for a dedicated desk with a screen. Private offices and meeting rooms are priced below, and all prices exclude VAT.',
    'Three things, three prices. Parking and additional access tags cost extra. Prices are shown in pounds (£), with rand prices beside them for reference, and we can bill you in GBP, USD, ZAR or EUR.',
  ],
}

export const pricesHeading = ['Coworking Cape Town prices', 'at Wembley Square']

export const plans: Plan[] = [
  {
    id: 'dedicated-desks',
    name: 'Dedicated desk',
    tag: 'Never shared',
    prices: { GBP: '£174.12', ZAR: 'R3,870.00' },
    notes: { GBP: '(R3,870.00) a month, excl. VAT', ZAR: 'a month, excl. VAT' },
    list: ['Never shared', 'Screen included', 'Meeting room credits each month'],
    text: [
      '£174.12 a month (R3,870.00), excluding VAT.',
      'Your own dedicated desk in the coworking area, with a screen. Desks are never shared. You also get high-speed internet, backup power, 24/7/365 security, all the coffee you can drink, and access to the shared spaces. Meeting room credits are included each month.',
    ],
    action: { label: 'Book a tour', to: '/contact-us?for=desk', cta: 'plans_desk_tour' },
  },
  {
    id: 'private-offices',
    name: 'Private office',
    tag: 'Move in 48 hours',
    prices: { GBP: '£1,444.75', ZAR: 'R23,220.00' },
    notes: { GBP: '(R23,220.00) to £7,313.22 (R162,540.00) a month, excl. VAT', ZAR: 'to R162,540.00 a month, excl. VAT' },
    list: ['6 to 42 desks', 'Move in 48 hours if the office is free', 'Pay as you grow'],
    // The approved copy goes on with "For serviced office cost in Cape Town, here is the monthly price of each
    // office." and a price for each of the nine. That list made this card twice as long as the others, so it
    // lives on the Offices page instead (same figures, in offices.ts), and the link below goes there (Jesse,
    // 2026-11-19).
    text: [
      'From £1,444.75 a month (Yebo, R23,220.00), up to £7,313.22 a month for the largest offices, excluding VAT.',
      'Nine sealed-off private offices, each with a door you can close. A screen is included. Backup power, backup internet, all the coffee you can drink, 24/7/365 security and meeting room credits are included. Ask us what is available.',
    ],
    action: { label: 'Get a quote', to: '/contact-us?for=office', cta: 'plans_office_quote' },
    link: { label: 'See the nine offices', to: '/offices#the-offices' },
    featured: true,
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting rooms',
    tag: 'Six rooms',
    prices: { GBP: 'Quoted', ZAR: 'Quoted' },
    notes: { GBP: 'on request', ZAR: 'on request' },
    list: ['Six rooms', 'Yealink SmartVision 40, TV with HDMI and wireless casting', 'Whiteboard and markers'],
    text: [
      'Quoted, on request.',
      'Our meeting rooms have conferencing equipment, whiteboards, backup power and high-speed internet. Members book with their monthly credits. Anyone can ask for a quote.',
      'Our team confirms dates and pricing when you tell us the date and headcount. We can handle meeting room catering.',
    ],
    action: { label: 'Get a room quote', to: '/contact-us?for=room', cta: 'plans_room_quote' },
  },
]

export const plansHomeLead = 'Prices are per month and exclude VAT. Billing in GBP, USD, EUR or ZAR.'

export const included = {
  heading: ["What's", 'included'],
  columns: ['Dedicated desk', 'Private office', 'Room hire'],
  rows: [
    ['Backup power', 'Yes', 'Yes', 'Yes'],
    ['Internet', 'High-speed, with backup internet', 'High-speed, with backup internet', 'High-speed'],
    ['24/7 access and security', 'Yes', 'Yes', 'Ask us'],
    ['Screen', 'Yes, one with every desk', 'Yes, included', 'Not applicable'],
    ['Meeting room credits', 'Monthly allowance included', 'Included', 'Quoted'],
    ['Coffee, cereals and fruit', 'All the coffee you can drink, plus breakfast cereals and fruit', 'All the coffee you can drink', 'We can handle meeting room catering'],
    ['Secure parking', 'Extra, £96.74 a month (R2,150.00)', 'Extra, £96.74 a month (R2,150.00)', 'Visitor parking is sold at its own rate by Wembley Square'],
    ['Access tags', 'First tag for each desk free, extra tags £9.00 each', 'First tag for each desk free, extra tags £9.00 each', 'Not applicable'],
    ['Invoicing', 'Monthly, in GBP, USD, ZAR or EUR', 'Monthly, in GBP, USD, ZAR or EUR', 'On quote'],
  ],
  note: 'A lost access tag costs £44.99 (R1,000.00) to replace. The number of meeting room credits is confirmed when you enquire.',
}

export const terms = {
  heading: ['Terms, in', 'plain words'],
  items: [
    { title: 'VAT', text: 'Every price on this page excludes VAT.' },
    { title: 'Minimum term, notice and deposit', text: 'Our team will confirm these when you enquire.', link: { label: 'Ask us about terms', to: '/contact-us?for=question' } },
    { title: 'Pay as you grow', text: 'Pay as you grow terms on a private office last for a 3 month cycle. Month 4 is charged at full price.' },
    { title: 'Moving from a desk to an office', text: 'Yes, if you want to pay the standard pricing for it.' },
  ],
}

export const pricingFaqs: Faq[] = [
  { q: 'Can I pay in rands?', a: 'Yes. We can bill you in GBP, USD, ZAR or EUR. Prices are shown in pounds, with rand prices beside them for reference.' },
  { q: 'Is parking included?', a: 'No. Secure on-site parking is an extra £96.74 a month (R2,150.00) for one bay, excluding VAT. Tell us if you need it when you enquire.' },
  { q: 'Do you offer day passes or hot desks?', a: 'We do not offer hot-desking. Every coworking desk is a dedicated desk that is yours alone. Our team will confirm anything else when you enquire.', link: { label: 'Enquire', to: '/contact-us?for=desk' } },
  { q: 'What does a boardroom cost for a day?', a: 'Meeting room hire is quoted. Our team will give you a price when you ask for a room quote.', link: { label: 'Ask for a room quote', to: '/contact-us?for=room' } },
]

export const pricingClose = {
  lines: ['Want it priced', 'for your team?'],
  text: 'Ask our team for a quote and tell us what you need. We can bill you in GBP, USD, ZAR or EUR.',
  actions: [
    { label: 'Get a quote', to: '/contact-us?for=quote', cta: 'pricing_band_quote' },
    { label: 'Book a tour', to: '/contact-us?for=tour', cta: 'pricing_band_tour', variant: 'ghost' as const },
  ],
}
