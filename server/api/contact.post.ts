// Contact form: the browser posts here, and this forwards to n8n (workflow "CWCPT Website Contact Form"), which
// creates the lead in Close and posts to Slack. The webhook address and secret never reach the browser.
// NUXT_N8N_CONTACT_WEBHOOK = the workflow's Production URL; NUXT_N8N_WEBHOOK_SECRET = its x-cwcpt-secret value.
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

  try {
    await $fetch(n8nContactWebhook, {
      method: 'POST',
      headers: n8nWebhookSecret ? { 'x-cwcpt-secret': n8nWebhookSecret } : {},
      body: {
        ...clean,
        consent: true,
        page: getHeader(event, 'referer') ?? '',
        receivedAt: new Date().toISOString(),
      },
      timeout: 10_000,
    })
  } catch (error) {
    // The details go to the server log (DigitalOcean runtime logs). The visitor gets a plain message, never the
    // webhook address. 403 = the secret doesn't match n8n's; 404 = the workflow isn't published.
    const { statusCode, message } = error as { statusCode?: number; message?: string }
    console.error(`[contact] n8n webhook failed: ${statusCode ?? 'no response'} ${message ?? ''}`)
    throw createError({ statusCode: 502, statusMessage: 'The form could not be sent' })
  }

  return { ok: true }
})
