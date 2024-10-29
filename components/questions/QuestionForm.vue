<script setup lang="ts">
import { object, Schema, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'

import { useGeminiStore } from '~/store/gemini';

const gemini = useGeminiStore()
const { loading, categories, topics, categorySelected, topicSelected } = storeToRefs(gemini)
const toast = useToast()

const customCategory = ref('')
const customTopic = ref('')

const cats = computed(() => {
  return [...categories.value, 'Otro']
})

const tops = computed(() => {
  return [...topics.value, 'Otro']
})

const schema = object({
  topic: string().required('Este Campo es requerido'),
  category: string().required('Este Campo es requerido')
})

const state = reactive({
  topic: '',
  category: '',
})

async function reset() {
  state.category = ''
  state.topic = ''
}

const update = (t: string) => {
  console.log(customCategory.value)
  if (t === 'topic') {
    topics.value.push(customTopic.value)
    state.topic = customTopic.value
  } else if (t === 'category') {
    categories.value.push(customCategory.value)
    state.category = customCategory.value
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event)
  const form = {
    topic: event.data.topic,
    category: event.data.category
  }
  console.log(form)
  const res = await gemini.buildQuestions(form)

  if(!res)
    toast.add({ title: 'Ha ocurrido un error al generar las preguntas, intente de nuevo'})

  reset()
}

// watch(state, (val) => {
//   if(val) {
//     categorySelected.value = val.category
//     topicSelected.value = val.topic
//   }
// }, { deep: true})
</script>
<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-2xl text-center">Generar Preguntas</h2>
    <UForm :schema="schema" :state="state" @submit.prevent="onSubmit"
      class="flex flex-col align-start gap-2 self-stretch w-full">
      <UFormGroup label="Pais" name="category">
        <USelectMenu v-model="state.category" :options="cats" placeholder="Selecciona una opcion" />
      </UFormGroup>
      <UFormGroup v-if="state.category !== '' && state.category === 'Otro'" label="Agregue un Pais"
        name="custom-category">
        <UInput v-model="customCategory" placeholder="Introduzca un nuevo Pais" @keypress.enter="update('category')" >
          <template #trailing>
            <UButton icon="i-heroicons-plus" color="gray" variant="ghost" @click="update('category')" />
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup label="Tema" name="topic">
        <USelectMenu v-model="state.topic" :options="tops" placeholder="Selecciona uno" />
      </UFormGroup>
      <UFormGroup v-if="state.topic !== '' && state.topic === 'Otro'" label="Agregue un nuevo Tema" name="custom-topic">
        <UInput v-model="customTopic" placeholder="Tema" @keypress.enter="update('topic')" >
          <template #trailing>
            <UButton icon="i-heroicons-plus" color="gray" variant="ghost" @click="update('topic')" />
          </template>
        </UInput>
      </UFormGroup>
      <UButton type="submit" :loading="loading" block>Generar</UButton>
    </UForm>
  </div>
</template>