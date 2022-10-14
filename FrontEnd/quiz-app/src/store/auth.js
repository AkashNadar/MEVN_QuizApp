import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },

    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_TOKEN(state, data) {
      state.token = data.token;
    },

    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      try {
        let response = await axios.post(
          "/users/login",
          credentials
        );
        dispatch("attempt", {
          token: response.data.accessToken,
          id: response.data.userId,
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    async attempt({ commit, state }, { token, id }) {
      if (token) {
        commit("SET_TOKEN", { token, id });
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get(`/users/${id}`);

        commit("SET_USER", response.data.user);
      } catch (err) {
        console.log("error");
        commit("SET_TOKEN", { token: null, id: null });
        commit("SET_USER", null);
      }
    },

    signOut({ commit }) {
      commit("SET_TOKEN", { token: null, id: null });
      commit("SET_USER", null);
      return;
    },
  },
};
