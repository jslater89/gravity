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
      if (!user || !user.roles) {
        // eslint-disable-next-line
        console.log('warning: bad user: ' + user);
        return;
      }
      for (let i = 0; i < user.roles.length; i++) {
        permissions = [...permissions, ...user.roles[i].permissions];
      }
      state.permissions = permissions.slice();
    },
  },
};
