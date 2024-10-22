<template>
  <div class="flex justify-center align-center gap-8">
    <UVerticalNavigation v-if="route.fullPath !== '/' && route.fullPath !== '/start-game'" :links="links" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

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