<template>
  <div>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="user_details.first_name" label="First Name" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="user_details.last_name" label="Last Name" variant="underlined"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field v-model="user_details.email" label="Email" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="user_details.mobile" label="Mobile" variant="underlined"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field v-model="user_details.address" label="Address" variant="underlined"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field v-model="user_details.linkedin_url" label="LinkedIn URL" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="user_details.website_url" label="Website URL" variant="underlined"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea v-model="user_details.summary" label="Professional Summary" variant="underlined" rows="5"></v-textarea>
        </v-col>
      </v-row>
  </div>
</template>

<script setup>
import { ref, defineProps, toRef } from 'vue';

const props = defineProps({
  user_details: Object
});

const user_details = toRef(props, 'user_details');

</script>
