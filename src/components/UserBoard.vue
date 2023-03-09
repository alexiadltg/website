<template>
 <v-sheet class="ma-10 pa-2" color="transparent">
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
</v-sheet>
</template>

<script>
import UserService from "../services/user.service";
import moment from "moment"

export default {
 
  data() {
    return {
      listGames: [],
      itemsPerPage:10,
      headers:[
        {
          title:'Date',
          align: 'start',
          key: 'timestamp',
          width: '40%'
        },
        { title: 'Score', align: 'start', key: 'score', width: '30%' },
        { title: 'Time', align: 'start', key: 'time' , width: '30%'},
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