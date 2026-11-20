// The blog index. The whole blog stays hidden until content/blog has its first post (useHiddenPages).
// [Bracketed] text is a brief still waiting for copy: it never shows on the site (filled() in app/utils).
import { photo } from './types'
export const blogSeo = {
  title: 'The Co Work Cape Town blog',
  description: 'Working from Cape Town, running a team here and life at Wembley Square, Gardens: the Co Work Cape Town blog.',
}

export const blogHero = {
  title: 'The Co Work Cape Town blog',
  image: photo('photos', 'seating-area-5526', 'Two purple armchairs and a plant in a breakout corner at Co Work Cape Town'),
  intro: '[SEO copy, about 40 words: what the blog covers, such as working from Cape Town, running a team here and life at Wembley Square.]',
}

// Shown when a category filter has no posts
export const blogEmpty = 'No posts in this category yet.'
