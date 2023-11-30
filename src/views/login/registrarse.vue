<template>
  <v-app id="inspire">
    <v-container fluid class="mt-8">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="4" sm="4" class="blue darken-3">
                    <v-card-text class="justify-center white--text ma-1">
                      <v-img contain src="https://expediente.pro/logoedsm.jpeg">
                      </v-img>
                      <h1 class="text-center display-1 mt-3">
                        ¿Ya tienes cuenta?
                      </h1>
                      <h5 class="text-center mt-3">
                        Ingresa con tu cuenta aqui!
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark to="login">LOGIN</v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12" md="8" sm="8" class="mb-3">
                    <v-card-text class="mt-6">
                      <h2 class="text-center display-2">Crea tu cuenta</h2>
                      <h4 class="text-center mt-4">
                        Registra los siguientes datos para solictar tu acceso a
                        la plataforma del Expediente Digital de Salud Migrante
                      </h4>
                      <v-form>
                        <v-text-field
                          v-model="nomuser"
                          label="Nombre"
                          name="Name"
                          prepend-icon="person"
                          type="text"
                          color="blue darken-3"
                        />
                        <v-text-field
                          v-model="email"
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="blue darken-3"
                        />

                        <v-text-field
                          v-model="password"
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          :append-icon="show1 ? 'visibility' : 'visibility_off'"
                          :type="show1 ? 'text' : 'password'"
                          color="blue darken-3"
                          @click:append="show1 = !show1"
                        />

                        <v-select
                          v-model="select"
                          :hint="`Tipo de Acceso, ${select.tipomt}`"
                          :items="tipouser"
                          item-text="nombre"
                          item-value="tipomt"
                          label="Médico o Trabajador Social"
                          persistent-hint
                          return-object
                        ></v-select>
                      </v-form>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        @click="agregar"
                        rounded
                        color="blue"
                        dark
                        >registrarse</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    validaInfo() {
      return this.nomuser !== "" && this.email !== "" && this.password !== "";
    },
  },

  data: () => ({
    show1: false,
    password: "",
    email: "",
    nomuser: "",
    step: 1,
    select: { nombre: "Médico", tipomt: "M" },
    tipomt: "M",
    tipouser: [
      { nombre: "Médico", tipomt: "M" },
      { nombre: "Trabajador Social", tipomt: "T" },
    ],
  }),
  props: {
    source: String,
  },

  methods: {
    ...mapActions("Registro", ["buscarUsuarioWeb", "registrarUsuario"]),
    ...mapActions("snackbar", ["showSnack"]),

    agregar() {
      console.log("select.tipomt", this.select.tipomt);
      if (!this.validaInfo) {
        this.showSnack({
          text: "Faltan campos por agregar",
          color: "orange",
          timeout: 2000,
        });
        return;
      }
      var md5 = require("md5");
      let usuario = {
        nomuser: this.nomuser,
        email: this.email.toLowerCase().trim(),
        password: md5(this.password.trim()),
      };

      this.buscarUsuarioWeb(usuario).then((response) => {
        // SI LA CONSULTA ME REGRESA FALSO MUESTRO AVISO
        if (response == false) {
          this.showSnack({
            text:
              "El correo" + "   " + this.email + "   " + " ya esta registrado",
            color: "orange",
            timeout: 3000,
          });
        } else {
          // SI REGRESA TRUE MANDO A REGISTRAR
          this.registrarUsuario(usuario).then((response) => {
            // SI EL REGISTRO REGRESA FALSE MUESTRO MENSAJE
            if (response == false) {
              this.showSnack({
                text: "No se pudo registrar el correo",
                color: "orange",
                timeout: 3000,
              });
            } else {
              // SI REGRESA TRUE MANDO A BUSCAR
              this.saveTrabsocial();
              this.getId();
            }
          });
        }
      });
    },

    saveTrabsocial() {
      let payload = {
        nomsoc: this.nomuser,
        nommed: this.nomuser,
        email: this.email.toLowerCase().trim(),
      };

      //NUEVO MEDICO
      if (this.select.tipomt == "M") {
        //Dedinir db name
        this.$http
          .post("r2/medicos.insert", payload)
          .then((response) => {
            console.log("response", response);
            if (response.status == "201") {
              this.showSnack({
                text: "Medico agregado correctamente",
                color: "success",
                timeout: 2000,
              });
              // setTimeout(() => this.$router.push({ name: "catmedicos" }), 2000);
            }
          })
          .catch((error) => {
            // console.log(error);
            this.showSnack({
              text: "Problema para grabar medico",
              color: "error",
              timeout: 2000,
            });
          });
      }

      //TRABAJADOR SOCIAL
      if (this.select.tipomt == "T") {
        this.$http
          .post("r2/trabsocial.insert", payload)
          .then((response) => {
            // console.log("response", response);
            if (response.status == "201") {
              this.showSnack({
                text: "Trabajador Social agregado correctamente",
                color: "success",
                timeout: 2000,
              });

              // setTimeout(() => this.$router.push({ name: "catsociales" }), 2000);
            }
          })
          .catch((error) => {
            console.log(error);
            this.showSnack({
              text: "Problema para grabar Trabajdor social",
              color: "error",
              timeout: 2000,
            });
          });
      }
    },

    getId() {
      const payload = {
        Email: this.email.trim().toLowerCase(),
      };

      console.log("Buscarid", payload);
      return new Promise((resolve, reject) => {
        this.$http
          .post("getidxmail", payload)
          .then((respuesta) => {
            return respuesta.json();
          })

          .then((respuestaJson) => {
            if (respuestaJson === null) {
              resolve(false);
              // this.snackbar = true; this.text = 'No encontre ID'; this.timeout = 3000
              this.showSnack({
                text: "Falla al registrar su cuenta",
                color: "red",
                timeout: 3000,
              });
            } else {
              // console.log("getidxmail", respuestaJson);
              this.ID = respuestaJson.result.idusuariosweb;
              this.enviarCorreo(this.ID);
              resolve(true);
            }
          })
          .catch(() => {
            // console.log(error);
            this.showSnack({
              text: "Problema al registrar cuenta.",
              color: "error",
              timeout: 2000,
            });
          });
      });
    },

    enviarCorreo(id) {
      const payload = {
        subject: "Activar Usuario en plataforma web",
        layout: "registrar.html",
        nomuser: this.nomuser,
        email: this.email.trim().toLowerCase(),
        logo: "https://expediente.pro/sloganedsm.png",
        color: this.$vuetify.theme.themes.light.primary,
        ruta: this.$http.options.root.replace("apiv3/", "activarusuario/") + id,
      };
     
      // SE RECIBIO UN ID DE un nuevo usuario registrado.
      if (id > 0) {
        // this.$http.post('activarcuenta', payload).then(function (response) {
        this.$http
          .post("sendregistrar", payload)
          .then((response) => {
            if (response.status == 200) {
              this.showSnack({
                text: "Se ha enviado por correo su código de validación",
                color: "orange",
                timeout: 3000,
              });

              // limpiar campos
              this.nomuser = "";
              this.email = "";
              this.password = "";
              this.password2 = "";

              setTimeout(() => this.$router.push({ name: "login" }), 2000);
            } else {
              this.showSnack({
                text: "Falla al enviar el correo",
                color: "red",
                timeout: 3000,
              });
            }
          })
          .catch((e) => {
            console.log(e);
            this.showSnack({
              text: "Problema al enviar el correo.",
              color: "error",
              timeout: 2000,
            });
          });
      }
    },
  },
};
</script>