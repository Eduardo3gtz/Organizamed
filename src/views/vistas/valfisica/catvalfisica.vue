<template>
  <v-container>
    <v-toolbar
      color="blue darken-3"
      dark
      rounded="lg"
      width="600"
      dense
      justify="right"
    >
      <h4>Documentos digitales</h4>
    </v-toolbar>
    <v-alert color="grey" dark>
      <v-row>
        <v-col cols="12" md="6">
          <h4>Recuerda que las imágenes/archivos no deben pasar de los 2 MG</h4>
        </v-col>

        <v-col justify="right" cols="12" md="6">
          <v-btn class="mx-2" small color="orange" @click="regresar">
            <v-icon>mdi-reply</v-icon>
          </v-btn>

          <v-btn class="mx-2" small color="info" @click="consultar">
            <v-icon>mdi-check</v-icon>Consultar
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card color="white" dark class="mb-3" dense>
      <v-row justify="center" align="center">
        <!-- <v-col cols="12" md="3" sm="2">
        <h3 class="ml-3">Valoración Física</h3>
        </v-col> -->
        <!-- <v-col></v-col> -->
        <!-- <v-spacer></v-spacer> -->
        <v-col cols="12" md="2" sm="2">
          <v-row justify="center" align="center">
            <v-btn
              class="mt-1 mb-2"
              small
              @click="laboratorios"
              dark
              color="blue"
              >Laboratorios</v-btn
            >
          </v-row>
        </v-col>
        <v-col cols="12" md="2" sm="2">
          <v-row justify="center" align="center">
            <v-btn small class="mt-1 mb-2" @click="vacunas" dark color="blue"
              >Vacunas</v-btn
            >
          </v-row>
        </v-col>
        <v-col cols="12" md="2" sm="2">
          <v-row justify="center" align="center">
            <v-btn
              small
              class="mt-1 mb-2"
              @click="radiografias"
              dark
              color="blue"
              >Radiografías</v-btn
            >
          </v-row>
        </v-col>

        <v-col cols="12" md="3" sm="3">
          <v-row justify="center" align="center">
            <v-btn
              small
              class="mt-1 mb-2"
              @click="transfusiones"
              dark
              color="blue"
              >Transfusiones</v-btn
            >
          </v-row>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
      </v-row>
    </v-card>

  <!-- {{ valfisica }} -->
    <v-card>
      <v-data-table
        :loading="loading"
        class="mt-2"
        dense
        :headers="headers"
        :items="valfisica"
        hide-default-footer
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr v-on:dblclick="editar(item)">
            <td>{{ item.fecha }}</td>
            <td>{{ item.nomtipo }}</td>
            <td>
              {{ item.lugar }}
              {{ item.obs }}
            </td>

            <td v-if="item.urlimagen">
              <img
                :src="item.urlimagen"
                style="max-height: 80px; width: auto"
              />
            </td>
            <td v-else><img :src="logo" style="max-height: 50px" /></td>
            <!-- <td>{{ item.Linea }}</td> -->
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      idpacientes: 0,
      idcatencion: 0,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      // FILTROS

      logo: "@/assets/logoedsm.png",
      search: "",
      headers: [
        {
          text: "Fecha",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Tipo", value: "nomtipo" },
        { text: "Observación", value: "lugar" },
        { text: "imagen", value: "urlimagen" },
      ],

      valfisica: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
  },

  created() {
    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    this.getCatencion;
    this.idcatencion = parseInt(this.getCatencion.idcatencion);

    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();

    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
    // this.idusuariosweb = parseInt(this.getdatosUsuario.idusuariosweb)
    this.consultar();
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),

    consultar() {
      this.loading = true;
      this.valfisica = [];

      // console.log(this.idpacientes)
      const cUrlbase = "valfisica.get.all.pac?";
      const cpaginas = "offset=0&limit=20&";
      const cidpaciente = "idpacientes=" + this.idpacientes.toString();
      const cUrlgetall = cUrlbase + cpaginas + cidpaciente;
      // console.log("url get all", cUrlgetall);

      const urlbase = "https://expediente.pro/fotossait/";
      
      this.$http
        .get(cUrlgetall)
        .then((response) => {
          console.log("response", response.data);
          if (response.data.error === null) {
            if (response.data.result != null) {
              this.valfisica = response.data.result;
              console.log("valfisica", this.valfisica);
              this.loading = false;

              this.valfisica.forEach((element) => {
                element.urlimagen = urlbase + element.urlimagen;

                if (element.tipo === "1") {
                  element.nomtipo = "Laboratorios";
                }
                if (element.tipo === "2") {
                  element.nomtipo = "Radiografías";
                }
                if (element.tipo === "3") {
                  element.nomtipo = "Vacunas";
                }
                if (element.tipo === "4") {
                  element.nomtipo = "Transfusiones";
                }
              });
            }
            this.loading = false;
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

    cargarInfo() {
      this.loading = true;
      //  madnar cargar la información del paciente por idansiedad
      // ansiedad.update/:idansiedad
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idansiedad)
      this.$http
        .get("notamedica.get/" + this.idnotamedica)
        .then((response) => {
          console.log("response notamedica", response);
          if (response.status != 200) {
            this.showSnack({
              text: "El expediente encontró un error al cargar información",
              color: "red",
              timeout: 2000,
            });
          } else {
            // Convertir el response.result al Data de la vista.
            this.convertirDatos(response.data.result);
          }
          this.loading = false;
        })
        .catch((error) => {
          this.showSnack({
            text: "Error al realizar operación",
            color: "red",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    laboratorios() {
      this.$router
        .push({
          name: "valoracionfis",
          params: { tipo: "Resultados de Laboratorios" },
        })
        .catch(() => {});
    },

    radiografias() {
      this.$router
        .push({ name: "valoracionfis", params: { tipo: "Radiografias" } })
        .catch(() => {});
    },

    vacunas() {
      this.$router
        .push({
          name: "valoracionfis",
          params: { tipo: "Vacunas" },
        })
        .catch(() => {});
    },
    transfusiones() {
      this.$router
        .push({
          name: "valoracionfis",
          params: { tipo: "Transfusiones" },
        })
        .catch(() => {});
    },

    regresar() {
      this.$router
        .push({
          name: "panel",
        })
        .catch(() => {});
    },

    editar(item) {
      console.log("Renglonitem", item);
      this.$router
        .push({ name: "valoracionfis", params: item })
        .catch(() => {});
    },
  },
};
</script>
