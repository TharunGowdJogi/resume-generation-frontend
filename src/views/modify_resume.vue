<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-start">
          <h1
            class="my-6"
          >
            Edit Resume
          </h1>
        </v-col>
      </v-row>
      <Resume :resume_details="resume_details" @save="update_resume" :edit="true" />
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="close_snackbar()">Close</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import Resume from "../components/resume_details/resume.vue";
  import resume_services from "../services/resume_services";
  
  const route = useRoute();
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
    user_info: {},
    education: [],
    employment: [],
    projects: [],
    skills: [],
    honors: [],
    resume_id: "",
  });
  
  const fetch_resume_details = async (id) => {
    try {
      const response = await resume_services.get_resume_by_id(id);
      const resume_data = response.data;
      resume_details.value = {
        resume_id: resume_data.resume_id,
        user_info: {
          generated_resume_url: resume_data.generated_resume_url,
          first_name: resume_data.first_name,
          last_name: resume_data.last_name,
          email: resume_data.email,
          phone_number: resume_data.phone_number,
          address: resume_data.address,
          linkedin_url: resume_data.linkedin_url,
          website_url: resume_data.website_url,
          summary: resume_data.summary,
          user_id: resume_data.user_id,
        },
        education: resume_data.education,
        employment: resume_data.employment,
        projects: resume_data.projects,
        skills: resume_data.skills,
        honors: resume_data.honors,
        honorAwards: resume_data.honorAwards,
      };
    } catch (error) {
      console.log(error);
      snackbar.value = {
        text: error?.response?.data?.message || "Failed to fetch resume details!",
        color:"error",
        value: true
      };
    }
  };
  
  const update_resume = () => {
    resume_services.update_resume({ ...resume_details.value, user_id: resume_details.value.user_info.user_id })
      .then((res) => {
        console.log(res);
        snackbar.value = { text: "Resume updated Successfully", color: "success", value: true};
      })
      .catch((err) => {
        console.log(err);
        snackbar.value = {
          text: err?.response?.data?.message || "Failed to update Resume!",
          color: "error",
          value: true
        };
      });
  };
  
const close_snackbar = () => {
  snackbar.value.value = false;
};
  
  onMounted(() => {
    const resumeId = route.params.id;
    fetch_resume_details(resumeId);
  });
  </script>
  