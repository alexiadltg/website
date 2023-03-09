<template>
  <v-sheet class="ma-10 pa-2" color="transparent">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary" @change="loadStatistics">
        <v-tab value="one">Users</v-tab>
        <v-tab value="two">Settings</v-tab>
        <v-tab value="three">Statistics</v-tab>
      </v-tabs>
      <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="one">
        <AdminBoard />
      </v-window-item>

      <v-window-item value="two">
        Settings
      </v-window-item>

      <v-window-item value="three">
        <Image />
      </v-window-item>
    </v-window>
  </v-card-text>

</v-card>
</v-sheet>
</template>
<script>
  import axios from 'axios';
  import AdminBoard from "@/components/AdminBoard.vue"
  import Image from "@/components/Image.vue"

  export default {
    data: () => ({
      tab: null,
    }),
    methods: {
      loadStatistics() {
        // Make a GET call to the server
        axios.get(`http://${window.location.hostname}:7380/api/admin/userScoresPlot`)
          .then(response => {
            // Handle the response
            console.log(response.data);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      }
    }
  }
</script> 

