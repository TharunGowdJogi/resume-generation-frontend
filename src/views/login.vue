<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import user_services from "../services/user_services.js";
import resume_favorite_services from "../services/resume_favorite_services.js";

const router = useRouter();
const isCreateAccount = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  first_name: "",
  last_name: "",
  mobile: "",
  address: "",
  email: "",
  linkedin_url: "",
  website_url: "",
  password: "",
  summary: "",
});
const role = ref("User");

const roleOptions = ["Admin", "User"];

onMounted(async () => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "home" });
  }
});

const isAdmin = () => {
  return role.value === "Admin";
};

async function createAccount() {
  if (
    !user.value.first_name ||
    !user.value.last_name ||
    !user.value.email ||
    !user.value.password
  ) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Please enter all required values.";
    return;
  }
  await user_services
    .add_user({ ...user.value, is_admin: isAdmin() })
    .then((res) => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Account created successfully!";
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text =
        error?.response?.data?.message || "Failed to sign up!";
    });
}

async function login() {
  if (!user.value.email || !user.value.password) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Please enter email and password.";
    return;
  }
  await user_services
    .login_user(user.value)
    .then(async (data) => {
      window.localStorage.setItem("user", JSON.stringify(data.data));
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Login successful!";

      // Fetch and store favorites in local storage
      const userId = data.data.user_id;
      const favorites = await resume_favorite_services.getFavoritesOnLogin(userId);
      window.localStorage.setItem("favorites", JSON.stringify(favorites.data));

      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text =
        error?.response?.data?.message || "Failed to login!";
    });
}

async function logout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  await resume_favorite_services.storeFavoritesOnLogout({
    userId: user.user_id,
    favorites: favorites,
  });
  localStorage.removeItem("user");
  localStorage.removeItem("favorites");
  router.push({ name: "login" });
}

function openCreateAccount() {
  isCreateAccount.value = true;
}

function closeCreateAccount() {
  isCreateAccount.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="user.email" label="Email" required></v-text-field>
          <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="flat" color="secondary" @click="openCreateAccount">Create Account</v-btn>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog persistent v-model="isCreateAccount" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Create Account</v-card-title>
          <v-card-text>
            <v-text-field v-model="user.first_name" label="First Name" required></v-text-field>
            <v-text-field v-model="user.last_name" label="Last Name" required></v-text-field>
            <v-text-field v-model="user.mobile" label="Mobile" required></v-text-field>
            <v-text-field v-model="user.address" label="Address" required></v-text-field>
            <v-text-field v-model="user.email" label="Email" required></v-text-field>
            <v-text-field v-model="user.linkedin_url" label="LinkedIn URL"></v-text-field>
            <v-text-field v-model="user.website_url" label="Website URL"></v-text-field>
            <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
            <v-textarea v-model="user.summary" label="Professional Summary"></v-textarea>
            <v-select
                v-model="role"
                label="Role"
                :items="roleOptions"
                required
              ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeCreateAccount">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="createAccount()">Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
