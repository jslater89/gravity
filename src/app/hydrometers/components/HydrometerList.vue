<template>
  <div>
    <div id="nav" v-if="this.$store.state.auth.isLoggedIn">
    </div>
    <h3>Hydrometer List</h3>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>In Use?</th>
      </thead>
      <tr v-for="hydrometer in hydrometers" :key="hydrometer.id">
        <td><router-link :to="{name: 'hydrometerdetail', params: {hydrometer: hydrometer}}">{{hydrometer.name}}</router-link></td>
        <td>{{hydrometer.batch !== emptyID}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

function fetchHydrometers(context) {
  const ctx = context;

  axios.get('http://localhost:10000/api/v1/hydrometers')
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
    };
  },

  created() {
    fetchHydrometers(this);
  },

  mounted() {
    this.checkAuth(this);
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