<template>
 
  <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="listGames"
      item-value="timestamp"
      class="elevation-1"
    >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ formatDate( item.columns.timestamp) }}</td>
        <td>{{ item.columns.score }}</td>
        <td>{{ item.columns.time }}</td>
      </tr>
    </template>
  </v-data-table>
    
</template>

<script>
import UserService from "../services/user.service";
import moment from "moment"

export default {
 
  data() {
    return {
      listGames: [],
      itemsPerPage:5,
      headers:[
        {
          title:'Date',
          align: 'start',
          sortable: false,
          key: 'timestamp'
        },
        { title: 'Score', align: 'start', key: 'score' },
        { title: 'Time', align: 'start', key: 'time' },
      ]
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response.data.games)
        this.listGames = response.data.games;
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