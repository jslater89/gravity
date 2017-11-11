/* eslint no-param-reassign: "off" */
export default {
  actions: {},
  state: {
    isLoggedIn: false,
    authToken: '',
  },
  mutations: {
    login(state, token) {
      state.isLoggedIn = true;
      state.authToken = token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.authToken = '';
    },
  },
};
