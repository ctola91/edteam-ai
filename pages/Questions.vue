<script setup lang="ts">
import QuestionForm from '~/components/questions/QuestionForm.vue';
import { useGeminiStore } from '~/store/gemini';

  const gemini = useGeminiStore()
  const { data: questions } = storeToRefs(gemini)
</script>
<template>

  <div class="result">
    <div>
      <QuestionForm />
      <QuestionsSection />
    </div>
  </div>
</template>