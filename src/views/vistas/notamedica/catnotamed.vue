<template>
  <v-container class="mt-2">

    <v-toolbar color="blue darken-3" dark rounded="lg" class="mb-3"  width="500" dense>
      <h2>Nota médica</h2>
    </v-toolbar>
    <v-card>
      <v-card flat>
        <v-row>
          <v-col cols="12" md="3" sm="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"                  label="Fecha"
                  append-icon="mdi-calendar"
                  dense
                  class="mx-2"
                  rounded
                  hide-details
                  single-line
                  filled
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="3" sm="4">
            <v-text-field
              append-icon="mdi-magnify"
              label="Lugar"
              rounded
              hide-details
              filled
              dense
              class="mx-2"
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2" sm="4">
            <v-btn
              dark
              color="blue"
              to="notamedica"
            >
              Nueva nota
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-data-table
        class="mt-2"
        dense
        :headers="headers"
        :items="notamedica"
        hide-default-footer
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr v-on:click.prevent.stop="editar(item)">
            <td>{{ item.fecha }}</td>
            <td>{{ item.motivo }}</td>
            <td>{{ item.evolucion }}</td>
            <td>{{ item.diagnostico }}</td>
            <td>{{ item.tratamiento}}</td>
            <td>{{ item.nommed}}</td>
            <!-- <td>{{ item.peso }}</td>
            <td>{{ item.altura }}</td> -->
            
            <!-- <td>{{ item.parterial }}</td> -->
            <!-- <td>{{ item.temperatura }}</td> -->
            <!-- <td>{{ item.fcardiaca }}</td> -->
            <!-- <td>{{ item.idnotamedica }}</td> -->
          </tr>
        </template>
      </v-data-table>
    </v-card>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data () {
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

      search: '',
      headers: [
        {
          text: 'Fecha',
          align: 'start',
          sortable: false,
          value: 'fecha',
        },
        { text: 'Motivo de consulta', value: 'motivo' },
        { text: 'Principio de evolución', value: 'evolucion' },
        // { text: 'Examen medico', value: 'examen' },
        { text: 'Diagnóstico', value: 'diagnostico' },
        { text: 'Tratamiento', value: 'tratamiento' },
        { text: 'Médico', value: 'Medico'}
      ],
      notamedica: [],

    }
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

    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date()
    let mes = date0.getMonth()
    let anio = date0.getFullYear()
            
    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10)
    // this.idusuariosweb = parseInt(this.getdatosUsuario.idusuariosweb)
    this.consultar()
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),

    consultar() {
      this.notamedica = []

      // console.log(this.idpacientes)
      const cUrlbase = "notamedica.get.all.pac?"
      const cpaginas = "offset=0&limit=30&"
      const cidpaciente = "idpacientes=" + this.idpacientes.toString()
      const cUrlgetall = cUrlbase + cpaginas + cidpaciente
      console.log("url get all", cUrlgetall)

      this.$http
        .get(cUrlgetall)
        .then((response) => {
          console.log("response", response.data);
          if (response.data.error === null) {
            if (response.data.result != null) {
              this.notamedica = response.data.result;
              console.log("notamedica", this.notamedica);
              this.notamedica[0].parterial= parseFloat(this.notamedica[0].parterial).toFixed(2)
    
            }
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

    editar(item){
      console.log("Renglonitem", item)
      this.$router.push({ name:'notamedica',
        params:  item
      }).catch(() => {})

      
    },

  }
}

</script>
