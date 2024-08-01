<template>
    <v-container>
      <v-row justify="center">
        <v-col >
          <v-card>
            <v-card-title class="headline">
              User Management
              <v-btn color="primary" @click="openAddUserDialog">
                Add User
              </v-btn>
            </v-card-title>
  
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
              :loading="loading"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </template>
  
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editUser(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteUser(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Add/Edit User Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
  
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.first_name"
                    label="First Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.last_name"
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                    :disabled="editedIndex > -1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    v-model="editedItem.password"
                    label="Password"
                    :disabled="editedIndex > -1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.mobile"
                    label="Mobile"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.address"
                    label="Address"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.linkedin_url"
                    label="LinkedIn URL"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.website_url"
                    label="Website URL"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.summary"
                    label="Summary"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-switch
                    v-model="editedItem.is_admin"
                    label="Is Admin"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteDialog" max-width="300px">
        <v-card>
          <v-card-title class="headline">Delete User</v-card-title>
          <v-card-text>Are you sure you want to delete this user?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import UserService from '../services/user_services';
  
  export default {
    name: 'UserManagement',
    data: () => ({
      search: '',
      loading: false,
      dialog: false,
      deleteDialog: false,
      headers: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile', value: 'mobile' },
        { text: 'Is Admin', value: 'is_admin' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        user_id: null,
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        address: '',
        linkedin_url: '',
        website_url: '',
        summary: '',
        password:'',
        is_admin: false,
      },
      defaultItem: {
        user_id: null,
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        address: '',
        linkedin_url: '',
        website_url: '',
        summary: '',
        is_admin: false,
      },
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New User' : 'Edit User';
      },
    },
  
    created() {
      this.initialize();
    },
  
    methods: {
      async initialize() {
        this.loading = true;
        try {
          const response = await UserService.get_all_users();
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
        }
      },
  
      openAddUserDialog() {
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.dialog = true;
      },
  
      editUser(item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
  
      deleteUser(item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.deleteDialog = true;
      },
  
      async deleteItemConfirm() {
        try {
          await UserService.delete_user(this.editedItem.user_id);
          this.users.splice(this.editedIndex, 1);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
        this.closeDelete();
      },
  
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      closeDelete() {
        this.deleteDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      async save() {
        if (this.editedIndex > -1) {
          try {
            const userToUpdate = { ...this.editedItem };
            delete userToUpdate.password;
            delete userToUpdate.salt;
            await UserService.update_user(userToUpdate);
            Object.assign(this.users[this.editedIndex], this.editedItem);
          } catch (error) {
            console.error('Error updating user:', error);
          }
        } else {
          try {
            const response = await UserService.add_user(this.editedItem);
            this.users.push(response.data);
          } catch (error) {
            console.error('Error adding user:', error);
          }
        }
        this.close();
      },
    },
  };
  </script>
  