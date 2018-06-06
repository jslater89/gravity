<template>
  <div class="panel">
      <h3>Batch Detail: {{ batch.recipe }} {{ batch.stringId}} </h3>
      <batch-edit-modal :new="false" :batch="batch" :show="showBatchEdit" @close="showBatchEdit = false"></batch-edit-modal>
      <div class="sidebar">
        <batch-info-panel :batch="batch"></batch-info-panel>
        <div v-if="this.checkPermissions(this, 'write', '/batches')">
          <button @click="showBatchEdit = true">Edit</button>

          <button v-if="!batch.archived && !batch.active" @click="archiveBatch(true)">Archive</button>
          <button v-if="batch.archived" @click="archiveBatch(false)">Unarchive</button>

          <button v-if="batch.active" @click="activateBatch(false)">Finish</button>
          <button v-if="!batch.active && !batch.archived" @click="activateBatch(true)">Restart</button>
        </div>
      </div>
      <div class="content">
        <batch-chart :batch="batch.id"></batch-chart>
        <voltage-chart :batch="batch.id"></voltage-chart>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

import BatchChart from './BatchChart';
import VoltageChart from './VoltageChart';
import BatchInfoPanel from './BatchInfoPanel';
import BatchEditModal from './BatchEditModal';

export default {
  name: 'BatchDetail',
  props: ['id'],
  data() {
      return {
          batch: {},
          showBatchEdit: false,
      };
  },
  components: {
    'voltage-chart': VoltageChart,
    'batch-chart': BatchChart,
    'batch-info-panel': BatchInfoPanel,
    'batch-edit-modal': BatchEditModal,
  },

  created() {
      axios.get(`${this.gravityConfig.apiRoot}/api/v1/batches/${this.id}`)
      .then((response) => {
        this.batch = response.data;
      })
      .catch((response) => {
        //eslint-disable-next-line
        console.log(response);
      });
  },

  mounted() {
    this.checkAuth(this);
  },

  methods: {
    activateBatch(activate) {
      this.batch.active = activate;

      axios.put(`${this.gravityConfig.apiRoot}/api/v1/batches/${this.id}`, this.batch)
        .then()
        .catch((error) => {
          this.batch.active = !activate;

          //eslint-disable-next-line
          console.log(error);
        });
    },
    archiveBatch(archive) {
      this.batch.archived = archive;

      axios.put(`${this.gravityConfig.apiRoot}/api/v1/batches/${this.id}`, this.batch)
        .then()
        .catch((error) => {
          this.batch.archived = !archive;

          //eslint-disable-next-line
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.panel {
  width: 100%;
  height: 100%;
}
.content {
  width: 70%;
  height: 100%;
  float: left;
}

.sidebar{
  width: 30%;
  height: 100%;
  float: left;  
}
</style>
