<template>
    <v-row>
      <v-col cols="12" sm="6">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ resume.first_name }} {{ resume.last_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ resume.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
            <v-list-item-subtitle>{{ resume.mobile }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ resume.address }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="resume.linkedin_url">
          <v-list-item-content>
            <v-list-item-title>LinkedIn</v-list-item-title>
            <v-list-item-subtitle>{{ resume.linkedin_url }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    resume: {
      type: Object,
      required: true
    }
  });
  </script>