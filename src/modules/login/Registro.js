import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    registro: ''
  },

  mutations: {

    ACTUALIZREGISTRO(state, registro) {
      state.registro = registro
    }

  },

  actions: {

    // BUSCAR USUARIO
    buscarUsuarioWeb(state, usuarionew) {
      let payload = { 'Email': usuarionew.email }
      // console.log(payload)
      // console.log(usuarionew)

      return new Promise((resolve) => {

        Vue.http.post('getidxmail', payload).then(respuesta => {
          return respuesta.json()
        }).then(respuestaJson => {
          // console.log(respuestaJson)
          // VALIDO LA RESPUESTA

          if (respuestaJson.result === "Sin Resultados") {
            // SI NO ENCUENTRA AL USUARIO MANDA A REGISTRARLO
            resolve(true)

          } else {
            // SI ENCUENTRO AL USUARIO REGRESO FALSO
            resolve(false)
          }

        }).catch(error => { console.log('error', error) })
      })
    },

    registrarUsuario({ commit }, usuario) {
      return new Promise((resolve, reject) => {

        //si llega el nivel
        if (usuario.nivel != '') {
          usuario.nivel = usuario.nivel
        } else {
          usuario.nivel = "USER"
        }

        const payload = {
          Nomuser: usuario.nomuser,
          Email: usuario.email,
          Password: usuario.password,
          Idnivel: '3',
          Estatus: 1,
          Nivel: "USER",
          Telefono: "",
          Empresa: "",
          Depto: "",
          Suc: "",
        }

        console.log(payload)
        Vue.http.post('r2/usuariosweb.insert', payload)
          .then(respuesta => { return respuesta.json() })
          .then(respuestaJson => {
            console.log(respuestaJson)
            // VALIDO LA RESPUESTA

            if (respuestaJson.error == null) {
              commit('ACTUALIZREGISTRO', respuestaJson.result)
              resolve(true)

            } else {
              resolve(false)
            }

          }).catch(error => {
            reject(error)
            console.log('error', error)
          })
      })
        .catch(error => { console.log('error', error) })
    },
  },

  getters: {

    traerDatosUsuarios(state) {
      return state.registro
    }

  }
}

