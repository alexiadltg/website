<template>
    <div class="main">
      <v-card width="400" variant="outlined">
        <v-card-text>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn>Login</v-btn>
        </v-card-actions>

      </v-card>
      <div class="text-center mt-4">
      <p>
        New user?    
        <router-link to="/signup">SignUp</router-link>
        </p>
     

    </div>
  
      <v-snackbar :timeout="3000" v-model="snackbar">
        <label color="red">ERROR:</label>{{ text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script setup>
  //
  </script>
  
  <style scoped>
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>