<template>
  <div>
    <v-row class="ma-0 pa-0 mx-3">
      <v-col class="ma-0 pa-0" cols="12" xm="12">
        <v-text-field
          v-model="buscando"
          class="mb-0 pa-0"
          outlined
          rounded
          dense
          append-icon="mdi-check-circle"
          label="Buscar País"
          prepend-inner-icon="mdi-magnify"
          clearable
          :loading="loading"
          hide-details
          @click:append="buscarPais"
          @keyup.enter="buscarPais"
          @click:clear="limpiar"
          @keyup.113="buscarPais"
        />
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" cols="12" xm="12">
        <p v-if="paises.length > 0" class="ma-1">
          {{ paises.length }} resultados
        </p>

        <v-data-table
          v-if="paises.length > 0"
          ref="tabla"
          class="grey lighten-2"
          :headers="headers"
          :items="paises"
          item-key="iso3"
          hide-default-footer
          :items-per-page="longitud"
          fixed-header
          dense
          :loading="loading"
          hide-default-header
          @click:row="seleccionar"
        >
          <template v-slot:item="{ item }">
            <tr @click.once="seleccionar(item)">
              <td>{{ item.iso3 }}</td>
              <td>{{ item.name }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="3000" top :color="color">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false"> Cerrar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    buscando: "",
    longitud: 30,
    loading: false,

    paises: [],

    name: "",
    iso3: "",

    //SNACKBAR
    text: "",
    snackbar: false,
    color: "",

    headers: [
      { text: "Clave", align: "start", value: "iso3" },
      { text: "name", align: "end", value: "name" },
    ],
  }),

  created() {
    this.getPais;
    // console.log("Create", this.getPais);

    this.buscando = "";
    this.iso3 = "";

    if (this.getPais.iso3 == undefined) {
      this.buscando = "";
      this.iso3 = "";
    } else {
      this.buscando = this.getPais.name;
      this.iso3 = this.getPais.iso3;
    }
  },

  computed: {
    ...mapGetters("paises", ["getPais"]),
  },

  watch: {
    getPais() {
      // this.limpiar()
      this.actualizarLeepais();
    },
  },

  methods: {
    ...mapActions("paises", ["setPais"]),

    actualizarLeepais() {
      this.buscando = this.getPais.name;
      this.nompaciente = this.getPais.name;
      this.iso3 = this.getPais.iso3;
    },

    buscarPais() {
      if (this.buscando == null) return;

      // console.log("a Buscar", this.buscando);
      var payload = {
        Buscar: this.buscando.trim(),
      };

      this.loading = true;

      //PREPARAR PARAMETROS PARA BUSQUEDA
      let cParametros = "?q=" + this.buscando;
      let cUrl = "paises.list" + cParametros;

      //LLAMADA
      this.$http
        .get(cUrl)
        .then((response) => {
          // console.log(response);
          this.loading = false;

          if (response.status === 200 && response.data.result != null) {
            this.paises = response.data.result;
            this.longitud = response.data.result.length;
            // console.log(" RESULTADOS",this.paises )
          } else {
            console.log("SIN RESULTADOS");
            this.paises = [];

            this.snackbar = true;
            this.text = "No se encontraron paises";
            this.color = "info";
          }
        })
        .catch(() => {
          this.paises = [];
          this.loading = false;
          // console.log();
        });
    },

    limpiar() {
      this.paises = [];
      this.iso3 = "";
      this.name = "";
      this.buscando = "";

      let item = {
        iso3: 0,
        name: "",
      };
      this.setPais(item);
    },

    seleccionar(item) {
      this.name = item.name;
      this.iso3 = item.iso3;

      this.buscando = item.name;
      this.paises = [];
      this.setPais(item);
      // this.$router.push({ name: "invpersonal" }).catch(() => {});
    },
  },
};
</script>