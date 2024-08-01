<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import MyFavorites from "./my_favorites.vue";

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
    <MyFavorites />
</template>