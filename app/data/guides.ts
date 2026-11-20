// The two guides: "What a Cape Town team costs" and the office cost guide. Structure from the wireframes
// (OffshoreCost.dc.html, OfficeCost.dc.html). No approved copy or figures yet: every figure stays [to confirm],
// except our own approved prices. Figures must be sourced and dated before publishing (Article schema with
// dateModified). The offshore cost calculator is not built: ask Codi first (umbrella task).

export const offshoreSeo = {
  title: 'What an offshore team in South Africa costs',
  description: 'What an offshore team in South Africa costs, seat by seat: salary, employer of record fee, workspace and equipment, with a worked example for a five-person team.',
}

export const offshore = {
  title: 'What an offshore team in South Africa costs, seat by seat',
  intro: '[Intro: the four lines on the invoice (salary, employer of record fee, workspace, equipment), a dated, sourced figure for each, and a worked example for a five-person sales team. Written for a finance or ops lead building a business case.]',
  updated: '[Updated: month and year]',
  table: {
    heading: ['The four lines', 'per seat'],
    columns: ['Line', 'Sales / SDR', 'Customer support', 'Developer', 'Source'],
    rows: [
      ['Salary', '[to confirm]', '[to confirm]', '[to confirm]', '[named source]'],
      ['Employer of record fee', '[to confirm]', '[to confirm]', '[to confirm]', '[if leadership agrees to publish]'],
      ['Workspace (dedicated desk)', '£174.12 a month, excl. VAT', '£174.12 a month, excl. VAT', '£174.12 a month, excl. VAT', 'Co Work Cape Town pricing'],
      ['Equipment', '[to confirm]', '[to confirm]', '[to confirm]', '[named source]'],
    ],
    note: '[Currency display (GBP, USD, EUR) converted at a dated rate.]',
  },
  sections: [
    { heading: ['Against the same', 'seat at home'], text: '[Chart: total monthly cost per seat, Cape Town against London, New York and Amsterdam, with sources. One paragraph on what the gap pays for and what it does not.]' },
    { heading: ['What the figures', 'leave out'], text: '[Management time, onboarding, a visit a year.]' },
    { heading: ['Worked example:', 'a five-person sales team'], text: '[The four lines for five seats, month by month and for a year.]' },
  ],
}

export const officeCostSeo = {
  title: 'What an office in Cape Town costs: serviced office vs lease',
  description: 'How much office space in Cape Town costs per month: lease rents by area, what a lease leaves out, and a serviced office side by side for a team of five.',
}

export const officeCost = {
  title: 'What an office in Cape Town costs in 2026: serviced office vs lease',
  intro: '[Intro: "how much is office space in Cape Town per month" answered in the first paragraph with a range, then the detail. Author line with a real name.]',
  updated: '[Updated: month and year]',
  table: {
    heading: ['Rent by area,', 'per m² per month'],
    columns: ['Area', 'Lease (R/m²)', 'Serviced office (per person)', 'Note'],
    rows: [
      ['[Area]', '[to confirm]', '[to confirm]', '[note]'],
      ['[Area]', '[to confirm]', '[to confirm]', '[note]'],
      ['[Area]', '[to confirm]', '[to confirm]', '[note]'],
    ],
    note: '[Sources: property broker reports, year. Figures are ranges and move.]',
  },
  ours: {
    heading: ['Our own', 'numbers'],
    lines: [
      'Dedicated desk: £174.12 a month (R3,870.00), excluding VAT.',
      'Private office: from £1,444.75 a month (Yebo, R23,220.00), up to £7,313.22 a month for the largest offices, excluding VAT.',
    ],
  },
  sections: [
    { heading: ['What a lease', 'leaves out'], text: '[Fit-out, power, internet, cleaning, security, furniture, deposits.]' },
    { heading: ['Side by side for', 'a team of five'], text: '[12-month total: lease (rent, fit-out, power, internet, services) against a serviced office at Co Work Cape Town.]' },
    { heading: ['When a lease is', 'the better deal'], text: '[An honest section: large, stable headcount, long horizon, bespoke fit-out.]' },
    { heading: ['When a serviced', 'office is'], text: '[Growing or shrinking teams, an overseas parent, no appetite for capital spend or power management.]' },
  ],
}
