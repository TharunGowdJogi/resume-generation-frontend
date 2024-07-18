<template>
  <div>
    <v-row>
      <v-col>
        <h2>{{ edit_mode ? "Edit Project" : "Add Project" }}</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="open_dialog">Select From Previous Projects</v-btn>
      </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="submit_form">
      <v-row>
        <v-col cols="12">
          <v-text-field
            variant="underlined"
            v-model="project_data.organization"
            label="Employer Name (where is it done?) (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="project_data.title"
            label="Title (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="project_data.year"
            label="Year (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            variant="underlined"
            v-model="project_data.details"
            label="Project Details (required)"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="project_data.city"
            label="City"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="project_data.state"
            label="State"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="project_data.country"
            label="Country"
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

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Select a Previous Project</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected_project">
            <v-radio
              v-for="project in user_previous_projects"
              :key="project.project_id"
              :value="project"
            >
              <template v-slot:label>
                <div>
                  <strong>{{ project.title }}</strong>
                  <div>{{ project.organization }} - {{ project.year }}</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close_dialog">Cancel</v-btn>
          <v-btn text @click="select_project">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  user_previous_projects: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["save", "reset_form"]);
const edit_mode = ref(!!props.project.project_id);
const project_data = ref({ ...props.project });
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const dialog = ref(false);
const selected_project = ref(null);

watchEffect(() => {
  project_data.value = { ...props.project };
  edit_mode.value = !!props.project.project_id;
});

const submit_form = () => {
  if (!project_data.value.organization || !project_data.value.title || !project_data.value.year || !project_data.value.details) {
    snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
  } else {
    emit("save", project_data.value);
    project_data.value = { ...props.project };
  }
};

const close_snackbar = () => {
  snackbar.value.value = false;
};

const reset_form = () => {
  emit('reset_form');
};

const open_dialog = () => {
  dialog.value = true;
};

const close_dialog = () => {
  dialog.value = false;
};

const select_project = () => {
  if (selected_project.value) {
    project_data.value = { ...selected_project.value, project_id: null };
  }
  close_dialog();
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>