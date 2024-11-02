<template>
  <div class="flex justify-center align-center gap-8" :class="{ 'flex-col': smallerThanMd }">
    <template v-if="route.fullPath !== '/' && route.fullPath !== '/game'">
      <UHorizontalNavigation v-if="smallerThanMd" :links="links" />
      <UVerticalNavigation v-else :links="links" />
    </template>
    <UContainer>
      <slot />
    </UContainer>

  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';


const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)

const smallerThanMd = breakpoints.smaller('sm')

const links = [
  {
    label: 'Iniciar Juego',
    icon: 'i-heroicons-puzzle-piece',
    to: '/start-game'
  }, {
    label: 'Generar Preguntas',
    icon: 'i-heroicons-question-mark-circle',
    to: '/questions'
  }
]
</script>

<style scoped></style>