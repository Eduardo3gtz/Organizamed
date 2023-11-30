<template>
  <v-card class="mt-2 auto mb-4" color="grey">
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="enfermedades"
          dense
          :items-per-page="enfermedades.length"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <h3 class="ml-4 ">Diagnóstico somatométrico</h3>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-btn dark color="info" @click="saveinfo">Guardar</v-btn>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                persistent
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    disabled
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Descripcion de la enfermedad</span>
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
                                label="Tiene esta enfermedad"
                                color="red"
                                hide-details
                              ></v-checkbox>
                          </v-row>
                          <v-textarea
                            label="Describa"
                            auto-grow
                            rows="5"
                            rounded
                            outlined
                            v-model="editedItem.tratamiento"
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
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-switch
              @click="editItem(item)"
              dense
            >
            </v-switch>
          </template>
          <template v-slot:item.lenfe="{ item }">
            <v-simple-checkbox
              v-model="item.lenfe"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import tiempo from "@/mixins/tiempo.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [tiempo],
  data: () => ({
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      lenfe: false,
      tratamiento: 0,
    },
    defaultItem: {
      id: 0,
      name: "",
      lenfe: false,
      tratamiento: 0,
    },

    dialog: false,
    dialogDelete: false,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
      
    singleSelect: false,
    selected: [],
    headers: [
      { text: 'Id', value: 'id'},
      {
        text: 'Enfermedad',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: "Activar", value: "actions", sortable: false },
      { text: '¿Tiene esa enfermedad?', value: 'lenfe', sortable: false  },
      { text: 'Describir', value: 'tratamiento' },
      
    ],
    enfermedades: [
      {id: 1,name: 'Piel', lenfe: false, tratamiento: ""},
      {id: 2,name: 'Cabeza', lenfe: false, tratamiento: ""},
      {id: 3,name: 'Faringe', lenfe: false, tratamiento: ""},
      {id: 4,name: 'Oídos', lenfe: false, tratamiento: ""},
      {id: 5,name: 'Cuello', lenfe: false, tratamiento: ""},
      {id: 6,name: 'Tórax pulmonar', lenfe: false, tratamiento: ""},
      {id: 7,name: 'Tórax cardiovascular', lenfe: false, tratamiento: ""},
      {id: 8,name: 'Abdomen', lenfe: false, tratamiento: ""},
      {id: 9,name: 'Genitales', lenfe: false, tratamiento: ""},
      {id: 10,name: 'Extremidades', lenfe: false, tratamiento: ""},
      {id: 11,name: 'Neurológico', lenfe: false, tratamiento: ""},
    ],

    payloadData: {
      idmedicos: 0,
      idpacientes: 0,
      idcatencion: 0,
      fecha: "",
      hora: "",

      piel: "",
      cabeza: "",
      faringe: "",
      oidos: "",
      cuello: "",
      toraxpul: "",
      toraxcard: "",
      abdomen: "",
      genitales: "",
      extremidades: "",
      neurologicos: "",

      lpiel: 0,
      lcabeza: 0,
      lfaringe: 0,
      loidos: 0,
      lcuello: 0,
      ltoraxpul: 0,
      ltoraxcard: 0,
      labdomen: 0,
      lgenitales: 0,
      lextremidades: 0,
      lneurologicos: 0,
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
    this.idmedicos = this.getMedico.idmedicos;

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
            // console.log(response);
            this.idsomato = response.data.result.idsomato;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idsomato > 0) {
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
        .get("somato.get/" + this.idsomato)
        .then((response) => {
          // console.log("response somato", response);
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
      this.dataTransforma();
     
      console.log("Payload", this.payloadData);
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("somato.insert", this.payloadData)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "El expediente ha grabado el diagnostico",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.consultar()
            // this.$router.back()
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
        // console.log("payload modo 2", this.payloadData);
        // console.log(this.idsomato);
        this.$http
          .put("somato.update/" + this.idsomato, this.payloadData)
          .then((response) => {
            this.showSnack({
              text: "El expediente ha actualizado el diagnostico",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            // this.$router.back()
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
      this.editedIndex = this.enfermedades.indexOf(item);
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
        Object.assign(this.enfermedades[this.editedIndex], this.editedItem);
      } else {
        this.enfermedades.push(this.editedItem);
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
      (this.payloadData.idpacientes = parseInt(this.idpacientes)),
      (this.payloadData.idmedicos = this.idmedicos),
      (this.payloadData.idcatencion = this.idcatencion),
      (this.payloadData.fecha = this.fecha),
      (this.payloadData.hora = this.gethora()),
      console.log("enfermedades", this.enfermedades);

      this.enfermedades.forEach((element) => {
        // Convertir renglones del arreglo enfermedad a elementos del objeto payload.}
        if (element.id === 1) {
          this.payloadData.piel = element.tratamiento;
          this.payloadData.lpiel = element.lenfe ? 1 : 0;
        }
        if (element.id === 2) {
          this.payloadData.cabeza = element.tratamiento;
          this.payloadData.lcabeza = element.lenfe ? 1 : 0;
        }
        if (element.id === 3) {
          this.payloadData.faringe = element.tratamiento;
          this.payloadData.lfaringe = element.lenfe ? 1 : 0;
        }
        if (element.id === 4) {
          this.payloadData.oidos = element.tratamiento;
          this.payloadData.loidos = element.lenfe ? 1 : 0;
        }
        if (element.id === 5) {
          this.payloadData.cuello = element.tratamiento;
          this.payloadData.lcuello = element.lenfe ? 1 : 0;
        }
        if (element.id === 6) {
          this.payloadData.toraxpul = element.tratamiento;
          this.payloadData.ltoraxpul = element.lenfe ? 1 : 0;
        }

        if (element.id === 7) {
          this.payloadData.toraxcard = element.tratamiento;
          this.payloadData.ltoraxcard = element.lenfe ? 1 : 0;
        }

        if (element.id === 8) {
          this.payloadData.abdomen = element.tratamiento;
          this.payloadData.labdomen = element.lenfe ? 1 : 0;
        }

        if (element.id === 9) {
          this.payloadData.genitales = element.tratamiento;
          this.payloadData.lgenitales = element.lenfe ? 1 : 0;
        }
        if (element.id === 10) {
          this.payloadData.extremidades = element.tratamiento;
          this.payloadData.lextremidades = element.lenfe ? 1 : 0;
        }
        if (element.id === 11) {
          this.payloadData.neurologicos = element.tratamiento;
          this.payloadData.lneurologicos = element.lenfe ? 1 : 0;
        }
      });
      console.log("payload prepare ", this.payloadData);
    },

    convertirDatos(patoInfo) {
      // console.log("response somato.get", patoInfo);

      this.enfermedades[0].tratamiento = patoInfo.piel;
      this.enfermedades[0].lenfe = patoInfo.lpiel === 0 ? false : true;

      this.enfermedades[1].tratamiento = patoInfo.cabeza;
      this.enfermedades[1].lenfe = patoInfo.lcabeza === 0 ? false : true;

      this.enfermedades[2].tratamiento = patoInfo.faringe;
      this.enfermedades[2].lenfe = patoInfo.lfaringe === 0 ? false : true;

      this.enfermedades[3].tratamiento = patoInfo.oidos;
      this.enfermedades[3].lenfe = patoInfo.loidos === 0 ? false : true;

      this.enfermedades[4].tratamiento = patoInfo.cuello;
      this.enfermedades[4].lenfe = patoInfo.lcuello === 0 ? false : true;

      this.enfermedades[5].tratamiento = patoInfo.toraxpul;
      this.enfermedades[5].lenfe = patoInfo.ltoraxpul === 0 ? false : true;

      this.enfermedades[6].tratamiento = patoInfo.toraxcard;
      this.enfermedades[6].lenfe = patoInfo.ltoraxcard === 0 ? false : true;

      this.enfermedades[7].tratamiento = patoInfo.abdomen;
      this.enfermedades[7].lenfe = patoInfo.labdomen === 0 ? false : true;

      this.enfermedades[8].tratamiento = patoInfo.genitales;
      this.enfermedades[8].lenfe = patoInfo.lgenitales === 0 ? false : true;

      this.enfermedades[9].tratamiento = patoInfo.extremidades;
      this.enfermedades[9].lenfe = patoInfo.lextremidades === 0 ? false : true;

      this.enfermedades[10].tratamiento = patoInfo.neurologicos;
      this.enfermedades[10].lenfe = patoInfo.lneurologicos === 0 ? false : true;
    },


  },
}
</script>