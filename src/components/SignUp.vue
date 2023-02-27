<template>
    <div class="main">
      <v-card width="400" variant="outlined">
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
      <!-- <v-snackbar :timeout="3000" v-model="snackbar">
        <label color="red">ERROR:</label>{{ text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar> -->
    </div>
  </template>

  <script>
  import axios from 'axios'
  export default{
    name:'Sign-up',
    data(){
        return{
            username:'',
            email:'',
            password:''
        }
    },
    methods:{
        signup(){
            let newUser ={
                username:this.username,
                email: this.email,
                password:this.password
            }
            //change ip
           axios.post('http://localhost:6869/api/auth/signup',newUser)
            .then(res=>{
                console.log(res)
            }, err =>{
                console.log(err.response)
            }
            )
        }
    }
}
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