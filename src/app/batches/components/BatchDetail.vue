<template>
  <div>
      <h3>Batch Detail: {{ batch.recipe }} {{ batch.stringId}} </h3>
      <batch-chart :batch="batch.id" :options="{reactive: true, maintainAspectRatio: false}"></batch-chart>
  </div>
</template>

<script>
import axios from 'axios';

import BatchChart from './BatchChart';

export default {
  name: 'BatchDetail',
  props: ['id'],
  data() {
      return {
          batch: [],
      };
  },
  components: {
    'batch-chart': BatchChart,
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
};
</script>
