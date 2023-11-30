<template>
  <v-container>
    <v-card flat rounded="xl">
      <v-row class="mb-5" justify="center">
        <v-col cols="12" md="4" lg="4" sm="5">
          <h3 class="ml-14">Antecedentes perinatales</h3>
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
        <v-spacer>
        </v-spacer>
        <v-row justify="center" class="mt-1">
          <v-btn
            color="orange"
            class="mr-4 mt-2"
            :to="{ name: 'historiacli' }"
            dark
          >
            <v-icon class="mx-2">mdi-reply</v-icon>
          </v-btn>
          <v-btn class="mt-2 mr-4" dark color="info" @click="saveinfo"
            >Guardar
          </v-btn>
        </v-row>
      </v-row>

      <v-col>
        <v-text-field label="Tipo de nacimiento" dense v-model="tiponace">
        </v-text-field>
        <v-text-field label="Peso al nacer" dense v-model="pesonace">
        </v-text-field>
      </v-col>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="perinatalesprg"
            class="elevation-0"
            dense
            hide-default-footer
            :items-per-page="perinatalesprg.length"
          >
            <template v-slot:item.si="{ item }">
              <v-simple-checkbox
                color="orange"
                :ripple="false"
                v-model="item.si"
                @input="siok(item)"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.no="{ item }">
              <v-simple-checkbox
                color="red"
                :ripple="false"
                v-model="item.no"
                @input="nook(item)"
              ></v-simple-checkbox>
            </template>
            <!-- <template v-slot:item.siempre="{ item }">
              <v-simple-checkbox
                color = "blue"
                :ripple="false"
                v-model="item.siempre"
                @input="siempreok(item)"
              ></v-simple-checkbox>
            </template> -->
          </v-data-table>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-5 mb-3">
        <v-btn dark class="mt-1 mb-2" color="info" @click="saveinfo">Guardar</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    perinatalesInfo: [],

    //DATOS DE GetPaciente
    idpacientes: 3,
    idmedicos: 3,
    idcatencion: 4,
    idperinatales: 1,

    nModo: 1,
    loading: false,

    pesonace: "",
    tiponace: "",

    fototerapia: 0,
    neonatal: 0,
    prematurez: 0,
    cirugias: 0,
    asfixia: 0,
    incubadora: 0,

    nTotal: 0.0,
    nTipoCon: 0,
    termino: false,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu1: false,

    singleSelect: false,
    selected: [],
    headers: [
      { text: "Id", value: "id" },
      {
        // text: '¿me podría decir que tanto siente o piensa en lo siguiente…?',
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Si", value: "si" },
      { text: "No", value: "no" },
      // { text: 'Siempre', value: 'siempre' },
      // { text: 'Iron (%)', value: 'iron' },
    ],

    perinatalesprg: [
      { id: 1, name: "Lámparas de fototerapia", no: false, si: false },
      { id: 2, name: "Internamiento neonatal", no: false, si: false },
      { id: 3, name: "Prematurez", no: false, si: false },
      { id: 4, name: "Cirugías neonatales", no: false, si: false },
      { id: 5, name: "Asfixia neonatal", no: false, si: false },
      { id: 6, name: "Incubadora", no: false, si: false },
    ],
    // hora
    time: null,
    menu2: false,
    modal2: false,
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("Medicos", ["getMedico"]),
  },

  created() {
    this.getPaciente;
    this.idpacientes = this.getPaciente.idpacientes;

    this.getMedico;
    this.idmedicos = this.getMedico.idmedicos;

    this.getCatencion;
    this.idcatencion = this.getCatencion.idcatencion;

    this.getExpediente;

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
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
            // console.log (response)
            this.idperinatales = response.data.result.idperinatales;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idperinatales > 0) {
              this.nModo = 2;
              this.readonly = true;
              this.cargarInfo();
              this.modo = "Editar";
            } else {
              // console.log("nuevo")
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
    nook(noRow) {
      // console.log(noRow)
      if (noRow.no === true) {
        // console.log("perinatalesprg", this.perinatalesprg[noRow.id-1])
        this.perinatalesprg[noRow.id - 1].si = false;
        // this.perinatalesprg[noRow.id-1].siempre = false
      }
    },

    siok(noRow) {
      // console.log(noRow)
      if (noRow.si === true) {
        // console.log("perinatalesprg", this.perinatalesprg[noRow.id -1])
        this.perinatalesprg[noRow.id - 1].no = false;
        // this.perinatalesprg[noRow.id-1].siempre = false
      }
    },

    // siempreok(noRow){
    //   // console.log(noRow)
    //   if (noRow.siempre === true ){
    //     // console.log("perinatalesprg", this.perinatalesprg[noRow.id- 1])
    //     this.perinatalesprg[noRow.id-1].no = false
    //     this.perinatalesprg[noRow.id-1].si = false
    //   }
    // },

    saveinfo() {
      // console.log("INICIA GRABAR.")

      /// VALIDAR QUE TERMINE
      this.termino = true;
      this.perinatalesprg.every((element) => {
        //Ciclo para buscar un true en cada pregunta.
        // every. Se detiene cuando respondes false.
        let respuesta = element.no || element.si;
        // console.log (respuesta)
        if (respuesta === false) {
          this.termino = false;
          return false;
        }
        return true;
      });
      // Valiadar que termine de contestar todo.
      if (this.termino === false) {
        //TODO  Mostrar snackbar. Que le falta.
        this.showSnack({
          text: "Debe Completar las preguntas",
          color: "orange",
          timeout: 2000,
        });
        console.log("LE FALTA TERMINAR");
        return;
      }

      /// 3. Saveinfo.
      // Hay que pasar de perinatalesprgprg a payload perinatalesprg.
      // cada pregunta pasarla a un campo An donde n es id de la pregunta.

      let nRow = 1;
      this.perinatalesprg.forEach((element) => {
        if (element.id === 1) {
          this.fototerapia = element.no === true ? 0 : 1;
        }
        if (element.id === 2) {
          this.neonatal = element.no === true ? 0 : 1;
        }
        if (element.id === 3) {
          this.prematurez = element.no === true ? 0 : 1;
        }
        if (element.id === 4) {
          this.cirugias = element.no === true ? 0 : 1;
        }
        if (element.id === 5) {
          this.asfixia = element.no === true ? 0 : 1;
        }
        if (element.id === 6) {
          this.incubadora = element.no === true ? 0 : 1;
        }
      });

      /// ASIGNAR PAYLOAD
      let payload = {
        idpacientes: parseInt(this.idpacientes),
        idmedicos: this.idmedicos,
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        hora: this.hora(),

        tiponace: this.tiponace,
        pesonace: this.pesonace,

        fototerapia: this.fototerapia,
        neonatal: this.neonatal,
        prematurez: this.prematurez,
        cirugias: this.cirugias,
        incubadora: this.incubadora,
        asfixia: this.asfixia,
        // "resultado":  parseFloat(this.nTotal),
        // "tipocon": this.nTipoCon
      };
      console.log("Payload", payload);
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("perinatales.insert", payload)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "Se grabó correctamente su registro de perinatales",
              color: "success",
              timeout: 2000,
            });
            this.consultar();
            this.loading = false;
            this.$router.back();
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al realizar operación",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      } else {
        // perinatalesprg.update/:idperinatalesprg
        console.log("payload modo 2", payload);
        console.log(this.idperinatales);
        this.$http
          .put("perinatales.update/" + this.idperinatales, payload)
          .then((response) => {
            this.showSnack({
              text: "Se actualizó correctamente",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router.back();
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al realizar operación",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      }
    },

    cargarInfo() {
      // console.log('cargarInfo')
      this.loading = true;
      //  madnar cargar la información del paciente por idperinatalesprg
      // perinatalesprg.update/:idperinatalesprg
      // console.log("payload modo 2", this.idperinatales)
      // console.log(this.idperinatalesprg)
      this.$http
        .get("perinatales.get.pac/" + this.idpacientes)
        .then((response) => {
          console.log("response perinatales", response);
          // TODO. Proceso para parsear info a forma
          //DEFINIR Si actualizo la fecha. Pienso que si.
          if (response.status != 200) {
            this.showSnack({
              text: "Error al cargar Información",
              color: "red",
              timeout: 2000,
            });
          }
          // pasar Respuesta a la forma
          this.perinatalesInfo = response.data.result;
          this.idperinatales = this.perinatalesInfo.idperinatales;

          this.tiponace = this.perinatalesInfo.tiponace;
          this.pesonace = this.perinatalesInfo.pesonace;

          this.fototerapia = this.perinatalesInfo.fototerapia;
          this.neonatal = this.perinatalesInfo.neonatal;
          this.prematurez = this.perinatalesInfo.prematurez;
          this.cirugias = this.perinatalesInfo.cirugias;
          this.asfixia = this.perinatalesInfo.asfixia;
          this.incubadora = this.perinatalesInfo.incubadora;

          // this.nTotal = this.perinatalesInfo.resultado
          // this.nTipoCon = this.perinatalesInfo.tipocon

          //llamar al procedimeinto de carga y conversión de datos.
          this.convertirDatos();

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

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },

    hora() {
      let f = new Date();
      let hora = f.getHours();
      let minuto = f.getMinutes();
      let segundo = f.getSeconds();
      if (hora < 10) {
        hora = "0" + f.getHours();
      }
      if (minuto < 10) {
        minuto = "0" + f.getMinutes();
      }
      if (segundo < 10) {
        segundo = "0" + f.getSeconds();
      }
      return hora + ":" + minuto;
    },

    convertirDatos() {
      // pasar Respuesta a la forma

      // console.log(this.a1, this.a2, this.a3)
      if (this.fototerapia === 0) {
        this.perinatalesprg[1 - 1].no = true;
      }
      if (this.fototerapia === 1) {
        this.perinatalesprg[1 - 1].si = true;
      }
      ///DOS
      if (this.neonatal === 0) {
        this.perinatalesprg[2 - 1].no = true;
      }
      if (this.neonatal === 1) {
        this.perinatalesprg[2 - 1].si = true;
      }
      ///tres
      if (this.prematurez === 0) {
        this.perinatalesprg[3 - 1].no = true;
      }
      if (this.prematurez === 1) {
        this.perinatalesprg[3 - 1].si = true;
      }

      //Cuatro
      if (this.cirugias === 0) {
        this.perinatalesprg[4 - 1].no = true;
      }
      if (this.cirugias === 1) {
        this.perinatalesprg[4 - 1].si = true;
      }
      //CINCO
      if (this.asfixia === 0) {
        this.perinatalesprg[5 - 1].no = true;
      }
      if (this.asfixia === 1) {
        this.perinatalesprg[5 - 1].si = true;
      }
      //SEIS
      if (this.incubadora === 0) {
        this.perinatalesprg[6 - 1].no = true;
      }
      if (this.incubadora === 1) {
        this.perinatalesprg[6 - 1].si = true;
      }
    },
  },
};
</script>