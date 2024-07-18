<template>
    <div>
      <Form :skill="edit_skill_data" @save="save_skill" @reset_form="reset_form" :user_previous_skills="user_previous_skills" />
  
      <v-row style="margin-top: 20px;">
        <v-col v-for="(skill, index) in skills" :key="index" class="mb-3" cols="4">
          <v-card>
            <v-card-title>{{ skill.skill_name }}</v-card-title>
            <v-card-actions>
                <div class="text-center">
              <v-btn variant="elevated" color="primary" class="ml-2" @click="set_edit_skill(index)">Edit</v-btn>
              <v-btn variant="elevated" color="primary" @click="remove_skill(index)" style="margin-left:10px;">Delete</v-btn>
            </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="close_snackbar">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script setup>
  import { ref, toRefs } from 'vue';
  import Form from './form.vue'; 
  
  const props = defineProps({
    skills: {
      type: Array,
      required: true
    },
    user_previous_skills: {
      type: Array,
      required: true
    }
  });
  
  const { skills, user_previous_skills } = toRefs(props);
  const default_skill_data = {
    skill_id: null, skill_name: ''
  };
  const edit_skill_data = ref({ ...default_skill_data });
  const snackbar = ref({ value: false, color: '', text: '' });
  
  const save_skill = (skill) => {
    if (skill.skill_id) {
      const index = skills.value.findIndex(sk => sk.skill_id === skill.skill_id);
      if (index !== -1) {
        skills.value.splice(index, 1, skill);
        snackbar.value = { value: true, color: 'success', text: 'Skill updated successfully.' };
      }
    } else {
      skill.skill_id = skills.value.length + 1;
      skills.value.push(skill);
      snackbar.value = { value: true, color: 'success', text: 'Skill added successfully.' };
    }
    edit_skill_data.value = { ...default_skill_data };
  };
  
  const remove_skill = (index) => {
    if (edit_skill_data.value.skill_id === skills.value[index].skill_id) {
      edit_skill_data.value = { ...default_skill_data };
    }
    skills.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Skill removed successfully.' };
  };
  
  const set_edit_skill = (index) => {
    edit_skill_data.value = skills.value[index];
  };
  
  const close_snackbar = () => {
    snackbar.value.value = false;
  };
  
  const reset_form = () => {
    edit_skill_data.value = { ...default_skill_data };
  };
  </script>
  
  <style>
  .text-center {
    margin-bottom: 10px;
  }
  </style>
  