import { photo, type Img } from './types'

// About: structure from the wireframe (About.dc.html). No approved About copy yet: [bracketed] text is the
// wireframe's placeholder. "The facts" block quotes only approved facts.
export const aboutSeo = {
  title: 'About Co Work Cape Town',
  description: 'Co Work Cape Town is a coworking space at Wembley Square, Gardens: dedicated desks, nine private offices and six meeting rooms. The facts and the reviews.',
}

export const aboutHero = {
  title: 'About Co Work Cape Town',
  image: photo('photos', 'waiting-area-5550', 'The lounge at Co Work Cape Town, with black chairs, plants and big windows'),
  intro: '[One paragraph that an AI assistant could lift whole: what Co Work Cape Town is, where, what it offers and who it suits, in the approved figures.]',
}

// Every figure here is from the approved copy (Pricing v4, Offices v8, Meeting rooms v5, Location v9)
export const aboutFacts = [
  { label: 'Address', value: 'Wembley Square, Solan Rd, Gardens, Cape Town, 8001' },
  { label: 'Dedicated desks', value: '£174.12 (R3,870.00) a month, excl. VAT' },
  { label: 'Coworking desks', value: '46, in the one open-plan area' },
  { label: 'Private offices', value: '9, from 6 to 42 desks' },
  { label: 'Meeting rooms', value: '6, quoted on request' },
  { label: 'Access', value: 'Members 24 hours a day, every day, with an access tag' },
  { label: 'Staff on site', value: '7am to 7pm on weekdays' },
  { label: 'Billing', value: 'GBP, USD, EUR or ZAR' },
  { label: 'Power', value: 'Backup power and backup internet' },
  { label: 'Google rating', value: '4.6' },
]
export const factsChecked = '[Facts checked: month and year]'

export const whyItExists = {
  heading: ['Why it', 'exists'],
  paragraphs: [
    "[Two or three paragraphs: started to house the group's own Cape Town staff for overseas clients, opened to other companies and independents; what the place is like day to day; how the room names came about. Plain, first person plural, no mission statement.]",
  ],
}

// A person shows once their name is filled in; add `photo: photo('photos', '<file>', '<alt>')` for their picture
export const people: { name: string; role: string; photo?: Img }[] = [
  { name: '[Name]', role: 'Community manager' },
  { name: '[Name]', role: 'Operations' },
  { name: '[Name]', role: 'Founder' },
]

export const group = {
  heading: ['Part of', 'a group'],
  text: '[Short paragraph naming the sister companies that place staff here, and linking out to them: which to name is to confirm.]',
}

export const mentions = '[Press, directory listings and partner pages that mention Co Work Cape Town: to collect.]'
