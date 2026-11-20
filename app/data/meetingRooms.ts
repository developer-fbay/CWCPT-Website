// Meeting rooms: the approved copy, draft v5 (Google Doc 1sv9hLUnEUhkodMKwG1OQ__4Ob_8eOMSkceCHe2Ot96o, approved
// 16 Nov 2026), word for word. Room sizes and capacities are not published. Which photo shows which room is
// still to confirm, so room cards carry a generic photo alt.
import { photo, type Faq } from './types'

export const roomsSeo = {
  title: 'Meeting room hire in Cape Town',
  description:
    'Meeting room and boardroom hire at Wembley Square, Gardens, Cape Town. Conferencing kit, whiteboards and backup power. Request a quote today.',
}

export const roomsHero = {
  title: 'Meeting rooms and boardroom hire in Gardens, Cape Town',
  paragraphs: [
    'Co Work Cape Town offers meeting room hire in Cape Town at Wembley Square, Gardens. Every room has conferencing equipment, a whiteboard, high-speed internet and backup power.',
    'Members book with their monthly credits. Anyone else can hire a room on a quote. You also get bold, quality coffee to fuel any meeting.',
  ],
  note: 'Quotes answered within 24 hours.',
  image: photo('photos', 'meeting-room-8846', 'A meeting room at Co Work Cape Town, Wembley Square, Gardens'),
}

export const roomsIntro = {
  heading: ['Meeting room hire', 'at Wembley Square'],
  text: 'Pick a room by name and we will confirm its size and capacity when you enquire. What each room has is listed further down this page.',
}

const roomPhotos = ['meeting-room-8846', 'meeting-room-8848', 'meeting-room-8850']
export const rooms = [
  { name: 'Just Now', anchor: 'just-now', line: 'Ask us about capacity for board meetings and workshops.' },
  { name: 'Right Now', anchor: 'right-now', line: 'Ask us about capacity for client presentations.' },
  { name: 'Ag Man', anchor: 'ag-man', line: 'Ask us about capacity for team meetings.' },
  { name: 'Ja Now', anchor: 'ja-now', line: 'Ask us whether it suits your interview or call.' },
  { name: 'Now Now', anchor: 'now-now', line: 'Ask us whether it suits your interview or call.' },
  { name: 'Ja Nee', anchor: 'ja-nee', line: 'Ask us whether it suits your one-to-one or private call.' },
].map((r, i) => ({ ...r, image: photo('photos', roomPhotos[i % roomPhotos.length]!, `${r.name}, a meeting room at Co Work Cape Town [photo to confirm]`) }))

export const booths = {
  text: 'Plus open, café-style booths in the shared area. They have power outlets and high-speed internet, and they are first come, first served with no booking.',
  photos: ['meeting-booth-8854', 'meeting-booth-8856', 'meeting-booth-8857'].map((n) => photo('photos', n, 'An open meeting booth in the shared area at Co Work Cape Town')),
}

export const members = {
  heading: ['Members'],
  paragraphs: [
    "Desks and private offices both include meeting room credits each month. Members book rooms with credits through our booking system, and your company can buy more. Purchased credits never expire and are shared across your company's users. Ask us how many credits your plan includes.",
  ],
  link: { label: 'See what each plan includes on our Pricing page', to: '/pricing' },
}

export const notMember = {
  heading: ['Not a member'],
  question: true,
  paragraphs: [
    'You can hire a room without joining. Tell us the date, time and headcount and we will quote.',
    'It suits visiting teams, interviews and offsites.',
    'Planning for a larger group? Send us your headcount and we will confirm what we can offer.',
    'Send your details through our quote form and say in your message that it is a meeting room enquiry.',
  ],
  link: { label: 'Quote form', to: '/contact-us?for=room' },
}

export const everyRoom = {
  heading: ["What's in", 'every room'],
  items: [
    { icon: 'office', title: 'Screen', text: 'TV screen with HDMI and wireless casting.' },
    { icon: 'support', title: 'Conferencing', text: 'Conferencing equipment for calls with your team anywhere. The camera and speaker is a Yealink SmartVision 40.' },
    { icon: 'spaces', title: 'Whiteboard', text: 'A whiteboard in every room. Markers supplied.' },
    { icon: 'power', title: 'Power and internet', text: "Backup power and high-speed internet, so your meeting keeps going when the grid doesn't." },
    { icon: 'coffee', title: 'Coffee and catering', text: 'Bold, quality coffee to fuel any meeting. Catering can be organised from nearby venues.' },
  ],
}

export const roomFaqs: Faq[] = [
  { q: "Can I hire a meeting room if I'm not a member?", a: 'Yes. Tell us the date, time and headcount through the quote form and we will send you a quote.', link: { label: 'Quote form', to: '/contact-us?for=room' } },
  { q: 'How much does a boardroom cost for a day?', a: 'It is quoted, so tell us your date and headcount.' },
  { q: 'Is there parking for visitors?', a: 'On-site secure parking is available at Wembley Square. Visitor parking is sold at its own rate by Wembley Square.', link: { label: 'Directions and parking', to: '/location' } },
  { q: 'Can you host an interview day or an offsite?', a: 'Tell us what you have planned and we will confirm which rooms and times we can offer.' },
]

export const roomsClose = {
  lines: ['Need a room next week?', 'Ask for a quote today'],
  actions: [{ label: 'Get a room quote', to: '/contact-us?for=room', cta: 'rooms_band_quote' }],
}
