<template>
  <modal :show="show" @close="close">
    <h3>Test</h3>
    <button @click="close()">Cancel</button>
  </modal>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    // Must be a function for the correct binding of this
    // eslint-disable-next-line
    close: function () {
      this.$emit('close');
    },
  },
};
</script>

<style>

</style>
