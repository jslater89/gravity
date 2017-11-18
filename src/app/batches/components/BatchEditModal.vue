<template>
  <modal :show="show" @close="close">
    <h3>Test</h3>
    <label for="recipe">Recipe</label> <input id="recipe" type="text" v-model="localBatch.recipe" /> <br/>
    <label for="id">Unique Name</label> <input id="uniqueId" type="text" v-model="localBatch.stringId" /> <br/>
    <p class="error">{{ error }}</p>
    <button @click="close()">Cancel</button>
    <button @click="saveBatch()">Save</button>
  </modal>
</template>

<script>
import axios from 'axios';

export default {
  props: ['show', 'batch', 'new'],
  watch: {
    show(val) {
      if (val) {
        Object.assign(this.localBatch, this.batch);
      }
    },
  },
  data() {
    return {
      localBatch: {},
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

<style>

</style>
