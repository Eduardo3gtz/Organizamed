<template>
  <v-container class="mt-2" flat>
    <v-row>
      <v-col>
        <v-alert dense border="left" color="orange" dark>
          <v-row class="py-0">
            <v-col cols="12" md="12">
              <h3 class="mb-1">({{ idnotasocial}}) ESCALA DE DEPRESION DE ZUNG</h3>
              ¿ Me podría decir DURANTE EL ÚLTIMO MES que tan frecuente ha
              experimentado los siguientes síntomas?
              <v-row>
                <v-col cols="12" md="4">
                  <h4>Tipo de Depresion: {{ nomdep }}</h4>
                </v-col>
                <v-col cols="12" md="5">
                  <!-- <h4>Puntuacion: {{nTotal}}</h4> -->
                </v-col>
                <!-- <v-spacer></v-spacer> -->
                <v-col cols="6" md="1">
                  <v-btn
                    color="blue lighten-2"
                    :to="{ name: 'valoracionpsi' }"
                    dark
                    small
                  >
                    <v-icon class="mx-2">mdi-reply</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" md="2">
                  <v-btn small dark color="success" @click="saveinfo">
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-alert>
        <v-data-table
          :headers="headers"
          :items="depresionprg"
          class="elevation-0"
          dense
          hide-default-footer
          :items-per-page="depresionprg.length"
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
    nomdep: "",
    depresionInfo: [],

    //DATOS DE GetPaciente
    idpacientes: 0,
    idtrabsocial: 0,
    idcatencion: 0,
    iddepresion: 0,
    idnotasocial:0,

    nModo: 1,
    loading: false,

    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    d5: 0,
    d6: 0,
    d7: 0,
    d8: 0,
    d9: 0,
    d10: 0,
    d11: 0,
    d12: 0,
    d13: 0,
    d14: 0,
    d15: 0,
    d16: 0,
    d17: 0,
    d18: 0,
    d19: 0,
    d20: 0,

    nTotal: 0.0,
    nTipoDep: 0,
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
      { text: "Nunca", value: "nunca" },
      { text: "Algunas veces", value: "algunas" },
      { text: "Siempre", value: "siempre" },
      // { text: 'Iron (%)', value: 'iron' },
    ],
    depresionprg: [
      {
        id: 1,
        name: "Me siento triste y deprmido(a)?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 2,
        name: "Por las mañanas me siento peor que en las tardes?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 3,
        name: "Frecuentemente tengo ganas de lllorar y a veces lloro?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 4,
        name: "Me cuesta mucho dormir o duermo mal por la noche?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 5,
        name: "Ahora tengo menos apetito del que antes solía tener?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 6,
        name: "Todavía disfruto el sexo?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 7,
        name: "creo que estoy adelgazando?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 8,
        name: "Tengo problemas de estreñimiento?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 9,
        name: "Tengo palpitaciones, mi corazón late más rápido de lo normal?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 10,
        name: "Me canso por cualquier cosa o sin razón algunar?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 11,
        name: "Mi mente no está tan clara como siempre?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 12,
        name: "No hago las cosas con la misma facilidad que antes?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 13,
        name: "Me siento agitado(a) e intranquilo(a) y no puedo estar quieto(a)?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 14,
        name: "No tengo esperanza en el futuro?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 15,
        name: "Me siento más irritable de lo normal?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 16,
        name: "Encuentro difícil la toma de decisiones?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 17,
        name: "No me creo útil y necesario para la gente?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 18,
        name: "No encuentro agradable vivir, mi vida no es plena ?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 19,
        name: "Siento que los demás estarían mejor si yo muriera?",
        nunca: false,
        algunas: false,
        siempre: false,
      },
      {
        id: 20,
        name: "No me gustan las mismas cosas que habitualmente me agradaban?",
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

    this.iddepresion = this.$route.params.iddepresion;
    this.idnotasocial = this.$route.params.idnotasocial;

    this.getPaciente;
    this.idpacientes = this.getPaciente.idpacientes;

    this.getCatencion;
    this.catencion = this.getCatencion.idcatencion;
    this.getExpediente;

    this.idtrabsocial = this.getTrabsocial.idtrabsocial;

    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);

    // Determinar modo
    if (this.iddepresion > 0) {
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
    // this.consultar()
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    // consultar1(){
    //   console.log('Hola')
    //   this.nModo = 2
    //   // this.idpacientes = 1
    //   // this.iddepresion = 1
    //   console.log("Modo de Ediar Información idpacientes ", this.iddepresion)
    //   this.cargarInfo()
    // },

    // consultar() {
    //   this.loading= true
    //   this.$http.get('expedientes.get/'+ this.idpacientes).then(response=>{

    //     if (response.status == 200){
    //       console.log ("EXPEDIENTE",response)
    //       this.iddepresion = response.data.result.iddepresion
    //       this.loading= false
    //       this.setExpediente(response.data.result)

    //       // Determinar modo
    //       if (this.iddepresion > 0) {
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

    //   // this.cargarInfo()
    // },

    nuncaok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.nunca === true) {
        // console.log("depresionprg", this.depresionprg[nuncaRow.id-1])
        this.depresionprg[nuncaRow.id - 1].algunas = false;
        this.depresionprg[nuncaRow.id - 1].siempre = false;
      }
    },

    algunasok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.algunas === true) {
        // console.log("depresionprg", this.depresionprg[nuncaRow.id -1])
        this.depresionprg[nuncaRow.id - 1].nunca = false;
        this.depresionprg[nuncaRow.id - 1].siempre = false;
      }
    },

    siempreok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.siempre === true) {
        // console.log("depresionprg", this.depresionprg[nuncaRow.id- 1])
        this.depresionprg[nuncaRow.id - 1].nunca = false;
        this.depresionprg[nuncaRow.id - 1].algunas = false;
      }
    },

    iratras() {
      this.$router
        .push({
          name: "valoracionpsi",
          params: {
            iddepresion: this.iddepresion,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    saveinfo() {
      // console.log("INICIA GRABAR.")

      /// VALIDAR QUE TERMINE
      this.termino = true;
      this.depresionprg.every((element) => {
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
      this.depresionprg.forEach((element) => {
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
      this.nTotal = ((nSuma * 100) / 60).toFixed(2);
      // console.log("Data actual", this.depresionprgprg)
      console.log("nTotal", this.nTotal);
      // Clasificar la depresionprg segun la siguiente tabla
      // 10 a 40 	No hay depresionprg
      // 41 a 49	depresionprg Moderada
      // 50 a 60	depresionprg grave

      this.nTipoDep = 0;
      if (this.nTotal > 0 && this.nTotal < 50) {
        this.nTipoDep = 1;
        this.nomdep = "No depresion";
      }

      if (this.nTotal >= 50 && this.nTotal < 60) {
        this.nTipoDep = 2;
        this.nomdep = "Depresion leve";
      }

      if (this.nTotal >= 60 && this.nTotal < 70) {
        this.nTipoDep = 3;
        this.nomdep = "Depresion moderada";
      }

      if (this.nTotal >= 70 && this.nTotal <= 100) {
        this.nTipoDep = 4;
        this.nomdep = "Depresion grave";
      }

      console.log("TIpo de depresion", this.nTipoDep, this.nomdep);

      /// 3. Saveinfo.
      // Hay que pasar de depresionprgprg a payload depresionprg.
      // cada pregunta pasarla a un campo An donde n es id de la pregunta.

      let nRow = 1;
      this.depresionprg.forEach((element) => {
        let nColumna = "d" + nRow.toString();
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
        d1: this.d1,
        d2: this.d2,
        d3: this.d3,
        d4: this.d4,
        d5: this.d5,
        d6: this.d6,
        d7: this.d7,
        d8: this.d8,
        d9: this.d9,
        d10: this.d10,
        d11: this.d11,
        d12: this.d12,
        d13: this.d13,
        d14: this.d14,
        d15: this.d15,
        d16: this.d16,
        d17: this.d17,
        d18: this.d18,
        d19: this.d19,
        d20: this.d20,
        resultado: parseFloat(this.nTotal),
        tipodep: this.nTipoDep,
        idnotasocial: this.idnotasocial,
      };
      console.log("Payload DEPRESION", payload)
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("depresion.insert", payload)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "Se grabó correctamente su registro de depresion",
              color: "success",
              timeout: 2000,
            });
            
            this.loading = false;
            this.$router
              .push({
                name: "valoracionpsi",
                params: {
                  iddepresion: this.iddepresion,
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
        // depresionprg.update/:iddepresionprg
        console.log("payload modo 2", payload);
        console.log(this.iddepresion);
        this.$http
          .put("depresion.update/" + this.iddepresion, payload)
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
      //  madnar cargar la información del paciente por iddepresionprg
      // depresionprg.update/:iddepresionprg
      console.log("payload modo 2", this.idpacientes);
      // console.log(this.idpacientesprg)
      // this.$http.get( 'depresion.get.pac/' + this.idpacientes).then(response=>{

      this.$http
        .get("depresion.get/" + this.iddepresion)
        .then((response) => {
          console.log("response", response);
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
          this.depresionInfo = response.data.result;
          this.iddepresion = this.depresionInfo.iddepresion;

          this.d1 = this.depresionInfo.d1;
          this.d2 = this.depresionInfo.d2;
          this.d3 = this.depresionInfo.d3;
          this.d4 = this.depresionInfo.d4;
          this.d5 = this.depresionInfo.d5;
          this.d6 = this.depresionInfo.d6;
          this.d7 = this.depresionInfo.d7;
          this.d8 = this.depresionInfo.d8;
          this.d9 = this.depresionInfo.d9;
          this.d10 = this.depresionInfo.d10;
          this.d11 = this.depresionInfo.d11;
          this.d12 = this.depresionInfo.d12;
          this.d13 = this.depresionInfo.d13;
          this.d14 = this.depresionInfo.d14;
          this.d15 = this.depresionInfo.d15;
          this.d16 = this.depresionInfo.d16;
          this.d17 = this.depresionInfo.d17;
          this.d18 = this.depresionInfo.d18;
          this.d19 = this.depresionInfo.d19;
          this.d20 = this.depresionInfo.d20;

          this.nTotal = this.depresionInfo.resultado;
          this.nTipoDep = this.depresionInfo.tipodep;

          console.log("this.nTipoDep", this.nTipoDep);

          switch (this.nTipoDep) {
          case 1:
            this.nomdep = "No depresion";
            break;

          case 2:
            this.nomdep = "Depresion leve";
            break;

          case 3:
            this.nomdep = "Depresion moderada";
            break;

          case 4:
            this.nomdep = "Depresion grave";
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
      if (this.d1 === 1) {
        this.depresionprg[1 - 1].nunca = true;
      }
      if (this.d1 === 2) {
        this.depresionprg[1 - 1].algunas = true;
      }
      if (this.d1 === 3) {
        this.depresionprg[1 - 1].siempre = true;
      }
      ///DOS
      if (this.d2 === 1) {
        this.depresionprg[2 - 1].nunca = true;
      }
      if (this.d2 === 2) {
        this.depresionprg[2 - 1].algunas = true;
      }
      if (this.d2 === 3) {
        this.depresionprg[2 - 1].siempre = true;
      }
      ///tres
      if (this.d3 === 1) {
        this.depresionprg[3 - 1].nunca = true;
      }
      if (this.d3 === 2) {
        this.depresionprg[3 - 1].algunas = true;
      }
      if (this.d3 === 3) {
        this.depresionprg[3 - 1].siempre = true;
      }
      //Cuatro
      if (this.d4 === 1) {
        this.depresionprg[4 - 1].nunca = true;
      }
      if (this.d4 === 2) {
        this.depresionprg[4 - 1].algunas = true;
      }
      if (this.d4 === 3) {
        this.depresionprg[4 - 1].siempre = true;
      }
      //Cinco
      if (this.d5 === 1) {
        this.depresionprg[5 - 1].nunca = true;
      }
      if (this.d5 === 2) {
        this.depresionprg[5 - 1].algunas = true;
      }
      if (this.d5 === 3) {
        this.depresionprg[5 - 1].siempre = true;
      }
      //Seis
      if (this.d6 === 1) {
        this.depresionprg[6 - 1].nunca = true;
      }
      if (this.d6 === 2) {
        this.depresionprg[6 - 1].algunas = true;
      }
      if (this.d6 === 3) {
        this.depresionprg[6 - 1].siempre = true;
      }
      //Siete
      if (this.d7 === 1) {
        this.depresionprg[7 - 1].nunca = true;
      }
      if (this.d7 === 2) {
        this.depresionprg[7 - 1].algunas = true;
      }
      if (this.d7 === 3) {
        this.depresionprg[7 - 1].siempre = true;
      }
      //Ocho
      if (this.d8 === 1) {
        this.depresionprg[8 - 1].nunca = true;
      }
      if (this.d8 === 2) {
        this.depresionprg[8 - 1].algunas = true;
      }
      if (this.d8 === 3) {
        this.depresionprg[8 - 1].siempre = true;
      }
      //Nueve
      if (this.d9 === 1) {
        this.depresionprg[9 - 1].nunca = true;
      }
      if (this.d9 === 2) {
        this.depresionprg[9 - 1].algunas = true;
      }
      if (this.d9 === 3) {
        this.depresionprg[9 - 1].siempre = true;
      }
      //Diez
      if (this.d10 === 1) {
        this.depresionprg[10 - 1].nunca = true;
      }
      if (this.d10 === 2) {
        this.depresionprg[10 - 1].algunas = true;
      }
      if (this.d10 === 3) {
        this.depresionprg[10 - 1].siempre = true;
      }
      //Once
      if (this.d11 === 1) {
        this.depresionprg[11 - 1].nunca = true;
      }
      if (this.d11 === 2) {
        this.depresionprg[11 - 1].algunas = true;
      }
      if (this.d11 === 3) {
        this.depresionprg[11 - 1].siempre = true;
      }
      //Doce
      if (this.d12 === 1) {
        this.depresionprg[12 - 1].nunca = true;
      }
      if (this.d12 === 2) {
        this.depresionprg[12 - 1].algunas = true;
      }
      if (this.d12 === 3) {
        this.depresionprg[12 - 1].siempre = true;
      }
      //Trece
      if (this.d13 === 1) {
        this.depresionprg[13 - 1].nunca = true;
      }
      if (this.d13 === 2) {
        this.depresionprg[13 - 1].algunas = true;
      }
      if (this.d13 === 3) {
        this.depresionprg[13 - 1].siempre = true;
      }
      //Catorce
      if (this.d14 === 1) {
        this.depresionprg[14 - 1].nunca = true;
      }
      if (this.d14 === 2) {
        this.depresionprg[14 - 1].algunas = true;
      }
      if (this.d14 === 3) {
        this.depresionprg[14 - 1].siempre = true;
      }
      //Quince
      if (this.d15 === 1) {
        this.depresionprg[15 - 1].nunca = true;
      }
      if (this.d15 === 2) {
        this.depresionprg[15 - 1].algunas = true;
      }
      if (this.d15 === 3) {
        this.depresionprg[15 - 1].siempre = true;
      }
      //Dieciseis
      if (this.d16 === 1) {
        this.depresionprg[16 - 1].nunca = true;
      }
      if (this.d16 === 2) {
        this.depresionprg[16 - 1].algunas = true;
      }
      if (this.d16 === 3) {
        this.depresionprg[16 - 1].siempre = true;
      }
      //Diecisiete
      if (this.d17 === 1) {
        this.depresionprg[17 - 1].nunca = true;
      }
      if (this.d17 === 2) {
        this.depresionprg[17 - 1].algunas = true;
      }
      if (this.d17 === 3) {
        this.depresionprg[17 - 1].siempre = true;
      }
      //Dieciocho
      if (this.d18 === 1) {
        this.depresionprg[18 - 1].nunca = true;
      }
      if (this.d18 === 2) {
        this.depresionprg[18 - 1].algunas = true;
      }
      if (this.d18 === 3) {
        this.depresionprg[18 - 1].siempre = true;
      }
      //Diecinueve
      if (this.d19 === 1) {
        this.depresionprg[19 - 1].nunca = true;
      }
      if (this.d19 === 2) {
        this.depresionprg[19 - 1].algunas = true;
      }
      if (this.d19 === 3) {
        this.depresionprg[19 - 1].siempre = true;
      }
      //Veinte
      if (this.d20 === 1) {
        this.depresionprg[20 - 1].nunca = true;
      }
      if (this.d20 === 2) {
        this.depresionprg[20 - 1].algunas = true;
      }
      if (this.d20 === 3) {
        this.depresionprg[20 - 1].siempre = true;
      }
    },
  },
};
</script>
