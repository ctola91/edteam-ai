const geminiData = ref();
const loading = ref(false);

export const useGeminiStore = defineStore('gemini', () => {
  const loadGeminiData = async () => {
    try {
      loading.value = true;
      const { data } = await useFetch(`/api/generate`, {
        method: "GET",
      });
      // console.log(error)

      console.log(data.value);

      if (!data.value)
        loading.value = false;
      
      geminiData.value = data.value;
      loading.value = false;
      
      return data.value;
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