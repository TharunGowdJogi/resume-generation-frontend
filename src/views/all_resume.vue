<template>
  <v-container>
    <DisplayResume 
      :resume="currentResume" 
      @edit="editResume"
      :currentPage="currentPage"
      :resumeLength="resumes.length"
    />
    <v-card-actions>
      <v-btn :disabled="currentPage === 1" @click="prevPage">Previous</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="currentPage === resumes.length" @click="nextPage">Next</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import resume_services from '../services/resume_services';
import DisplayResume from '../components/display_resume/display_resume.vue';

const router = useRouter();
const resumes = ref([]);
const currentPage = ref(1);

const currentResume = computed(() => resumes.value[currentPage.value - 1] || null);

const fetchResumes = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('user')).user_id;
    const response = await resume_services.get_resume_by_user_id(userId);
    resumes.value = response.data;
  } catch (error) {
    console.error('Error fetching resumes:', error);
  }
};

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

onMounted(fetchResumes);
</script>