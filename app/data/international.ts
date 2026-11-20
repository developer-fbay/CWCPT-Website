// International Teams hub and the UK page: structure from the wireframes (International.dc.html, UK.dc.html).
// No approved copy yet: [bracketed] text is the wireframe's placeholder; approved facts (billing currencies,
// time zone, security, power, prices) are word for word from Offices v8 and Pricing v4.
// Every page is written for Google, including these two (umbrella Notion task, 17 Nov).
import { officeFaqs } from './offices'
import { pricingFaqs } from './plans'
import type { Faq } from './types'

const ukOrUs = officeFaqs.find((f) => f.q.startsWith('Can a UK or US company'))!
const rands = pricingFaqs.find((f) => f.q === 'Can I pay in rands?')!

export const intlSeo = {
  title: 'Office space in Cape Town for your South African team',
  description: 'Office space in Cape Town for UK, US and European companies with staff in South Africa: billed in GBP, USD, EUR or ZAR, with backup power and backup internet, at Wembley Square, Gardens.',
}

export const intlHero = {
  title: 'Office space in Cape Town for your South African team',
  intro: "[Intro for a buyer in London, Amsterdam or New York: you've hired, or are hiring, people in Cape Town and they need a real office. How many overseas companies already house staff here: to confirm.]",
}

export const handled = {
  heading: ["What's handled", 'for you'],
  items: [
    { icon: 'support', title: 'Invoicing', text: 'We can bill you in GBP, USD, EUR or ZAR.' },
    { icon: 'location', title: 'Time zones', text: 'Cape Town is on UTC+2 all year, so it is 1 hour ahead of London in UK summer and 2 hours ahead in UK winter.' },
    { icon: 'power', title: 'Power and internet', text: "We run on backup power, so the lights, Wi-Fi and coffee machines keep going even when the grid doesn't. We also run backups to the backup internet." },
    { icon: 'security', title: 'Security', text: '24/7/365 security, with entry only for people registered with Co Work Cape Town.' },
    { icon: 'office', title: 'Onboarding your staff', text: '[We issue access tags, set up desks and screens, and are the on-site contact for your people: to confirm.]' },
    { icon: 'spaces', title: 'Growing', text: '[Start with desks and move into an office as you hire: terms to confirm.]' },
  ],
}

export const howFromAbroad = {
  heading: ['How it works', 'from abroad'],
  steps: [
    { title: 'See it.', text: '[A video walkthrough at a time that suits your time zone.]' },
    { title: 'Quote.', text: '[A quote with the monthly price and start date, billed in your currency.]' },
    { title: 'Move in.', text: '[Your team collects their access tags and plugs in.]' },
  ],
}

export const guides = [
  { title: 'UK companies', text: '[GBP invoicing, VAT, the time difference, billing through an employer of record.]', to: '/international-teams/uk' },
  { title: 'What a Cape Town team costs', text: '[Salary, employer of record fee, workspace and equipment per seat, with a worked example.]', to: '/international-teams/offshore-team-cost' },
  { title: 'Office costs in Cape Town', text: '[Serviced office against a lease, and what a lease leaves out.]', to: '/office-cost-cape-town' },
]

export const whyCapeTown = {
  heading: ['Why Cape Town,', 'and why Gardens'],
  text: '[A short block an employer can forward internally: talent pool, English, time zone, cost, and a central, secure precinct their staff can get to.]',
}

export const intlFaqs: Faq[] = [ukOrUs, rands]

export const intlClose = {
  lines: ['See the office', 'your team would sit in'],
  actions: [{ label: 'Book a video walkthrough', to: '/contact-us?for=video', cta: 'intl_band_video' }],
}

// ---------- UK ----------
export const ukSeo = {
  title: 'Cape Town office space for UK companies',
  description: 'Cape Town office space for UK companies: billed in pounds, 1 or 2 hours ahead of London, with backup power and backup internet, at Wembley Square, Gardens.',
}

export const ukHero = {
  title: 'Cape Town office space for UK companies',
  intro: '[Intro in UK terms: your Cape Town hires, in an office invoiced in pounds, with the power and internet problems you have read about solved. How many UK firms already house staff here: to confirm.]',
}

// From the approved Offices copy: UTC+2 all year
export const workingDay = {
  heading: ['The working day,', 'side by side'],
  rows: [
    { season: 'UK summer (BST)', london: '9am', capeTown: '10am', note: 'Cape Town is 1 hour ahead' },
    { season: 'UK winter (GMT)', london: '9am', capeTown: '11am', note: 'Cape Town is 2 hours ahead' },
  ],
}

export const seatCost = {
  heading: ['What a seat costs,', 'in pounds'],
  lines: [
    { label: 'Dedicated desk', value: '£174.12 a month (R3,870.00), excluding VAT.' },
    { label: 'Private office', value: 'From £1,444.75 a month (Yebo, R23,220.00), up to £7,313.22 a month for the largest offices, excluding VAT.' },
  ],
  compare: '[Compare with a London desk at £[x] (source), and the maths is short.]',
}

export const ukClient = '[Case snapshot: a UK client here, its team size, since when, and one quote: to collect.]'
export const ukFaqs: Faq[] = [ukOrUs, rands]
export const ukClose = {
  lines: ['See it', 'from London'],
  actions: [{ label: 'Book a video walkthrough', to: '/contact-us?for=video', cta: 'uk_band_video' }],
}
