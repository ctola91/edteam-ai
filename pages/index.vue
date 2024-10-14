<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

const questions = ref([])

const gemini = useGeminiStore()
const { geminiData: data, loading } = storeToRefs(gemini)

onMounted(async () => {
  await gemini.loadGeminiData()
  if(data.value) {
    questions.value = data.value
  }
})
</script>
<template>
  Home Page
  <div v-if="loading">
    Cargando...
  </div>
  <div v-else>
    <div v-for="q in questions" :key="q.pregunta">{{ q.pregunta }} <br />
      {{  q.respuestas }}<br>
      {{ q.correcta }}
    </div>
  </div>
</template>