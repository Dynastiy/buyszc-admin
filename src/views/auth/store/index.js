import request from "../../../plugins/axios";
// const baseUrl = config.baseUrl;
// changeBaseUrl

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, data) {
      console.log(data);
      state.user = data;
      state.token = data.auth_token;
    },
  },
  actions: {
    // Login request
    async login({ commit }, data) {
      console.log(data);
      try {
        let res = await request().post(`/auth/token/login/`, data, {
          "Content-Type": "application/json",
        });

        commit("SET_USER", res.data);

        return res;
      } catch (error) {
        console.log(error);
        return error.response;
      }
    },
  },
  getters: {
    // auth: (state) => state.auth,
  },
};
