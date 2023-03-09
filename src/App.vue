<template> 

  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
      >
      <router-link to="/" >
      <v-toolbar-side-icon>
            <v-img class="mr-3" src="http://cdn.discordapp.com/attachments/1043076354905747518/1081973326819360878/witch1.png" height="50px" width="50px"> 
            </v-img>
     </v-toolbar-side-icon>
    </router-link>
     
      <router-link to="/" class="icon">
        <v-app-bar-title >Deheroes</v-app-bar-title>
      </router-link>

        <v-spacer></v-spacer>

        <router-link   to="/admin"  class="icon">
      <v-btn v-show="isAdmin">Admin </v-btn>
        </router-link>

      <router-link  to="/user"  class="icon">
        <v-btn v-show="logged" >User </v-btn>
      </router-link>

        <router-link to="/" class="icon">
        <v-btn icon >
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
      

      <router-link to="/login">
        <v-btn icon color="white">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>
      
        <v-btn icon @click="logOut" >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      
      <v-main/>
     
    </v-layout>
  </v-card>
  
  <router-view />
 
</template>
<script>
export default {
  data(){
    return{
      logged:false,
      isAdmin:false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
       
      }

    }},
    created() {
    if (this.loggedIn) {
     this.logged=true
      
    }},
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      this.logged=false
      this.isAdmin=false
    }
  },
  watch: {
    logged(newVal, oldVal) {
      if (newVal && this.showAdminBoard) {
        this.isAdmin = true;
      } 
    },
    currentUser(newVal, oldVal) {
      if (newVal) {
        this.logged = true;

      } 
    },
  }
}
</script>

<style scoped>
.icon {
  display: inline-block;text-decoration:none;color: white;
}
</style>