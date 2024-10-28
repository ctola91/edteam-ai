<script lang="ts" setup>
import { useGeminiStore } from '~/store/gemini';

const store = useGeminiStore()
const { categorySelected, topicSelected, data } = storeToRefs(store)

const questionIndex = ref(0)

const questions = computed(() => {
  let result = []
  const cat = data.value.categories.find(i => i.id === categorySelected.value)
  if (cat) {
    let top = cat.topics.find(i => i.id === topicSelected.value)
    result = top.data
  }
  return result
})
</script>

<template>
  <template v-for="(question, index) in questions" :key="question.pregunta">
    <template v-if="index === questionIndex">
      <div class="flex flex-col gap-8">
      <UCard>
        <div class="flex flex-col gap-2">
          <h1 class="text-4xl text-center font-bold">{{ question.pregunta }}</h1>
        </div>
      </UCard>
      <div class="flex gap-2 justify-between w-3/4 m-auto">
        <UButton color="gray" size="xl" v-for="respuesta in question.respuestas" :key="respuesta">
          {{ respuesta }}
        </UButton>
      </div>
    </div>
    </template>
  </template>
</template>