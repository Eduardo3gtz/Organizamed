<template>
  <v-container fluid class="mt-2">
    <v-card>
      <v-toolbar dark dense color="black ">
        <v-col cols="1">
          <v-avatar
            tile
            dense
            size="55"
            color="#CD5C5C"
            class="avatar rounded-lg"
          >
            <v-icon color="white" x-large> mdi-human-male-female </v-icon>
          </v-avatar>
        </v-col>
        <h3 class="ml-3">Catálogo Pacientes</h3>
        <v-spacer />
        <v-col cols="3">
          <v-text-field
            v-model="search"
            class="mx-2"
            solo-inverted
            dense
            color="blue"
            append-icon="mdi-magnify"
            label="Filtrar"
            single-line
            hide-details
          />
        </v-col>
        <v-btn
          small
          class="ma-4"
          color="light-blue lighten-1"
          @click="consultar"
        >
          Consultar <v-icon>mdi-update</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  align="right"
                  color="orange"
                  dark
                  small
                  class="ma-2"
                  click
                  v-bind="attrs"
                  v-on="on"
                  @click="limpiarPaciente"
                  >Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h6 grey lighten-2">
                  Carta de Consentimiento Informado Expediente Digital de Salud
                  Migrante
                </v-card-title>
                <br />
                <v-card-text>
                  <v-row justify="center" align="center">
                    <v-img
                      contain
                      src="@/assets/logotrayectoria.png"
                      height="100"
                      alt=""
                    ></v-img>
                    <v-img
                      contain
                      src="@/assets/2logos.png"
                      height="110"
                      alt=""
                    ></v-img>
                  </v-row>
                  <br />
                  <b>Propósito.</b> Hacerle de su conocimiento los alcances de
                  su consentimiento con relación al uso del Expediente Digital
                  de Salud Migrante (en adelante EDSM) y los datos que Usted
                  proporciona en el mismo en la sección estadística.
                  <br /><br />
                  <b>Procedimiento.</b> Si es su decisión incorporarse al EDSM,
                  los datos, a excepción de los sensibles y confidenciales,
                  serán utilizados con fines estadísticos y de investigación
                  académica. Las personas que le apoyen en la actividad de
                  captura estarán plenamente identificadas con un gafete.
                  <br /><br />
                  <b>Riesgos.</b> No se prevé ningún riesgo para Usted, en el
                  caso de que decida participar en la sección estadística y de
                  investigación del EDSM. <br /><br />
                  <b>Costos e incentivos.</b> La participación en el EDSM no
                  tiene costo alguno, por otro lado, tampoco se prevé alguna
                  contraprestación por su participación. Su participación
                  colabora en la construcción de conocimientos y en la promoción
                  de una sociedad más igualitaria. <br /><br />
                  <b>Confidencialidad.</b> Los datos que proporcione son
                  confidenciales y serán utilizados con fines de investigación.
                  Los análisis resultantes de las investigaciones son globales,
                  por lo que no existirá prejuicio individual. La información se
                  protegerá de conformidad con la Ley General de Protección de
                  Datos Personales en Posesión de Sujetos Obligados. En el EDSM
                  usted podrá consultar el texto de este consentimiento
                  informado. <br /><br />
                  <b>Participación.</b> Su participación es voluntaria, de
                  considerarlo pertinente puede no adherirse al EDSM, o bien,
                  decidir no contestar alguna pregunta que contenga alguno de
                  sus formularios. Asimismo, solicitar retirar la información si
                  lo considera pertinente. Por otro lado, tiene la posibilidad
                  de ampliar información, o establecer alguna inconformidad al
                  correo miguel.alonso.delossantos@gmail.com
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    :to="{ name: 'invpersonal' }"
                    @click="dialog = false"
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-toolbar>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-card elevation="10">
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="catpacientes"
            class="elevation-1"
            fixed-header
            height="450"
            loading-text="Cargando..."
            dense
            :search="search"
            :items-per-page="nreglones"

          >
            <template v-slot:item="{ item }">
              <tr v-on:dblclick="editar(item)">
                <td>{{ item.idpacientes }}</td>
                <td>{{ item.nompaciente }}</td>

                <td>{{ item.edad }}</td>
                <td>{{ item.iso3 }}</td>
                <td>{{ item.telefono }}</td>
                <td>{{ item.idcatencion }}</td>
                
                <!-- <td v-if="item.Url">
                  <v-img
                    :src="item.Url"
                    max-height="100"
                    max-width="170"
                    contain
                    aspect-ratio="1.7"
                  ></v-img>
                </td>

                <td v-else>
                  <v-img
                    :src="item.urlfoto"
                    max-height="100"
                    max-width="170"
                    contain
                    aspect-ratio="1.7"
                  ></v-img>
                </td> -->
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      nreglones: 12,
      drawer: false,
      loading: false,
      search: "",
      catpacientes: [],


      // FILTROS
      idusariosweb: 0,
      idcontacto: 0,
      idproyecto: 0,
      fecha1: new Date(Date.now() - 30 - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      fecha2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      headers: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "idpacientes",
        },
        { text: "Nombre", value: "nompaciente" },
        { text: "Edad", value: "edad" },
        { text: "Pais", value: "iso3" },
        { text: "Teléfono", value: "telefono" },
        { text: "C. Atención", value: "idcatencion" },
      ],
    };
  },

  created() {
    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();

    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
    // this.idusuariosweb = parseInt(this.getdatosUsuario.idusuariosweb)
    this.consultar();
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("pacientes", ["setPaciente"]),
    ...mapActions("paises", ["setPais"]),

    consultar() {
      // limpiar
      this.catpacientes = [];
      this.loading = true;
      this.$http
        .get("pacientes.list")
        .then((response) => {
          if (response.data.error === null) {
            this.loading = false;
            this.catpacientes = response.data.result;
            // console.log(response);
            // console.log("catpacientes", this.catpacientes);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));

      // get.catencion/3
    },

    editar(item) {
      // Limpi
      this.setPaciente(item);

      let itempais = {
        iso3: "",
        name: "",
      };
      this.setPais(itempais);

      // console.log("Renglonitem", item);
      this.$router
        .push({ name: "invpersonal", params: { paciente: item } })
        .catch(() => {});
    },

    limpiarPaciente() {
      // Limpiar paciente, para sea nuevo.
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
    },

  },
};
</script>

<style scoped>
.avatar {
  top: -10px;
}
.imagen {
  height: 200px;
  width: 200px;
}
</style>