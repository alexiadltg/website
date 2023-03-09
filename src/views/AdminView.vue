<template>
     <v-sheet class="ma-10 pa-2" color="transparent">
    <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Users</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
            <AdminBoard />
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
    
  </v-card>
</v-sheet>
  </template>
  <script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>
  
  <script setup>
   import AdminBoard from "@/components/AdminBoard.vue"
    </script>