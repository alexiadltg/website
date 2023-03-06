<template>
    <div class="main">
      
      <v-card width="400" variant="outlined" v-show="!successful">
        <v-card-text>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                prepend-icon="mdi-account"
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email-outline"
                label="Email"
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
            <v-btn @click="signup" >Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    
      <v-card v-show="successful">
        <label color="Green">{{ message }}</label>
        <v-col class="d-flex justify-center">
          <v-btn icon to="/login" v-show="successful">Login</v-btn>
        </v-col>
        
      </v-card>
     

      <v-snackbar :timeout="3000" v-model="snackbar" >
      <label color="red">ERROR:</label>{{ message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    </div>
  </template>

  <script>
  export default{
    name:'Sign-up',
    data(){
        return{
          successful:false,
          snackbar: false,
          username:'',  
          email:'',
          password:'',
          message: "",
        }
    },
    computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }},
    mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
    methods:{
        signup(){
      let user ={
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.message = "";

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful=true
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.snackbar = true;
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