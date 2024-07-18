<template>
  <div>
    <v-row>
      <v-col>
        <h2>{{ edit_mode ? "Edit Education" : "Add Education" }}</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="open_dialog">Select From Previous Educations</v-btn>
      </v-col>
    </v-row>
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
            label="City"
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

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Select a Previous Education</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected_education">
            <v-radio
              v-for="education in user_previous_educations"
              :key="education.education_id"
              :value="education"
            >
              <template v-slot:label>
                <div>
                  <strong>{{ education.course_name }}</strong>
                  <div>{{ education.organization }} ({{ education.from_year }} - {{ education.to_year || 'Present' }})</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close_dialog">Cancel</v-btn>
          <v-btn text @click="select_education">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits, toRefs, onMounted } from 'vue';

const props = defineProps({
  education: {
    type: Object,
    required: true,
  },
  user_previous_educations: {
    type: Array,
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
const { user_previous_educations } = toRefs(props);

const dialog = ref(false);
const selected_education = ref(null);

watchEffect(() => {
  local_education.value = { ...props.education };
  edit_mode.value = !!props.education.education_id;
});

const save = () => {
  if (!local_education.value.organization || !local_education.value.course_name || !local_education.value.from_year) {
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

const open_dialog = () => {
  dialog.value = true;
};

const close_dialog = () => {
  dialog.value = false;
};

const select_education = () => {
  if (selected_education.value) {
    local_education.value = { ...selected_education.value, education_id: null };
  }
  close_dialog();
};

onMounted(() => {
  console.log("user previous educations", user_previous_educations.value);
});
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>