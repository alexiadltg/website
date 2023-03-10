<template> 

    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-card
          color="teal-darken-4"
        >
      

          <router-link to="/admin/users" class="icon">
          <v-btn  >
            Users
          </v-btn>
        </router-link>
        
  
        <router-link to="/admin/gameSettings">
          <v-btn >
            Game Settings
          </v-btn>
        </router-link>
        
        
          
        <router-link to="/admin/stats">
          <v-btn >
            Statistics
          </v-btn>
        </router-link>

        </v-card>
  
        
        <v-main/>
       
      </v-layout>
    </v-card>
    
   
  </template>
  
  
  <style scoped>
  .icon {
    display: inline-block;text-decoration:none;color: white;
  }
  </style>