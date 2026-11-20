// Contact page: structure and fields from the wireframe (Contact.dc.html). No approved Contact copy yet:
// [bracketed] lines are the wireframe's placeholders. Facts (email, phone, address, hours) are approved.

export const contactSeo = {
  title: 'Book a tour or get a quote',
  description: 'Book a tour of Co Work Cape Town at Wembley Square, Gardens, book a video walkthrough, or ask for a quote on a desk, an office or a meeting room.',
}

export const contactHero = {
  title: 'Book a tour, or get a quote', // the wireframe's working H1
  intro: '[Intro from the Contact copy.]',
}

// A link pre-selects the tab: ?for=tour | video | desk | office | room | quote | question (&ref=<office or room>)
export const tabs = [
  { id: 'tour', label: 'Tour in person', cta: 'Book my tour', slot: 'Tour slot', slotHint: 'A day and time that suits you' },
  { id: 'video', label: 'Video walkthrough', cta: 'Book my walkthrough', slot: 'Your time zone and a good time', slotHint: 'For example: London, weekday mornings' },
  { id: 'quote', label: 'Get a quote', cta: 'Get my quote' },
  { id: 'question', label: 'Ask a question', cta: 'Send my question' },
] as const

export const lookingAt = ['Dedicated desk', 'Private office', 'Meeting room', 'Not sure yet'] as const
export const countries = ['South Africa', 'United Kingdom', 'United States', 'Netherlands', 'Other'] as const

/** Which tab and "What are you looking at?" a ?for= value opens */
export const forMap: Record<string, { tab: (typeof tabs)[number]['id']; looking?: (typeof lookingAt)[number] }> = {
  tour: { tab: 'tour' },
  video: { tab: 'video' },
  desk: { tab: 'quote', looking: 'Dedicated desk' },
  office: { tab: 'quote', looking: 'Private office' },
  room: { tab: 'quote', looking: 'Meeting room' },
  quote: { tab: 'quote', looking: 'Not sure yet' },
  question: { tab: 'question' },
}

export const nextSteps = {
  heading: 'What happens next',
  steps: ['[We confirm the slot by email.]', '[The tour, in person or on a video call: length to confirm.]', '[You get a one-page quote and a start date.]'],
}

export const consent = '[Consent line from the Privacy copy.]'
export const thanks = (name: string) => `Thanks, ${name}. [Confirmation text from the Contact copy.]`
