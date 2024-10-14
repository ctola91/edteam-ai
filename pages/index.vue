<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

const gemini = useGeminiStore()
const { geminiData: data, loading } = storeToRefs(gemini)

onMounted(async () => {
  await gemini.loadGeminiData()
})
</script>
<template>
  Home Page
  <div v-if="loading">
    Cargando...
  </div>
  <div v-else>
    {{ data }}
  </div>
</template>