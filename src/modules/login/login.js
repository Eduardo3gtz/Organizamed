import Vue from 'vue'
import router from '@/router'


export default {
  namespaced: true,
  state: {
    login: false,
    datosUsuario: '',
    idusuariosweb: '',
    tipousuario: '',
    cia: ''
  },

  mutations: {
    LOGEADO(state, value) {
      state.login = value
    },

    DATOS_USUARIO(state, datosUsuario) {
      state.datosUsuario = datosUsuario
      // console.log("state.datosus", state.datosUsuario)
    },

    ID_USUARIO(state, idusuariosweb) {
      state.idusuariosweb = idusuariosweb
    },

    TIPOUSUARIO(state, tipousuario) {
      state.tipousuario = tipousuario
    },

    EMPRESA(state, cia) {
      state.cia = cia
    },

    SALIR(state) {
      state.login = false
      state.datosUsuario = ''
      state.idusuariosweb = ''
      state.clientes = []
      state.cliente = ''
      state.vendedor = ''
      state.tipousuario = ''
    }
  },

  actions: {
    // Valida si el usario existe en la BD
    validarUser({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        commit('LOGEADO', false)
        // console.log (usuario)
        // console.log("option root", Vue.http.options.root)
        // let urllogin = Vue.http.options.root.replace('apiv3/', 'login')
        // console.log("root", urllogin)

        Vue.http.post('login', usuario).then(respuesta => {
          return respuesta.json()
        }).then(respuestaJson => {
          // console.log('ValidaUser', respuestaJson)

          if (respuestaJson == null) {
            commit('LOGEADO', false)
            resolve(false)
          } else {
            // console.log("token", respuestaJson.token)
            localStorage.setItem("tlaKey", respuestaJson.token)
            resolve(respuestaJson)
          }
        }, error => {
          reject(error)
        })
      })
    },

    GetInfoUser({ commit, dispatch }, usuario) {

      return new Promise((resolve, reject) => {
        // console.log("payload usuario",usuario)
        // console.log("Vue.http.options.root ", Vue.http.options.root )

        Vue.http.post("buscarusuario", usuario).then(response => {
          // console.log('buscarusuario', response)

          if (response.error != null) {
            resolve(false)
          } else {

            // console.log("buscarusuario response AQUI  ", response.data)
            if (response.data.result == "Sin resultados") {
              resolve(false)
              return

            } else if (response.data.result.nivel == "ADMIN" || response.data.result.nivel == "APP") {
              commit('LOGEADO', true)
              commit('DATOS_USUARIO', response.data.result)
              resolve(response.data.result)
              // var cNumcli = response.body.numcli.trim()
              // console.log("tipoacceso", response.data.result)

              dispatch('infoCIA')
              if (response.data.result.idmedicos > 0) {
                let nidmedico = response.data.result.idmedicos
                dispatch('setDatosMedico', nidmedico)
                resolve(true)
              }

              if (response.data.result.idtrabsocial > 0) {
                let nidtrabsocial = response.data.result.idtrabsocial
                dispatch('setDatosTrabsocial', nidtrabsocial)
                resolve(true)
              }

              if (response.data.result.idcatencion > 0) {
                let nidcatencion = response.data.result.idcatencion
                dispatch('setDatosCatencion', nidcatencion)
                resolve(true)
              }
            }

            // PARA QUE regrese que al login.
            resolve(true)
          }
        }, error => {
          console.log(error)
          reject(error)
        })
      })
    },

    infoCIA({ commit }, numcli) {
      Vue.http.get('ciaws.get/1').then(respuesta => {
        commit('EMPRESA', respuesta.body)
      }, error => {
        console.log(error)
      })
    },

    setDatosMedico({ dispatch }, nidmedico) {
      Vue.http.get('medicos.get/' + nidmedico).then(response => {
        // console.log("response", response.data.result)
        dispatch('Medicos/setMedico', response.data.result, { root: true })
      }, error => {
        console.log(error)
      })
    },

    setDatosTrabsocial({ dispatch }, nidtrabsocial) {
      Vue.http.get('trabsocial.get/' + nidtrabsocial).then(response => {
        // console.log("response trabsocial.get", response.data.result)
        dispatch('Trabsocial/setTrabsocial', response.data.result, { root: true })
      }, error => {
        console.log(error)
      })
    },

    setDatosCatencion({ dispatch }, nidcatencion) {
      Vue.http.get('get.catencion/' + nidcatencion).then(response => {
        // console.log("response catencion.get", response.data.result)
        dispatch('Catencion/setCatencion', response.data.result, { root: true })
      }, error => {
        console.log(error)
      })
    },


    salirLogin({ commit }) {
      commit('SALIR')
    }
  },

  getters: {
    getLogeado(state) {
      return state.login
    },
    getdatosUsuario(state) {
      return state.datosUsuario
    },

    getidUsuariosWeb(state) {
      return state.idusuariosweb
    },

    getModo(state) {
      return state.tipousuario
    },

    getCIA(state) {
      return state.cia
    }
  }
}
