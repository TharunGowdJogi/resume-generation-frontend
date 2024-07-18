<template>
  <div>
    <v-row>
      <v-col>
        <h2>{{ is_edit_mode ? "Edit Employment" : "Add Employment" }}</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="open_dialog">Select From Previous Employments</v-btn>
      </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="submit_form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.organization"
            label="Employer Name (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.title"
            label="Position Title (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.city"
            label="City"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.state"
            label="State"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.country"
            label="Country"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.from_year"
            label="From Year (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="employment_data.to_year"
            label="To Year"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            variant="underlined"
            v-model="employment_data.description"
            label="Job Description (required)"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="error" @click="reset_employment">Cancel</v-btn>
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
        <v-card-title>Select a Previous Employment</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected_employment">
            <v-radio
              v-for="employment in user_previous_employments"
              :key="employment.employment_id"
              :value="employment"
            >
              <template v-slot:label>
                <div>
                  <strong>{{ employment.title }}</strong>
                  <div>{{ employment.organization }} ({{ employment.from_year }} - {{ employment.to_year || 'Present' }})</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close_dialog">Cancel</v-btn>
          <v-btn text @click="select_employment">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  employment: {
    type: Object,
    required: true,
  },
  user_previous_employments: {
    type: Array,
    required: true,
  },
});
const is_edit_mode = ref(!!props.employment.employment_id);
const employment_data = ref({ ...props.employment });
const emit = defineEmits(["save", "reset_employment"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const { user_previous_employments } = toRefs(props);

const dialog = ref(false);
const selected_employment = ref(null);

watchEffect(() => {
  employment_data.value = { ...props.employment };
  is_edit_mode.value = !!props.employment.employment_id;
});

const submit_form = () => {
  if (!employment_data.value.organization || !employment_data.value.title || !employment_data.value.from_year || !employment_data.value.description) {
    snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
  } else {
    emit("save", employment_data.value);
    employment_data.value = { ...props.employment };
  }
};

const close_snackbar = () => {
  snackbar.value.value = false;
};

const reset_employment = () => {
  emit('reset_employment');
};

const open_dialog = () => {
  dialog.value = true;
};

const close_dialog = () => {
  dialog.value = false;
};

const select_employment = () => {
  if (selected_employment.value) {
    employment_data.value = { ...selected_employment.value, employment_id: null };
  }
  close_dialog();
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>