<template>
  <v-container class="mt-2" flat>
    <v-row>
      <v-col>
        <v-progress-linear
          color="info"
          :indeterminate="loading"
          rounded
          height="6"
        ></v-progress-linear>

        <v-alert dense border="left" color="indigo" dark>
          <v-row class="py-0">
            <v-col cols="12" md="12">
              <h3 class="mb-1">
                ({{ idnotasocial }}) ESCALA DE ANSIEDAD DE HAMILTON
              </h3>
              ¿Me podría decir DURANTE EL ÚLTIMO MES que tan frecuente ha
              experimentado los siguientes síntomas?
              <v-row>
                <v-col cols="12" md="6">
                  <h4>Tipo de Ansiedad: {{ nomans }}</h4>
                </v-col>

                <!-- <v-spacer></v-spacer> -->
                <v-col cols="2" md="2">
                  <v-btn color="blue lighten-2" @click="iratras" dark small>
                    <v-icon class="mx-2">mdi-reply</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" md="2">
                  <v-btn small dark color="success" @click="saveinfo">
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
              <!-- {{ nTipoAns}} -->
            </v-col>
          </v-row>
        </v-alert>

        <v-data-table
          :headers="headers"
          :items="ansiedadprg"
          class="elevation-0"
          dense
          :loading="loading"
          hide-default-footer
        >
          <template v-slot:item.nunca="{ item }">
            <v-simple-checkbox
              color="red"
              :ripple="false"
              v-model="item.nunca"
              @input="nuncaok(item)"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.algunas="{ item }">
            <v-simple-checkbox
              color="orange"
              :ripple="false"
              v-model="item.algunas"
              @input="algunasok(item)"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.siempre="{ item }">
            <v-simple-checkbox
              color="blue"
              :ripple="false"
              v-model="item.siempre"
              @input="siempreok(item)"
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tiempo from "@/mixins/tiempo.js";

