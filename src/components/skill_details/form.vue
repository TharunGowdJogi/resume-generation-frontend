<template>
  <div>
    <v-row>
      <v-col>
        <h2>{{ edit_mode ? "Edit Skill" : "Add Skill" }}</h2>
      </v-col>
      <v-col class="d-flex justify-end">
          <v-btn @click="open_dialog">Select From Previous Skills</v-btn>
        </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="submit_form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            variant="underlined"
            v-model="skill_data.skill_name"
            label="Skill Name (required)"
            required
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
        <v-card-title>Select a Previous Skill</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selected_skill">
            <v-radio
              v-for="skill in user_previous_skills"
              :key="skill.skill_id"
              :label="skill.skill_name"
              :value="skill.skill_name"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close_dialog">Cancel</v-btn>
          <v-btn text @click="select_skill">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, watchEffect, defineProps, defineEmits, toRefs, onMounted } from "vue";

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
  user_previous_skills: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["save", "reset_form"]);
const edit_mode = ref(!!props.skill.skill_id);
const skill_data = ref({ ...props.skill });
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const dialog = ref(false);
const selected_skill = ref('');

watchEffect(() => {
  skill_data.value = { ...props.skill };
  edit_mode.value = !!props.skill.skill_id;
});

const submit_form = () => {
  if (!skill_data.value.skill_name) {
    snackbar.value = { value: true, color: 'error', text: 'Please fill in all required fields.' };
  } else {
    emit("save", skill_data.value);
    skill_data.value = { ...props.skill };
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

const select_skill = () => {
  skill_data.value.skill_name = selected_skill.value;
  close_dialog();
};
</script>
