<script setup lang="ts">
import { consent, contactHero, contactSeo, countries, forMap, lookingAt, nextSteps, tabs, thanks } from '~/data/contact'
import { site } from '~/data/site'
import { maps } from '~/data/location'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Contact' }]
usePageSeo({ ...contactSeo, path: '/contact-us', breadcrumbs: crumbs })

type TabId = (typeof tabs)[number]['id']
const route = useRoute()
const tab = ref<TabId>('tour')
const current = computed(() => tabs.find((t) => t.id === tab.value)!)

const form = reactive({
  name: '', company: '', email: '', phone: '',
  country: '', looking: '', people: '', start: '', slot: '', message: '',
  ref: '',
  website: '', // honeypot: people leave it empty
  consent: false,
})

// The link that brought the visitor picks the tab (?for=office&ref=lekker). Applied after mount: the page is
// prerendered without a query string.
const applyQuery = () => {
  const pre = forMap[String(route.query.for ?? '')]
  if (pre) { tab.value = pre.tab; if (pre.looking) form.looking = pre.looking }
  form.ref = String(route.query.ref ?? '')
}
onMounted(applyQuery)
watch(() => route.query, applyQuery)
const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorText = ref('')

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.name.trim()) errors.name = 'Add your name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Add an email we can reply to'
  if (!form.consent) errors.consent = 'Tick the box so we can reply'
  return Object.keys(errors).length === 0
}

const events: Record<TabId, string> = { tour: 'tour_booked', video: 'walkthrough_booked', quote: 'quote_requested', question: 'question_sent' }

async function submit() {
  if (!validate()) return
  state.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form, tab: tab.value, tabLabel: current.value.label } })
    state.value = 'sent'
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer?.push({ event: events[tab.value], form_tab: tab.value, ref: form.ref || undefined, page: document.referrer || undefined })
  }
  catch (e: unknown) {
    state.value = 'error'
    const code = (e as { statusCode?: number }).statusCode
    errorText.value = code === 503
      ? `The form isn't connected yet. Please email ${site.email} or call ${site.phone}.`
      : `That didn't send. Please try again, or email ${site.email}.`
  }
}
</script>

