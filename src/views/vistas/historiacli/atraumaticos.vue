<template>
<v-container>
<v-card class="mt-2 mb-6" rounded="xl"  flat>
  <v-row>
    <v-col class="ma-1">
      <v-data-table
        :headers="headers"
        :items="lesiones"
        sort-by="calories"
        dense
        hide-default-footer
        :loading="loading"
      >
        <template v-slot:top>
          <v-card
            flat
            class="mb-1"
            rounded="xl"
          >
            <v-row>
              <v-col cols="12" md="4" lg="4" sm="5">
                <h3 class="ml-13 ">Antecedentes traumáticos</h3>
              </v-col>

              <v-col cols="12" md="2" sm="4" lg="3">
                <v-text-field
                  readonly
                  label="Medico:"
                  prepend-inner-icon="mdi-doctor"
                  hide-details
                  v-model="nomcatencion"
                  outlined
                  filled
                  class="mx-3"
                  dense
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <!-- < cols="6" md="6"> -->
                <v-row justify="center" class="mt-1 mb-3">
                  <v-btn color="orange" class="mr-4" :to="{name:'historiacli'}" dark>
                    <v-icon class="mx-2">mdi-reply</v-icon>
                  </v-btn>
                  <v-btn dark color="info" @click="saveinfo">guardar</v-btn>
                </v-row>
              <!-- </> -->
            </v-row>
          </v-card>

          <v-dialog
            v-model="dialog"
            max-width="500px"
            persistent
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Tratamiento del paciente</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col>
                        <p class="text-h5 primary--text">{{ editedItem.name }}</p>
                        </v-col>
                        <v-checkbox
                          v-model="editedItem.lenfe"
                          label="Tiene actualmente esta lesion"
                          color="red"
                          hide-details
                        ></v-checkbox>
                      </v-row>

                      <v-text-field
                        v-if="editedItem.id === 6"
                        label="¿Qué otra lesión tuvo?"
                        dense
                        v-model="editedItem.otrotra"
                      >
                      </v-text-field>

                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.fecha"
                            label="Fecha del antecedente"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                      
                        <v-date-picker
                          v-model="editedItem.fecha"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                          >
                            Cancelar
                          </v-btn>

                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>

                      <v-text-field
                        label="Lugar del cuerpo"
                        outlined
                        v-model="editedItem.lugar"
                      >
                      </v-text-field>
                      <v-textarea
                        label="Escriba el tratamiento"
                        auto-grow
                        rows="5"
                        v-model="editedItem.tratamiento"
                        rounded
                        outlined
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-switch
            @click="editItem(item)"
            dense
          >
          </v-switch>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
        <template v-slot:item.lenfe="{ item }">
          <v-simple-checkbox
            v-model="item.lenfe"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="mt-2 mb-3">
    <v-btn dark class="mt-1 mb-2" color="info" @click="saveinfo">Guardar</v-btn>
  </v-row>
  <!-- {{lesiones}} -->
</v-card>
</v-container>
</template>

