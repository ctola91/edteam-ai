<script lang="ts" setup>
import ConfettiExplosion from "vue-confetti-explosion";
import QuestionTimer from '~/components/questions/QuestionTimer.vue';
import { useGeminiStore } from '~/store/gemini';

const router = useRouter()
const store = useGeminiStore()
const { categorySelected, topicSelected, data, points } = storeToRefs(store)

const questionIndex = ref(0)
const isFinished = ref(false)

const questions = computed(() => {
  let result = []
  const cat = data.value.categories.find(i => i.id === categorySelected.value)
  if (cat) {
    let top = cat.topics.find(i => i.id === topicSelected.value)
    result = top.data
  }
  return result
})

const selectAnswer = (question, res) => {
  if (question.correcta === res)
    points.value++
  else
    points.value--
  questionIndex.value++
  if (questionIndex.value === questions.value.length) {
    isFinished.value = true
  }
}

const onTimeFinished = () => {
  questionIndex.value++
}

watch(questions, async (val) => {
  console.log(val)
  if(val.length === 0)
    await router.push('/')
})

const uiFinishCard = {
  mode: 'override',   
  base: 'w-[320px]',
  body: {
    base: 'flex flex-col gap-2 justify-center align-center text-center'
  }
}
</script>

<template>
  <template v-if="isFinished">
    <div class="flex flex-col gap-3">
    <UCard :ui="uiFinishCard">
      <p class="text-lg">Felicidades</p>
      <p class="text-sm">Su Puntaje es:</p>
      <p class="text-9xl"> {{ points }}</p>
    </UCard>
    <UButton block  label="Empezar de nuevo" to="/start-game"/>
    <ConfettiExplosion :particleCount="200" :force="0.3" />
  </div>
  </template>
  <template v-else>
    <template v-for="(question, index) in questions" :key="question.pregunta">
      <template v-if="index === questionIndex">
        <div class="flex flex-col gap-8">
          <UCard>
            <div class="flex flex-col gap-2">
              <h1 class="text-4xl text-center font-bold">{{ question.pregunta }}</h1>
            </div>
          </UCard>

          <QuestionTimer @send-timer-data="onTimeFinished" />
          <div class="flex gap-4 m-auto">
            <UButton color="gray" size="xl" v-for="respuesta in question.respuestas" :key="respuesta"
              @click="selectAnswer(question, respuesta)">
              {{ respuesta }}
            </UButton>
          </div>
        </div>
      </template>
    </template>
  </template>
</template>