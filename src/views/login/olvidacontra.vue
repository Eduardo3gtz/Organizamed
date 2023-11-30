<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8" xs="12">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-img contain max-height="180" :src="logo"></v-img>
                    <v-card-text>
                      <h2
                        class="
                          text-center
                          display-1
                          mt-2
                          blue-text
                          text--accent-3
                        "
                      >
                        Cambia tu contraseña
                      </h2>
                      <h4 class="text-center mt-4">
                        Proporciona el correo para iniciar el proceso de cambio
                        de contraseña:
                      </h4>
                      <v-form>
                        <v-col cols="12">
                          <v-text-field
                            v-model="email"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="blue darken-3"
                          />
                        </v-col>
                      </v-form>
                    </v-card-text>

                    <v-row justify="center" class="mb-2">
                      <v-btn
                        :loading="loading"
                        @click="saveinfo"
                        dark
                        color="blue"
                        rounded
                        to="olvidacontra"
                      >
                        <h3>Cambiar Contraseña</h3>
                      </v-btn>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="12" sm="12" class="blue darken-3">
                    <v-card-text class="white--text mt-1">
                      <v-row class="mb-2 ml-9">
                        <v-col cols="12" md="4">
                          <v-btn dark rounded outlined to="registrarse">
                            <h3>Registrarse</h3>
                          </v-btn>
                        </v-col>
                        <v-col cols="4"> </v-col>
                        <v-col cols="12" md="4">
                          <v-btn rounded outlined dark to="login"
                            >Ya tengo cuenta</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
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
  data: () => ({
    step: 1,
    email: "",
    loading: false,
    logo: "https://expediente.pro/sloganedsm.png",
  }),
  props: {
    source: String,
  },
  computed: {
    validainfo() {
      if (this.email === "") {
        this.showSnack({
          text: "Debes registrar tu correo",
          color: "red",
          timeout: 2000,
        });
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("snackbar", ["showSnack"]),

    saveinfo() {
      if (!this.validainfo) {
        return;
      }
      // console.log("grabar");

      const payload = { email: this.email.trim().toLowerCase() };
      console.log("payload", payload);

      // let urllogin = this.$http.options.root.replace("apiv3/", "olvidacontra");

      // console.log("olvida contra root", urllogin);
      this.loading = true;
      return new Promise((resolve) => {
        this.$http
          .post("olvidacontra", payload)
          .then((respuesta) => {
            return respuesta.json();
          })
          .then((respuestaJson) => {
            console.log("respuestajson", respuestaJson);

            if (respuestaJson.result != null) {
              // this.snackbar= true ; this.text="Esté correo no es valido." ; this.timeout=3000
            //   this.showSnack({
            //     text: "No se encontró correo de usuario",
            //     color: "orange",
            //     timeout: 3000,
            //   });
            //   resolve(false);
            // } else {
              // console.log(respuestaJson);
              let id = respuestaJson.result.idusuariosweb;
              let curl = "https://expediente.pro";
              // let curl = 'http://localhost:8080'
              // let curl = this.$http.options.root
              let urlcambio = curl + "/cambiacontra/" + id;
              // console.log("urlcambio", urlcambio);

              // console.log();
              const payload = {
                layout: "olvida.html",
                subject: "Modificar contraseña ",
                idusuariosweb: respuestaJson.result.idusuariosweb,
                nomuser: respuestaJson.result.nomuser,
                email: respuestaJson.result.email,
                logo: this.logo,
                color: this.$vuetify.theme.themes.light.primary,
                ruta: urlcambio,
                // portal: "Expediente Digital de Salud Migrante",
                info1: "Expediente Digital de Salud Migrante",
              };

              console.log(payload);
              this.enviarCorreo(payload);
              resolve(true);
            }
          })
          .catch((error) => {
            this.loading = false;
      
            this.showSnack({
              text: "No se encontró correo de usuario",
              color: "orange",
              timeout: 3000,
            });
            resolve(false);
            // console.log("error", error);
          });
      });
    },

    enviarCorreo(payload) {
      // console.log("cambiar password a correo", payload);
      // this.$http.post("sendolvidacontra", email).then(function (response) {
      this.$http
        .post("sendolvida", payload)
        .then((response) => {
          console.log("olvidacontra enviarcorreo", response);
          if (response.status == 200) {
            this.text = "Se ha enviado el código de validación a su correo.";
            this.showSnack({
              text: "Se ha enviado por correo de cambio de contraseña",
              color: "success",
              timeout: 3000,
            });
            this.loading = false;
            // limpiar campos
            this.nomuser = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            this.$router.push({ name: "login" });
          } else {
            this.showSnack({
              text: "Problema al enviar el correo de cambio de contraseña",
              color: "red",
              timeout: 3000,
            });
          }
        })
        .catch((error) => {
          this.showSnack({
            text: "Falla al enviar el correo de cambio de contraseña",
            color: "red",
            timeout: 3000,
          });
          console.log("error", error);
        });
    },
  },
};
</script>