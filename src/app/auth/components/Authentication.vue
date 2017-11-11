<template>
  <div></div>
</template>


<script>
import axios from 'axios';

function completeLogout(context) {
  axios.defaults.headers.common.Authorization = '';
  context.$store.commit('logout');
  context.$ls.set('token', '');

  context.$router.push('/');
}

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
      const context = this;
      axios.get('http://localhost:10000/api/v1/auth/logout')
        .then(() => completeLogout(context))
        .catch(() => completeLogout(context));
    }
  },
};
</script>
