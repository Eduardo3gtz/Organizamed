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

        <v-alert dense border="left" color="green" dark>
          <v-row class="py-0">
            <v-col cols="12" md="12">
              <h3 class="mb-1">
                ({{ idnotasocial }}) OTROS ITEMS RELACIONADOS CON EL ESTUDIO
              </h3>
              Por favor, ¿me podría decir que tanto siente o piensa en lo
              siguiente…?
              <v-row>
                <v-col cols="12" md="9">
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
                  <v-btn small dark color="info" @click="saveinfo">
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
              <!-- {{nTotal}}
              relacionadas tipo: {{ nTipoRel}}
            </v-col>
            <v-col cols="3" class="ml-14" md="1">
              <v-btn
                color="blue lighten-2"
                :to="{name:'valoracionpsi'}"
                dark
                small
                class="mr-8"
              >
                <v-icon class="mx-2">mdi-reply</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" md="1">
              <v-btn
                class="ma-2"
                small
                dark
                color="succes"
                @click="saveinfo"
              >
                Guardar
              </v-btn> -->
            </v-col>
          </v-row>
        </v-alert>
        <v-data-table
          :headers="headers"
          :items="relacionadasprg"
          class="elevation-0"
          dense
          hide-default-footer
          :loading="loading"
          :items-per-page="relacionadasprg.length"
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
    relacionadasInfo: [],
    //DATOS DE GetPaciente
    idpacientes: 3,
    idtrabsocial: 3,
    idcatencion: 4,
    idrelacionadas: 1,

    nModo: 1,
    loading: false,
    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
    r5: 0,
    r6: 0,
    r7: 0,
    r8: 0,
    r9: 0,
    r10: 0,
    r11: 0,
    r12: 0,
    r13: 0,
    r14: 0,
    r15: 0,
    r16: 0,
    r17: 0,
    r18: 0,
    nTotal: 0.0,
    nTipoRel: 0,
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
        // text: 'Conteste lo siguiente:',
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Nunca", value: "nunca" },
      { text: "Algunas veces", value: "algunas" },
      { text: "Siempre", value: "siempre" },
      // { text: 'Mucho', value: 'mucho' },
      // { text: 'Iron (%)', value: 'iron' },
    ],
    relacionadasprg: [
      { id: 1 ,name: 'Extraño a mi familia?', nunca: false, algunas: false, siempre: false},
      { id: 2 ,name: 'Me preocupa todo el tiempo que le pase algo a mi familia?', nunca: false, algunas: false, siempre: false},
      { id: 3 ,name: 'Siento que le he fallado a mi familia?', nunca: false, algunas: false, siempre: false},
      { id: 4 ,name: 'Extraño mi pueblo?', nunca: false, algunas: false, siempre: false},
      { id: 5 ,name: 'Extraño mi país?', nunca: false, algunas: false, siempre: false},
      { id: 6 ,name: 'Me siento extraño en este país, no me entienden?', nunca: false, algunas: false, siempre: false},
      { id: 7 ,name: 'Extraño a mis amigos?', nunca: false, algunas: false, siempre: false},
      { id: 8 ,name: 'Me falta mi pueblo, mi gente?', nunca: false, algunas: false, siempre: false},
      { id: 9 ,name: 'Siento miedo que me pase algo aquí?', nunca: false, algunas: false, siempre: false},
      { id: 10 ,name: 'Me siento amenazado?', nunca: false, algunas: false, siempre: false},
      { id: 11 ,name: 'Siento que me puedo morir?', nunca: false, algunas: false, siempre: false},
      { id: 12 ,name: 'He sufrido actos violentos?', nunca: false, algunas: false, siempre: false},
      { id: 13 ,name: 'He sido víctima de asaltos?', nunca: false, algunas: false, siempre: false},
      { id: 14 ,name: 'He presenciado actos violentos?', nunca: false, algunas: false, siempre: false},
      { id: 15 ,name: 'Siento que la vida me sonríe?', nunca: false, algunas: false, siempre: false},
      { id: 16 ,name: 'Me siento bien con mi vida?', nunca: false, algunas: false, siempre: false},
      { id: 17 ,name: 'En general, me siento feliz?', nunca: false, algunas: false, siempre: false},
      { id: 18 ,name: 'Siento que puedo hacer todo lo que me propongo?', nunca: false, algunas: false, siempre: false},
        
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
    this.idrelacionadas = this.$route.params.idrelacionadas;
    this.idnotasocial = this.$route.params.idnotasocial;

    this.getPaciente;
    this.idpacientes = this.getPaciente.idpacientes;

    this.getCatencion;
    this.idcatencion = this.getCatencion.idcatencion;
    this.getExpediente;

    this.idtrabsocial = this.getTrabsocial.idtrabsocial;

    // this.getPaciente
    // this.idpacientes = this.getPaciente.idpacientes

    // this.getCatencion
    // this.idcatencion = this.getCatencion.idcatencion
    // this.getExpediente

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);

    // this.consultar()
    // Determinar modo
    if (this.idrelacionadas > 0) {
      this.nModo = 2;
      // this.readonly = true;
      this.cargarInfo();
      this.modo = "Editar";
    } else {
      // console.log("nuevo");
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
    //       console.log ("EXPEDIENTE",response)
    //       this.idrelacionadas = response.data.result.idrelacionadas
    //       this.loading= false
    //       this.setExpediente(response.data.result)

    //       // Determinar modo
    //       if (this.idrelacionadas > 0) {
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
        // console.log("relacionadasprg", this.relacionadasprg[nuncaRow.id-1])
        this.relacionadasprg[nuncaRow.id - 1].algunas = false;
        this.relacionadasprg[nuncaRow.id - 1].siempre = false;
      }
    },

    algunasok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.algunas === true) {
        // console.log("relacionadasprg", this.relacionadasprg[nuncaRow.id -1])
        this.relacionadasprg[nuncaRow.id - 1].nunca = false;
        this.relacionadasprg[nuncaRow.id - 1].siempre = false;
      }
    },

    siempreok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.siempre === true) {
        // console.log("relacionadasprg", this.relacionadasprg[nuncaRow.id- 1])
        this.relacionadasprg[nuncaRow.id - 1].nunca = false;
        this.relacionadasprg[nuncaRow.id - 1].algunas = false;
      }
    },

    iratras() {
      this.$router
        .push({
          name: "valoracionpsi",
          params: {
            idansiedad: this.idrelacionadas,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    saveinfo() {
      // console.log("INICIA GRABAR.")

      /// VALIDAR QUE TERMINE
      this.termino = true;
      this.relacionadasprg.every((element) => {
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
      this.relacionadasprg.forEach((element) => {
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
      // console.log("Data actual", this.relacionadasprg)

      // Clasificar la relacionadas segun la siguiente tabla
      // 10 a 40 	No hay relacionadas
      // 41 a 49	relacionadas Moderada
      // 50 a 60	relacionadas grave

      this.nTipoRel = 0;
      if (this.nTotal >= 10 && this.nTotal < 40) {
        this.nTipoRel = 1;
      }

      if (this.nTotal >= 40 && this.nTotal < 50) {
        this.nTipoRel = 2;
      }

      if (this.nTotal >= 50 && this.nTotal <= 100) {
        this.nTipoRel = 3;
      }

      console.log("TIpo de relacionadas", this.nTipoRel);

      /// 3. Saveinfo.
      // Hay que pasar de relacionadasprg a payload relacionadas.
      // cada pregunta pasarla a un campo An donde n es id de la pregunta.

      let nRow = 1;
      this.relacionadasprg.forEach((element) => {
        let nColumna = "r" + nRow.toString();
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
        r1: this.r1,
        r2: this.r2,
        r3: this.r3,
        r4: this.r4,
        r5: this.r5,
        r6: this.r6,
        r7: this.r7,
        r8: this.r8,
        r9: this.r9,
        r10: this.r10,
        r11: this.r11,
        r12: this.r12,
        r13: this.r13,
        r14: this.r14,
        r15: this.r15,
        r16: this.r16,
        r17: this.r17,
        r18: this.r18,

        resultado: parseFloat(this.nTotal),
        tiporel: this.nTipoRel,
        idnotasocial: this.idnotasocial,
      };
      // console.log("Payload", payload)
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("relacionadas.insert", payload)
          .then((response) => {
            // console.log (response)
            this.showSnack({
              text: "Se grabó correctamente su registro de relacionadas",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router
              .push({
                name: "valoracionpsi",
                params: {
                  idansiedad: this.idrelacionadas,
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
        // relacionadas.update/:idrelacionadas
        // console.log("payload modo 2", payload);
        // console.log(this.idrelacionadas);
        this.$http
          .put("relacionadas.update/" + this.idrelacionadas, payload)
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
                  idansiedad: this.idrelacionadas,
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
      //  madnar cargar la información del paciente por idrelacionadas
      // relacionadas.update/:idrelacionadas
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idpacientes)
      this.$http
        // .get("relacionadas.get.pac/" + this.idpacientes)
        .get("relacionadas.get/" + this.idrelacionadas)
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
          this.relacionadasInfo = response.data.result;
          this.idrelacionadas = this.relacionadasInfo.idrelacionadas;


          this.r1 = this.relacionadasInfo.r1;
          this.r2 = this.relacionadasInfo.r2;
          this.r3 = this.relacionadasInfo.r3;
          this.r4 = this.relacionadasInfo.r4;
          this.r5 = this.relacionadasInfo.r5;
          this.r6 = this.relacionadasInfo.r6;
          this.r7 = this.relacionadasInfo.r7;
          this.r8 = this.relacionadasInfo.r8;
          this.r9 = this.relacionadasInfo.r9;
          this.r10 = this.relacionadasInfo.r10;
          this.r11 = this.relacionadasInfo.r11;
          this.r12 = this.relacionadasInfo.r12;
          this.r13 = this.relacionadasInfo.r13;
          this.r14 = this.relacionadasInfo.r14;
          this.r15 = this.relacionadasInfo.r15;
          this.r16 = this.relacionadasInfo.r16;
          this.r17 = this.relacionadasInfo.r17;
          this.r18 = this.relacionadasInfo.r18;

          this.nTotal = this.relacionadasInfo.resultado;
          this.nTipoRel = this.relacionadasInfo.tiporel;

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
      if (this.r1 === 1) {
        this.relacionadasprg[1 - 1].nunca = true;
      }
      if (this.r1 === 2) {
        this.relacionadasprg[1 - 1].algunas = true;
      }
      if (this.r1 === 3) {
        this.relacionadasprg[1 - 1].siempre = true;
      }
      ///DOS
      if (this.r2 === 1) {
        this.relacionadasprg[2 - 1].nunca = true;
      }
      if (this.r2 === 2) {
        this.relacionadasprg[2 - 1].algunas = true;
      }
      if (this.r2 === 3) {
        this.relacionadasprg[2 - 1].siempre = true;
      }
      ///tres
      if (this.r3 === 1) {
        this.relacionadasprg[3 - 1].nunca = true;
      }
      if (this.r3 === 2) {
        this.relacionadasprg[3 - 1].algunas = true;
      }
      if (this.r3 === 3) {
        this.relacionadasprg[3 - 1].siempre = true;
      }
      //Cuatro
      if (this.r4 === 1) {
        this.relacionadasprg[4 - 1].nunca = true;
      }
      if (this.r4 === 2) {
        this.relacionadasprg[4 - 1].algunas = true;
      }
      if (this.r4 === 3) {
        this.relacionadasprg[4 - 1].siempre = true;
      }
      //Cinco
      if (this.r5 === 1) {
        this.relacionadasprg[5 - 1].nunca = true;
      }
      if (this.r5 === 2) {
        this.relacionadasprg[5 - 1].algunas = true;
      }
      if (this.r5 === 3) {
        this.relacionadasprg[5 - 1].siempre = true;
      }
      //Seis
      if (this.r6 === 1) {
        this.relacionadasprg[6 - 1].nunca = true;
      }
      if (this.r6 === 2) {
        this.relacionadasprg[6 - 1].algunas = true;
      }
      if (this.r6 === 3) {
        this.relacionadasprg[6 - 1].siempre = true;
      }
      //Siete
      if (this.r7 === 1) {
        this.relacionadasprg[7 - 1].nunca = true;
      }
      if (this.r7 === 2) {
        this.relacionadasprg[7 - 1].algunas = true;
      }
      if (this.r7 === 3) {
        this.relacionadasprg[7 - 1].siempre = true;
      }
      //Ocho
      if (this.r8 === 1) {
        this.relacionadasprg[8 - 1].nunca = true;
      }
      if (this.r8 === 2) {
        this.relacionadasprg[8 - 1].algunas = true;
      }
      if (this.r8 === 3) {
        this.relacionadasprg[8 - 1].siempre = true;
      }
      //Nueve
      if (this.r9 === 1) {
        this.relacionadasprg[9 - 1].nunca = true;
      }
      if (this.r9 === 2) {
        this.relacionadasprg[9 - 1].algunas = true;
      }
      if (this.r9 === 3) {
        this.relacionadasprg[9 - 1].siempre = true;
      }
      //Diez
      if (this.r10 === 1) {
        this.relacionadasprg[10 - 1].nunca = true;
      }
      if (this.r10 === 2) {
        this.relacionadasprg[10 - 1].algunas = true;
      }
      if (this.r10 === 3) {
        this.relacionadasprg[10 - 1].siempre = true;
      }
      //Once
      if (this.r11 === 1) {
        this.relacionadasprg[11 - 1].nunca = true;
      }
      if (this.r11 === 2) {
        this.relacionadasprg[11 - 1].algunas = true;
      }
      if (this.r11 === 3) {
        this.relacionadasprg[11 - 1].siempre = true;
      }
      //Doce
      if (this.r12 === 1) {
        this.relacionadasprg[12 - 1].nunca = true;
      }
      if (this.r12 === 2) {
        this.relacionadasprg[12 - 1].algunas = true;
      }
      if (this.r12 === 3) {
        this.relacionadasprg[12 - 1].siempre = true;
      }
      //Trece
      if (this.r13 === 1) {
        this.relacionadasprg[13 - 1].nunca = true;
      }
      if (this.r13 === 2) {
        this.relacionadasprg[13 - 1].algunas = true;
      }
      if (this.r13 === 3) {
        this.relacionadasprg[13 - 1].siempre = true;
      }
      //Catorce
      if (this.r14 === 1) {
        this.relacionadasprg[14 - 1].nunca = true;
      }
      if (this.r14 === 2) {
        this.relacionadasprg[14 - 1].algunas = true;
      }
      if (this.r14 === 3) {
        this.relacionadasprg[14 - 1].siempre = true;
      }
      //Quince
      if (this.r15 === 1) {
        this.relacionadasprg[15 - 1].nunca = true;
      }
      if (this.r15 === 2) {
        this.relacionadasprg[15 - 1].algunas = true;
      }
      if (this.r15 === 3) {
        this.relacionadasprg[15 - 1].siempre = true;
      }
      //Diesiseis
      if (this.r16 === 1) {
        this.relacionadasprg[16 - 1].nunca = true;
      }
      if (this.r16 === 2) {
        this.relacionadasprg[16 - 1].algunas = true;
      }
      if (this.r16 === 3) {
        this.relacionadasprg[16 - 1].siempre = true;
      }
      //Diesisiete
      if (this.r17 === 1) {
        this.relacionadasprg[17 - 1].nunca = true;
      }
      if (this.r17 === 2) {
        this.relacionadasprg[17 - 1].algunas = true;
      }
      if (this.r17 === 3) {
        this.relacionadasprg[17 - 1].siempre = true;
      }
      //Diesiocho
      if (this.r18 === 1) {
        this.relacionadasprg[18 - 1].nunca = true;
      }
      if (this.r18 === 2) {
        this.relacionadasprg[18 - 1].algunas = true;
      }
      if (this.r18 === 3) {
        this.relacionadasprg[18 - 1].siempre = true;
      }
    },
  },
};
</script>
