<template>
    <v-row v-if="education.length > 0"  style="padding-top:30px;">
      <v-divider class="my-4"></v-divider>
      <v-col cols="12">
        <h3 class="text-h6 mb-2">Education</h3>
        <v-timeline dense>
          <v-timeline-item v-for="edu in education" :key="edu.education_id" small>
            <v-card>
              <v-card-title class="text-h6">{{ edu.course_name }}</v-card-title>
              <v-card-subtitle>{{ edu.organization }} | {{ edu.from_year }} - {{ edu.to_year }}</v-card-subtitle>
              <v-card-text>
                <p>GPA: {{ edu.gpa }}</p>
                <p>{{ edu.city }}, {{ edu.state }}, {{ edu.country }}</p>
                <p>{{ edu.details }}</p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    education: {
      type: Array,
      default: () => []
    }
  });
  </script>