<script>
import tiempo from '@/mixins/tiempo.js'
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [tiempo],
  data: () => ({
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      lenfe: false,
      tratamiento: 0,
      lugar: 0,
      fecha: ''
    },
    defaultItem: {
      id: 0,
      name: "",
      lenfe: false,
      tratamiento: '',
      lugar: '',
      fecha:''
    },

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

    dialog: false,
    dialogDelete: false,

    headers: [
      {
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: "Activar", value: "actions", sortable: false },
      { text: '¿Tiene actualmente la lesion?', value: 'lenfe', sortable: false  },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Lugar', value: 'lugar' },
      { text: 'Tratamiento', value: 'tratamiento' },
    ],
    lesiones: [
      { id: 1,name: 'Luxación', lenfe: false, tratamiento: "", lugar:"" , fecha: '',otrotra:''},
      { id: 2,name: 'Fractura', lenfe: false, tratamiento: "", lugar:"" , fecha: '',otrotra:''},
      { id: 3,name: 'Amputación', lenfe: false, tratamiento: "", lugar:"" , fecha: '',otrotra:''},
      { id: 4,name: 'Lesión por arma blanca', lenfe: false, tratamiento: "", lugar:"" , fecha: '' },
      { id: 5,name: 'Lesión por arma de fuego', lenfe: false, tratamiento: "", lugar:"" , fecha: '',otrotra:''},
      { id: 6,name: '¿Otro?', lenfe: false, tratamiento: "", lugar:"" , fecha: '', otrotra:''},
    ],

    payloadData: {
      idmedicos: 0,
      idpacientes: 0,
      idcatencion: 0,
      fecha: "",
      hora: "",

      luxacion: "",
      fractura: "",
      amputacion: "",
      blanca: "",
      fuego: "",
      otro: "",

      fluxacion: null,
      ffractura: null,
      famputacion: null,
      fblanca: null,
      ffuego: null,
      fotro: null,

      lluxacion: 0,
      lfractura: 0,
      lamputacion: 0,
      lblanca: 0,
      lfuego: 0,
      lotro: 0,

      luluxacion: "",
      lufractura: "",
      luamputacion: "",
      lublanca: "",
      lufuego: "",
      luotro: "",

      otrotra: "",
     
    },
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.getPaciente;
    this.idpacientes = this.getPaciente.idpacientes;

    this.getCatencion;
    this.idcatencion = this.getCatencion.idcatencion;

    this.getMedico;
    this.idmedicos = this.getMedico.idmedicos

    this.getExpediente;

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
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
          if (response.status == 200) {
            console.log(response);
            this.idtraumaticos = response.data.result.idtraumaticos;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idtraumaticos > 0) {
              this.nModo = 2;
              this.readonly = true;
              this.cargarInfo();
              this.modo = "Editar";
            } else {
              console.log("nuevo");
              //VALORES INICIALES ALTA
              this.nModo = 1;
              this.modo = "Nuevo";
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

    cargarInfo() {
      this.loading = true;
      //  madnar cargar la información del paciente por idansiedad
      // ansiedad.update/:idansiedad
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idansiedad)
      this.$http
        .get("traumaticos.get/" + this.idtraumaticos)
        .then((response) => {
          console.log("response traumaticos", response);
          // TODO. Proceso para parsear info a forma
          //DEFINIR Si actualizo la fecha. Pienso que si.
          if (response.status != 200) {
            this.showSnack({
              text: "El expediente encontró un error al cargar información",
              color: "red",
              timeout: 2000,
            });
          } else {
            //Convertir el response.result al Data de la vista.
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

    saveinfo() {
      this.dataTransforma()

      console.log("Payload", this.payloadData);
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("traumaticos.insert", this.payloadData)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "El expediente ha grabado los antecedentes traumáticos",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.consultar()
            this.$router.back()
          })
          .catch((error) => {
            this.showSnack({
              text: "El expediente ha encontrado un error al realizar operación",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      } else {
        // depresionprg.update/:iddepresionprg
        console.log("payload modo 2", this.payloadData);
        console.log(this.idtraumaticos);
        this.$http
          .put("traumaticos.update/" + this.idtraumaticos, this.payloadData)
          .then((response) => {
            this.showSnack({
              text: "El expediente ha actualizado los antecedentes traumáticos",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router.back()
          })
          .catch((error) => {
            this.showSnack({
              text: "El expediente ha encontrado un error al realizar operación",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      }
    },

    editItem(item) {
      console.log("item editItem", item)
      this.editedIndex = this.lesiones.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.lesiones[this.editedIndex], this.editedItem);
      } else {
        this.lesiones.push(this.editedItem);
      }
      this.close();
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },

    dataTransforma() {
      this.payloadData.idpacientes = parseInt(this.idpacientes),
      this.payloadData.idmedicos = this.idmedicos,
      this.payloadData.idcatencion = this.idcatencion,
      this.payloadData.fecha= this.fecha,
      this.payloadData.hora= this.gethora(),
      
      console.log("lesiones", this.lesiones);
      this.lesiones.forEach((element) => {
        // Convertir renglones del arreglo enfermedad a elementos del objeto payload.}
        if (element.id === 1) {
          this.payloadData.luxacion = element.tratamiento;
          this.payloadData.lluxacion = (element.lenfe? 1:0);
          this.payloadData.luluxacion = element.lugar;
          this.payloadData.fluxacion = element.fecha;
        }
        if (element.id === 2) {
          this.payloadData.fractura = element.tratamiento;
          this.payloadData.lfractura = (element.lenfe? 1:0);
          this.payloadData.lufractura = element.lugar;
          this.payloadData.ffractura = element.fecha
        }
        if (element.id === 3) {
          this.payloadData.amputacion = element.tratamiento;
          this.payloadData.lamputacion = (element.lenfe? 1:0);
          this.payloadData.luamputacion = element.lugar;
          this.payloadData.famputacion = element.fecha;

        }
        if (element.id === 4) {
          this.payloadData.blanca = element.tratamiento;
          this.payloadData.lblanca = (element.lenfe? 1:0);
          this.payloadData.lublanca = element.lugar;
          this.payloadData.fblanca = element.fecha;
        }
        if (element.id === 5) {
          this.payloadData.fuego = element.tratamiento;
          this.payloadData.lfuego = (element.lenfe? 1:0);
          this.payloadData.lufuego = element.lugar;
          this.payloadData.ffuego = element.fecha;
        }
        if (element.id === 6) {
          this.payloadData.otro = element.tratamiento;
          this.payloadData.lotro = (element.lenfe? 1:0);
          this.payloadData.luotro = element.lugar;
          this.payloadData.fotro = element.fecha;
          this.payloadData.otrotra = element.otrotra;
        }
      });
      console.log("payload prepare ", this.payloadData);
    },
    
    convertirDatos(patoInfo) {
      console.log("response traumaticos.get", patoInfo);

      this.lesiones[0].tratamiento = patoInfo.luxacion
      this.lesiones[0].lenfe = patoInfo.lluxacion === 0 ? false : true
      this.lesiones[0].fecha = patoInfo.fluxacion
      this.lesiones[0].lugar = patoInfo.luluxacion

      this.lesiones[1].tratamiento = patoInfo.fractura
      this.lesiones[1].lenfe = patoInfo.lfractura === 0 ? false : true
      this.lesiones[1].fecha = patoInfo.ffractura
      this.lesiones[1].lugar = patoInfo.lufractura

      this.lesiones[2].tratamiento = patoInfo.amputacion
      this.lesiones[2].lenfe = patoInfo.lamputacion === 0 ? false : true
      this.lesiones[2].fecha = patoInfo.famputacion
      this.lesiones[2].lugar = patoInfo.luamputacion

      this.lesiones[3].tratamiento = patoInfo.blanca
      this.lesiones[3].lenfe = patoInfo.lblanca === 0 ? false : true
      this.lesiones[3].fecha = patoInfo.fblanca
      this.lesiones[3].lugar = patoInfo.lublanca

      this.lesiones[4].tratamiento = patoInfo.fuego
      this.lesiones[4].lenfe = patoInfo.lfuego === 0 ? false : true
      this.lesiones[4].fecha = patoInfo.ffuego
      this.lesiones[4].lugar = patoInfo.lufuego

      this.lesiones[5].tratamiento = patoInfo.otro
      this.lesiones[5].lenfe = patoInfo.lotro === 0 ? false : true
      this.lesiones[5].fecha = patoInfo.fotro
      this.lesiones[5].lugar = patoInfo.luotro
      this.lesiones[5].otrotra = patoInfo.otrotra

    },

  },
}
</script>