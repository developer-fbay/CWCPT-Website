<script setup lang="ts">
import type { BlogCard } from '~/data/types'

/** A blog post card: photo, category (square tag), title, one line, date and reading time. Lifts on hover. */
const props = defineProps<{ post: BlogCard; large?: boolean }>()
const date = computed(() => new Date(props.post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
</script>

<template>
  <article class="card-w lift pc" :class="{ 'pc--large': large }">
    <NuxtLink :to="`/blog/${post.slug}`" class="pc__link">
      <div class="zoom pc__img">
        <img v-if="post.image" :src="post.image" :alt="post.imageAlt ?? ''" width="800" height="450" loading="lazy" decoding="async">
      </div>
      <div class="pc__body">
        <Tag>{{ post.category }}</Tag>
        <h3 class="pc__title">{{ post.title }}</h3>
        <p class="pc__ex">{{ post.excerpt }}</p>
        <p class="cap pc__meta"><time :datetime="post.date">{{ date }}</time> · {{ post.readingMinutes }} min read</p>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.pc { display: flex; }
.pc__link { display: flex; flex-direction: column; text-decoration: none; width: 100%; }
.pc__img { aspect-ratio: 16 / 9; border-radius: var(--radius); background: #e9e9e9; }
.pc__body { padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.pc__title { font-size: 22px; font-weight: 800; font-stretch: 106%; line-height: 1.25; }
.pc--large .pc__title { font-size: var(--fs-card); }
.pc__ex { font-size: 15px; line-height: 1.55; color: var(--ink-2); }
.pc__meta { color: var(--muted-dark); }
</style>
