<template>
  <div>
    <h3>Batch List</h3>

    <table class="table">
      <thead>
        <th>ID</th>
        <th>Recipe</th>
        <th>Last Update</th>
        <th>Attenuation</th>
      </thead>
      <tr v-for="batch in batches" :key="batch.id">
        <td><router-link :to="{name: 'batchdetail', params: {id: batch.id}}">{{batch.stringId}}</router-link></td>
        <td>{{batch.recipe}}</td>
        <td>{{batch.lastUpdate | timeString}}</td>
        <td>{{batch.attenuation | percentify}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

function getTimeString(isoDate) {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function getPercentage(decimal) {
  const percentage = decimal * 100;
  return `${percentage.toFixed(2)}%`;
}

export default {
  name: 'BatchList',
  data() {
    return {
      batches: [],
    };
  },

  filters: {
    timeString: getTimeString,
    percentify: getPercentage,
  },

  // Fetches posts when the component is created.
  created() {
    axios.get('http://localhost:10000/api/v1/batches')
    .then((response) => {
      // JSON responses are automatically parsed.
      this.batches = response.data;
    },
    (response) => {
      // eslint-disable-next-line
      console.log(response);
    });
  },
};
</script>

<style>
  .table {
    width:60%;
    margin-left: 20%;
    margin-right: 20%;
  }
</style>

