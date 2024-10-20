<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

  const gemini = useGeminiStore()
  const { data: questions } = storeToRefs(gemini)

  const buildQuestions = computed(() => {
    return questions.value.map((q) => ({
      label: q.pregunta,
      ...q
    }))
  })
</script>
<template>
  <div class="text-xl text-center ">Preguntas Actuales</div>
  <div class="result">
    <UAccordion :items="buildQuestions">
      <template #item="{ item }">
        {{ item.correcta }}
      </template>
    </UAccordion>
  </div>
</template>