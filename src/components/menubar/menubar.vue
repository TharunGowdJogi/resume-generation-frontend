<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import user_services from "../../services/user_services";
import resume_favorite_services from "../../services/resume_favorite_services.js";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref(null);
const title = ref("AI Resume Generator");
const logoURL = ref("");
const drawerOpen = ref(false);
const deleteDialog = ref(false); // Ref for delete account confirmation dialog

onMounted(() => {
  logoURL.value = ocLogo;
  user.value = JSON.parse(localStorage.getItem("user"));
  if (user.value && user.value.is_admin) {
    addAdminRoutes();
  }
});

const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/generate-resume",
      name: "Generate a Resume",
    },
    {
      path: "/my-resume",
      name: "My Resume's",
    }
  
];

const adminRoutes = [
  {
    path: "/manage-resumes",
    name: "Manage All Resumes",
  },
  {
    path: "/manage-users",
    name: "Manage All Users",
  },
];

const addAdminRoutes = () => {
  routes.push(...adminRoutes);
};

function closeSnackBar() {
  snackbar.value.value = false;
}

async function logout() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  await resume_favorite_services.storeFavoritesOnLogout({
    userId: user.value.user_id,
    favorites: favorites,
  });
  localStorage.removeItem("favorites");
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "login" });
}

function deleteAccount() {
  deleteDialog.value = true; // Show the confirmation dialog
}

function confirmDeleteAccount() {
  user_services
    .delete_user(user.value.id) // Assume delete_user is a method in user_services to delete the user
    .then((data) => {
      console.log(data);
      snackbar.value = {
        value: true,
        color: "green",
        text: "Account deleted successfully",
      };
      localStorage.removeItem("user");
      user.value = null;
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = {
        value: true,
        color: "red",
        text: "Failed to delete account",
      };
    });
  deleteDialog.value = false; // Hide the confirmation dialog
}

</script>

<template>
  <div>
    <div style="background-color:#5E9400;">
    <v-navigation-drawer v-if="user != null" app>
      <div style="height:64px;background-color:#5E9400;margin-bottom:24px;">
      <v-toolbar-title
        class="title"
        :style="{ color: '#FFFFFF', cursor: 'pointer' }"
        style="padding-top:20px;padding-left:10px;"
      >
        <a href="/" style="text-decoration:none;">{{ title }}</a>
      </v-toolbar-title>
      </div>
      <v-list style="margin-top:40px;">
        <v-list-item
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          link
        >
          <div style="display:flex">
            <p style="color:black;">{{ route.name }}</p>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
    <v-app-bar color="#5E9400" app dark>
      <v-spacer></v-spacer>
      <v-btn v-if="user === null" class="mx-2" :to="{ name: 'login' }">
        Login
      </v-btn>
      <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="accent" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.first_name?.charAt(0)}${user.last_name.charAt(0)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="accent">
                <span class="white--text text-h5">{{
                  `${user.first_name?.charAt(0)}${user.last_name.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.first_name}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="deleteAccount()">
                Delete Account
              </v-btn>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    
    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete your account? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="confirmDeleteAccount">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.value" rounded="pill">
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          :color="snackbar.color"
          variant="text"
          @click="closeSnackBar()
          "
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
a {
  color: #FFFFFF;
}
a:hover {
  color: #FFFFFF;
}
</style>
