<template>
    <v-row v-if="honors.length > 0" style="padding-top:30px;">
      <v-divider class="my-4"></v-divider>
      <v-col cols="12">
        <h3 class="text-h6 mb-2">Honors and Awards</h3>
        <v-list>
          <v-list-item v-for="honor in honors" :key="honor.honor_id">
            <v-list-item-content>
              <v-list-item-title>{{ honor.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ honor.organization }} | {{ honor.year }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ honor.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    honors: {
      type: Array,
      default: () => []
    }
  });
  </script>