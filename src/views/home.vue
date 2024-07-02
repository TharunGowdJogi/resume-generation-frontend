<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  console.log("user",user.value)
    if(!user.value) {
    router.push({ name: "login" });
  }
});
</script>
<template>
    <h2>Home page</h2>
</template>