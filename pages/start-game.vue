<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

const store = useGeminiStore()

const { categorySelected, topicSelected } = storeToRefs(store)

const gemini = useGeminiStore()
const { loading, categories: cats, topics: tops, data } = storeToRefs(gemini)

const categories = computed(() => {
  if (data.value && data.value.categories.length === 0)
    return []
  return data.value.categories.map((i) => ({ label: i.id, value: i.id }))
})

const topics = computed(() => {
  if (categories.value.length === 0)
    return []
  const cat = data.value.categories.find(i => i.id === categorySelected.value)
  if (cat) {
    return cat.topics.map((i) => ({ label: i.id, value: i.id }))
  } else {
    return []
  }
})

const uiCard = {
  base: 'cursor-pointer w-full',
  mode: 'override',
  body: {
    padding: 'px-3 py-2 sm:p-4'
  },
}

</script>
<template>
  <div class="flex flex-col gap-4">
    <template v-if="categories.length > 0">
      <h2 class="text-2xl text-center">Escoge Una Categoria</h2>
      <div class="flex flex-row flex-wrap gap-6">
        <UCard :ui="uiCard">
          <URadioGroup v-model="categorySelected" :options="categories" />
        </UCard>
      </div>
      <template v-if="categorySelected">
        <h2 class="text-2xl text-center">Escoge un Tema</h2>
        <div class="flex flex-row flex-wrap gap-6 ">
          <UCard :ui="uiCard">
            <URadioGroup v-model="topicSelected" :options="topics" />
          </UCard>
        </div>
      </template>
      <UButton color="primary" block size="xl" :disabled="!(categorySelected && topicSelected)" to="/game">Iniciar</UButton>
    </template>
    <template v-else>
      <h2 class="text-2xl text-center">Aun no tienes informacion</h2>
      <UButton color="gray" block size="md" to="/questions">Genera preguntas aqui</UButton>
    </template>
  </div>
</template>