<template>
  <modal :show="show" @close="close">
    <h3 v-if="this.new">Create Hydrometer</h3>
    <h3 v-if="!this.new">Edit Hydrometer</h3>
    <table class="table">
      <tr>
        <td><label for="recipe">Name</label></td>
        <td><input id="recipe" type="text" v-model="localHydrometer.name" /></td>
        
      </tr>
      <tr>
        <td><label for="id">Description</label></td>
        <td><input id="uniqueId" type="text" v-model="localHydrometer.description" /></td>
      </tr>
    </table>
    <div class="bottomcontent">
      <p class="error">{{ error }}</p>
      <button @click="close()">Cancel</button>
      <button @click="saveHydrometer()">Save</button>
    </div>
  </modal>
</template>

<script>
import axios from 'axios';

export default {
  props: ['show', 'hydrometer', 'new'],
  watch: {
    show(val) {
      if (val) {
        Object.assign(this.localHydrometer, this.hydrometer);
      }
    },
  },
  data() {
    return {
      localHydrometer: {},
      error: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    saveHydrometer() {
      if (this.localHydrometer.name === '') {
        this.error = 'missing hydrometer name';
        return;
      }

      let method = {};
      let url = '';
      if (this.new) {
        method = axios.post;
        url = `${this.gravityConfig.apiRoot}/api/v1/hydrometers`;
      }
      else {
        method = axios.put;
        url = `${this.gravityConfig.apiRoot}/api/v1/hydrometers/${this.localHydrometer.id}`;
      }

      method(url, this.localHydrometer)
        .then(() => {
          this.hydrometer.name = this.localHydrometer.name;
          this.hydrometer.description = this.localHydrometer.description;
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
};
</script>

<style scoped>
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
</style>
