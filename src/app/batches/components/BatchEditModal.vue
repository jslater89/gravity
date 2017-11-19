<template>
  <modal :show="show" @close="close">
    <h3 v-if="this.new">Create Batch</h3>
    <h3 v-if="!this.new">Edit Batch</h3>
    <table class="table">
      <tr>
        <td><label for="recipe">Recipe</label></td>
        <td><input id="recipe" type="text" v-model="localBatch.recipe" /></td>
        
      </tr>
      <tr>
        <td><label for="id">Unique Name</label></td>
        <td><input id="uniqueId" type="text" v-model="localBatch.stringId" /></td>
      </tr>
    </table>

    <br/>
      
    <label for="startdate">Start Date</label> <vuejs-datepicker id="startdate" v-model="localDate" /> <br />
    
    <p class="error">{{ error }}</p>
    <button @click="close()">Cancel</button>
    <button @click="saveBatch()">Save</button>
  </modal>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

export default {
  props: ['show', 'batch', 'new'],
  watch: {
    show(val) {
      if (val) {
        Object.assign(this.localBatch, this.batch);
        this.localDate = moment(this.localBatch.startDate).toDate();
      }
    },
  },
  data() {
    return {
      localBatch: {},
      localDate: new Date(),
      error: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    saveBatch() {
      if (this.localBatch.recipe === '') {
        this.error = 'missing recipe name';
        return;
      }

      if (this.localBatch.stringId === '') {
        this.error = 'missing unique id';
        return;
      }

      this.localBatch.startDate = moment(this.localDate).format();

      let method = {};
      let url = '';
      if (this.new) {
        method = axios.post;
        url = 'http://localhost:10000/api/v1/batches';
      }
      else {
        method = axios.put;
        url = `http://localhost:10000/api/v1/batches/${this.localBatch.id}`;
      }

      method(url, this.localBatch)
        .then(() => {
          this.batch.recipe = this.localBatch.recipe;
          this.batch.stringId = this.localBatch.stringId;
          this.batch.startDate = this.localBatch.startDate;
          this.$emit('save');
          this.close();
        })
        .catch((error) => {
          //eslint-disable-next-line
          console.log(error);
          this.error = error.response.data;
        });
    },
  },
  components: {
    'vuejs-datepicker': Datepicker,
  },
};
</script>

<style>
.table {
  width: 80%;
  margin: 0 auto;
}

.vdp-datepicker {
  text-align: center !important;
}
</style>
