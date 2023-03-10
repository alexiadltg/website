<template>

<v-sheet class="ma-10 pa-2" color="transparent">
<v-card>
  <v-toolbar color="teal-darken-4" >
    <v-toolbar-title>Users</v-toolbar-title>
  </v-toolbar>
  
  <v-table>
    <thead>
      <tr>
      <th class="text-left">Class</th>
      <th class="text-left">HP</th>
      <th class="text-left">Speed</th>
      <th class="text-left">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(classObj,className) in gameConfigDefault[0]" :key="className">
      <td class="text-left">{{ className }}</td>
      <td class="text-left">{{  Object.values(classObj)[0] }}</td>
      <td class="text-left">{{  Object.values(classObj)[1] }}</td>
      <td class="text-left">{{  Object.values(classObj)[2] }}</td>


        <td class="text-left">
          <v-dialog v-model="dialog" width="600" persistent>
            <template v-slot:activator="{ props }">
              <v-btn
                color="teal-darken-4"
                icon="mdi-pencil"
                size="small"
                v-bind="props"
                @click="inputUser = className"
              />
            </template>
            <v-card>
              <v-form ref="form">
                <v-text-field
                  v-model="inputUser.className"
                  label="Username"
                ></v-text-field>
                <v-text-field
                  v-model="inputUser.Object.values(classObj)[0]"
                  label="Email"
                ></v-text-field>

                <v-btn color="teal-darken-4" class="mr-4" @click="editUserAdminBoard">
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
    gameConfigDefault: [],
    inputUser: {},
    dialog: false,
  };
},mounted() {
  UserService.getPublicConfig().then(
    (response) => {
      console.log(response.data)
      this.gameConfigDefault = response.data;
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
  deleteUserAdminBoard(deleteUserID){
 UserService.deleteUserAdminBoard(deleteUserID)
  .then(response=>{
    console.log(response.data);
    window.location.reload();
    }).catch(e=>{
      console.log(e)
    })
  }
  ,
  editUserAdminBoard(){
    UserService.putAdminBoard(this.inputUser)
    .then(response => {
        console.log(response.data);
        this.message = 'The User was updated successfully!';
        this.closeDialog()
      })
      .catch(e => {
        this.snackbar = true
        console.log(e);
      });
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