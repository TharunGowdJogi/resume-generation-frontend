<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-start">
        <h1
        style="margin-bottom:20px;"
        >
          Generate Resume
        </h1>
      </v-col>
    </v-row>
    <Resume :resume_details="resume_details" @save="generate_resume" />
             <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="close_snackbar()">Close</v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Resume from "../components/resume_details/resume.vue";
import resume_services from "../services/resume_services";

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const resume_details = ref({
  user_info: JSON.parse(localStorage.getItem("user")) || {
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

const generate_resume = async () => {
  
  resume_services.add_resume({
    ...resume_details.value,
    user_id: resume_details.value.user_info.user_id,
  })
    .then((res) => {
      console.log(res);
      snackbar.value = { value: true, color: 'success', text: 'Resume Created Successfully' };
    })
    .catch((err) => {
      console.log(err);
      snackbar.value = { value: true, color: 'success', text:  err?.response?.data?.message || "Failed to generate Resume!" };
    });
  
};

const close_snackbar = () => {
  snackbar.value.value = false;
};
</script>
