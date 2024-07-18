<template>
  <div>
    <v-row>
      <v-col>
        <h2>{{ is_edit_mode ? "Edit Honor/Award" : "Add Honor/Award" }}</h2>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="open_dialog">Select From Previous Honors/Awards</v-btn>
      </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="submit_form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="honor_data.organization"
            label="Organization Name (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="honor_data.title"
            label="Title (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="honor_data.description"
            label="Description (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="honor_data.year"
            label="Year (required)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            variant="underlined"
            v-model="honor_data.details"
            label="Details (required)"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="error" @click="reset_honor">Cancel</v-btn>
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
        <v-card-title>Select a Previous Honor/Award</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected_honor">
            <v-radio
              v-for="honor in user_previous_honors"
              :key="honor.honor_id"
              :value="honor"
            >
              <template v-slot:label>
                <div>
                  <strong>{{ honor.title }}</strong>
                  <div>{{ honor.organization }} - {{ honor.year }}</div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close_dialog">Cancel</v-btn>
          <v-btn text @click="select_honor">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  honor: {
    type: Object,
    required: true,
  },
  user_previous_honors: {
    type: Array,
    required: true,
  },
});

const is_edit_mode = ref(!!props.honor.honor_id);
const honor_data = ref({ ...props.honor });
const emit = defineEmits(["save", "reset_honor"]);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const { user_previous_honors } = toRefs(props);

const dialog = ref(false);
const selected_honor = ref(null);

watchEffect(() => {
  honor_data.value = { ...props.honor };
  is_edit_mode.value = !!props.honor.honor_id;
});

const submit_form = () => {
  if (!honor_data.value.organization || !honor_data.value.title || !honor_data.value.description || !honor_data.value.year || !honor_data.value.details) {
    snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
  } else {
    emit("save", honor_data.value);
    honor_data.value = { ...props.honor };
  }
};

const close_snackbar = () => {
  snackbar.value.value = false;
};

const reset_honor = () => {
  emit('reset_honor');
};

const open_dialog = () => {
  dialog.value = true;
};

const close_dialog = () => {
  dialog.value = false;
};

const select_honor = () => {
  if (selected_honor.value) {
    honor_data.value = { ...selected_honor.value, honor_id: null };
  }
  close_dialog();
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>