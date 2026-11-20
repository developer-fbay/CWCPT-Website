// FAQ hub: the seven categories from the wireframe (FAQ.dc.html). Every question and answer is word for word
// from the approved page copy (Offices v8, Pricing v4, Meeting rooms v5) or the live site, never written new.
// FAQPage schema lives here and on any page that shows questions.
import { homeFaqs } from './home'
import { roomFaqs } from './meetingRooms'
import { officeFaqs } from './offices'
import { pricingFaqs } from './plans'
import type { Faq } from './types'

export const faqSeo = {
  title: 'Questions about working at Co Work Cape Town',
  description: 'Prices and terms, dedicated desks, private offices, meeting rooms, backup power, parking and international teams: answers before you visit Co Work Cape Town in Gardens.',
}

export const faqHero = {
  title: 'Questions about working at Co Work Cape Town', // the wireframe's working H1
  intro: '[Intro line from the FAQ copy.]',
}

const live = {
  included: { q: "What's included in the membership fee?", a: 'Your desk, fast internet (in fact, we run backups to the backup), good coffee, breakfast cereals and fruit and access to meeting rooms, breakout spots and collaboration areas.' },
} satisfies Record<string, Faq>

const pick = (list: Faq[], q: string) => list.find((f) => f.q === q)!

export const faqCategories: { id: string; title: string; items: Faq[] }[] = [
  { id: 'pricing', title: 'Pricing and terms', items: [pick(pricingFaqs, 'Can I pay in rands?'), pick(officeFaqs, 'What is the minimum term?'), pick(roomFaqs, 'How much does a boardroom cost for a day?')] },
  { id: 'desks', title: 'Dedicated desks', items: [live.included, pick(pricingFaqs, 'Do you offer day passes or hot desks?')] },
  { id: 'offices', title: 'Private offices', items: [pick(officeFaqs, 'How much does a private office in Gardens cost?'), pick(officeFaqs, 'Can we grow into a bigger office?')] },
  { id: 'rooms', title: 'Meeting rooms', items: [pick(roomFaqs, "Can I hire a meeting room if I'm not a member?"), pick(roomFaqs, 'Can you host an interview day or an offsite?')] },
  { id: 'power', title: 'Power and internet', items: [pick(homeFaqs, 'Do you have backup power?')] },
  { id: 'location', title: 'Location and parking', items: [pick(homeFaqs, 'What hours can I access the space?'), pick(homeFaqs, 'Is there parking and security at Wembley Square?'), pick(officeFaqs, 'Is parking included?'), pick(roomFaqs, 'Is there parking for visitors?')] },
  { id: 'international', title: 'International companies', items: [pick(officeFaqs, 'Can a UK or US company rent an office for its South African staff?')] },
]
