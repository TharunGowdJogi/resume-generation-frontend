<template>
  <div>
    <v-container>
      <h1 style="margin-bottom:20px;">My Favorite Resumes</h1>
      <v-alert v-if="resumes.length === 0" type="info">
        No favorites found.
      </v-alert>
      <v-list v-if="resumes.length > 0">
        <v-list-item v-for="resume in resumes" :key="resume.resume_id" @click="viewResume(resume.resume_id)">
          <v-list-item-content>
            <v-list-item-title>{{ resume.ai_generated_url }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import resumeServices from "../services/resume_services";
import { useRouter } from 'vue-router';

const resumes = ref([]);
const router = useRouter();
const currentPage = ref(1);
const snackbar = ref({ value: false, color: '', text: '' });

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

const viewResume = async (resumeId) => {
  try {
    const response = await resumeServices.view_pdf(resumeId);
    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);
  } catch (error) {
    console.error('Failed to view PDF:', error);
    snackbar.value = { value: true, color: 'error', text: 'Failed to view PDF!' };
  }
};

const closeSnackBar = () => {
  snackbar.value.value = false;
};
</script>
