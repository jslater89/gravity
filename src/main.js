
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLocalStorage from 'vuejs-local-storage';
import axios from 'axios';

import App from './app/App';
import router from './router';
import filters from './filters';
import store from './vuex';

Vue.use(VueLocalStorage, {
  namespace: 'gravity__',
});

Vue.config.productionTip = false;
filters();

// restore auth
if (Vue.ls.get('token', '') !== '') {
  const token = Vue.ls.get('token');
  store.commit('login', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
