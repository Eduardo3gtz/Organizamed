<template>
<v-container>
<v-card rounded="xl" class="mt-2 mb-6"  flat>
  <v-row class="ma-1">
    <v-col>
    <v-data-table
      :headers="headers"
      :items="cirugias"
      sort-by="calories"
      dense
      hide-default-footer
    >
      <template v-slot:top>
        <v-card
          flat
          class="mt-3"
          rounded="xl"
        >
          <v-row>
            <v-col cols="12" md="4" lg="4" sm="5">
              <h3 class="ml-13">Antecedentes quirúrgicos</h3>
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
            <v-row justify="center" class="mt-1 mb-3">
              <v-btn color="orange" class="mr-4" :to="{name:'historiacli'}" dark>
                <v-icon class="mx-2">mdi-reply</v-icon>
              </v-btn>
              <v-btn dark color="info" @click="saveinfo">Guardar</v-btn>
            </v-row>
          </v-row>
        </v-card>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                disabled
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">tratamientoes del paciente</span>
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
                        label="¿Tuvo esta cirugía recientemente?"
                        color="red"
                        hide-details
                      ></v-checkbox>
                      </v-row>
                      <v-text-field
                        v-if="editedItem.id === 8"
                        label="¿Qué otra cirugía tuvo?"
                        dense
                        v-model="editedItem.otrocir"
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
                            Cancel
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
                      <v-textarea
                        label="Escriba las complicaciones"
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
    <v-btn dark class="mt-1 mb-4" color="info" @click="saveinfo">Guardar</v-btn>
  </v-row>
</v-card>
</v-container>
</template>

