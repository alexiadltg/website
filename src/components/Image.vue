<template>
    <v-responsive>
      <v-container fill-height>
 
          <img src="http://alumnes.inspedralbes.cat/~a22yanzhayan/userScore.png" alt="logo" width="100" height="100" />
    
    </v-container>
     
    </v-responsive>
    
</template>
  
 
  
<script>
import UserService from "../services/user.service";

export default {
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
