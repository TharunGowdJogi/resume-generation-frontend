<template>
    <v-row v-if="skills.length > 0">
      <v-col cols="12">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Skills</v-list-item-title>
            <v-chip-group>
              <v-chip v-for="skill in skills" :key="skill.skill_id" small>
                {{ skill.skill_name }}
              </v-chip>
            </v-chip-group>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  defineProps({
    skills: {
      type: Array,
      default: () => []
    }
  });
  </script>