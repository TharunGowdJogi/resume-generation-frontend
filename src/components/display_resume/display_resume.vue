<template>
    <v-card v-if="resume" class="mb-4" style="padding:20px;">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Resume {{ currentPage }} of {{ resumeLength }}</span>
        <v-btn color="primary" @click="$emit('edit')">Edit Resume</v-btn>
      </v-card-title>
      <v-card-text>
        <PersonalInfo :resume="resume" />
        <Skills :skills="resume.skills" />
        <Employment :employment="resume.employment" />
        <Education :education="resume.education" />
        <Honors :honors="resume.honors" />
        <Projects :projects="resume.projects" />
        <v-btn @click="view_resume" style="margin-top: 36px"
          >View PDF</v-btn>
      </v-card-text>
      <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="close_snack_bar">Close</v-btn>
      </template>
    </v-snackbar>
    </v-card>
    <v-alert v-else type="info">No resume data available.</v-alert>
  </template>
  
  <script setup>
  import PersonalInfo from './personal_info.vue';
  import Skills from './skills.vue';
  import Employment from './employment.vue';
  import Education from './education.vue';
  import Honors from './honors.vue';
  import Projects from './projects.vue';
  import resume_services from '../../services/resume_services'
  import { ref } from 'vue';
  
  const props = defineProps({
    resume: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    resumeLength: {
      type: Number,
      required: true
    },
  });
  const snackbar = ref({ value: false, color: '', text: '' });
  
  const emit = defineEmits(['edit','refresh']);

  const view_resume = async () => {
  try {
    const response = await resume_services.view_pdf(props.resume.resume_id);
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
}

  </script>