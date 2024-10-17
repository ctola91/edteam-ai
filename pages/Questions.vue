<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

  const gemini = useGeminiStore()
  const { data: questions } = storeToRefs(gemini)
  
  // futbol, cultura general, comida, etc
  const topic = ref('')
  
  // bolivia, argentina, mundo
  const country = ref('')
  

async function onSubmit() {
    const form = {
      topic: topic.value,
      category: country.value
    }
    console.log(form)
    await gemini.buildQuestions(form)
  }
</script>
<template>
  <form @submit.prevent="onSubmit" class="flex flex-col align-start gap-2 max-w-80">
    <!-- <label>Pais: </label><input v-model="country" />
    <label>Tema: </label><input v-model="topic" />
    <button type="submit">Generar</button> -->

    <UInput v-model="country" placeholder="Pais" />
    <UInput v-model="topic" placeholder="Tema" />
    <UButton type="submit">Generar</UButton>

  </form>
  <div class="result">
    {{ questions }}
  </div>
</template>