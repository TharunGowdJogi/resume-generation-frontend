<template>
    <v-row v-if="employment.length > 0">
      <v-divider class="my-4" ></v-divider>
      <v-col cols="12">
        <h3 class="text-h6 mb-2">Employment History</h3>
        <v-timeline dense>
          <v-timeline-item v-for="job in employment" :key="job.employment_id" small>
            <v-card>
              <v-card-title class="text-h6">{{ job.title }} at {{ job.organization }}</v-card-title>
              <v-card-subtitle>{{ job.from_year }} - {{ job.to_year || 'Present' }}</v-card-subtitle>
              <v-card-text>
                <p>{{ job.description }}</p>
                <p>{{ job.city }}, {{ job.state }}, {{ job.country }}</p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    employment: {
      type: Array,
      default: () => []
    }
  });
  </script>