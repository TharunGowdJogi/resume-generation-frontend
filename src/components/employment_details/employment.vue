<template>
  <div>
    <Form :employment="current_employment" @save="handle_save_employment" @reset_form="reset_employement" :user_previous_employments="user_previous_employments" />
    <v-row style="margin-top: 20px;">
      <v-col v-for="(employment, index) in employments" :key="index" cols="12" md="6">
        <v-card>
          <v-card-title>
            <div>
              {{ employment.organization }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            {{ employment.from_year }} - {{ employment.to_year || "Present" }}
          </v-card-subtitle>
          <v-card-text>
            {{ employment.city }}, {{ employment.state }}, {{ employment.country }}
            <br />
            Position: {{ employment.title }} <br/>
            Description: {{ employment.description }}
            <br />
            <div class="text-center">
              <v-btn variant="elevated" color="primary" class="ml-2" @click="edit_employment(index)">Edit</v-btn>
              <v-btn variant="elevated" color="primary" @click="delete_employment(index)" style="margin-left:10px;">Delete</v-btn>
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
  employments: {
    type: Array,
    required: true
  },
  user_previous_employments: {
    type: Array,
    required: true
  }
});

const { employments, user_previous_employments } = toRefs(props);
const default_employment = {
  employment_id: null, organization: '', title: '', city: '', state: '', country: '', from_year: '', to_year: '', description: ''
};
const current_employment = ref({ ...default_employment });
const snackbar = ref({ value: false, color: '', text: '' });

const handle_save_employment = (employment) => {
  if (employment.employment_id) {
    const index = employments.value.findIndex(exp => exp.employment_id === employment.employment_id);
    if (index !== -1) {
      employments.value.splice(index, 1, employment);
    }
    snackbar.value = { value: true, color: 'success', text: 'Employment Updated Successfully' };
  } else {
    employment.employment_id = employments.value.length + 1;
    employments.value.push(employment);
    snackbar.value = { value: true, color: 'success', text: 'Employment Added Successfully' };
  }
  current_employment.value = { ...default_employment };
};

const delete_employment = (index) => {
  if (current_employment.value?.employment_id === employments.value[index].employment_id) {
    current_employment.value = { ...default_employment };
  }
  employments.value.splice(index, 1);
  snackbar.value = { value: true, color: 'error', text: 'Employment Removed Successfully' };
};

const edit_employment = (index) => {
  current_employment.value = { ...employments.value[index] };
};

const close_snackbar = () => {
  snackbar.value.value = false;
};

const reset_employement = () => {
  current_employment.value = { ...default_employment };
};
</script>

<style>
.text-center {
  margin-bottom: 10px;
}
</style>
