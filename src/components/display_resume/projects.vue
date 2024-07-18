<template>
    <v-row v-if="projects.length > 0">
      <v-divider class="my-4"></v-divider>
      <v-col cols="12">
        <h3 class="text-h6 mb-2">Projects</h3>
        <v-list>
          <v-list-item v-for="project in projects" :key="project.project_id">
            <v-list-item-content>
              <v-list-item-title>{{ project.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ project.organization }} | {{ project.year }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ project.details }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ project.city }}, {{ project.state }}, {{ project.country }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    projects: {
      type: Array,
      default: () => []
    }
  });
  </script>