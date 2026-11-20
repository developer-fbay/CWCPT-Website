<script setup lang="ts">
// The screen guides for testing window sizes load only with ?folds in the address (utils/folds.ts)
const folds = ref(false)
onMounted(() => {
  folds.value = foldsWanted()
})
</script>

<template>
  <div>
    <a class="skip" href="#main">Skip to content</a>
    <StripDefs />
    <AppHeader />
    <main id="main">
      <slot />
    </main>
    <AppFooter />
    <LazyFoldGuides v-if="folds" />
  </div>
</template>

<style scoped>
.skip {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 100;
  padding: 10px 16px;
  background: var(--white);
  color: var(--black);
  border-radius: var(--radius-sm);
  font-weight: 800;
  text-decoration: none;
}
.skip:focus { top: 16px; }
</style>
