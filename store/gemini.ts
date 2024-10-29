import { topic } from "./../server/utils/constants";
import { CATEGORIES, TOPICS } from "./../utils/constants";
import { useStorage } from "@vueuse/core";

const geminiData = ref([]);
const loading = ref(false);
const correctAnswers = ref<(boolean | undefined)[]>([]);

export const useGeminiStore = defineStore("gemini", () => {
  const data = useStorage("data_gemini", {
    categories: [],
    category: "",
    topic: "",
  });

  const categorySelected = useStorage("category", "");
  const topicSelected = useStorage("topic", "");
  const categories = useStorage("categories", CATEGORIES);
  const topics = useStorage("topics", TOPICS);
  const points = useStorage("points", 0);

  const loadGeminiData = async () => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "GET",
      });

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

  function parseData(gdata) {
    data.value.category = categorySelected.value;
    data.value.topic = topicSelected.value;
    if (data.value.categories.length === 0) {
      data.value.categories.push({
        id: categorySelected.value,
        topics: [
          {
            id: topicSelected.value,
            data: gdata,
          },
        ],
      });
    } else {
      const index = data.value.categories.findIndex(
        (i) => i.id === categorySelected.value
      );
      // Update category
      if (index > -1) {
        const cat = data.value.categories[index];
        const topicIndex = cat.topics.findIndex(
          (i) => i.id === topicSelected.value
        );
        if (topicIndex > -1) {
          cat.topics[topicIndex].data = gdata;
          // data.value.categories[index].topics[topicIndex].data = gdata
        } else {
          // data.value.categories[index].topics.push({
          cat.topics.push({
            id: topicSelected.value,
            data: gdata,
          });
        }
      } else {
        // register new category
        data.value.categories.push({
          id: categorySelected.value,
          topics: [{ id: topicSelected.value, data: gdata }],
        });
      }
    }
  }

  const buildQuestions = async (payload: any) => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/generate`, {
        method: "POST",
        body: payload,
      });

      if (!res.data) {
        loading.value = false;
        return false;
      }
      categorySelected.value = payload.category;
      topicSelected.value = payload.topic;

      let result = res.data.replace("```json", "").replace("```", "");
      geminiData.value = JSON.parse(result);
      if (data.value) {
        parseData(geminiData.value);
      }
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
    correctAnswers,
    points,
    loadGeminiData,
    buildQuestions,
  };
});