<script>
import tiempo from '@/mixins/tiempo.js'
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [tiempo],
  data: () => ({
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      lenfe: false,
      tratamiento: "",
      fecha: ''
    },
    defaultItem: {
      id: 0,
      name: "",
      lenfe: false,
      tratamiento: "",
      fecha: ''
    },

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Enfermedad',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: "Activar", value: "actions", sortable: false },
      { text: '¿Tuvo esta cirugía recientemente?', value: 'lenfe', sortable: false  },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Complicacion', value: 'tratamiento' },

    ],
    cirugias: [
      { id: 1,name: 'Apendicitis',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 2,name: 'Cirugía vesícula',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 3,name: 'Intestino',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 4,name: 'Cirugía cardiaca',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 5,name: 'Columna',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 6,name: 'Vasectomía',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 7,name: 'Ligamento de trompas',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
      { id: 8,name: '¿Otra?',lenfe: false, tratamiento: "", fecha: '', otrocir:'' },
    ],

    payloadData: {
      idmedicos: 0,
      idpacientes: 0,
      idcatencion: 0,
      fecha: "",
      hora: "",

      apendicitis: "",
      visicula: "",
      intestino: "",
      cardiaca: "",
      columna: "",
      vasectomia: "",
      ligamento: "",
      otra: "",

      fapendicitis: null,
      fvisicula: null,
      fintestino: null,
      fcardiaca: null,
      fcolumna: null,
      fvasectomia: null,
      fligamento: null,
      fotra: null,
      

      lapendicitis: 0,
      lvisicula: 0,
      lintestino: 0,
      lcardiaca: 0,
      lcolumna: 0,
      lvasectomia: 0,
      lligamento: 0,
      lcolumna: 0,
      lotra: 0,

      otrocir:'',
    },
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Medicos", ["getMedico"]),
    
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
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
            this.idquirurgicos = response.data.result.idquirurgicos;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idquirurgicos > 0) {
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
        .get("quirurgicos.get/" + this.idquirurgicos)
        .then((response) => {
          console.log("response quirurgicos", response);
          // TODO. Proceso para parsear info a forma
          //DEFINIR Si actualizo la fecha. Pienso que si.
          if (response.status != 200) {
            this.showSnack({
              text: "Error al cargar Información",
              color: "red",
              timeout: 2000,
            });
          }
          this.convertirDatos(response.data.result)
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
          .post("quirurgicos.insert", this.payloadData)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "El expediente ha grabado los antecedentes quirurgicos",
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
        console.log(this.idquirurgicos);
        this.$http
          .put("quirurgicos.update/" + this.idquirurgicos, this.payloadData)
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
      // console.log("item editItem", item)
      this.editedIndex = this.cirugias.indexOf(item);
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
        Object.assign(this.cirugias[this.editedIndex], this.editedItem);
      } else {
        this.cirugias.push(this.editedItem);
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
      
      console.log("cirugias", this.cirugias);
      this.cirugias.forEach((element) => {
        // Convertir renglones del arreglo enfermedad a elementos del objeto payload.}
        if (element.id === 1) {
          this.payloadData.apendicitis = element.tratamiento;
          this.payloadData.lapendicitis = (element.lenfe? 1:0);
          this.payloadData.fapendicitis = element.fecha;
        }
        if (element.id === 2) {
          this.payloadData.visicula = element.tratamiento;
          this.payloadData.lvisicula = (element.lenfe? 1:0);
          this.payloadData.fvisicula = element.fecha;
        }
        if (element.id === 3) {
          this.payloadData.intestino = element.tratamiento;
          this.payloadData.lintestino = (element.lenfe? 1:0);
          this.payloadData.fintestino = element.fecha;
        }
        if (element.id === 4) {
          this.payloadData.cardiaca = element.tratamiento;
          this.payloadData.lcardiaca = (element.lenfe? 1:0);
          this.payloadData.fcardiaca = element.fecha;
        }
        if (element.id === 5) {
          this.payloadData.columna = element.tratamiento;
          this.payloadData.lcolumna = (element.lenfe? 1:0);
          this.payloadData.fcolumna = element.fecha;
        }
        if (element.id === 6) {
          this.payloadData.vasectomia = element.tratamiento;
          this.payloadData.lvasectomia = (element.lenfe? 1:0);
          this.payloadData.fvasectomia = element.fecha;
        }
        if (element.id === 7) {
          this.payloadData.ligamento = element.tratamiento;
          this.payloadData.lligamento = (element.lenfe? 1:0);
          this.payloadData.fligamento = element.fecha;
        }
        if (element.id === 8) {
          this.payloadData.otra= element.tratamiento;
          this.payloadData.lotra= (element.lenfe? 1:0);
          this.payloadData.fotra = element.fecha;
          this.payloadData.otrocir = element.otrocir;
        }
      });

      console.log("payload prepare ", this.payloadData);
    },

    convertirDatos(quirurgicoInfo) {
      console.log("response quirurgicos.get", quirurgicoInfo);

      this.cirugias[0].tratamiento = quirurgicoInfo.apendicitis
      this.cirugias[0].lenfe = quirurgicoInfo.lapendicitis === 0 ? false : true
      this.cirugias[0].fecha = quirurgicoInfo.fapendicitis
      // this.cirugias[0].lugar = quirurgicoInfo.luluxacion

      this.cirugias[1].tratamiento = quirurgicoInfo.visicula
      this.cirugias[1].lenfe = quirurgicoInfo.lvisicula === 0 ? false : true
      this.cirugias[1].fecha = quirurgicoInfo.fvisicula
      // this.cirugias[1].lugar = quirurgicoInfo.lufractura

      this.cirugias[2].tratamiento = quirurgicoInfo.intestino
      this.cirugias[2].lenfe = quirurgicoInfo.lintestino === 0 ? false : true
      this.cirugias[2].fecha = quirurgicoInfo.fintestino
      // this.cirugias[2].lugar = quirurgicoInfo.luamputacion

      this.cirugias[3].tratamiento = quirurgicoInfo.cardiaca
      this.cirugias[3].lenfe = quirurgicoInfo.lcardiaca === 0 ? false : true
      this.cirugias[3].fecha = quirurgicoInfo.fcardiaca
      // this.cirugias[3].lugar = quirurgicoInfo.lublanca

      this.cirugias[4].tratamiento = quirurgicoInfo.columna
      this.cirugias[4].lenfe = quirurgicoInfo.lcolumna === 0 ? false : true
      this.cirugias[4].fecha = quirurgicoInfo.fcolumna
      // this.cirugias[4].lugar = quirurgicoInfo.lufuego

      this.cirugias[5].tratamiento = quirurgicoInfo.vasectomia
      this.cirugias[5].lenfe = quirurgicoInfo.lvasectomia === 0 ? false : true
      this.cirugias[5].fecha = quirurgicoInfo.fvasectomia
      // this.cirugias[4].lugar = quirurgicoInfo.lufuego

      this.cirugias[6].tratamiento = quirurgicoInfo.ligamento
      this.cirugias[6].lenfe = quirurgicoInfo.lligamento === 0 ? false : true
      this.cirugias[6].fecha = quirurgicoInfo.fligamento
      // this.cirugias[4].lugar = quirurgicoInfo.lufuego

      this.cirugias[7].tratamiento = quirurgicoInfo.otra
      this.cirugias[7].lenfe = quirurgicoInfo.lotra === 0 ? false : true
      this.cirugias[7].fecha = quirurgicoInfo.fotra
      this.cirugias[7].otrocir = quirurgicoInfo.otrocir
      // this.cirugias[5].lugar = quirurgicoInfo.luotro

    },
  },
}
</script>