/* eslint no-param-reassign: "off" */
export default {
  actions: {},
  state: {
    isLoggedIn: false,
    authToken: '',
    permissions: [],
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
    gotUser(state, user) {
      let permissions = [];
      for (let i = 0; i < user.roles.length; i++) {
        permissions = [...permissions, ...user.roles[i].permissions];
      }
      state.permissions = permissions;
    },
  },
};
