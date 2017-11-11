<template>
  <div></div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Authentication',
  props: ['bearer', 'redirect'],
  mounted() {
    if (this.bearer) {
      this.$store.commit('login', this.bearer);
      this.$ls.set('token', this.bearer);
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.auth.authToken}`;

      this.$router.push('/batches');
    }
    else {
      // TODO: sign out with bearer
      axios.defaults.headers.common.Authorization = '';
      this.$store.commit('logout');
      this.$ls.set('token', '');

      this.$router.push('/');
    }
  },
};
</script>
