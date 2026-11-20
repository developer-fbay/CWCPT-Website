// Partner logos, as the approved Offices copy lists them under "For companies abroad"
// ("partner logos for The Legends Agency, FBX Capital Partners, FundingBay and Employer of Record SA").
// Not on Home for now: Jesse isn't sure the brand logos stay there.
// The files are trimmed to the logo itself (npm run images); width and height come from media.generated.json,
// so LogoStrip can give every logo the same visual weight whatever its shape.
import media from './media.generated.json'

const size = (src: string) => {
  const f = media.flatMap((m) => m.files).find((x) => x.src === src)
  return { width: f?.width ?? 600, height: f?.height ?? 150 }
}

export const partners = [
  { name: 'The Legends Agency', src: '/images/brand/partner-the-legends-agency.webp' },
  { name: 'FBX Capital Partners', src: '/images/brand/partner-fbx-capital-partners.webp' },
  { name: 'Funding Bay', src: '/images/brand/partner-funding-bay.webp' },
  { name: 'Employer of Record SA', src: '/images/brand/partner-employer-of-record-sa.webp' },
].map((p) => ({ ...p, ...size(p.src) }))
