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
    
    <div class="twocolumn">
      <label for="startdate">Start Date</label> <vuejs-datepicker id="startdate" v-model="localDate" /> <br />
    </div>

    <div class="twocolumn">
      <label for="hydrometer">Hydrometer</label> <br/>
      <select id="hydrometers" v-model="localBatch.hydrometer">
        <option v-for="h in hydrometers" :key="h.id" :value="h">{{ h.name }}</option>
      </select>
    </div>
    
    <div class="bottomcontent">
      <p class="error">{{ error }}</p>
      <button @click="close()">Cancel</button>
      <button @click="saveBatch()">Save</button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

const emptyHydrometer = { id: '', name: 'None' };

function getAvailableHydrometers(ctx) {
  axios.get(`${this.gravityConfig.apiRoot}/api/v1/hydrometers/available`)
    .then((response) => {
      ctx.hydrometers = [];
      if (ctx.localBatch.hydrometer.name !== 'None' && ctx.localBatch.hydrometer.name !== '') {
        ctx.hydrometers.push(ctx.localBatch.hydrometer);
      }
      ctx.hydrometers = [...ctx.hydrometers, ...response.data];
      ctx.hydrometers.push(emptyHydrometer);
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    });
}

export default {
  props: ['show', 'batch', 'new'],
  watch: {
    show(val) {
      if (val) {
        Object.assign(this.localBatch, this.batch);
        if (this.localBatch.hydrometer.name === '') {
          this.localBatch.hydrometer = emptyHydrometer;
        }
        this.localDate = moment(this.localBatch.startDate).toDate();
        getAvailableHydrometers(this);
      }
    },
  },
  data() {
    return {
      hydrometers: [],
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
        url = `${this.gravityConfig.apiRoot}/api/v1/batches`;
      }
      else {
        method = axios.put;
        url = `${this.gravityConfig.apiRoot}/api/v1/batches/${this.localBatch.id}`;
      }

      method(url, this.localBatch)
        .then(() => {
          this.batch.recipe = this.localBatch.recipe;
          this.batch.stringId = this.localBatch.stringId;
          this.batch.startDate = this.localBatch.startDate;
          this.batch.hydrometer = this.localBatch.hydrometer;
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

.twocolumn {
  width: 50%;
  float: left;
}

.bottomcontent {
  clear: both;
}

.vdp-datepicker {
  text-align: center !important;
}
</style>
