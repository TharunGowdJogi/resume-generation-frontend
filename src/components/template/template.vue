<template>
    <div>
      <h3>Choose a Template</h3>
      <v-row>
        <v-col v-for="template in templates" :key="template.id" cols="6" md="6">
          <v-card
            :class="{ 'selected-template': selectedTemplate === template.id }"
            @click="selectTemplate(template.id)"
            class="template-card"
          >
            <v-img :src="template.image" height="100%" contain></v-img>
            <v-card-title class="text-center">Template {{ template.id }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    selectedTemplate: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update:selectedTemplate']);
  
  const templates = ref([
    { id: 1, image: '/Template1.png' },
    { id: 2, image: '/Template2.png' },
    { id: 3, image: '/Template3.png' },
    { id: 4, image: '/Template4.png' }
  ]);
  
  const selectedTemplate = ref(props.selectedTemplate);
  
  const selectTemplate = (templateId) => {
    selectedTemplate.value = templateId;
    emit('update:selectedTemplate', templateId);
  };
  </script>
  
  <style scoped>
  .selected-template {
    border: 2px solid blue;
  }
  </style>
  