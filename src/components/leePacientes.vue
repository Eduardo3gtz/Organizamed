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
          label="Buscar Paciente"
          prepend-inner-icon="mdi-magnify"
          clearable
          :loading="loading"
          hide-details

          @click:append="buscarPaciente"
          @keyup.enter="buscarPaciente"
          @click:clear="limpiar"
          @keyup.113="buscarPaciente"
          
        />

        <!-- <h3 class="mx-5 my-0">area: {{ nompaciente }}   </h3> -->
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" cols="12" xm="12">
        <p v-if="pacientes.length > 0" class="ma-1">
          {{ pacientes.length }} resultados
        </p>

        <v-data-table
          v-if="pacientes.length > 0"
          ref="tabla"
          class="grey lighten-2"
          :headers="headers"
          :items="pacientes"
          item-key="idpacientes"
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
              <td>{{ item.idpacientes }}</td>
              <td>{{ item.nompaciente }}</td>
              <td>{{ item.ciudad }}</td>
              <td>{{ item.fechanac }}</td>
              
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

    pacientes: [],

    nompaciente: '',
    idpacientes: '',

    //SNACKBAR
    text: '',
    snackbar: false,
    color: '',

    headers: [
      { text: "Id Paciente", align: "start", value: "idpacientes" },
      { text: "Nompaciente", align: "end", value: "nompaciente" },
      { text: "Fecha Nac", align: "end", value: "fechanac" },
      
    ],
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
  },

  watch: {
    getPaciente() {
      // this.limpiar()
      this.actualizarLeepaciente();
    },
  },

  created() {
    this.getPaciente;
    // console.log("Create", this.getPaciente)

    this.buscando = "";
    this.idpacientes = "";

    if (this.getPaciente.idpacientes == undefined) {
      this.buscando = "";
      this.idpacientes = "";
    } else {
      this.buscando = this.getPaciente.nompaciente;
      this.idpacientes = this.getPaciente.idpacientes;
    }
  },

  methods: {
    ...mapActions("pacientes", ["setPaciente"]),

    actualizarLeepaciente() {
      this.buscando = this.getPaciente.nompaciente;
      this.nompaciente = this.getPaciente.nompaciente;
      this.idpacientes = this.getPaciente.idpacientes;
    },

    buscarPaciente() {
      if (this.buscando == null) return;

      // console.log("a Buscar", this.buscando);
      var payload = {
        Buscar: this.buscando.trim(),
      };

      this.loading = true;
      
      //PREPARAR PARAMETROS PARA BUSQUEDA
      let cParametros = '?q=' + this.buscando
      let cUrl = 'pacientes.list'+ cParametros

      //LLAMADA
      this.$http
        .get(cUrl)
        .then((response) => {
          // console.log(response);
          this.loading = false;

          if (response.status === 200 && response.data.result != null) {
            this.pacientes = response.data.result;
            this.longitud = response.data.result.length;
            // console.log(" RESULTADOS",this.pacientes )
          } else {
            console.log("SIN RESULTADOS");
            this.pacientes = [];

            this.snackbar = true;
            this.text = "No se encontraron pacientes";
            this.color = "info";
          }
        })
        .catch(() => {
          this.pacientes = [];
          this.loading = false;
          // console.log();
        });
    },

    limpiar() {
      this.pacientes = [];
      this.idpacientes = "";
      this.nompaciente = "";
      this.buscando = "";
      
      let item= {
        idpacientes: 0,
        nompaciente:''
      }
      this.setPaciente(item);
    },

    seleccionar(item) {
      this.nompaciente = item.nompaciente;
      this.idpacientes = item.idpacientes;

      this.buscando = item.nompaciente;
      this.pacientes = [];
      this.setPaciente(item);
      this.$router.push({ name: 'invpersonal' }).catch(() => {});
    },
  },
};
</script>