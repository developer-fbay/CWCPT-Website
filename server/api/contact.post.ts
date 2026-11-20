// Contact form: the browser posts here, and this forwards to n8n, which creates the lead in Close and an entry
// in Gravity Forms (see _context/04). The webhook address and secret never reach the browser.
const FIELDS = ['tab', 'tabLabel', 'name', 'company', 'email', 'phone', 'country', 'looking', 'people', 'start', 'slot', 'message', 'ref'] as const

export default defineEventHandler(async (event) => {
  const { n8nContactWebhook, n8nWebhookSecret } = useRuntimeConfig(event)
  if (!n8nContactWebhook) {
    throw createError({ statusCode: 503, statusMessage: 'Contact form is not connected yet' })
  }

  const body = await readBody<Record<string, unknown>>(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid form' })
  }
  // Honeypot: real people leave this hidden field empty. Bots get a quiet "ok".
  if (body.website) return { ok: true }

  // Only the known fields, trimmed and capped, go on to n8n
  const clean: Record<string, string> = {}
  for (const k of FIELDS) clean[k] = String(body[k] ?? '').trim().slice(0, k === 'message' ? 4000 : 300)

  if (!clean.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email ?? '')) {
    throw createError({ statusCode: 422, statusMessage: 'Name and a valid email are required' })
  }
  if (body.consent !== true) {
    throw createError({ statusCode: 422, statusMessage: 'Consent is required' })
  }

  await $fetch(n8nContactWebhook, {
    method: 'POST',
    headers: n8nWebhookSecret ? { 'x-cwcpt-secret': n8nWebhookSecret } : {},
    body: {
      ...clean,
      consent: true,
      page: getHeader(event, 'referer') ?? '',
      receivedAt: new Date().toISOString(),
    },
  })

  return { ok: true }
})
