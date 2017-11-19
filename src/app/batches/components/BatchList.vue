<template>
  <div>
    <div id="nav" v-if="this.$store.state.auth.isLoggedIn">
      <a @click="showBatchEdit = true">New Batch</a>
    </div>
    <h3>Batch List</h3>
    <batch-edit-modal :new="true" :batch="newBatch" v-on:save="updateBatches()" :show="showBatchEdit" @close="showBatchEdit = false"></batch-edit-modal>
    <label for="inactive">Show inactive</label> <input id="inactive" type="checkbox" v-model="showInactive" />
    <label for="archived">Show archived</label> <input id="archived" type="checkbox" v-model="showArchived" />
    <button @click="updateBatches()">Query</button>
    <table class="table">
      <thead>
        <th>ID</th>
        <th>Recipe</th>
        <th>Hydrometer</th>
        <th>Last Update</th>
        <th>Attenuation</th>
        <th>Active</th>
      </thead>
      <tr v-for="batch in batches" :key="batch.id">
        <td><router-link :to="{name: 'batchdetail', params: {id: batch.id}}">{{batch.stringId}}</router-link></td>
        <td>{{batch.recipe}}</td>
        <td>{{batch.hydrometer.name}}</td>
        <td>{{batch.lastUpdate | longdate}}</td>
        <td>{{batch.attenuation | percentify}}</td>
        <td>{{batch.active}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import BatchEditModal from './BatchEditModal';

function fetchBatches(context) {
  const ctx = context;

  let queryString = '';
  const queryItems = [];

  if (!ctx.showInactive) { // show only active
    queryItems.push('active=true');
  }

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

  axios.get(`http://localhost:10000/api/v1/batches${queryString}`)
    .then((response) => {
      // JSON responses are automatically parsed.
      ctx.batches = response.data;
    },
    (response) => {
      // eslint-disable-next-line
      console.log(response);
      ctx.checkAuth(ctx);
    });
}

export default {
  name: 'BatchList',
  data() {
    return {
      batches: [],
      newBatch: {},
      showBatchEdit: false,
      showArchived: false,
      showInactive: true,
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
    updateBatches() {
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

