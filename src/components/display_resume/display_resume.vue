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
      </v-card-text>
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
  
  defineProps({
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
  
  defineEmits(['edit']);
  </script>