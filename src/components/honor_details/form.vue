<template>
    <div>
      <h2>{{ is_edit_mode ? "Edit Honor/Awards" : "Add Honor/Awards" }}</h2>
      <v-form ref="form" @submit.prevent="submit_form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              variant="underlined"
              v-model="honor_data.organization"
              label="Organization Name (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="underlined"
              v-model="honor_data.title"
              label="Title (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="underlined"
              v-model="honor_data.description"
              label="Description (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              variant="underlined"
              v-model="honor_data.year"
              label="Year (required)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              variant="underlined"
              v-model="honor_data.details"
              label="Details (required)"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="error" @click="reset_honor">Cancel</v-btn>
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
    honor: {
      type: Object,
      required: true,
    },
  });
  const is_edit_mode = ref(!!props.honor.honor_id);
  const honor_data = ref({ ...props.honor });
  const emit = defineEmits(["save", "reset_honor"]);
  const snackbar = ref({
    value: false,
    color: '',
    text: '',
  });
  
  watchEffect(() => {
    honor_data.value = { ...props.honor };
    is_edit_mode.value = !!props.honor.honor_id;
  });
  
  const submit_form = () => {
    if (!honor_data.value.organization || !honor_data.value.title || !honor_data.value.description) {
      snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
    } else {
      emit("save", honor_data.value);
      honor_data.value = { ...props.honor };
    }
  };
  
  const close_snackbar = () => {
    snackbar.value.value = false;
  };
  
  const reset_honor = () => {
    emit('reset_honor');
  };
  </script>
  
  <style>
  h2 {
    margin-bottom: 10px;
  }
  </style>
  