<template>
  <div>
    <h2>{{ edit_mode ? "Edit Education" : "Add Education" }}</h2>
    <v-form ref="form" @submit.prevent="save" v-model="valid_form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.organization"
            label="University Name (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.course_name"
            label="Course Name (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.gpa"
            label="GPA"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.city"
            label="City (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.state"
            label="State"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.country"
            label="Country"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.from_year"
            label="From Year (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="local_education.to_year"
            label="To Year"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            variant="underlined"
            v-model="local_education.details"
            label="Details"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="error" @click="reset_education">Cancel</v-btn>
        <v-btn color="primary" @click="save" style="margin-left: 20px;">Save</v-btn>
      </v-row>
    </v-form>
    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="close_snack_bar">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';

const props = defineProps({
  education: {
    type: Object,
    required: true,
  },
});

const valid_form = ref(false);
const local_education = ref({ ...props.education });
const edit_mode = ref(!!props.education.education_id);
const emit = defineEmits(['save', 'reset_education']);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});

watchEffect(() => {
  local_education.value = { ...props.education };
  edit_mode.value = !!props.education.education_id;
});

const save = () => {
  if (!local_education.value.organization || !local_education.value.course_name || !local_education.value.city || !local_education.value.from_year) {
    snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
  } else {
    emit('save', local_education.value);
    local_education.value = { ...props.education };
  }
};

const close_snack_bar = () => {
  snackbar.value.value = false;
};

const reset_education = () => {
  emit('reset_education');
};
</script>

<style>
h2 {
  margin-bottom: 10px;
}
</style>
