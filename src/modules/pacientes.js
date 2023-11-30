export default {
  namespaced: true,

  state: {
    paciente: {
      nompaciente: '',
      idpacientes: 0,
    }
  },

  mutations: {
    SET_PACIENTE(state, paciente) {
      state.paciente = paciente
    },

  },

  actions: {
    setPaciente({ commit }, paciente) {
      commit("SET_PACIENTE", paciente);
    },
  },

  getters: {
    getPaciente(state) {
      return state.paciente
    }
  }
};