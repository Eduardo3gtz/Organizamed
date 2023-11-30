<template>
  <v-container class="ma-0 pa-0 mt-4">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" cols="12" xm="12">
        <v-text-field
          v-model="buscando"
          class="mb-2 pa-0"
          outlined
          rounded
          dense
          append-icon="mdi-check-circle"
          label="Seleccionar centro de Atención"
          prepend-inner-icon="mdi-magnify"
          clearable
          :loading="loading"
          hide-details
          @click:append="buscarcatencion"
          @keyup.enter="buscarcatencion"
          @click:clear="limpiar"
          @keyup.113="buscarcatencion"
        ></v-text-field>
        <p class="mx-5 my-0">{{ getCatencion.Nomcatendion }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ma-0 pa-0" cols="12" md="12" lm="12" sm="12" xm="12">
        <p class="mx-2" v-if="catencion.length > 0">
          {{ catencion.length }} resultados
        </p>

        <!-- <p>{{getCatencion.idcatencion}}</p> -->

        <v-data-table
          v-if="catencion.length > 0"
          :headers="headers"
          :items="catencion"
          ref="tabla"
          @click:row="seleccionar"
          item-key="idcatencion"
          hide-default-footer
          class="elevation-1"
          fixed-header
          dense
          :loading="loading"
          hide-default-header
        >
          <template v-slot:item="{ item }">
            <tr v-on:click.once="seleccionar(item)">
              <td>{{ item.nombre }}</td>
              <td>{{ item.idcatencion }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="3000" top :color="color">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    buscando: "",

    longitud: 30,
    loading: false,

    catencion: [],

    nombre: "",
    idcatencion: 0,

    //SNACKBAR
    text: "",
    snackbar: false,
    color: "",

    headers: [
      {
        text: "Id",
        align: "start",
        value: "numcli",
      },
      { value: "nomcli", sort: false, align: "start" },
      { text: "Ciudad", value: "Ciudad" },
    ],
  }),

  computed: {
    ...mapGetters("Catencion", ["getCatencion"]),
  },

  watch: {
    getCatencion() {
      this.actualizarLeecatencion();
    },
  },

  created() {
    this.getCatencion;
    this.buscando = "";
    this.idcatencion = "";

    if (this.getCatencion.idcatencion == undefined) {
      this.buscando = "";
      this.idcatencion = 0;
    } else {
      this.buscando = this.getCatencion.nombre;
      this.idcatencion = this.getCatencion.idcatencion;
    }
  },

  methods: {
    ...mapActions("Catencion", ["setCatencion"]),

    actualizarLeecatencion() {
      this.buscando = this.getCatencion.nombre;
      this.nombre = this.getCatencion.nombre;
      this.idcatencion = parseInt(this.getCatencion.idcatencion);
    },

    buscarcatencion() {
      if (this.buscando == null) return;

      // console.log("a Buscar", this.buscando);
      var payload = {
        Buscar: this.buscando.trim(),
      };
      this.loading = true;

      //PREPARAR PARAMETROS PARA BUSQUEDA
      let cParametros = "?q=" + this.buscando;
      let cUrl = "catencion.list" + cParametros;
      // console.log("llamada", cUrl);

      //LLAMADA
      this.$http
        .get(cUrl)
        .then((response) => {
          // console.log(response);
          this.loading = false;

          if (response.status === 200 && response.data.result != null) {
            this.catencion = response.data.result;
            this.longitud = response.data.result.length;
            // console.log(" RESULTADOS",this.catencion )
          } else {
            // console.log("SIN RESULTADOS");
            this.catencion = [];

            this.snackbar = true;
            this.text = "No se encontraron centros de atención";
            this.color = "info";
          }
        })
        .catch(() => {
          // this.pacientes = [];
          this.loading = false;
          // console.log();
        });
    },

    limpiar() {
      this.catencion = [];
      this.idcatencion = 0;
      this.nombre = "";
      this.buscando = "";

      let item = {
        idcatencion: 0,
        nombre: "",
      };
      this.setCatencion(item);
    },

    seleccionar(item) {
      this.nombre = item.nombre;
      this.idcatencion = parseInt(item.idcatencion);

      item.idcatencion = parseInt(item.idcatencion)

      this.buscando = item.nombre;
      this.catencion = [];
      this.setCatencion(item);
    },
  },
};
</script>