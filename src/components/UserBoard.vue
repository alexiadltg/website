<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Time
        </th>
        <th class="text-left">
          Score
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in listUsers"
        :key="user._id"
      >
      <td>{{ formatDate(user.timestamp)  }}</td>
        <td>{{ user.time }}</td>
        <td>{{ user.score }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import UserService from "../services/user.service";
import moment from "moment"


export default {
  name: "User",
  data() {
    return {
      listUsers: [],
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response.data.games)
        this.listUsers = response.data.games;
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
  }, methods: {
    formatDate(timestamp) {
      return moment(timestamp).format('DD/MM/YYYY, HH:mm:ss ');
    }
  }
};

</script>