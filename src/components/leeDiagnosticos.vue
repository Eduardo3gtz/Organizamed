<template>
  <v-container class="ma-0 pa-0 mt-4">
    <v-row class="ma-0 pa-0">

      <v-col class="ma-0 pa-0" cols="12" xm="12">
       
        <v-text-field
          v-model="buscando"
          class="mb-2 pa-0"
          outlined
          rounded
          :hint="`Clave: ${catalog_key}`"
          persistent-hint
          dense
          append-icon="mdi-check-circle"
          label="Buscar diagnostico"
          prepend-inner-icon="mdi-magnify"
          clearable
          :loading="loading"
          @click:append="buscarDiagnostico"
          @keyup.enter="buscarDiagnostico"
          @click:clear="limpiar"
          @keyup.113="buscarDiagnostico"
        />
        <!-- <h3 class="mx-5 my-0">area: {{ nombre }}   </h3> -->
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" cols="12" xm="12">
        <p v-if="diagnosticos.length > 0" class="ma-1">
          {{ diagnosticos.length }} resultados
        </p>

        <v-data-table
          v-if="diagnosticos.length > 0"
          ref="tabla"
          class="grey lighten-2"
          height="300px"
          :headers="headers"
          :items="diagnosticos"
          item-key="iddiagnostico"
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
              <td>{{ item.iddiagnostico }}</td>
              <td>{{ item.nombre }}</td>
              <!-- <td>{{ item.ciudad }}</td> -->
              <td>{{ item.catalog_key }}</td>
              
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
    buscando: '',
    longitud: 30,
    loading: false,

    diagnosticos: [],

    nombre: '',
    iddiagnostico: '',
    catalog_key:'',

    //SNACKBAR
    text: '',
    snackbar: false,
    color: '',

    headers: [
      { text: "Id Paciente", align: "start", value: "iddiagnostico" },
      { text: "Nombre", align: "end", value: "nombre" },
      { text: "Catalog_key", align: "end", value: "catalog_key" },
      
    ],
  }),

  computed: {
    ...mapGetters("diagnosticos", ["getDiagnostico"]),
  },

  watch: {
    getDiagnostico() {
      // this.limpiar()
      this.actualizarLeepaciente();
    },
  },

  created() {
    this.getDiagnostico;
    // console.log("Create", this.getDiagnostico)

    this.buscando = "";
    this.iddiagnostico = "";

    if (this.getDiagnostico.iddiagnostico == undefined) {
      this.buscando = "";
      this.iddiagnostico = "";
    } else {
      this.buscando = this.getDiagnostico.nombre;
      this.iddiagnostico = this.getDiagnostico.iddiagnostico;
    }
  },

  methods: {
    ...mapActions("diagnosticos", ["setDiagnostico"]),

    actualizarLeepaciente() {
      this.buscando = this.getDiagnostico.nombre;
      this.nombre = this.getDiagnostico.nombre;
      this.iddiagnostico = this.getDiagnostico.iddiagnostico;
    },

    buscarDiagnostico() {
      if (this.buscando == null) return;

      // console.log("a Buscar", this.buscando);
      var payload = {
        Buscar: this.buscando.trim(),
      };

      this.loading = true;
      
      //PREPARAR PARAMETROS PARA BUSQUEDA
      let cParametros = '?q=' + this.buscando
      let cUrl = 'diagnosticos.list'+ cParametros

      //LLAMADA
      this.$http
        .get(cUrl)
        .then((response) => {
          // console.log(response);
          this.loading = false;

          if (response.status === 200 && response.data.result != null) {
            this.diagnosticos = response.data.result;
            this.longitud = response.data.result.length;
            // console.log(" RESULTADOS",this.diagnosticos )
          } else {
            console.log("SIN RESULTADOS");
            this.diagnosticos = [];

            this.snackbar = true;
            this.text = "No se encontraron diagnosticos";
            this.color = "info";
          }
        })
        .catch(() => {
          this.diagnosticos = [];
          this.loading = false;
          // console.log();
        });
    },

    limpiar() {
      this.diagnosticos = [];
      this.iddiagnostico = "";
      this.nombre = "";
      this.buscando = "";
      
      let item= {
        iddiagnostico: 0,
        nombre:''
      }
      this.setDiagnostico(item);
    },

    seleccionar(item) {
      this.nombre = item.nombre;
      this.iddiagnostico = item.iddiagnostico;
      this.catalog_key = item.catalog_key;

      this.buscando = item.nombre;
      this.diagnosticos = [];
      this.setDiagnostico(item);
      // this.$router.push({ name: 'invpersonal' }).catch(() => {});
    },
  },
};
</script>