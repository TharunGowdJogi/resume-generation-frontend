<template>
  <div>
    <details :education="current_education" @save="handle_save_education" @reset_education="reset_education" />
    <v-row style="margin-top: 20px;">
      <v-col v-for="(education, index) in educations" :key="index" cols="12" md="6">
        <v-card>
          <v-card-title>
            <div>
              {{ education.organization }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            {{ education.from_year }} - {{ education.to_year || "Present" }}
          </v-card-subtitle>
          <v-card-text>
            {{ education.city }}, {{ education.state }}, {{ education.country }}
            <br />
            Course: {{ education.course_name }} <br/>
            GPA: {{ education.gpa }}
            <br />
            .... <br/><br/>
            <div class="text-center">
              <v-btn variant="elevated" color="primary" class="ml-2" @click="edit_education(index)">Edit</v-btn>
              <v-btn variant="elevated" color="primary" @click="delete_education(index)" style="margin-left:10px;">Delete</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn :color="snackbar.color" variant="text" @click="close_snack_bar">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import details from './form.vue';

const props = defineProps({
  educations: {
    type: Array,
    required: true
  }
});

const { educations } = toRefs(props);
const initial_education = {
  organization: '', course_name: '', specialization: '', gpa: '', city: '', state: '', country: '', from_year: '', to_year: '', details: ''
};
const current_education = ref({ ...initial_education });
const snackbar = ref({ value: false, color: '', text: '' });

const handle_save_education = (education) => {
  if (education.education_id) {
    const index = educations.value.findIndex(edu => edu.education_id === education.education_id);
    if (index !== -1) {
      educations.value.splice(index, 1, education);
    }
    snackbar.value = { value: true, color: 'success', text: 'Education Updated Successfully' };
  } else {
    education.education_id = educations.value.length + 1;
    educations.value.push(education);
    snackbar.value = { value: true, color: 'success', text: 'Education Added Successfully' };
  }
  current_education.value = { ...initial_education };
};

const delete_education = (index) => {
  if (current_education.value?.education_id === educations.value[index].education_id) {
    current_education.value = { ...initial_education };
  }
  educations.value.splice(index, 1);
  snackbar.value = { value: true, color: 'error', text: 'Education Deleted Successfully' };
};

const edit_education = (index) => {
  current_education.value = { ...educations.value[index] };
};

const close_snack_bar = () => {
  snackbar.value.value = false;
};

const reset_education = () => {
  current_education.value = { ...initial_education };
};
</script>
