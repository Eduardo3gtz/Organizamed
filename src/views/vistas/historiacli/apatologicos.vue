<template>
  <v-container>
    <v-card class="mt-2 mb-6" rounded="xl" flat>
      <v-row class="ma-1">
        <v-col>
          <v-data-table
            :headers="headers"
            :items="enfermedades"
            dense
            :items-per-page="enfermedades.length"
            hide-default-footer
            :loading="loading"
          >
            <template v-slot:top>
              <v-card flat rounded="lg" class="mb-1">
                <v-row>
                <v-col cols="12" md="3" sm="3" class="mb-2">
                  <h3 class="ml-4 mt-4 primary--text">Antecedentes patológicos</h3>
                </v-col>
                <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                <!-- <v-spacer></v-spacer> -->

                <v-col cols="12" md="3" sm="5" class="mt-1">
                  <v-select
                    label="¿El paciente tiene alguna discapacidad?"
                    rounded
                    filled
                    hide-details
                    dense
                    :items="discapacidades"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="2" sm="4" lg="3">
                  <v-text-field
                    readonly
                    class="mt-2"
                    label="Doctor:"
                    prepend-inner-icon="mdi-doctor"
                    hide-details
                    v-model="nomcatencion"
                    outlined
                    filled
                    dense
                  >
                  </v-text-field>
                </v-col>

                <v-row justify="center" class="mt-1 mb-3">
                  <v-col>
                    <v-btn
                      color="orange"
                      class="mt-1 ml-7"
                      :to="{ name: 'historiacli' }"
                      dark
                    >
                      <v-icon class="mx-2">mdi-reply</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn dark class="mt-1" color="info" @click="saveinfo">Guardar</v-btn>
                  </v-col>
                </v-row>
                </v-row>
              </v-card>

              <!-- DIALOG VENTANA MODAL -->
              <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Tratamiento del paciente</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-col>
                            <p class="text-h5 primary--text">
                              {{ editedItem.name }}
                            </p>
                          </v-col>
                          <v-checkbox
                            v-model="editedItem.lenfe"
                            label="¿Tiene ésta enfermedad actualmente?"
                            color="blue"
                            hide-details
                          ></v-checkbox>
                        </v-row>
                        <v-textarea
                          label="Escriba el tratamiento"
                          auto-grow
                          rows="6"
                          rounded
                          outlined
                          v-model="editedItem.tratamiento"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-switch @click="editItem(item)" dense> </v-switch>
            </template>
            <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template> -->

            <template v-slot:item.lenfe="{ item }">
              <v-simple-checkbox
                v-model="item.lenfe"
                disabled
                color="red"
              ></v-simple-checkbox>
            </template>
          </v-data-table>
          <v-row justify="center" align="center" class="mt-2 mb-2">
              <v-btn dark class="mt-1" color="info" @click="saveinfo">Guardar</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    discapacidades: ["Ninguna", "Visual", "Auditiva", "Psicomotora", "Fisica"],
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "Id", value: "id" },
      {
        text: "Enfermedad",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Activar", value: "actions", sortable: false },
      { text: "¿Tiene ésta enfermedad actualmente?", value: "lenfe", sortable: false },
      { text: "Tratamiento", value: "tratamiento" },
    ],

    enfermedades: [
      { id: 1, name: "Diabetes", lenfe: false, tratamiento: "" },
      { id: 2, name: "Infarto", lenfe: false, tratamiento: "" },
      { id: 3, name: "Anemia", lenfe: false, tratamiento: "" },
      { id: 4, name: "Fiebre reumática", lenfe: false, tratamiento: "" },
      { id: 5, name: "Hepatitis", lenfe: false, tratamiento: "" },
      { id: 6, name: "VIH/SIDA", lenfe: false, tratamiento: "" },
      { id: 7, name: "Tuberculosis", lenfe: false, tratamiento: "" },
      { id: 8, name: "Sarampión", lenfe: false, tratamiento: "" },
      { id: 9, name: "Neumonía", lenfe: false, tratamiento: "" },
      { id: 10, name: "Convulsiones", lenfe: false, tratamiento: "" },
      { id: 11, name: "Epilepsia", lenfe: false, tratamiento: "" },
      { id: 12, name: "Hipertensión", lenfe: false, tratamiento: "" },
      { id: 13, name: "Hipotensión", lenfe: false, tratamiento: "" },
      { id: 14, name: "Alergias", lenfe: false, tratamiento: "" },
      { id: 15, name: "Meningitis", lenfe: false, tratamiento: "" },
      { id: 16, name: "Polio", lenfe: false, tratamiento: "" },
      { id: 17, name: "Paperas", lenfe: false, tratamiento: "" },
      { id: 18, name: "Rubeola", lenfe: false, tratamiento: "" },
      { id: 19, name: "Cáncer", lenfe: false, tratamiento: "" },
      { id: 20, name: "Covid", lenfe: false, tratamiento: "" },
    ],

    payloadData: {
      idmedicos: 0,
      idpacientes: 0,
      idcatencion: 0,
      fecha: "",
      hora: "",

      diabetes: "",
      infarto: "",
      anemia: "",
      fiebre: "",
      hepatitis: "",
      vih: "",
      tuber: "",
      sarampion: "",
      neumonia: "",
      convul: "",
      epilepsia: "",
      hiperten: "",
      hipoten: "",
      alergias: "",
      meningitis: "",
      polio: "",
      paperas: "",
      rubeola: "",
      cancer: "",
      covid: "",

      ldiabetes: 0,
      linfarto: 0,
      lanemia: 0,
      lfiebre: 0,
      lhepatitis: 0,
      lvih: 0,
      ltuber: 0,
      lsarampion: 0,
      lneumonia: 0,
      lconvul: 0,
      lepilepsia: 0,
      lhiperten: 0,
      lhipoten: 0,
      lalergias: 0,
      lmeningitis: 0,
      lpolio: 0,
      lpaperas: 0,
      lrubeola: 0,
      lcancer: 0,
      lcovid: 0,
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
    console.log("PATO CA", this.getCatencion)

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
            this.idpatologicos = response.data.result.idpatologicos;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idpatologicos > 0) {
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
        .get("patologicos.get/" + this.idpatologicos)
        .then((response) => {
          // console.log("response patologicos", response);
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
          .post("patologicos.insert", this.payloadData)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "El expediente ha grabado los antecedentes patológicos",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.consultar();
            this.$router.back();
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
        console.log(this.idpatologicos);
        this.$http
          .put("patologicos.update/" + this.idpatologicos, this.payloadData)
          .then((response) => {
            this.showSnack({
              text: "El expediente ha actualizado los antecedentes patológicos",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router.back();
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
          this.payloadData.diabetes = element.tratamiento;
          this.payloadData.ldiabetes = element.lenfe ? 1 : 0;
        }
        if (element.id === 2) {
          this.payloadData.infarto = element.tratamiento;
          this.payloadData.linfarto = element.lenfe ? 1 : 0;
        }
        if (element.id === 3) {
          this.payloadData.anemia = element.tratamiento;
          this.payloadData.lanemia = element.lenfe ? 1 : 0;
        }
        if (element.id === 4) {
          this.payloadData.fiebre = element.tratamiento;
          this.payloadData.lfiebre = element.lenfe ? 1 : 0;
        }
        if (element.id === 5) {
          this.payloadData.hepatitis = element.tratamiento;
          this.payloadData.lhepatitis = element.lenfe ? 1 : 0;
        }

        if (element.id === 6) {
          this.payloadData.vih = element.tratamiento;
          this.payloadData.lvih = element.lenfe ? 1 : 0;
        }

        if (element.id === 7) {
          this.payloadData.tuber = element.tratamiento;
          this.payloadData.ltuber = element.lenfe ? 1 : 0;
        }

        if (element.id === 8) {
          this.payloadData.sarampion = element.tratamiento;
          this.payloadData.lsarampion = element.lenfe ? 1 : 0;
        }
        if (element.id === 9) {
          this.payloadData.neumonia = element.tratamiento;
          this.payloadData.lneumonia = element.lenfe ? 1 : 0;
        }
        if (element.id === 10) {
          this.payloadData.convul = element.tratamiento;
          this.payloadData.lconvul = element.lenfe ? 1 : 0;
        }
        if (element.id === 11) {
          this.payloadData.epilepsia = element.tratamiento;
          this.payloadData.lepilepsia = element.lenfe ? 1 : 0;
        }
        if (element.id === 12) {
          this.payloadData.hiperten = element.tratamiento;
          this.payloadData.lhiperten = element.lenfe ? 1 : 0;
        }

        if (element.id === 13) {
          this.payloadData.hipoten = element.tratamiento;
          this.payloadData.lhipoten = element.lenfe ? 1 : 0;
        }
        if (element.id === 14) {
          this.payloadData.alergias = element.tratamiento;
          this.payloadData.lalergias = element.lenfe ? 1 : 0;
        }
        if (element.id === 15) {
          this.payloadData.meningitis = element.tratamiento;
          this.payloadData.lmeningitis = element.lenfe ? 1 : 0;
        }
        if (element.id === 16) {
          this.payloadData.polio = element.tratamiento;
          this.payloadData.lpolio = element.lenfe ? 1 : 0;
        }

        if (element.id === 17) {
          this.payloadData.paperas = element.tratamiento;
          this.payloadData.lpaperas = element.lenfe ? 1 : 0;
        }
        if (element.id === 18) {
          this.payloadData.rubeola = element.tratamiento;
          this.payloadData.lrubeola = element.lenfe ? 1 : 0;
        }
        if (element.id === 19) {
          this.payloadData.cancer = element.tratamiento;
          this.payloadData.lcancer = element.lenfe ? 1 : 0;
        }
        if (element.id === 20) {
          this.payloadData.covid = element.tratamiento;
          this.payloadData.lcovid = element.lenfe ? 1 : 0;
        }
      });
      console.log("payload prepare ", this.payloadData);
    },

    convertirDatos(patoInfo) {
      console.log("response patlogicos.get", patoInfo);

      this.enfermedades[0].tratamiento = patoInfo.diabetes;
      this.enfermedades[0].lenfe = patoInfo.ldiabetes === 0 ? false : true;

      this.enfermedades[1].tratamiento = patoInfo.infarto;
      this.enfermedades[1].lenfe = patoInfo.linfarto === 0 ? false : true;

      this.enfermedades[2].tratamiento = patoInfo.anemia;
      this.enfermedades[2].lenfe = patoInfo.lanemia === 0 ? false : true;

      this.enfermedades[3].tratamiento = patoInfo.fiebre;
      this.enfermedades[3].lenfe = patoInfo.lfiebre === 0 ? false : true;

      this.enfermedades[4].tratamiento = patoInfo.hepatitis;
      this.enfermedades[4].lenfe = patoInfo.lhepatitis === 0 ? false : true;

      this.enfermedades[5].tratamiento = patoInfo.vih;
      this.enfermedades[5].lenfe = patoInfo.lvih === 0 ? false : true;

      this.enfermedades[6].tratamiento = patoInfo.tuber;
      this.enfermedades[6].lenfe = patoInfo.ltuber === 0 ? false : true;

      this.enfermedades[7].tratamiento = patoInfo.sarampion;
      this.enfermedades[7].lenfe = patoInfo.lsarampion === 0 ? false : true;

      this.enfermedades[8].tratamiento = patoInfo.neumonia;
      this.enfermedades[8].lenfe = patoInfo.lneumonia === 0 ? false : true;

      this.enfermedades[9].tratamiento = patoInfo.convul;
      this.enfermedades[9].lenfe = patoInfo.lconvul === 0 ? false : true;

      this.enfermedades[10].tratamiento = patoInfo.epilepsia;
      this.enfermedades[10].lenfe = patoInfo.lepilepsia === 0 ? false : true;

      this.enfermedades[11].tratamiento = patoInfo.hiperten;
      this.enfermedades[11].lenfe = patoInfo.lhiperten === 0 ? false : true;

      this.enfermedades[12].tratamiento = patoInfo.hipoten;
      this.enfermedades[12].lenfe = patoInfo.lhipoten === 0 ? false : true;

      this.enfermedades[13].tratamiento = patoInfo.alergias;
      this.enfermedades[13].lenfe = patoInfo.lalergias === 0 ? false : true;

      this.enfermedades[14].tratamiento = patoInfo.meningitis;
      this.enfermedades[14].lenfe = patoInfo.lmeningitis === 0 ? false : true;

      this.enfermedades[15].tratamiento = patoInfo.polio;
      this.enfermedades[15].lenfe = patoInfo.lpolio === 0 ? false : true;

      this.enfermedades[16].tratamiento = patoInfo.paperas;
      this.enfermedades[16].lenfe = patoInfo.lpaperas === 0 ? false : true;

      this.enfermedades[17].tratamiento = patoInfo.rubeola;
      this.enfermedades[17].lenfe = patoInfo.lrubeola === 0 ? false : true;

      this.enfermedades[18].tratamiento = patoInfo.cancer;
      this.enfermedades[18].lenfe = patoInfo.lcancer === 0 ? false : true;

      this.enfermedades[19].tratamiento = patoInfo.covid;
      this.enfermedades[19].lenfe = patoInfo.lcovid === 0 ? false : true;
    },
  },
};
</script>