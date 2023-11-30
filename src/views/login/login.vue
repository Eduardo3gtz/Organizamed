<template>
  <v-app id="inspire">
    <v-container fluid class="mt-3">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8" sm="8">
                    <v-card-text>
                      <v-row justify="center" align="center">
                       
                        <v-col cols="12" md="12">
                          <v-img
                            contain
                            height="230"
                            src="@/assets/logo.png"
                          >
                          </v-img>
                        </v-col>
                      </v-row>

                      <!-- <h1
                        class="text-center display-1 mt-2  blue-text text--accent-3"
                      >Expediente Médico Digital Migrante
                      </h1> -->
                      <h4 class="text-center ma-2">
                        Ingrese sus datos y comience a trabajar con nosotros.
                      </h4>
                      <v-form>
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
                          prepend-icon="lock"
                          :append-icon="show1 ? 'visibility' : 'visibility_off'"
                          :type="show1 ? 'text' : 'password'"
                          label="Password"
                          name="password"
                          color="blue darken-3"
                          @click:append="show1 = !show1"
                        />
                      </v-form>
                    </v-card-text>
                    <v-row class="mb-2 ml-3">
                      <v-col cols="12" md="8" sm="8">
                        <v-btn text rounded to="olvidacontra">
                          <h3>{{ $t("cambiar") }}</h3>
                        </v-btn>
                      </v-col>

                      <v-col cols="12" md="3" sm="3">
                        <v-row justify="center">
                          <v-btn
                            @click="ingresar"
                            class="mt-3 ml-2"
                            color="blue"
                            dark
                            >Login</v-btn
                          >
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="4" sm="4" class="blue darken-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        {{ $t("aun_no_tienes") }}
                      </h1>
                      <h5 class="text-center mt-3">{{ $t("crearCuenta") }}</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined class="mb-4" dark to="registrarse">
                        {{
                          $t("registrarse")
                        }}
                      </v-btn>
                    </div>
                    <div class="text-center mt-12">
                      <v-btn rounded outlined class="mb-4" dark to="nosotros"
                        >Proyecto EDSM</v-btn
                      >
                    </div>
                    <v-row justify="center">
                      <v-btn class="mt-3 mb-5" small dark text>
                        versión 2.0.0
                      </v-btn>
                    </v-row>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    value: "recent",

    step: 1,
    email: "",
    password: "",
    show1: false,
    // locale: 'es-MX',
    langs: ["es", "en"],
  }),
  props: {
    source: String,
  },
  computed: {
    ...mapGetters("Login", ["getdatosUsuario", "getLogeado"]),
  },
  methods: {
    ...mapActions("Login", ["validarUser", "GetInfoUser"]),
    ...mapActions("snackbar", ["showSnack"]),

    ingresar() {
      var md5 = require("md5");
      // var payload = { Username: this.email, Password: md5(this.password) };
      var usuario = { email: this.email.trim().toLowerCase(), password: md5(this.password) };

      // console.log('payload',payload)
      this.validarUser(usuario)
        .then((response) => {
          // console.log("toekn", response)
          // Asigno token a variable
          const token = response.token;
          // console.log ("validauser",token)
          // Guardo el Token
          this.$store.dispatch("guardarToken", token);

          // Mando a consultar la informacion del cliente
          this.GetInfoUser(usuario)
            .then((response) => {
              // console.log("Response GetInfoUser", response)

              if (response === false) {
                this.showSnack({
                  text: "No existe el usuario o sus datos son incorrectos",
                  color: "orange",
                  timeout: 2000,
                });

                return;
              } else {
                let cNivel = response.nivel;
                // console.log("cNivel", cNivel)
                if (cNivel == "ADMIN") {
                  // console.log (token)
                  this.$store.dispatch("guardarToken", token);
                  this.showSnack({
                    text: "Bienvenido Administrador",
                    color: "green",
                    timeout: 2000,
                  });
                  // console.log (cNivel )
                  this.$store.dispatch("guardarNivel", cNivel);
                  this.$router.push({ path: "/panel" }).catch((e) => {
                    console.log(e);
                  });
                }

                if (cNivel == "APP") {
                  // console.log (token)
                  this.$store.dispatch("guardarToken", token);
                  this.showSnack({
                    text: "Bienvenido a la APP",
                    color: "green",
                    timeout: 2000,
                  });
                  // console.log (cNivel )
                  this.$store.dispatch("guardarNivel", cNivel);
                  this.$router.replace({ name: "panel" }).catch((e) => {
                    console.log(e);
                  });
                }
              }
            })
            .catch((error) => {
              // Si la respuesta es 401 muestro mensaje
              if (error.status === 401) {
                this.showSnack({
                  text: "Datos incorrectos",
                  color: "red",
                  timeout: 2000,
                });
              }
            });
        })
        .catch((error) => {
          // Si la respuesta es 401 muestro mensaje
          if (error.status === 401) {
            this.showSnack({
              text: "No se encontró el usuario o password",
              color: "red",
              timeout: 2000,
            });
          }
        });
    },
  },
};
</script>