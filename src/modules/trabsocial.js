export default {
  namespaced: true,

  state: {
    trabsocial: {
      nomsoc: '',
      idtrabsocial: '',
      telefono:'',
      email:'',
      ciudad:'',
      direccion:''
    }
  },

  mutations: {
    SET_TRABSOCIAL(state, trabsocial) {
      state.trabsocial = trabsocial
    },

  },

  actions: {
    setTrabsocial({ commit }, trabsocial) {
      commit("SET_TRABSOCIAL", trabsocial);
    },
  },

  getters: {
    getTrabsocial(state) {
      return state.trabsocial
    }
  }


};