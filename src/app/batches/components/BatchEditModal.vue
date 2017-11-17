<template>
  <modal :show="show" @close="close">
    <h3>Test</h3>
    <input type="text" v-model="localBatch.recipe" /> <br/>
    <button @click="close()">Cancel</button>
    <button @click="updateBatch(); close()">Save</button>
  </modal>
</template>

<script>
export default {
  props: ['show', 'batch'],
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
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    updateBatch() {
      this.batch.recipe = this.localBatch.recipe;
    },
  },
};
</script>

<style>

</style>
