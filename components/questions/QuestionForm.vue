<script setup lang="ts">
import { object, Schema, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types'

import { useGeminiStore } from '~/store/gemini';

  const gemini = useGeminiStore()
  const { loading, categories, topics } = storeToRefs(gemini)
  
  const schema = object({
    topic: string().required('Este Campo es requerido'),
    category: string().required('Este Campo es requerido')
  })

  const state = reactive({
    topic: undefined,
    category: undefined,
  })

async function reset() {
  state.category = ''
  state.topic = ''
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event)
    const form = {
      topic: event.data.topic,
      category: event.data.category
    }
    console.log(form)
    await gemini.buildQuestions(form)

    reset()
  }
</script>
<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-2xl text-center">Generar Preguntas</h2>
  <UForm :schema="schema" :state="state" @submit.prevent="onSubmit" class="flex flex-col align-start gap-2 self-stretch w-full">
    <UFormGroup label="Pais" name="category">
      <USelectMenu v-model="state.category" :options="categories" />
    </UFormGroup>
    <!-- <UFormGroup label="Agregue un Pais" name="category">
      <UInput v-model="state.category" placeholder="Ej: Bolivia" />
    </UFormGroup> -->
    <UFormGroup label="Tema" name="topic">
      <UInput v-model="state.topic" placeholder="Ej: Futbol" />
    </UFormGroup>
    <UButton type="submit" :loading="loading" block>Generar</UButton>
  </UForm>
</div>
</template>