export default {
  namespaced: true,

  state: {
    medico: {
      nommed: '',
      idmedicos: '',
    }
  },

  mutations: {
    SET_MEDICO(state, medico) {
      // console.log("mutations medicos ", medico)
      state.medico = medico
    },

  },

  actions: {
    setMedico({ commit }, medico) {
      commit("SET_MEDICO", medico);
    },
  },

  getters: {
    getMedico(state) {
      return state.medico
    }
  }


};