<template>
  <v-card class="mx-auto my-4 pa-4" elevation="10">
    <v-card-actions v-if="is_admin" class="pa-4">
      <v-textarea
        v-model="new_comment"
        label="Add a comment"
        rows="3"
        variant="outlined"
        clearable
        class="mb-4"
      ></v-textarea>
      <v-btn color="secondary" style="margin-left: 10px;" @click="submitComment">Submit</v-btn>
    </v-card-actions>
    <v-card-title class="text-h5">Comments</v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item v-for="comment in local_comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-medium">
            {{ comment.user.first_name }}
          </v-list-item-title>
          <p class="text-body-1">
            {{ comment.message }}
          </p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackbar.value" rounded="pill" timeout="3000">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn :color="snackbar.color" text @click="close_snack_bar">Close</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted, watch } from 'vue';
import resume_services from "../../services/resume_services";

const props = defineProps({
  comments: {
    type: Array,
    required: true
  },
  resume_id: {
    type: Number,
    required: true
  }
});

const { comments, resume_id } = toRefs(props);
const local_comments = ref([...comments.value]); 
const new_comment = ref('');
const is_admin = ref(false);
const user_id = ref(null);
const snackbar = ref({ value: false, color: '', text: '' });

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    is_admin.value = user.is_admin;
    user_id.value = user.user_id;
  }
});

watch(comments, (new_comments) => {
  local_comments.value = [...new_comments]; 
});

const submitComment = async () => {
  const requestData = {
    message: new_comment.value,
    resume_id: resume_id.value,
    user_id: user_id.value
  };
  try {
    await resume_services.add_comment(requestData);
    new_comment.value = '';
    const { data } = await resume_services.get_resume_comments(resume_id.value);
    local_comments.value = data; // Update local state
  } catch (err) {
    console.log(err);
    snackbar.value = {
      text: err?.response?.data?.message || "Failed to Comment on the Resume!",
      color: "error",
      value: true
    };
  }
};
const close_snack_bar = () => {
  snackbar.value.value = false;
};
</script>

<style scoped>
.text-h6 {
  color: #1976d2; /* Changed to a different shade of blue */
}
.text-body-1 {
  color: #424242; /* Changed to a darker grey */
}
.v-card {
  background-color: #f5f5f5; /* Changed background color */
}
.v-card-title {
  color: #1e88e5; /* Changed title color */
}
.v-btn {
  background-color: #1e88e5; /* Changed button color */
  color: white;
}
.v-textarea {
  border-color: #1e88e5; /* Changed textarea border color */
}
.v-snackbar {
  background-color: #e0e0e0; /* Changed snackbar background color */
}
</style>
