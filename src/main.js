
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLocalStorage from 'vuejs-local-storage';
import axios from 'axios';

import App from './app/App';
import router from './router';
import filters from './filters';
import store from './vuex';
import gravityConfig from './config';

import modal from './app/components/Modal';

Vue.use(VueLocalStorage, {
  namespace: 'gravity__',
});

Vue.component('modal', modal);

Vue.config.productionTip = false;
filters();

// restore auth
if (Vue.ls.get('token', '') !== '') {
  const token = Vue.ls.get('token');
  const user = Vue.ls.get('user');
  store.commit('login', token);
  store.commit('gotUser', user);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

Vue.mixin({
  data() {
    return {
      gravityEmptyID: '2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a',
      gravityConfig,
    };
  },
  methods: {
    checkAuth(context) {
      if (!context.$store.state.auth.isLoggedIn) {
        context.$router.push({ path: '/' });
        return false;
      }
      return true;
    },
    checkPermissions(context, readWrite, path) {
      if (!context.checkAuth(context)) {
        return false;
      }

      const permissions = context.$store.state.auth.permissions;

      let bestMatchLength = 0;
      let bestRead = false;
      let bestWrite = false;

      for (let i = 0; i < permissions.length; i++) {
        if (path.startsWith(permissions[i].path) && permissions[i].path.length > bestMatchLength) {
          bestMatchLength = permissions[i].path.length;
          bestRead = permissions[i].canRead;
          bestWrite = permissions[i].canWrite;
        }
      }

      if (readWrite === 'write') {
        return bestWrite;
      }

      return bestRead;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
