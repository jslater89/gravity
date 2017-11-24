<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <a :href="getLoginPath()">Sign in with Google</a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      msg: 'Welcome to Gravity',
    };
  },

  methods: {
    getLoginPath() {
      return `${this.gravityConfig.apiRoot}/api/v1/auth/google/login`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
