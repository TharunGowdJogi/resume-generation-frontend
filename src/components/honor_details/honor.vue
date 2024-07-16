<template>
    <div>
      <Form :honor="current_honor" @save="handle_save_honor" @reset_form="reset_honor" />
      <v-row style="margin-top: 20px;">
        <v-col v-for="(honor, index) in honors" :key="index" cols="12" md="6">
          <v-card>
            <v-card-title>
              <div>
                {{ honor.organization }}
              </div>
            </v-card-title>
            <v-card-subtitle>
              Year - {{ honor.year }}
            </v-card-subtitle>
            <v-card-text>
              <br />
              Position: {{ honor.title }} <br/>
              Description: {{ honor.description }}
              <br />
              <div class="text-center">
                <v-btn variant="elevated" color="primary" class="ml-2" @click="edit_honor(index)">Edit</v-btn>
                <v-btn variant="elevated" color="primary" @click="delete_honor(index)" style="margin-left:10px;">Delete</v-btn>
              </div>
            </v-card-text>
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
    honors: {
      type: Array,
      required: true
    }
  });
  
  const { honors } = toRefs(props);
  const default_honor = {
    honor_id: null, organization: '', title: '', year: '', details: '', description: ''
  };
  const current_honor = ref({ ...default_honor });
  const snackbar = ref({ value: false, color: '', text: '' });
  
  const handle_save_honor = (honor) => {
    if (honor.honor_id) {
      const index = honors.value.findIndex(exp => exp.honor_id === honor.honor_id);
      if (index !== -1) {
        honors.value.splice(index, 1, honor);
      }
      snackbar.value = { value: true, color: 'success', text: 'Honor Updated Successfully' };
    } else {
      honor.honor_id = honors.value.length + 1;
      honors.value.push(honor);
      snackbar.value = { value: true, color: 'success', text: 'Honor Added Successfully' };
    }
    current_honor.value = { ...default_honor };
  };
  
  const delete_honor = (index) => {
    if (current_honor.value?.honor_id === honors.value[index].honor_id) {
      current_honor.value = { ...default_honor };
    }
    honors.value.splice(index, 1);
    snackbar.value = { value: true, color: 'error', text: 'Honor Removed Successfully' };
  };
  
  const edit_honor = (index) => {
    current_honor.value = { ...honors.value[index] };
  };
  
  const close_snackbar = () => {
    snackbar.value.value = false;
  };
  
  const reset_honor = () => {
    current_honor.value = { ...default_honor };
  };
  </script>
  
  <style>
  .text-center {
    margin-bottom: 10px;
  }
  </style>
  