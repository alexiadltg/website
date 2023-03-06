<template>
  <v-responsive>
    <v-container fill-height>
    <v-row class="text-center">
      <v-col cols="12">
        <img src="../assets/witch1.png" alt="logo" width="100" height="100" />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Deheroes</h1>
        <p class="subheading font-weight-regular">
          {{ content }}
        </p>
        <br>
        <v-btn color="green" to="/login" prepend-icon="mdi-arrow-right-top">
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
   
  </v-responsive>
  
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Landing",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
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
};
</script>
