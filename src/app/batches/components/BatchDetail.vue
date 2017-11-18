<template>
  <div class="panel">
      <h3>Batch Detail: {{ batch.recipe }} {{ batch.stringId}} </h3>
      <batch-edit-modal :new="false" :batch="batch" :show="showBatchEdit" @close="showBatchEdit = false"></batch-edit-modal>
      <div class="sidebar">
        <batch-info-panel :batch="batch"></batch-info-panel>
        <button @click="showBatchEdit = true">Edit</button>
      </div>
      <div class="content">
        <batch-chart :batch="batch.id" :options="{reactive: true, maintainAspectRatio: false}"></batch-chart>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

import BatchChart from './BatchChart';
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
    'batch-chart': BatchChart,
    'batch-info-panel': BatchInfoPanel,
    'batch-edit-modal': BatchEditModal,
  },

  created() {
      axios.get(`http://localhost:10000/api/v1/batches/${this.id}`)
      .then((response) => {
        this.batch = response.data;
      },
      (response) => {
        //eslint-disable-next-line
          console.log(response);
      });
  },

  mounted() {
    this.checkAuth(this);
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
