export default {
  namespaced: true,

  state: {
    diagnostico: {
      nombre: '',
      iddiagnostico: 0,
      catalog_key: '',
      capitulo:''
    }
  },

  mutations: {
    SET_DIAGNOSTICO(state, diagnostico) {
      state.diagnostico = diagnostico
    },

  },

  actions: {
    setDiagnostico({ commit }, diagnostico) {
      commit("SET_DIAGNOSTICO", diagnostico);
    },
  },

  getters: {
    getDiagnostico(state) {
      return state.diagnostico
    }
  }
};