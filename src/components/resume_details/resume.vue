<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" rounded="lg">
      <user style="margin-bottom:40px;" :user_details="resume_details.user_info" />
      <educations style="margin-bottom:40px;" :educations="resume_details.education" :user_previous_educations="user_resumes?.education" />
      <employment style="margin-bottom:40px;" :employments="resume_details.employment" :user_previous_employments="user_resumes?.employment" />
      <projects style="margin-bottom:40px;" :projects="resume_details.projects" :user_previous_projects="user_resumes?.projects" />
      <skills style="margin-bottom:40px;" :skills="resume_details.skills" :user_previous_skills="user_resumes?.skills" />
      <honors style="margin-bottom:40px;" :honors="resume_details.honors" :user_previous_honors="user_resumes?.honors" />
    </v-card>

    <v-row justify="end" class="mt-4"> 
      <v-col cols="2">
        <div>
          <v-btn v-if="!edit" color="primary" @click="create_resume">Create Resume</v-btn>
          <v-btn v-else color="primary" @click="create_resume">Update Resume</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, defineEmits, onMounted } from 'vue';
import user from '../user_details/user_details_form.vue';
import educations from '../education_details/education.vue';
import employment from '../employment_details/employment.vue';
import projects from '../project_details/project.vue';
import honors from '../honor_details/honor.vue';
import skills from '../skill_details/skill.vue';
import resume_services from "../../services/resume_services"

const props = defineProps({
  resume_details: {
    type: Object,
    required: true
  },
  edit: {
    type: Boolean,
  }
});

const user_resumes = ref(null);
const { resume_details } = toRefs(props)

const emit = defineEmits(["save"]);

const create_resume = () => {
  emit('save')
};

const get_user_resumes = async () => {
  const localUser = JSON.parse(localStorage.getItem("user"))
  resume_services.get_user_resume_by_category(localUser.user_id)
    .then((res) => {
      console.log(res);
      user_resumes.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  
};

onMounted(async()=> {
  await get_user_resumes();
})
</script>

<style>
h3 {
  margin-bottom: 10px;
}
</style>
