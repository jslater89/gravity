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

function completeLogin(context, error, response) {
  if (!error && response.data) {
    context.$store.commit('gotUser', response.data);
  }

  context.$router.push('/batches');
}

export default {
  name: 'Authentication',
  props: ['bearer', 'redirect'],
  mounted() {
    const context = this;
    if (this.bearer) {
      this.$store.commit('login', this.bearer);
      this.$ls.set('token', this.bearer);
      axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.auth.authToken}`;

      axios.get(`${this.gravityConfig.apiRoot}/api/v1/users/me`)
        .then(response => completeLogin(context, false, response))
        .catch(error => completeLogin(context, true, error));
    }
    else {
      axios.get(`${this.gravityConfig.apiRoot}/api/v1/auth/logout`)
        .then(() => completeLogout(context))
        .catch(() => completeLogout(context));
    }
  },
};
</script>
