<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-toolbar color="blue darken-3" dark rounded="lg" class="mb-1" dense>
          <!-- <h3>
            {{ idnotasocial }} Valoración psicosocial {{ fecha }}
            {{ horainicial }}
          </h3> -->
          <h3>Valoración psicosocial</h3>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2" to="notasocial" dark small>
            <v-icon class="mx-2">mdi-reply</v-icon>
          </v-btn>
          <!-- {{getExpediente}} -->

          <v-btn small class="mx-2" dark color="success" @click="saveinfo">
            Guardar
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="xl" :loading="loading">
          <v-row justify="center">
            <v-col cols="12" md="5">
              <v-textarea
                class="mx-3"
                auto-grow
                label="Principio Evolución"
                rows="2"
                hide-details
                row-height="20"
                v-model="evolucion"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12" md="5">
              <v-textarea
                class="mx-3"
                auto-grow
                hide-details
                label="Estado Actual"
                rows="2"
                row-height="20"
                v-model="edoactual"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-1" justify="center" align="center">
      <v-col cols="12" md="5" lg="4" sm="6">
        <!-- {{idansiedad}} -->
        <v-card height="220" color="blue" @click="iransiedad" rounded="xl">
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://as01.epimg.net/deporteyvida/imagenes/2020/03/02/portada/1583142327_324441_1583142752_noticia_normal_recorte1.jpg"
          >
            <v-row>
              <v-card-title class="ml-2"
                >Escala de ansiedad de Hamilton</v-card-title
              >
              <v-icon large color="green darken-2" v-if="idansiedad > 0">
                mdi-check-circle
              </v-icon>
              <v-icon large v-if="idansiedad === 0" color="red darken-2">
                mdi-close-circle
              </v-icon>
            </v-row>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" lg="4" sm="6">
        <v-card @click="irdepresion" height="220" rounded="xl">
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/depresion_1_0.jpg.webp?itok=VX6z4ymF"
          >
            <v-row>
              <v-card-title class="ml-2"
                >Escala de depresión de Zung {{ iddepresion }}
              </v-card-title>
              <v-icon large color="green darken-2" v-if="iddepresion > 0">
                mdi-check-circle
              </v-icon>
              <v-icon large color="red darken-2" v-if="iddepresion === 0">
                mdi-close-circle
              </v-icon>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5" lg="4" sm="6">
        <v-card height="220" color="blue" @click="irrelacionadas" rounded="xl">
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://enews.mx/foto/noticias/nt_20150522235634_19107.jpg"
          >
            <v-row class="ml-1">
              <v-card-title>Temas relacionados: Estudios</v-card-title>
              <v-icon large v-if="idrelacionadas > 0" color="green darken-2">
                mdi-check-circle
              </v-icon>
              <v-icon large color="red darken-2" v-if="idrelacionadas === 0">
                mdi-close-circle
              </v-icon>
            </v-row>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" lg="4" sm="6">
        <v-card height="220" color="blue" @click="irconteste" rounded="xl">
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://www.acnur.org/thumb1/5a20121a4.jpg"
          >
            <v-row class="ml-2">
              <v-card-title>Otros temas: Migración</v-card-title>
              <v-icon large color="green darken-2" v-if="idconteste > 0">
                mdi-check-circle
              </v-icon>
              <v-icon large v-if="idconteste === 0" color="red darken-2">
                mdi-close-circle
              </v-icon>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tiempo from "@/mixins/tiempo.js";

