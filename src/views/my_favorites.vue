<template>
    <div>
      <v-container>
        <h1 style="margin-bottom:20px;">My Favorite Resume's</h1>
        <DisplayResume 
        :resume="currentResume" 
        @edit="editResume"
        :currentPage="currentPage"
        :resumeLength="resumes.length"
        @refresh="fetchFavorites"
        />
        <v-alert v-if="resumes.length === 0" type="info">
          No favorites found.
        </v-alert>
        <v-card-actions v-if="resumes.length !== 0">
        <v-btn :disabled="currentPage === 1" @click="prevPage">Previous</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="currentPage === resumes.length" @click="nextPage">Next</v-btn>
        </v-card-actions>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import DisplayResume from "../components/display_resume/display_resume.vue"; // Make sure to adjust the import path based on your project structure
  import resumeServices from "../services/resume_services"; // Adjust the import path for resume_services
  import { useRouter } from 'vue-router';

  const resumes = ref([]);
  const router = useRouter();
  const currentPage = ref(1);
  const currentResume = computed(() => resumes.value[currentPage.value - 1] || null);

  const fetchFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const promises = favorites.map(id => resumeServices.get_resume_by_id(id));
      const results = await Promise.all(promises);
      resumes.value = results.map(res => res.data);
    } catch (error) {
      console.error("Failed to fetch favorite resumes:", error);
    }
  };
  
  onMounted(fetchFavorites);

  const nextPage = () => {
  if (currentPage.value < resumes.value.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
  
const editResume = () => {
  router.push({ name: 'modify-resume', params: { id: currentResume.value.resume_id } });
};
  </script>
  