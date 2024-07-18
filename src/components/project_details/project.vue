<template>
  <div>
    <Form :project="edit_project_data" @save="save_project" @reset_form="reset_form" :user_previous_projects="user_previous_projects" />

    <v-row justify="center" style="margin-top: 20px;">
      <v-col cols="9">
        <v-card v-for="(project, index) in projects" :key="index" class="mb-3">
          <v-card-title>{{ project.organization }}</v-card-title>
          <v-card-subtitle>{{ project.title }} - {{ project.year }}</v-card-subtitle>
          <v-card-text>{{ project.details }}</v-card-text>
          <v-card-actions>
            <div class="text-center">
              <v-btn variant="elevated" color="primary" class="ml-2" @click="set_edit_project(index)">Edit</v-btn>
              <v-btn variant="elevated" color="primary" @click="remove_project(index)" style="margin-left:10px;">Delete</v-btn>
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
  projects: {
    type: Array,
    required: true
  },
  user_previous_projects: {
    type: Array,
    required: true
  },
});

const { projects, user_previous_projects } = toRefs(props);
const default_project_data = {
  project_id: null, organization: '', title: '', year: '', details: '', city: '', state: '', country: ''
};
const edit_project_data = ref({ ...default_project_data });
const snackbar = ref({ value: false, color: '', text: '' });

const save_project = (project) => {
  if (project.project_id) {
    const index = projects.value.findIndex(proj => proj.project_id === project.project_id);
    if (index !== -1) {
      projects.value.splice(index, 1, project);
      snackbar.value = { value: true, color: 'success', text: 'Project updated successfully.' };
    }
  } else {
    project.project_id = projects.value.length + 1;
    projects.value.push(project);
    snackbar.value = { value: true, color: 'success', text: 'Project added successfully.' };
  }
  edit_project_data.value = { ...default_project_data };
};

const remove_project = (index) => {
  if (edit_project_data.value.project_id === projects.value[index].project_id) {
    edit_project_data.value = { ...default_project_data };
  }
  projects.value.splice(index, 1);
  snackbar.value = { value: true, color: 'error', text: 'Project removed successfully.' };
};

const set_edit_project = (index) => {
  edit_project_data.value = projects.value[index];
};

const close_snackbar = () => {
  snackbar.value.value = false;
};

const reset_form = () => {
  edit_project_data.value = { ...default_project_data };
};
</script>

<style>
.text-center {
  margin-bottom: 10px;
}
</style>
