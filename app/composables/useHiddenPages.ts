import { hiddenPages } from '~/data/site'

/**
 * Pages built ahead of their content are hidden until the content exists: they answer 404, nothing links to
 * them (Btn, TextLink and the footer skip links to them) and they are not prerendered, so they stay out of the
 * sitemap. The blog hides itself until the first post exists (nuxt.config sets public.blogLive).
 * Returns a check for a path or link (?query and #hash are ignored).
 */
export function useHiddenPages() {
  const { blogLive } = useRuntimeConfig().public
  return (to?: string) => {
    if (!to || !to.startsWith('/')) return false
    const path = to.split(/[?#]/)[0]!.replace(/\/+$/, '') || '/'
    if (!blogLive && (path === '/blog' || path.startsWith('/blog/'))) return true
    return hiddenPages.includes(path)
  }
}
