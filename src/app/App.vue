<template>
  <div id="app">
    <img src="./assets/logo.png"><br/>

    <!-- TODO: nav bar component, hide if not logged in (vuex) -->
    <div id="nav" v-if="this.$store.state.auth.isLoggedIn">
      <router-link :to="{name: 'batchlist'}">Batches</router-link>
      |
      <router-link :to="{name: 'authentication'}">Sign Out</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
};
</script>

<style>
a {
  color: #42b983;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}
</style>
