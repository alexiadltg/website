<template>
  <v-sheet class="ma-10 pa-2" color="transparent">
  <v-card>
    <v-toolbar color="teal-darken-4" >
      <v-toolbar-title>Users</v-toolbar-title>
    </v-toolbar>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">USERNAME</th>
          <th class="text-left">EMAIL</th>
          <th class="text-left">PASSWORD</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in listUsers" :key="user._id">
          <td class="text-left">{{ user._id }}</td>
          <td class="text-left">{{ user.username }}</td>
          <td class="text-left">{{ user.email }}</td>
          <td class="text-left">{{ user.password }}</td>

          <td class="text-left">
            <v-dialog v-model="dialog" width="600" persistent>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="teal-darken-4"
                  icon="mdi-pencil"
                  size="small"
                  v-bind="props"
                  @click="inputUser = user"
                />
              </template>
              <v-card>
                <v-form ref="form">
                  <v-text-field
                    v-model="inputUser.username"
                    label="Username"
                  ></v-text-field>
                  <v-text-field
                    v-model="inputUser.email"
                    label="Email"
                  ></v-text-field>

                  <v-btn color="teal-darken-4" class="mr-4" @click="editUser">
                    Submit
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeDialog"
                  >
                    Close
                  </v-btn>
                </v-form>
              </v-card>
            </v-dialog>
            <v-btn
              color="teal-darken-4"
              icon="mdi-trash-can-outline"
              size="small"
              @click="deleteUserAdminBoard(user._id)"
            />
            <v-snackbar :timeout="3000" v-model="snackbar">
              <label color="red">ERROR </label>{{ errorText }}
              <template v-slot:actions>
                <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
              </template>
            </v-snackbar>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</v-sheet>
</template>

<script>
import UserService from "../services/user.service";
export default {
  data() {
    return {
      snackbar: false,
      errorText: "Something went wrong!",
      listUsers: [],
      inputUser: {},
      dialog: false,
    };
  },mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        console.log(response.data)
        this.listUsers = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    deleteUserAdminBoard(id){
      UserService.deleteUserAdminBoard(id)
      .then(response=>{
        return response.json();
      }).then((data)=>{
        console.log(data);
        window.location.reload();
      }).catch(e=>{
        console.log(e)
      })
    }
    ,
    editUserAdminBoard(){
      UserService.putAdminBoard(this.inputUser._id,this.inputUser)
      .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    editUser() {
      if (this.inputUser._id) {
        fetch("/.netlify/functions/api/user", {
          method: "PUT",
          body: JSON.stringify({
            USER_ID: this.inputUser.USER_ID,
            username: this.inputUser.username,
            password: this.inputUser.password,
            email: this.inputUser.email,
            roles: this.inputUser.roles,
            PointTotal: this.inputUser.PointTotal,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.success) {
              this.closeDialog();
            } else {
              this.snackbar = true;
            }
          });
      } else {
        this.createUser();
      }
    },
    closeDialog() {
      // reload inputUser
      this.inputUser = {};
      this.dialog = false;
      window.location.reload();
    },
  },
};
</script>