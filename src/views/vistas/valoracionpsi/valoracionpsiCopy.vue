<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-toolbar color="blue darken-3" dark rounded="lg" class="mb-1" dense>
          <h3>Valoración psicosocial</h3>
          <!-- {{getExpediente}} -->
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="mt-1" justify="center" align="center">
      <v-col cols="12" md="4" lg="4" sm="6">
        <v-card height="220" color="blue" to="ansiedad" rounded="xl">
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

      <v-col cols="12" md="4" lg="4" sm="6">
        <v-card height="220" to="depresion" rounded="xl">
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
      <v-col cols="12" md="4" lg="4" sm="6">
        <v-card height="220" color="blue" to="relacionadas" rounded="xl">
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
      <v-col cols="12" md="4" lg="4" sm="6">
        <v-card height="220" color="blue" to="conteste" rounded="xl">
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

export default {
  computed: {
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("pacientes", ["getPaciente"]),
  },
  data: () => ({
    idpacientes: 0,
    idansiedad: 0,
    iddepresion: 0,
    idrelacionadas: 0,
    idconteste: 0,
  }),

  created() {
    this.idpacientes = this.getPaciente.idpacientes;
    this.consultar();
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    consultar() {
      this.loading = true;
      this.$http
        .get("expedientes.get/" + this.idpacientes)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.loading = false;
            this.setExpediente(response.data.result);
            this.idansiedad = response.data.result.idansiedad;
            this.iddepresion = response.data.result.iddepresion;
            this.idrelacionadas = response.data.result.idrelacionadas;
            this.idconteste = response.data.result.idconteste;

            this.getExpediente;
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
  },
};
</script>
