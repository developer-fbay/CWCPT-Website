<script setup lang="ts">
import { booths, everyRoom, members, notMember, roomFaqs, rooms, roomsClose, roomsHero, roomsIntro, roomsSeo } from '~/data/meetingRooms'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Meeting rooms' }]
usePageSeo({ ...roomsSeo, path: '/meeting-rooms', breadcrumbs: crumbs, faqs: roomFaqs })
</script>

<template>
  <div>
    <PageHero :title="roomsHero.title" :crumbs="crumbs" :image="roomsHero.image">
      <p v-for="p in roomsHero.paragraphs" :key="p">{{ p }}</p>
      <template #actions>
        <Btn to="/contact-us?for=room" cta="rooms_hero_quote">Get a room quote</Btn>
        <Btn to="/contact-us?for=tour" variant="ghost" cta="rooms_hero_tour">Book a tour</Btn>
      </template>
      <template #after><p class="label r-btns">{{ roomsHero.note }}</p></template>
    </PageHero>

    <!-- The six rooms, on white: things people choose -->
    <section class="sec on-white" data-rv aria-labelledby="rooms-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="rooms-h" :lines="roomsIntro.heading" />
          <p class="lead r-body">{{ roomsIntro.text }}</p>
        </div>
        <div class="rooms">
          <article v-for="(r, i) in rooms" :id="r.anchor" :key="r.anchor" class="card-w lift room r-item" :style="{ '--i': i % 3 }">
            <div class="zoom room__img">
              <img :src="r.image.src" :srcset="r.image.srcset" sizes="(max-width: 720px) 92vw, 380px" :alt="r.image.alt" width="800" height="600" loading="lazy" decoding="async">
            </div>
            <div class="room__body">
              <h3 class="mono room__name">{{ r.name }}</h3>
              <p class="room__line">{{ r.line }}</p>
              <Btn :to="`/contact-us?for=room&ref=${r.anchor}`" variant="black" sm :cta="`room_${r.anchor}_request`">Request this room</Btn>
            </div>
          </article>
        </div>
        <div class="booths">
          <p class="lead r-body">{{ booths.text }}</p>
          <div class="booths__strip r-media">
            <div v-for="b in booths.photos" :key="b.src" class="zoom"><img :src="b.src" :srcset="b.srcset" sizes="(max-width: 720px) 33vw, 300px" :alt="b.alt" width="800" height="600" loading="lazy" decoding="async"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec" data-rv aria-label="Members and visitors">
      <div class="wrap split">
        <div class="stack">
          <SectionHeading :lines="members.heading" />
          <p v-for="p in members.paragraphs" :key="p" class="lead muted r-body">{{ p }}</p>
          <div class="r-btns"><TextLink :to="members.link.to" light>{{ members.link.label }}</TextLink></div>
        </div>
        <div class="stack">
          <div class="sh">
            <h2 class="mono h2"><span class="mask"><span>{{ notMember.heading[0] }}<span class="dot">?</span></span></span></h2>
          </div>
          <p v-for="p in notMember.paragraphs" :key="p" class="lead muted r-body">{{ p }}</p>
          <div class="r-btns"><TextLink :to="notMember.link.to" light>{{ notMember.link.label }}</TextLink></div>
        </div>
      </div>
    </section>

    <section class="sec" data-rv aria-labelledby="every-h">
      <div class="wrap stack-lg">
        <SectionHeading id="every-h" :lines="everyRoom.heading" />
        <IconGrid :items="everyRoom.items" />
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="rq-h">
      <div class="wrap faq-grid">
        <div class="stack">
          <SectionHeading id="rq-h" :lines="['Meeting-room', 'questions']" />
          <div class="row r-btns links">
            <TextLink to="/faq">All questions</TextLink>
            <TextLink to="/location">Directions and parking</TextLink>
          </div>
        </div>
        <FaqList :items="roomFaqs" class="r-body" />
      </div>
    </section>

    <ClosingBand :lines="roomsClose.lines" :actions="roomsClose.actions" />
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 22px; }
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.rooms { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 16px; }
.room { display: flex; flex-direction: column; scroll-margin-top: calc(var(--header-h) + 24px); }
.room__img { height: var(--card-img); border-radius: var(--radius); }
.room__body { padding: 22px; display: flex; flex-direction: column; align-items: flex-start; gap: 14px; flex: 1; }
.room__name { font-size: var(--fs-card); }
.room__line { font-size: 15px; line-height: 1.55; color: var(--ink-2); flex: 1; }
.booths { display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; align-items: center; }
.booths__strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.booths__strip .zoom { aspect-ratio: 4 / 3; border-radius: var(--radius); }
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.links { gap: 10px 28px; }
.faq-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
@media (max-width: 960px) { .booths, .split, .faq-grid { grid-template-columns: 1fr; } }
</style>
