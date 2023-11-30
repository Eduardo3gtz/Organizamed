export default {
  namespaced: true,

  state: {
    catencion: {
      nombre: '',
      idcatencion: 0
    }
  },

  mutations: {
    SET_CATENCION (state, catencion) {
      state.catencion = catencion
    },
  },

  actions: {
    setCatencion ({ commit }, catencion) {
      commit("SET_CATENCION", catencion);
    },
  },

  getters: {
    getCatencion (state) {
      return state.catencion
    }
  }
};