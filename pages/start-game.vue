<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

  const gemini = useGeminiStore()
  const { loading, categories, topics } = storeToRefs(gemini)

</script>
<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl text-center">Escoge Una Categoria</h2>
    <div class="flex flex-row flex-wrap gap-6">
      <UCard v-for="category in categories"> {{ category }}</UCard>
    </div>
    <h2 class="text-2xl text-center">Escoge un Tema</h2>
    <div class="flex flex-row flex-wrap gap-6 ">
      <UCard v-for="topic in topics"> {{ topic }}</UCard>
    </div>
    <UButton color="primary" block size="xl">Iniciar</UButton>
</div>
</template>