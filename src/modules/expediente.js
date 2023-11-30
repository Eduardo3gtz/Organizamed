export default {
  namespaced: true,

  state: {
    expediente: {
      idexpediente: 0,
      idpacientes: 0,
      idansiedad: 0,
      iddepresion: 0,
      idrelacionadas: 0,
      idconteste: 0,
      idsocial: 0,
      idsomato: 0,
      idtraumaticos: 0,
      idpatologicos: 0,
      idquirurgicos: 0,
      idnopatologicos: 0,
      idginecologicos: 0,
      idperinatales: 0,
      idvalfisica: 0,
      idnotamedica: 0

    }
  },

  mutations: {
    SET_EXPEDIENTE(state, expediente) {
      state.expediente = expediente
    },
  },

  actions: {
    setExpediente({ commit }, expediente) {
      commit("SET_EXPEDIENTE", expediente);
    },
  },

  getters: {
    getExpediente(state) {
      return state.expediente
    }
  }
};