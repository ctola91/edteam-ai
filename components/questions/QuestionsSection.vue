<script setup lang="ts">
import { useGeminiStore } from '~/store/gemini';

const gemini = useGeminiStore()
const { data, loading, categorySelected, topicSelected } = storeToRefs(gemini)

const buildQuestions = computed(() => {
  console.log(data.value)
  if (data.value) {
    if (categorySelected.value !== '' && topicSelected.value !== '') {
      if (data.value.categories) {
        let cs = data.value.categories.find(i =>
          i.id === categorySelected.value
        )

        const questions = cs.topics.find(i => {
          return i.id === topicSelected.value
        })

        if (questions.data.length > 0) {
          return questions.data.map((q) => ({
            label: q.pregunta,
            ...q
          }))
        }
      }
    }
  }

  return []
})


</script>
<template>
  <div class="pt-4">
    <div v-if="loading" class="flex flex-col gap-2">
      <USkeleton class="h-4 w-[320px]" />
      <USkeleton class="h-4 w-[320px]" />
    </div>
    <div v-else-if="buildQuestions.length === 0" class="pb-4">
      No hay preguntas Guardadas.
    </div>
    <div v-else class="flex flex-col gap-2">
      <div class="text-xl text-center ">Preguntas Actuales</div>
      <div class="result">
        <UAccordion :items="buildQuestions">
          <template #item="{ item }">
            {{ item.correcta }}
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>