export default {
  mixins: [tiempo],
 
  data: () => ({
    fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    horainicial: "",
    loading: false,
    idpacientes: 0,
    idansiedad: 0,
    iddepresion: 0,
    idrelacionadas: 0,
    idconteste: 0,

    // idmedicos:0,
    idtrabsocial: 0,
    idcatencion: 0,
    idnotasocial: 0,
    evolucion: "",
    edoactual: "",
  }),

  computed: {
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
  },

  created() {
    // console.log("router", this.$route.params);
    this.idnotasocial = this.$route.params.idnotasocial;
    this.idpacientes = parseInt(this.getPaciente.idpacientes)

    this.idcatencion = this.getCatencion.idcatencion;
    this.idtrabsocial = parseInt(this.getTrabsocial.idtrabsocial);

    this.horainicial = this.gethora();

    //MODO EDITAR
    if (this.idnotasocial !== undefined) {
      this.nModo = 2;

      // this.cargarInfo(this.$route.params);
      this.consultar();
      this.modo = "Editar";
    } else {
      this.idnotasocial = 0;
      // console.log("nuevo");
      this.saveinfo()
      //VALORES INICIALES ALTA
      this.nModo = 1;
      this.modo = "Nuevo";
    }

    this.idpacientes = parseInt(this.getPaciente.idpacientes);
    // this.consultar();
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    consultar() {
      // console.log("consultae");
      this.loading = true;
      this.$http
        .get("notasocial.get/" + this.idnotasocial)
        .then((response) => {
          // console.log("getnotasocial", response.data);
          if (response.status == 200) {
            this.loading = false;
            this.setExpediente(response.data.result);
            this.idansiedad = response.data.result.idansiedad;
            this.iddepresion = response.data.result.iddepresion;
            this.idrelacionadas = response.data.result.idrelacionadas;
            this.idconteste = response.data.result.idconteste;
            this.getExpediente;
            this.evolucion = response.data.result.evolucion;
            this.edoactual = response.data.result.edoactual;
          }
        })
        .catch((error) => {
          this.showSnack({
            text: "Error al cargar información",
            color: "red",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    saveinfo() {
      let payload = {
        idnotasocial: parseInt(this.idnotasocial),
        idpacientes: this.idpacientes,
        idcatencion: this.idcatencion,
        hora: this.gethora(),
        idtrabsocial: this.idtrabsocial,
        fecha: this.fecha,
        idansiedad: this.idansiedad,
        idrelacionadas: this.idrelacionadas,
        iddepresion: this.iddepresion,
        idconteste: this.idconteste,
        evolucion: this.evolucion,
        edoactual: this.edoactual,
      };
      // console.log("saveinfo, payload", payload);
      this.loading = true;

      // Modo Nuevo.
      if (this.idnotasocial === 0) {
        this.$http
          .post("notasocial.insert", payload)
          .then((response) => {
            // console.log("notasocial insert", response.data);
            if (response.status == 201) {
              this.idnotasocial = response.data.result.idnotasocial
              this.loading = false;
              this.showSnack({
                text: "Nota Social actualizada con exito",
                color: "success",
                timeout: 2000,
              });
            }
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al cargar información",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      }

      // UPDATE
      if (this.idnotasocial > 0) {
        // console.log("updateinfo, payload", payload);
        this.loading = true;

        this.$http
          .put("notasocial.update/" + this.idnotasocial, payload)
          .then((response) => {
            // console.log("notasocial update", response.data);
            if (response.status == 200) {
              this.loading = false;
              this.showSnack({
                text: "Nota Social actualizada con exito",
                color: "success",
                timeout: 2000,
              });
            }
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al cargar información",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      }
    },

    iransiedad() {
      this.saveinfo();
      this.$router
        .push({
          name: "ansiedad",
          params: {
            idansiedad: this.idansiedad,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    irdepresion() {
      this.saveinfo();
      this.$router
        .push({
          name: "depresion",
          params: {
            iddepresion: this.iddepresion,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    irrelacionadas() {
      this.saveinfo();
      this.$router
        .push({
          name: "relacionadas",
          params: {
            idrelacionadas: this.idrelacionadas,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    irconteste() {
      this.saveinfo();
      this.$router
        .push({
          name: "conteste",
          params: {
            idconteste: this.idconteste,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },
  },
};
</script>
