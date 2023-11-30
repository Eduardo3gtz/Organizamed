<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-4" height="540" rounded="xl">
          <v-row align="center" justify="center">
            <v-col class="ma-2 pa-2" cols="12" md="5" xs="12">
              <!-- <v-img contain max-height="250" src="@/assets/edsm.png"> </v-img> -->
              <v-card flat>
                <v-card-text>
                  <v-responsive>
                    <!-- <iframe
                      width="420"
                      height="315"
                      src="https://www.youtube.com/embed/Hq6JnVH5DAM?si=dT4Oi74aI14cHqLd"
                    >
                    </iframe> -->
                    <!-- <p >Actualización de plataforma 2023</p>
                    <iframe
                      width="100%"
                      height="255"
                      :src="videoURL"
                      frameborder="0"
                      allowfullscreen
                    ></iframe> -->
                  </v-responsive>
                </v-card-text>
              </v-card>

              <v-card elevation="5" rounded="lg" class="ma-2 pa-2">
                <v-card-title class="ma-1 pa-1">Instrucciones</v-card-title>

                <p class="ma-2">1. Revisar sus datos personales.</p>
                <p class="ma-2">
                  2. Seleccionar el Centro de Atención a Migrantes.
                </p>
                <p class="ma-2">3. Seleccionar un paciente</p>
              </v-card>
            </v-col>

            <!-- {{getdatosUsuario}} -->
            <!-- {{getMedico}} -->

            <v-col cols="12" md="5" xs="12">
              <v-card elevation="5" rounded="xl" height="400" class="pa-2">
                <!-- <v-row>
                  <v-col>
                    <h4>Bienvenid@</h4>
                  </v-col>
                </v-row> -->
                <!-- <v-card-title color="red">Usuario {{getdatosUsuario.nomuser}}</v-card-title> -->

                <v-alert
                  dense
                  color="blue-grey"
                  rounded="xl"
                  v-if="getdatosUsuario.idmedicos > 0"
                >
                  <h3 class="black--text">Bienvenid@</h3>
                  <h3 class="white--text">{{ getMedico.nommed }}</h3>
                  <h5 class="orange--text overline">
                    Id del medico: ({{ getMedico.idmedicos }})
                  </h5>
                </v-alert>

                <v-alert
                  dense
                  color="blue-grey"
                  rounded="xl"
                  v-if="getdatosUsuario.idtrabsocial > 0"
                >
                  <h3 class="black--text">Bienvenid@</h3>
                  <h3 class="white--text">{{ getTrabsocial.nomsoc }}</h3>
                  <h5 class="orange--text overline">
                    Id del trabajador social: ({{ getTrabsocial.idtrabsocial }})
                  </h5>
                </v-alert>

                <v-toolbar dense color="primary" dark rounded="lg">
                  Pacientes
                  <v-btn
                    class="ma-4"
                    small
                    @click="irapacientes"
                    dark
                    color="info"
                    >Catálogo</v-btn
                  >
                  <!-- <v-dialog v-model="dialog" width="1000"> -->
                  <!-- <template v-slot:activator="{ on, attrs }"> -->
                  <v-btn @click="nuevo" class="ma-2" small dark color="success"
                    >Nuevo</v-btn
                  >

                </v-toolbar>

                <leePacientes class="mt-2" dark color="primary"></leePacientes>

                <v-alert border="top" color="red darken-2" dark v-if="alertaca">
                  Debes seleccionar un centro de atención a Migrantes
                </v-alert>

                <leeCatencion
                  class="mt-2"
                  dark
                  color="secondary"
                ></leeCatencion>

                <!-- <v-col cols="9" md="5">
                    <v-btn to="avisopriv" text color="green">
                      Aviso de privacidad
                    </v-btn>
                  </v-col>
                  <v-col cols="9" md="6">
                    <v-btn text color="blue">
                      Carta de consentimiento
                    </v-btn>
                  </v-col> -->
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import leePacientes from "@/components/leePacientes.vue";
import leeCatencion from "@/components/leeCatencion.vue";
// import carta from "@/components/carta.vue";

export default {
  components: {
    leePacientes,
    leeCatencion,
    // carta
  },
  data() {
    return {
      alertaca: false,
      dialog: false,
      drawer: false,
      loading: false,
      search: "",
      // videoSource: "String",
      videoURL: "https://www.youtube.com/embed/Hq6JnVH5DAM?si=dT4Oi74aI14cHqLd",
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      json_data: [],
    };
  },

  computed: {
    ...mapGetters("Login", ["getdatosUsuario", "getLogeado"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
    ...mapGetters("Catencion", ["getCatencion"]),
  },

  created() {
    // console.log("getMedico",this.getMedico)
    // console.log("getdatosUsuario", this.getdatosUsuario)
    this.logo = require("@/assets/logoedsm.png");
    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();

    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);

    this.getPaciente;
    this.getCatencion;

    // console.log(this.getCatencion);
    if (this.getCatencion.idcatencion === 0) {
      this.alertaca = true;
    }
  },

  watch: {
    getCatencion() {
      console.log("CA", this.getCatencion);
      if (this.getCatencion.idcatencion === 0) {
        this.alertaca = true;
      } else {
        this.alertaca = false;
      }
    },
  },
  methods: {
    ...mapActions("pacientes", ["setPaciente"]),
    ...mapActions("paises", ["setPais"]),

    consultar() {},

    irapacientes() {
      this.$router.push({ name: "catexpedientes" }).catch(() => {});
    },

    nuevo() {
      let item = {
        idpacientes: 0,
        nompaciente: "",
      };
      this.setPaciente(item);

      let itempais = {
        iso3: "",
        name: "",
      };
      this.setPais(itempais);

      // this.$router.push({ name: "invpersonal" }).catch(() => {});
      this.$router.push({ name: "invpersonal" }).catch(() => {});
    },
  },
};
</script>
