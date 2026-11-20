// Offices page: the approved copy, draft v8 (Google Doc 1k4eSqr7tnKyJnZzMg7RP27eVN8ws5o-8TwD2TSJ2h1M, approved
// 13 Nov 2026), word for word. Office sizes in m² and floors are NOT published. Open QA points (Yebo price,
// Gatsby in place of Bruh; its anchor is #gatsby since 2026-11-20) are listed for Codi in _context/07.
import { photo, type Faq, type Img } from './types'

export interface Office {
  name: string
  anchor: string
  sizeLabel: 'Desks' | 'People'
  size: string
  price: string
  priceZar: string
  line: string
  status: 'available' | 'let'
  quoteLabel: string
  tourLink?: boolean
  chip: string
  image: Img
}

// Which photo shows which office is still to confirm (most library photos are labelled "office for sale").
const officePhoto = (name: string) => photo('photos', name, 'A private office at Co Work Cape Town, Wembley Square, Gardens')

export const officesSeo = {
  title: 'Office Space to Rent in Gardens',
  description:
    'Nine private offices to rent at Wembley Square, Gardens, from 6 to 42 desks, with backup power and internet. See prices and book a tour.',
}

export const officesHero = {
  title: 'Private offices to rent in Gardens, Cape Town',
  paragraphs: [
    'Looking for office space to rent in Gardens? We have nine private offices at Wembley Square, from 6 desks to 42 desks, each sealed off with its own door. Prices start at £1,444.75 (R23,220.00) a month excluding VAT.',
    'Think of it as a serviced office with the extras already in: backup power, backup internet, 24/7/365 security and all the coffee you can drink. It suits international companies with staff in Cape Town and growing teams that want a small office of their own.',
  ],
  image: photo('photos', 'aweh-office-5519', 'Aweh, a private office at Co Work Cape Town'),
}

// The fact strip, word for word: label, then value
export const officeFacts = [
  { label: 'Offices', value: '9' },
  { label: 'Team size', value: '6 to 42 desks' },
  { label: 'From', value: '£1,444.75 (R23,220.00) a month excl. VAT' },
  { label: 'Power', value: 'Backup power and backup internet' },
  { label: 'Move in', value: '48 hours if the office is free' },
]

export const officesIntro = {
  heading: 'Office space to rent in Gardens, from 6 to 42 desks',
  text: 'Need some team privacy? Our sealed-off private offices give you full control over the setup. Close the door and make it yours. All prices are per month and exclude VAT. Ask us what is free right now.',
  footnote: 'Office sizes in m² and floors are confirmed by the team when you enquire.',
}

export const offices: Office[] = [
  { name: 'Yebo', anchor: 'yebo', sizeLabel: 'Desks', size: '6', price: '£1,444.75', priceZar: 'R23,220.00', line: 'Our lowest-priced office, tucked under the stairs. It has its own door, backup power and backup internet.', status: 'available', quoteLabel: 'Get a quote for Yebo', tourLink: true, chip: '6 desks', image: officePhoto('office-for-sale-6532') },
  { name: 'Biltong', anchor: 'biltong', sizeLabel: 'Desks', size: '8', price: '£1,532.25', priceZar: 'R34,054.95', line: '8 desks behind a door you can close. Desks, chairs and a screen are included.', status: 'available', quoteLabel: 'Get a quote for Biltong', tourLink: true, chip: '8 desks', image: officePhoto('office-for-sale-6536') },
  { name: 'Bunny Chow', anchor: 'bunny', sizeLabel: 'Desks', size: '8', price: '£1,532.25', priceZar: 'R34,054.95', line: 'Also 8 desks, at the same price as Biltong. Contact us to ask what is available.', status: 'let', quoteLabel: "Tell me when it's free", chip: '8 desks', image: officePhoto('office-for-sale-6539') },
  { name: 'Sorted', anchor: 'sorted', sizeLabel: 'Desks', size: '16', price: '£2,785.99', priceZar: 'R61,920.00', line: '16 desks in a sealed-off office of your own. Backup power, backup internet and all the coffee you can drink are included.', status: 'available', quoteLabel: 'Get a quote', chip: '16 desks', image: officePhoto('office-for-sale-6542') },
  { name: 'Aweh', anchor: 'aweh', sizeLabel: 'Desks', size: '16', price: '£2,785.99', priceZar: 'R61,920.00', line: 'Also 16 desks, at the same price as Sorted. Close the door and make it yours.', status: 'available', quoteLabel: 'Get a quote', chip: '16 desks', image: photo('photos', 'aweh-office-5519', 'Aweh, a private office at Co Work Cape Town') },
  { name: 'Howzit', anchor: 'howzit', sizeLabel: 'Desks', size: '21', price: '£4,085.99', priceZar: 'R90,813.20', line: '21 desks with a door that closes. Cleaning and 24/7/365 security are included.', status: 'available', quoteLabel: 'Get a quote', chip: '21 desks', image: officePhoto('office-for-sale-6555') },
  { name: 'Lekker', anchor: 'lekker', sizeLabel: 'People', size: 'Up to 28', price: '£5,618.24', priceZar: 'R124,868.15', line: 'Room for up to 28 people in a sealed-off office. Desks, chairs and a screen are included.', status: 'available', quoteLabel: 'Get a quote', chip: 'up to 28 people', image: officePhoto('office-for-sale-6562') },
  { name: 'Slap Chips', anchor: 'slap', sizeLabel: 'Desks', size: '38, with its own 18 seater office or training room', price: '£7,313.22', priceZar: 'R162,540.00', line: '38 desks plus its own 18 seater office or training room. Backup power and backup internet are included.', status: 'available', quoteLabel: 'Get a quote', chip: '38 desks', image: officePhoto('fb-tla-ev-space-6596') },
  { name: 'Gatsby', anchor: 'gatsby', sizeLabel: 'Desks', size: '42, with its own 6 seater office or meeting room', price: '£7,313.22', priceZar: 'R162,540.00', line: 'Our largest office by desk count, at 42 desks, with its own 6 seater office or meeting room. A door to close, and all the coffee you can drink.', status: 'available', quoteLabel: 'Get a quote', chip: '42 desks', image: officePhoto('img-5148') },
]

