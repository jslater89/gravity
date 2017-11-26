<template>
  <div>
    <div id="nav" v-if="this.$store.state.auth.isLoggedIn">
    </div>
    <h3>Hydrometer List</h3>
    <label for="archived">Show archived</label> <input id="archived" type="checkbox" v-model="showArchived" />
    <button @click="updateHydrometers()">Query</button>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>In Use?</th>
      </thead>
      <tr v-for="hydrometer in hydrometers" :key="hydrometer.id">
        <td><router-link :to="{name: 'hydrometerdetail', params: {id: hydrometer.id, hydrometer: hydrometer}}">{{hydrometer.name}}</router-link></td>
        <td>{{hydrometer.batch !== gravityEmptyID}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

function fetchHydrometers(ctx) {
  let queryString = '';
  const queryItems = [];

  if (ctx.showArchived) { // show only archived
    queryItems.push('archived=true');
  }

  if (queryItems.length > 0) {
    for (let i = 0; i < queryItems.length; i++) {
      if (i === 0) {
        queryString = '?';
      }
      else {
        queryString += '&';
      }
      queryString += queryItems[i];
    }
  }

  axios.get(`${ctx.gravityConfig.apiRoot}/api/v1/hydrometers${queryString}`)
    .then((response) => {
      ctx.hydrometers = response.data;
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
      ctx.checkAuth(ctx);
    });
}
export default {
  name: 'HydrometerList',
  data() {
    return {
      hydrometers: [],
      showArchived: false,
    };
  },

  created() {
    fetchHydrometers(this);
  },

  mounted() {
    this.checkAuth(this);
  },

  methods: {
    updateHydrometers() {
      fetchHydrometers(this);
    },
  },
};
</script>


<style scoped>
  a {
      text-decoration: underline;
      cursor: pointer;
  }
  .table {
    width:60%;
    margin-left: 20%;
    margin-right: 20%;
  }
</style>