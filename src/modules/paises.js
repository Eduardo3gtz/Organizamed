export default {
  namespaced: true,

  state: {
    pais: {
      name: '',
      iso3: '',
    }
  },

  mutations: {
    SET_PAIS(state, pais) {
      state.pais = pais
    },

  },

  actions: {
    setPais({ commit }, pais) {
      commit("SET_PAIS", pais);
    },
  },

  getters: {
    getPais(state) {
      return state.pais
    }
  }
};