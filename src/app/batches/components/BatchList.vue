<template>
  <div>
    <div id="nav" v-if="this.$store.state.auth.isLoggedIn">
      <a @click="showBatchEdit = true">New Batch</a>
    </div>
    <h3>Batch List</h3>
    <batch-edit-modal :new="true" :batch="newBatch" v-on:save="batchAdded" :show="showBatchEdit" @close="showBatchEdit = false"></batch-edit-modal>
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
        <td>{{batch.lastUpdate | longdate}}</td>
        <td>{{batch.attenuation | percentify}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import BatchEditModal from './BatchEditModal';

function fetchBatches(context) {
  const ctx = context;
  axios.get('http://localhost:10000/api/v1/batches')
    .then((response) => {
      // JSON responses are automatically parsed.
      ctx.batches = response.data;
    },
    (response) => {
      // eslint-disable-next-line
      console.log(response);
    });
}

export default {
  name: 'BatchList',
  data() {
    return {
      batches: [],
      newBatch: {},
      showBatchEdit: false,
    };
  },

  // Fetches posts when the component is created.
  created() {
    fetchBatches(this);
  },

  mounted() {
    this.checkAuth(this);
  },

  methods: {
    batchAdded() {
      console.log('data changed');
      fetchBatches(this);
    },
  },

  components: {
    'batch-edit-modal': BatchEditModal,
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

