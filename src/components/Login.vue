<template>
    <div class="main">
      <v-card width="400" variant="outlined">
        <v-card-text>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                prepend-icon="mdi-account"
                label="Login"
                type="username"
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
            <v-btn @click="login" >Login</v-btn>
        </v-card-actions>

      </v-card>
      <div class="text-center mt-4">
      <p>
        New user?    
        <router-link to="/signup">SignUp</router-link>
        </p>
    </div>
      <v-snackbar :timeout="3000" v-model="snackbar">
        <label color="red">ERROR:</label>{{ message }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script >
  export default{
      name:'LogIn',
      data(){
          return{
            snackbar: false,
            message: "",
            username:'',
            password:""
          }
      },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
      
    }
  },
  methods:{
    login(){
      let user ={
        username:this.username,
        password:this.password
      }
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.snackbar = true;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
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