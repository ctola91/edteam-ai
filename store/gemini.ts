const geminiData = ref();
const loading = ref(false);

export const useGeminiStore = defineStore('gemini', () => {
  const loadGeminiData = async () => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "GET",
      });
      // console.log(error)

      console.log(res.data);

      if (!res.data)
        loading.value = false;
      
      let result = res.data.replace('```json', '').replace('```', '')
      geminiData.value = JSON.parse(result);
      loading.value = false;

      return geminiData.value;
    } catch (e) {
      console.log(e);
      loading.value = false;
      return e;
    }
  };

  return {
    geminiData,
    loading,
    loadGeminiData,
  };
})