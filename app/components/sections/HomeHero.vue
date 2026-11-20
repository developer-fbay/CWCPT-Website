<script setup lang="ts">
import { hero } from '~/data/home'

/**
 * Home hero, E + I from the HeroLetters board. Left, on black: the H1 (the keyword line, styled small like the
 * location line: decided 2026-11-18), then "Co Work / Cape / Town." cut out of the black so the view shows
 * through the letters (the poster still), the lit full stop, "is Lekker", the intro, the buttons and the rating.
 * Right: the hero video plays inside a big version of the logo's block, darkened, with the white mountain
 * line over it, and the 24/7 card on its corner.
 */
</script>

<template>
  <section class="hh" data-rv>
    <div class="wrap hh__grid">
      <div class="hh__text">
        <h1 class="badge r-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {{ hero.h1 }}
        </h1>
        <p class="mono hh__name">
          <span v-for="(line, i) in hero.nameLines" :key="line" class="mask">
            <span class="see" :style="{ '--l': i, backgroundPosition: `0 ${i * 50}%` }">{{ line }}<span v-if="i === hero.nameLines.length - 1" class="dot">.</span></span>
          </span>
        </p>
        <p class="hh__rot r-body"><span class="hh__is">{{ hero.rotatingPrefix }}</span><RotatingWords :words="hero.rotatingWords" /></p>
        <p class="lead muted hh__intro r-body">{{ hero.intro }}</p>
        <div class="row r-btns hh__btns">
          <Btn v-for="a in hero.actions" :key="a.label" :to="a.to" :variant="a.variant" :cta="a.cta">{{ a.label }}</Btn>
          <Rating class="hh__rating" />
        </div>
      </div>

      <div class="hh__art">
        <div class="hh__block r-media" role="img" :aria-label="hero.video.label">
          <!-- The 16:9 still covers a square of up to 540px, so it is drawn 16/9 as wide as the square -->
          <BackgroundVideo :vimeo-id="hero.video.vimeoId" :poster="hero.video.poster" sizes="(max-width: 600px) 164vw, 960px" />
          <div class="hh__shade" />
          <div class="line-mask hh__line" aria-hidden="true" />
        </div>
        <div class="card-w lift hh__card r-item" style="--i: 2">
          <span class="label">{{ hero.card.label }}</span>
          <span class="mono hh__card-v">{{ hero.card.value }}</span>
          <span class="muted-dark hh__card-n">{{ hero.card.note }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The whole hero fits a laptop screen at 125% scaling: sizes follow the window's height as well as its width */
.hh { padding: clamp(28px, 6vh, 64px) 0 clamp(56px, 8vw, 96px); }
.hh__grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
.hh__text { display: flex; flex-direction: column; gap: clamp(14px, 2.4vh, 24px); min-width: 0; }

/* The H1: the keyword line, set small like the location line (no dash before it: Jesse, 2026-11-20) */
.badge { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 12px 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; line-height: 1.4; }

/* The name, cut out of the black so the view shows through */
.hh__name { font-size: var(--fs-display); }
.see {
  color: transparent; -webkit-text-fill-color: transparent;
  -webkit-background-clip: text; background-clip: text;
  background-image: url('/images/hero/home-hero-poster-960.webp');
  background-size: 100% 300%; background-repeat: no-repeat; white-space: nowrap;
}
.see .dot { -webkit-text-fill-color: var(--white); color: var(--white); }

.hh__rot { display: flex; align-items: baseline; gap: 18px; }
.hh__is { font-size: 26px; font-weight: 800; }
.hh__intro { max-width: 620px; }
.hh__rating { margin-left: 10px; }

/* The logo's block with the video and the mountain line */
.hh__art { position: relative; padding: 0 24px 24px 0; }
.hh__block { position: relative; aspect-ratio: 1 / 1; max-width: min(540px, calc(100vh - var(--header-h) - 110px)); margin-left: auto; overflow: hidden; background: #111111; }
.hh__shade { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.28); }
.hh__line { position: absolute; left: -1.4%; top: 1.4%; width: 102.8%; height: 102.8%; }
.hh__card {
  position: absolute; right: 0; bottom: 0; padding: 18px 22px; display: flex; flex-direction: column; gap: 4px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
.hh__card .label { font-size: 11px; }
.hh__card-v { font-size: var(--fs-figure); }
.hh__card-n { font-size: 13px; }

/* Short laptop screens: a 1080p laptop at 150% scaling shows about 1280 x 600 */
@media (min-width: 961px) and (max-height: 640px) {
  .hh { padding-top: 20px; }
  .hh__text { gap: 12px; }
  .hh__intro { font-size: 16px; }
}

@media (max-width: 960px) {
  .hh__grid { grid-template-columns: 1fr; }
  .hh__block { margin-left: 0; }
  .hh__rating { margin-left: 0; }
}
</style>
