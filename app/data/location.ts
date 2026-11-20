// Location: the approved copy, draft v9 (Google Doc 1m2DiHBaUN12u6A42Wenzxp5UsL1wFisi8clJnMOYN54, approved
// 16 Nov 2026), word for word. Replaces the old Gallery. The real Google Maps link is still to confirm with Codi
// (the Doc gives a bare maps.google.com): the link and the embed below search the approved address.
import { photo } from './types'

export const locationSeo = {
  // The Doc's title ends "| Co Work", so it is used whole
  title: 'Wembley Square Cape Town: Coworking in Gardens | Co Work',
  description:
    'Find Co Work Cape Town at Wembley Square, Solan Road, Gardens. Directions, parking, the local area, hours and contact details, plus how to book a tour.',
}

const q = encodeURIComponent('Wembley Square, Solan Rd, Gardens, Cape Town 8001')
export const maps = {
  link: `https://www.google.com/maps/search/?api=1&query=${q}`,
  embed: `https://www.google.com/maps?q=${q}&output=embed`,
}

export const locationHero = {
  title: 'Co Work Cape Town at Wembley Square, Gardens',
  address: 'Co Work Cape Town, Wembley Square, Solan Rd, Cape Town, 8001, South Africa',
  text: 'Looking for a coworking space near you? We are at Wembley Square, Cape Town, in Central Gardens, so we suit anyone after office space in Gardens. It is a secure precinct a 20 minute walk from Kloof Street and a 10 minute drive from the CBD, with on-site secure parking. Members get in 24/7, and our staff are on site 7am to 7pm on weekdays.',
  image: photo('photos', 'entrance-5559', 'The entrance to Co Work Cape Town at Wembley Square, Gardens'),
}

export const gettingHere = [
  { title: 'By car and parking', text: 'The entrance is on Solan Road. Secure parking is available on site at £96.74 a month per bay, excluding VAT (R2,150.00). Visitor parking: on Solan Road, managed by Wembley Square and charged at a per hour rate.' },
  { title: 'By Uber or taxi', text: 'Drop-offs are outside the gate. Drop the pin as "Wembley Square Solan Road entrance".' },
  { title: 'From the airport', text: 'The drive takes about 20 minutes. Hotels within walking distance for visiting teams: Mount Nelson, A Belmond Hotel; Taj Cape Town; and Labotessa Luxury Boutique Hotel.' },
]

export const around = {
  heading: ['Around Wembley Square', 'in Gardens, Cape Town'],
  intro: 'Wondering if your team will like coming in? Table Mountain is your backdrop, the coffee is all you can drink, and breakfast cereals and fruit come with the membership.',
  quotes: [
    { lead: 'Tyrique Slingers said:', quote: "As a creative, I found this space to be quite interesting. It isn't the average co-working space. My favourite part is being able to go to the gym which is right next door!" },
    { lead: 'Lauren Gracie mentions', quote: 'a pool table, cute meeting booths, and multiple coffee stations' },
  ],
  venues: {
    before: 'The ',
    link: { label: 'SA-Venues guide', to: 'https://www.sa-venues.com/things-to-do/westerncape/wembley-square' },
    after: ' describes Wembley Square as a place with shops, restaurants, bars, an art centre and secure parking under a glass roof.',
  },
  nearby: [
    'Virgin Active gym: in the square.',
    'Gardens Shopping Centre: about 5 minutes.',
    'District Six Museum: about 10 minutes.',
    "The Company's Garden and the South African Jewish Museum: about 10 minutes.",
  ],
  photos: [
    photo('photos', 'entrance-2-5563', 'The entrance area at Co Work Cape Town, with clocks and a world map on the wall'),
    photo('photos', 'eating-area-5533', 'The eating area at Co Work Cape Town'),
    photo('photos', 'pool-table-5552', 'The pool table at Co Work Cape Town'),
    // A fourth photo, the view of Table Mountain from the space, goes here once it is taken (PLAN.md)
  ],
}

export const inside = {
  heading: ['Inside', 'the space'],
  intro: 'Here is a look around, with versatile spaces for teamwork and solo focus.',
  zones: [
    { caption: 'Open plan coworking:', link: { label: 'desks', to: '/pricing#dedicated-desks' }, img: photo('photos', 'hot-desking-space-192005', 'Open plan coworking desks at Co Work Cape Town') },
    { caption: 'Private offices:', link: { label: 'offices', to: '/offices' }, img: photo('photos', 'office-for-sale-6532', 'A private office at Co Work Cape Town') },
    { caption: 'Just Now meeting room:', link: { label: 'rooms', to: '/meeting-rooms' }, img: photo('photos', 'meeting-room-8846', 'A meeting room at Co Work Cape Town') },
    { caption: 'The open-plan area, the only one in the space, with 46 coworking desks', img: photo('photos', 'seating-area-5522', 'The open-plan area at Co Work Cape Town') },
    { caption: 'Meeting booths: open, café-style booths in the shared area, first come, first served', img: photo('photos', 'meeting-booth-8854', 'An open meeting booth at Co Work Cape Town') },
    { caption: 'Kitchen and coffee station', img: photo('photos', 'kitchen-5567', 'The kitchen and coffee station at Co Work Cape Town') },
  ],
}

export const hours = {
  heading: ['Hours and', 'access'],
  text: 'Members: 24 hours a day, every day, with an access tag. Staff on site: 7am to 7pm on weekdays. Visitors and tours: 7am to 7pm, the same as staff hours. Security is on duty 24/7, and entry is only for people registered with Co Work Cape Town.',
}

export const locationClose = {
  lines: ['Come and', 'see it'],
  actions: [
    { label: 'Book a tour', to: '/contact-us?for=tour', cta: 'location_band_tour' },
    { label: 'Book a video walkthrough', to: '/contact-us?for=video', cta: 'location_band_video', variant: 'ghost' as const },
  ],
}
