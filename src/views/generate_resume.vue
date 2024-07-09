<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
        >
          Genrate Resume
        </h1>
      </v-col>
    </v-row>
    <Resume :resume_details="resume_details" @save="createResume" />
             <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">Close</v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import Resume from "../components/resume_details/resume.vue";
import { updateSnackBar } from "../utils/utils";

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resume_details = ref({
  user_details: JSON.parse(localStorage.getItem("user")) || {
    first_name: "",
    last_name: "",
    email: "",
  },
  education: [],
  employment: [],
  projects: [],
  skills: [],
  honors: [],
});

const createResume = async () => {
  // Logic to create resume and make API call
  
};
</script>
