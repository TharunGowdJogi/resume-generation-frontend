<template>
    <div>
      <h2>{{ edit_mode ? "Edit Skill" : "Add Skill" }}</h2>
      <v-form ref="form" @submit.prevent="submit_form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="underlined"
              v-model="skill_data.skill_name"
              label="Skill Name (required)"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="error" @click="reset_form">Cancel</v-btn>
          <v-btn color="primary" @click="submit_form" style="margin-left: 20px;">Save</v-btn>
        </v-row>
      </v-form>
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="close_snackbar">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    skill: {
      type: Object,
      required: true,
    },
  });
  const edit_mode = ref(!!props.skill.skill_id);
  const skill_data = ref({ ...props.skill });
  const emit = defineEmits(["save", "reset_form"]);
  const snackbar = ref({
    value: false,
    color: '',
    text: '',
  });
  
  watchEffect(() => {
    skill_data.value = { ...props.skill };
    edit_mode.value = !!props.skill.skill_id;
  });
  
  const submit_form = () => {
    if (!skill_data.value.skill_name) {
      snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
    } else {
      emit("save", skill_data.value);
      skill_data.value = { ...props.skill };
    }
  };
  
  const close_snackbar = () => {
    snackbar.value.value = false;
  };
  
  const reset_form = () => {
    emit('reset_form');
  };
  </script>
  
  <style>
  h2 {
    margin-bottom: 10px;
  }
  </style>
  