export default {
  mixins: [tiempo],
  data: () => ({
    nomans: "",
    ansiedadInfo: [],
    //DATOS DE GetPaciente
    idpacientes: 0,
    idtrabsocial: 0,
    idcatencion: 0,
    idansiedad: 0,
    idnotasocial: 0,

    fecha: new Date().toISOString().substr(0, 10),
    nModo: 1,
    loading: false,
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: 0,
    a7: 0,
    a8: 0,
    a9: 0,
    a10: 0,

    nTotal: 0.0,
    nTipoAns: 0,
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
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Nunca", value: "nunca" },
      { text: "Algunas veces", value: "algunas" },
      { text: "Siempre", value: "siempre" },
    ],
    ansiedadprg: [
      {
        id: 1,
        name: "Dificultad para dormirse, sueño interrumpido, sueño insatisfactorio y/o cansancio al despertar?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 2,
        name: "Dificultad para concentrarse, mala memoria?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 3,
        name: "Pérdida de interés, insatisfacción en las diversiones, depresión, despertar prematuro, cambios de humor durante el día?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 4,
        name: "Dolores y molestias musculares?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 5,
        name: "Zumbidos de oídos, visión borrosa, sofocos y escalofríos, sensación de debilidad, sensación de hormigueo?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 6,
        name: "Taquicardia, palpitaciones, dolor en el pecho, sensación de desmayo?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 7,
        name: "Opresión o contracción en el pecho, sensación de ahogo, falta de aire?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 8,
        name: "Dolor antes y después de comer, sensación de estómago lleno o vacío, vómitos, digestión lenta, diarrea, pérdida de peso, estreñimiento?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 9,
        name: "Necesidad de orinar más seguido de lo usual,frigidez, pérdida de la líbido, impotencia sexual.",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 10,
        name: "Boca seca, rubor, palidez, tendencia a sudar, vértigos, dolores de cabeza, pie de gallina?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
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
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
  },

  created() {
    console.log("router", this.$route.params);
    this.idansiedad = this.$route.params.idansiedad;
    this.idnotasocial = this.$route.params.idnotasocial;

    this.getPaciente;
    this.idpacientes = this.getPaciente.idpacientes;

    this.getCatencion;
    this.idcatencion = this.getCatencion.idcatencion;
    this.getExpediente;

    this.idtrabsocial = this.getTrabsocial.idtrabsocial;

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);

    // Determinar modo
    if (this.idansiedad > 0) {
      this.nModo = 2;
      // this.readonly = true;
      this.cargarInfo();
      this.modo = "Editar";
    } else {
      console.log("nuevo");
      //VALORES INICIALES ALTA
      this.nModo = 1;
      this.modo = "Nuevo";
    }
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    // consultar() {
    //   this.loading= true
    //   this.$http.get('expedientes.get/'+ this.idpacientes).then(response=>{

    //     if (response.status == 200){
    //       console.log (response)
    //       this.idansiedad = response.data.result.idansiedad
    //       this.loading= false
    //       this.setExpediente(response.data.result)

    //       // Determinar modo
    //       if (this.idansiedad > 0) {
    //         this.nModo = 2
    //         this.readonly = true
    //         this.cargarInfo()
    //         this.modo = "Editar"
    //       } else {
    //         console.log("nuevo")
    //         //VALORES INICIALES ALTA
    //         this.nModo = 1
    //         this.modo = "Nuevo"
    //       }
    //     }

    //   }).catch(error=>{
    //     this.showSnack({
    //       text: "Error al cargar información",
    //       color: "red",
    //       timeout: 2000,
    //     });
    //     console.log(error)
    //   })

    // },

    nuncaok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.nunca === true) {
        // console.log("ansiedadprg", this.ansiedadprg[nuncaRow.id-1])
        this.ansiedadprg[nuncaRow.id - 1].algunas = false;
        this.ansiedadprg[nuncaRow.id - 1].siempre = false;
      }
    },

    algunasok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.algunas === true) {
        // console.log("ansiedadprg", this.ansiedadprg[nuncaRow.id -1])
        this.ansiedadprg[nuncaRow.id - 1].nunca = false;
        this.ansiedadprg[nuncaRow.id - 1].siempre = false;
      }
    },

    siempreok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.siempre === true) {
        // console.log("ansiedadprg", this.ansiedadprg[nuncaRow.id- 1])
        this.ansiedadprg[nuncaRow.id - 1].nunca = false;
        this.ansiedadprg[nuncaRow.id - 1].algunas = false;
      }
    },

    iratras() {
      this.$router
        .push({
          name: "valoracionpsi",
          params: {
            idansiedad: this.idansiedad,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    saveinfo() {
      // console.log("INICIA GRABAR.")

      /// VALIDAR QUE TERMINE
      this.termino = true;
      this.ansiedadprg.every((element) => {
        //Ciclo para buscar un true en cada pregunta.
        // every. Se detiene cuando respondes false.
        let respuesta = element.nunca || element.siempre || element.algunas;
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

      //// 2. Calcular resultado.
      let nSuma = 0;
      this.ansiedadprg.forEach((element) => {
        let nValRow = 0;
        if (element.nunca === true) {
          nValRow = 1;
        }
        if (element.algunas === true) {
          nValRow = 2;
        }
        if (element.siempre === true) {
          nValRow = 3;
        }
        nSuma = nSuma + nValRow;
      });
      console.log("SUMA", nSuma);
      this.nTotal = ((nSuma * 100) / 30).toFixed(2);
      // console.log("Data actual", this.ansiedadprg)

      // Clasificar la ansiedad segun la siguiente tabla
      // 10 a 40 	No hay Ansiedad
      // 41 a 49	Ansiedad Moderada
      // 50 a 60	Ansiedad grave

      this.nTipoAns = 0;
      if (this.nTotal > 0 && this.nTotal < 40) {
        this.nTipoAns = 1;
        this.nomans = "No ansiedad";
      }

      if (this.nTotal >= 40 && this.nTotal < 50) {
        this.nTipoAns = 2;
        this.nomans = "Ansiedad leve";
      }

      if (this.nTotal >= 50 && this.nTotal < 60) {
        this.nTipoAns = 3;
        this.nomans = "Ansiedad moderada";
      }

      if (this.nTotal >= 60 && this.nTotal <= 100) {
        this.nTipoAns = 4;
        this.nomans = "Ansiedad grave";
      }

      console.log("TIpo de ansiedad", this.nTipoAns);

      /// 3. Saveinfo.
      // Hay que pasar de ansiedadprg a payload ansiedad.
      // cada pregunta pasarla a un campo An donde n es id de la pregunta.

      let nRow = 1;
      this.ansiedadprg.forEach((element) => {
        let nColumna = "a" + nRow.toString();
        // para asignar dinamicamente la varible del data.

        if ([nColumna === nRow]) {
          let nValorRow = 0;
          if (element.nunca === true) {
            nValorRow = 1;
          }
          if (element.algunas === true) {
            nValorRow = 2;
          }
          if (element.siempre === true) {
            nValorRow = 3;
          }
          this[nColumna] = nValorRow;
        }
        nRow = nRow + 1;
      });

      /// ASIGNAR PAYLOAD
      let payload = {
        idpacientes: parseInt(this.idpacientes),
        idtrabsocial: this.idtrabsocial,
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        hora: this.hora(),
        a1: this.a1,
        a2: this.a2,
        a3: this.a3,
        a4: this.a4,
        a5: this.a5,
        a6: this.a6,
        a7: this.a7,
        a8: this.a8,
        a9: this.a9,
        a10: this.a10,
        resultado: parseFloat(this.nTotal),
        tipoans: this.nTipoAns,
        idnotasocial: this.idnotasocial,
      };
      // console.log("Payload", payload);
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("ansiedad.insert", payload)
          .then((response) => {
            // console.log(response);
            this.showSnack({
              text: "Se grabó correctamente su registro de ansiedad",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;

            this.$router
              .push({
                name: "valoracionpsi",
                params: {
                  idansiedad: this.idansiedad,
                  idnotasocial: parseInt(this.idnotasocial),
                },
              })
              .catch(() => {});
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
        // ansiedad.update/:idansiedad
        // console.log("payload modo 2", payload);
        // console.log(this.idansiedad);
        this.$http
          .put("ansiedad.update/" + this.idansiedad, payload)
          .then((response) => {
            this.showSnack({
              text: "Se actualizó correctamente",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router
              .push({
                name: "valoracionpsi",
                params: {
                  idansiedad: this.idansiedad,
                  idnotasocial: parseInt(this.idnotasocial),
                },
              })
              .catch(() => {});
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
      this.loading = true;
      //  madnar cargar la información del paciente por idansiedad
      // ansiedad.update/:idansiedad
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idansiedad)
      this.$http
        // .get("ansiedad.get.pac/" + this.idpacientes)
        // .get("ansiedad.get.notasocial/" + this.idnotasocial)
        .get("ansiedad.get/" + this.idansiedad)
        .then((response) => {
          // console.log("response", response);
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
          this.ansiedadInfo = response.data.result;
          this.idansiedad = this.ansiedadInfo.idansiedad;

          this.a1 = this.ansiedadInfo.a1;
          this.a2 = this.ansiedadInfo.a2;
          this.a3 = this.ansiedadInfo.a3;
          this.a4 = this.ansiedadInfo.a4;
          this.a5 = this.ansiedadInfo.a5;
          this.a6 = this.ansiedadInfo.a6;
          this.a7 = this.ansiedadInfo.a7;
          this.a8 = this.ansiedadInfo.a8;
          this.a9 = this.ansiedadInfo.a9;
          this.a10 = this.ansiedadInfo.a10;

          this.nTotal = this.ansiedadInfo.resultado;
          this.nTipoAns = this.ansiedadInfo.tipoans;

          switch (this.nTipoAns) {
          case 1:
            this.nomans = "No ansiedad";
            break;

          case 2:
            this.nomans = "Ansiedad leve";
            break;

          case 3:
            this.nomans = "Ansiedad moderada";
            break;

          case 4:
            this.nomans = "Ansiedad grave";
            break;
          }

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
      if (this.a1 === 1) {
        this.ansiedadprg[1 - 1].nunca = true;
      }
      if (this.a1 === 2) {
        this.ansiedadprg[1 - 1].algunas = true;
      }
      if (this.a1 === 3) {
        this.ansiedadprg[1 - 1].siempre = true;
      }
      ///DOS
      if (this.a2 === 1) {
        this.ansiedadprg[2 - 1].nunca = true;
      }
      if (this.a2 === 2) {
        this.ansiedadprg[2 - 1].algunas = true;
      }
      if (this.a2 === 3) {
        this.ansiedadprg[2 - 1].siempre = true;
      }
      ///tres
      if (this.a3 === 1) {
        this.ansiedadprg[3 - 1].nunca = true;
      }
      if (this.a3 === 2) {
        this.ansiedadprg[3 - 1].algunas = true;
      }
      if (this.a3 === 3) {
        this.ansiedadprg[3 - 1].siempre = true;
      }
      //Cuatro
      if (this.a4 === 1) {
        this.ansiedadprg[4 - 1].nunca = true;
      }
      if (this.a4 === 2) {
        this.ansiedadprg[4 - 1].algunas = true;
      }
      if (this.a4 === 3) {
        this.ansiedadprg[4 - 1].siempre = true;
      }
      //Cinco
      if (this.a5 === 1) {
        this.ansiedadprg[5 - 1].nunca = true;
      }
      if (this.a5 === 2) {
        this.ansiedadprg[5 - 1].algunas = true;
      }
      if (this.a5 === 3) {
        this.ansiedadprg[5 - 1].siempre = true;
      }
      //Seis
      if (this.a6 === 1) {
        this.ansiedadprg[6 - 1].nunca = true;
      }
      if (this.a6 === 2) {
        this.ansiedadprg[6 - 1].algunas = true;
      }
      if (this.a6 === 3) {
        this.ansiedadprg[6 - 1].siempre = true;
      }
      //Siete
      if (this.a7 === 1) {
        this.ansiedadprg[7 - 1].nunca = true;
      }
      if (this.a7 === 2) {
        this.ansiedadprg[7 - 1].algunas = true;
      }
      if (this.a7 === 3) {
        this.ansiedadprg[7 - 1].siempre = true;
      }
      //Ocho
      if (this.a8 === 1) {
        this.ansiedadprg[8 - 1].nunca = true;
      }
      if (this.a8 === 2) {
        this.ansiedadprg[8 - 1].algunas = true;
      }
      if (this.a8 === 3) {
        this.ansiedadprg[8 - 1].siempre = true;
      }
      //Nueve
      if (this.a9 === 1) {
        this.ansiedadprg[9 - 1].nunca = true;
      }
      if (this.a9 === 2) {
        this.ansiedadprg[9 - 1].algunas = true;
      }
      if (this.a9 === 3) {
        this.ansiedadprg[9 - 1].siempre = true;
      }
      //Diez
      if (this.a10 === 1) {
        this.ansiedadprg[10 - 1].nunca = true;
      }
      if (this.a10 === 2) {
        this.ansiedadprg[10 - 1].algunas = true;
      }
      if (this.a10 === 3) {
        this.ansiedadprg[10 - 1].siempre = true;
      }
    },
  },
};
</script>