<template>
  <div>
    <PageHero :title="contactHero.title" :crumbs="crumbs" rating>
      <p>{{ contactHero.intro }}</p>
    </PageHero>

    <section class="sec on-white" data-rv aria-label="Contact form">
      <div class="wrap grid">
        <aside class="side r-body">
          <div class="blk">
            <h2 class="mono h3">Talk to us<span class="dot">.</span></h2>
            <dl class="contact">
              <dt>Email</dt><dd><a :href="`mailto:${site.email}`">{{ site.email }}</a></dd>
              <dt>Phone</dt><dd><a :href="site.phoneHref">{{ site.phone }}</a></dd>
              <dt>Address</dt><dd>{{ site.address.street }}, {{ site.address.locality }} {{ site.address.postalCode }}</dd>
              <dt>Tours</dt><dd>7am to 7pm</dd>
            </dl>
          </div>
          <div class="blk">
            <h3 class="label">{{ nextSteps.heading }}</h3>
            <ol class="next"><li v-for="s in nextSteps.steps" :key="s">{{ s }}</li></ol>
          </div>
          <div class="blk">
            <h3 class="label">Find us</h3>
            <p>Wembley Square, Solan Rd, Gardens, Cape Town, 8001. Secure parking is available on site.</p>
            <TextLink to="/location">Directions and parking</TextLink>
            <a :href="maps.link" class="tlink" target="_blank" rel="noopener">Open in Google Maps</a>
          </div>
          <div class="blk">
            <h3 class="label">Not ready yet</h3>
            <div class="links">
              <TextLink to="/pricing">See pricing</TextLink>
              <TextLink to="/offices">Browse the nine offices</TextLink>
              <TextLink to="/faq">Read the FAQ</TextLink>
            </div>
          </div>
        </aside>

        <div class="formwrap r-body">
          <div v-if="state === 'sent'" class="sent" role="status">
            <p class="mono h3">{{ thanks(form.name.split(' ')[0] ?? '') }}</p>
            <div class="links">
              <TextLink to="/location">Directions and parking</TextLink>
              <TextLink to="/">Back to the homepage</TextLink>
            </div>
          </div>

          <form v-else class="form" novalidate @submit.prevent="submit">
            <div class="tabs" role="tablist" aria-label="What are you after?">
              <button
                v-for="t in tabs"
                :key="t.id"
                type="button"
                role="tab"
                class="tabbtn"
                :class="{ sel: tab === t.id }"
                :aria-selected="tab === t.id"
                @click="tab = t.id"
              >{{ t.label }}</button>
            </div>

            <div class="two">
              <div class="field">
                <label for="f-name">Name</label>
                <input id="f-name" v-model="form.name" class="input" autocomplete="name" placeholder="Your name" :aria-invalid="!!errors.name" required>
                <span v-if="errors.name" class="err">✕ {{ errors.name }}</span>
              </div>
              <div class="field">
                <label for="f-company">Company</label>
                <input id="f-company" v-model="form.company" class="input" autocomplete="organization" placeholder="Company name">
              </div>
              <div class="field">
                <label for="f-email">Email</label>
                <input id="f-email" v-model="form.email" type="email" class="input" autocomplete="email" placeholder="you@company.com" :aria-invalid="!!errors.email" required>
                <span v-if="errors.email" class="err">✕ {{ errors.email }}</span>
              </div>
              <div class="field">
                <label for="f-phone">Phone</label>
                <input id="f-phone" v-model="form.phone" type="tel" class="input" autocomplete="tel" placeholder="+44 or +27">
              </div>
              <div class="field">
                <label for="f-country">Country you're based in</label>
                <select id="f-country" v-model="form.country" class="input">
                  <option value="" disabled>Choose a country</option>
                  <option v-for="c in countries" :key="c">{{ c }}</option>
                </select>
              </div>
              <div class="field">
                <label for="f-looking">What are you looking at?</label>
                <select id="f-looking" v-model="form.looking" class="input">
                  <option value="" disabled>Choose one</option>
                  <option v-for="l in lookingAt" :key="l">{{ l }}</option>
                </select>
              </div>
              <div class="field">
                <label for="f-people">How many people?</label>
                <input id="f-people" v-model="form.people" class="input" inputmode="numeric" placeholder="How many desks?">
              </div>
              <div class="field">
                <label for="f-start">When would you start?</label>
                <input id="f-start" v-model="form.start" class="input" placeholder="For example: next month">
              </div>
            </div>

            <div v-if="'slot' in current" class="field">
              <label for="f-slot">{{ current.slot }}</label>
              <input id="f-slot" v-model="form.slot" class="input" :placeholder="current.slotHint">
            </div>
            <div class="field">
              <label for="f-msg">Anything else?</label>
              <textarea id="f-msg" v-model="form.message" class="input" rows="4" placeholder="Tell us a little about your team" />
            </div>

            <div class="hp" aria-hidden="true">
              <label for="f-website">Website</label>
              <input id="f-website" v-model="form.website" tabindex="-1" autocomplete="off">
            </div>
            <input v-if="form.ref" type="hidden" name="ref" :value="form.ref">

            <label class="check">
              <input v-model="form.consent" type="checkbox" :aria-invalid="!!errors.consent">
              <span>{{ consent }}</span>
            </label>
            <span v-if="errors.consent" class="err">✕ {{ errors.consent }}</span>

            <div class="row">
              <Btn type="submit" variant="black" :disabled="state === 'sending'" :cta="`contact_submit_${tab}`">
                {{ state === 'sending' ? 'Sending…' : current.cta }}
              </Btn>
              <p v-if="state === 'error'" class="err" role="alert">{{ errorText }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; align-items: start; }
.side { display: flex; flex-direction: column; gap: 28px; }
.blk { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.contact { display: grid; grid-template-columns: 90px 1fr; width: 100%; margin: 0; border-top: 2px solid var(--black); }
.contact > * { padding: 12px 0; border-bottom: 1px solid #d8d8d8; margin: 0; font-size: 15px; }
.contact dt { font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding-top: 15px; }
.next { padding-left: 20px; display: flex; flex-direction: column; gap: 6px; font-size: 15px; color: var(--ink-2); }
.links { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.form { display: flex; flex-direction: column; gap: 22px; }
.two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.sent { display: flex; flex-direction: column; gap: 22px; padding: 32px 0; }
@media (max-width: 960px) { .grid { grid-template-columns: 1fr; } .formwrap { order: -1; } }
@media (max-width: 560px) { .two { grid-template-columns: 1fr; } }
</style>
