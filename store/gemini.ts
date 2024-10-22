import { topic } from "./../server/utils/constants";
import { CATEGORIES, TOPICS } from "./../utils/constants";
import { useStorage } from "@vueuse/core";

const geminiData = ref([]);
const loading = ref(false);

export const useGeminiStore = defineStore("gemini", () => {
  const data = useStorage("data_gemini", null);

  const categorySelected = useStorage("category", "");
  const topicSelected = useStorage("topic", "");
  const categories = useStorage("categories", CATEGORIES);
  const topics = useStorage("topics", TOPICS);

  const loadGeminiData = async () => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "GET",
      });
      // console.log(error)

      // console.log(res.data);

      if (!res.data) loading.value = false;

      let result = res.data.replace("```json", "").replace("```", "");
      geminiData.value = JSON.parse(result);
      data.value = geminiData.value;
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
        body: payload,
      });

      if (!res.data) loading.value = false;
      categorySelected.value = payload.category
      topicSelected.value = payload.topic

      let result = res.data.replace("```json", "").replace("```", "");
      geminiData.value = JSON.parse(result);
      data.value = {
        category: payload.category,
        topic: payload.topic,
        categories: [
          {
            id: payload.category,
            topics: [
              {
                id: payload.topic,
                data: geminiData.value,
              },
            ],
          },
        ],
      };
      
      console.log(data.value)

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
    topics,
    categories,
    categorySelected,
    topicSelected,
    loadGeminiData,
    buildQuestions,
  };
});
