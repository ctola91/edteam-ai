<template>
  <div class="flex justify-center align-center gap-8">
    <UVerticalNavigation v-if="route.fullPath !== '/'" :links="links" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const links = [
  {
    label: 'Iniciar Juego',
    icon: 'i-heroicons-home',
    to: '/game'
  }, {
    label: 'Generar Preguntas',
    icon: 'i-heroicons-chart-bar',
    to: '/questions'
  }
]
</script>

<style scoped></style>