import { category } from './../server/utils/constants';
import { useStorage } from '@vueuse/core'

const geminiData = ref();
const loading = ref(false);

export const useGeminiStore = defineStore('gemini', () => {
  const data = useStorage('data_gemini', {})

  const loadGeminiData = async () => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "GET",
      });
      // console.log(error)

      // console.log(res.data);

      if (!res.data)
        loading.value = false;
      
      let result = res.data.replace('```json', '').replace('```', '')
      geminiData.value = JSON.parse(result);
      data.value = geminiData.value
      loading.value = false;

      return data.value;
    } catch (e) {
      console.log(e);
      loading.value = false;
      return e;
    }
  };

  const buildQuestions = async (payload: any) => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "POST",
        body: payload
      });
      // console.log(error)

      // console.log(res.data);

      if (!res.data)
        loading.value = false;
      
      let result = res.data.replace('```json', '').replace('```', '')
      geminiData.value = JSON.parse(result);
      data.value = geminiData.value
      loading.value = false;

      return data.value;
    } catch (e) {
      console.log(e);
      loading.value = false;
      return e;
    }
  };
  

  return {
    data,
    loading,
    loadGeminiData,
    buildQuestions
  };
})