export const officeIncludes = {
  heading: ['What every office', 'includes'],
  items: [
    { icon: 'office', title: 'Furniture', text: 'Desks, chairs and a screen are included.' },
    { icon: 'power', title: 'Backup power and backup internet', text: "We run on backup power, so the lights, Wi-Fi and coffee machines keep going even when the grid doesn't. We also run backups to the backup internet." },
    { icon: 'spaces', title: 'Meeting room credits', text: 'Meeting room credits come with every private office. The team will confirm how many when you enquire.' },
    { icon: 'security', title: 'Security and cleaning', text: '24/7/365 security, with entry only for people registered with Co Work Cape Town. Cleaning is included.' },
    { icon: 'coffee', title: 'Coffee, breakouts and booths', text: 'All the coffee you can drink, plus breakfast cereals and fruit. Use the meeting booths, breakout spots and collaboration areas in the shared space.' },
    { icon: 'location', title: 'Parking', text: 'Secure on-site parking is available, charged separately at £96.74 a month (R2,150.00) excluding VAT.' },
  ],
  links: [
    { label: "Full pricing and what's included", to: '/pricing' },
    { label: 'What an office in Cape Town really costs (guide)', to: '/office-cost-cape-town' },
  ],
}

export const movingIn = {
  heading: ['How moving in', 'works'],
  steps: [
    { title: 'See it.', text: 'Book a tour of the offices at Wembley Square. Enquire with us and we will book the full office tour at your earliest convenience. You can also book a video walkthrough.' },
    { title: 'Quote.', text: 'We send you a quote with the monthly price and start date.' },
    { title: 'Move in.', text: 'Sign, collect your access tags and plug in. The first tag for each desk is free.' },
  ],
}

export const abroad = {
  heading: ['For companies', 'abroad'],
  text: 'Hiring in Cape Town from overseas? We can bill you in GBP, USD, EUR or ZAR. Cape Town is on UTC+2 all year, so it is 1 hour ahead of London in UK summer and 2 hours ahead in UK winter.',
  links: [
    { label: 'International Teams hub', to: '/international-teams' },
    { label: 'UK employers page', to: '/international-teams/uk' },
  ],
}

export const officeFaqs: Faq[] = [
  { q: 'How much does a private office in Gardens cost?', a: 'Prices run from £1,444.75 (R23,220) a month for Yebo to £7,313.22 a month for Gatsby and Slap Chips, all excluding VAT. Biltong and Bunny Chow are £1,532.25, Aweh and Sorted £2,785.99, Howzit £4,085.99 and Lekker £5,618.24.' },
  { q: 'What is the minimum term?', a: 'The team will confirm contract terms when you enquire. Pay as you grow terms on a private office run in a 3 month cycle, and month 4 is charged at full price.' },
  { q: 'Is parking included?', a: 'No. Secure on-site parking is available at R2,150 a month (£96.74) excluding VAT for one bay.' },
  { q: 'Can a UK or US company rent an office for its South African staff?', a: 'Yes. We bill in GBP, USD, EUR or ZAR. See our International Teams hub for more.', link: { label: 'International Teams hub', to: '/international-teams' } },
  { q: 'Can we grow into a bigger office?', a: 'Our offices run from 6 to 42 desks. Contact us and we will talk through what is available as your team grows.', link: { label: 'Contact us', to: '/contact-us?for=office' } },
]

export const officesClose = {
  lines: ['See the offices', 'this week'],
  text: 'Tell us your team size and start date. We will show you around Wembley Square.',
  actions: [
    { label: 'Book a tour', to: '/contact-us?for=tour', cta: 'offices_band_tour' },
    { label: 'Get a quote', to: '/contact-us?for=office', cta: 'offices_band_quote', variant: 'ghost' as const },
  ],
}
