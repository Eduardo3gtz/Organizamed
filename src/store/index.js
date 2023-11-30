import Vue from 'vue'
import Vuex from 'vuex'
import VueJwtDecode from 'vue-jwt-decode'
import router from '@/router'


import Login from '@/modules/login/login'
import Registro from '../modules/login/Registro'
import snackbar from '@/modules/snackbar'
import pacientes from '@/modules/pacientes'
import paises from '../modules/paises'


//STATE Central
import diagnosticos from '@/modules/diagnosticos'
import Medicos from '@/modules/medicos'
import Trabsocial from '@/modules/trabsocial'
import Catencion from '@/modules/catencion'
import Expediente from '@/modules/expediente'


Vue.use(Vuex, VueJwtDecode)

export default new Vuex.Store({
  state: {
    state: {
      token: null,
      usuario: null,
      nivel: null,
      // drawer: true,
      // menu: true,
      // logourl: ''
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
    setNivel(state, nivel) {
      state.nivel = nivel
    }

  },
  actions: {
    guardarToken({ commit }, token) {
      commit("setToken", token)
      localStorage.setItem("tlaKey", token)
      //Decifrar Usuario
      let decode = VueJwtDecode.decode(token)
      let UsuarioActivo = decode.id
      commit("setUsuario", UsuarioActivo)
    },

    guardarNivel({ commit }, nivel) {
      commit('setNivel', nivel)
    },

    salir({ commit }) {
      commit("setUsuario", '')
      commit("setToken", '')
      localStorage.removeItem("ExpedienteKey")


      //var tokenGen = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjIyNTg4NjgsImlkIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTU2MjI1NTI2OH0.SWGD5aH16otmX_cu-EaQ9OlgnLwV-WxbAuy85LUS1bE';
      //localStorage.capaKey  = JSON.stringify(tokenGen);
      router.push({ name: 'login' }).catch(error => { })
    }
  },
  modules: {
    Login,
    snackbar,
    Registro,
    pacientes,
    Medicos,
    Trabsocial,
    Catencion,
    Expediente,
    paises,
    diagnosticos
  }
})
