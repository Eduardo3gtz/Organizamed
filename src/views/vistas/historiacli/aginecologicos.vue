<template>
  <v-container :loading="loading">
    <v-card flat rounded="xl">
      <v-card flat class="mb-1" rounded="xl">
        <v-row>
          <v-col cols="12" md="4" lg="4" sm="5">
            <h3 class="ml-10">Antecedentes ginecológicos</h3>
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
            <v-btn color="orange" class="mr-4" :to="{ name: 'historiacli' }" dark>
              <v-icon class="mx-2">mdi-reply</v-icon>
            </v-btn>
            <v-btn dark color="info" @click="saveinfo">Guardar</v-btn>
          </v-row>
        </v-row>
      </v-card>

      <v-row class="ma-1">
        <v-col cols="12" xs="12">
          <v-row class="mt-2">
            <v-col cols="12" sm="4" md="4" xs="12">
              <v-text-field
                label="No. De Partos:"
                hide-details
                dense
                rounded
                filled
                type="number"
                @change="desactivarfparto"
                v-model="partos"
              >
              </v-text-field>
              <v-menu
                v-if="partos > 0"
                v-model="menupartos"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fparto"
                    class="mt-2"
                    hide-details
                    label="Fecha de último parto"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fparto"
                  @input="menupartos = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12">
              <v-text-field
                label="No. De Cesáreas:"
                hide-details
                dense
                rounded
                @change="desactivarfcesarea"
                filled
                type="number"
                v-model="cesareas"
              >
              </v-text-field>
              <v-menu
                v-if="cesareas > 0"
                v-model="menucesarea"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fcesarea"
                    class="mt-2"
                    hide-details
                    label="Fecha de última cesárea"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fcesarea"
                  @input="menucesarea = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12">
              <v-text-field
                label="No. De Abortos:"
                hide-details
                dense
                rounded
                @change="desactivarfaborto"
                filled
                type="number"
                v-model="abortos"
              >
              </v-text-field>
              <v-menu
                v-if="abortos > 0"
                v-model="menuabortos"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="faborto"
                    class="mt-2"
                    hide-details
                    label="Fecha de último aborto"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="faborto"
                  @input="menuabortos = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                dense
                :items="tipopartoopc"
                v-model="tipopartosel"
                return-object
                @change="desactivarparto"
                item-text="opcion"
                item-value="id"
                
                label="¿Hubo complicaciones en el parto?"
              >
              </v-select>
              <v-text-field
                v-if="tipopartosel.id === 1"
                label="¿Qué tipo de complicación?"
                dense
                hide-details
                v-model="complicacion"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                dense
                :items="embarazadaopc"
                v-model="embarazadasel"
                return-object
                @change="desactivaremba"
                item-text="opcion"
                item-value="id"
                label="¿Está embarazada?"
              >
              </v-select>
              <v-text-field
                v-if="embarazadasel.id === 1"
                label="¿Cuántas semanas tiene de gestación?"
                dense
                type="number"
                hide-details
                v-model="semanas"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>

        

        <v-col cols="12" md="6">
          
            <v-text-field label="Óbitos:" class="py-0" dense v-model="obitos">
            </v-text-field>
           
            <v-text-field
              label="Cirugías mamarias o tratamientos contra cáncer de mama:"
              class="py-0"
              dense
              v-model="cirugiasma"
            >
            </v-text-field>

            <v-text-field
              label="Cirugías obstétricas:"
              class="mt-2"
              dense
              hide-details
              v-model="cirugias"
            >
            </v-text-field>

             <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fmenarquia"
                label="Fecha de Menarquia"
                prepend-inner-icon="mdi-calendar"
                readonly
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fmenarquia"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        

        <v-col cols="12" md="6">

          <v-card rounded="xl" class="mt-2">
            <h4 class="ml-4 mt-3">Menstruación</h4>
            <v-col>
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
                    v-model="fmestrua"
                    dense
                    label="Fecha ultima menstruación"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fmestrua"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Periodicidad de Menstruación:"
                class="py-0"
                dense
                v-model="pmestrua"
              >
              </v-text-field>

              <v-text-field
                label="Duración de menstruación:"
                class="py-0"
                dense
                v-model="dmestrua"
              >
              </v-text-field>
            </v-col>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card rounded="xl">
            <h4 class="ml-4 mt-3">Papanicolau</h4>
            <v-col>
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fpapani"
                    label="Fecha de último Papanicolau"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fpapani"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Resultado de Papanicolau:"
                class="py-0"
                dense
                v-model="rpapani"
              >
              </v-text-field>
            </v-col>
          </v-card>
          <!-- fecha {{ fecha }} date {{ date }} -->
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mt-2" rounded="xl">
            <h4 class="ml-4 mt-3">Mamografías</h4>
            <v-col>
              <v-menu
                v-model="menu4"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fmamogra"
                    label="Fecha ultima mamografía"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fmamogra"
                  @input="menu4 = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Resultado de mamografía:"
                class="py-0"
                dense
                v-model="rmamogra"
              >
              </v-text-field>
            </v-col>
          </v-card>

        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-2 mb-3">
        <v-btn dark class="mt-1 mb-2" color="info" @click="saveinfo">Guardar</v-btn>
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

    tipopartoopc: [
      { opcion: "Si", id: 1 },
      { opcion: "No", id: 0 },
    ],
    tipopartosel: { opcion: "", id: 0 },
    complicacion:'',

    embarazadaopc: [
      { opcion: "Si", id: 1 },
      { opcion: "No", id: 0 },
    ],
    embarazadasel: { opcion: "", id: 0 },
    semanas:'',

    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menupartos: false,
    menucesarea: false,
    menuabortos: false,

    idginecologicos: 0,
    idmedicos: 0,
    idpacientes: 0,
    idcatencion: 0,
    fecha: "",
    hora: "",
    partos: 0,
    cesareas: 0,
    abortos: 0,
    obitos: "",
    fmenarquia: "",
    fmestrua: "",
    pmestrua: "",
    dmestrua: "",
    cirugias: "",
    fpapani: "",
    rpapani: "",
    fmamogra: "",
    rmamogra: "",
    cirugiasma: "",

    fparto:'',
    fcesarea:'',
    faborto:'',

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
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

    desactivarfparto(){
      if (this.partos < 0){
        this.fparto = ''
      }
    },
    desactivarfcesarea(){
      if (this.cesarea < 0){
        this.fcesarea = ''
      }
    },
    desactivarfaborto(){
      if (this.abortos < 0){
        this.faborto = ''
      }
    },

    desactivarparto(){
      if (this.tipopartosel.id != 1){
        this.complicacion = ''
      }
    },
    desactivaremba(){
      if (this.embarazadasel.id != 1){
        this.semanas = 0
      }
    },

    consultar() {
      this.loading = true;
      this.$http
        .get("expedientes.get/" + this.idpacientes)
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            this.idginecologicos = response.data.result.idginecologicos;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idginecologicos > 0) {
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
        .get("ginecologicos.get/" + this.idginecologicos)
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
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("ginecologicos.insert", this.payloadData)
          .then((response) => {
            console.log(response);
            this.showSnack({
              text: "El expediente ha grabado los antecedentes ginecológicos",
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
        console.log(this.idginecologicos);
        this.$http
          .put("ginecologicos.update/" + this.idginecologicos, this.payloadData)
          .then((response) => {
            this.showSnack({
              text: "El expediente ha actualizado los antecedentes ginecológicos",
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

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },

    dataTransforma() {
      this.payloadData = {
        // idginecologicos: 0,
        idmedicos: this.idmedicos,
        idpacientes: parseInt(this.idpacientes),
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        hora: this.hora,
        partos: parseInt(this.partos),
        cesareas: parseInt(this.cesareas),
        abortos: parseInt(this.abortos),
        obitos: this.obitos,
        fmenarquia: this.fmenarquia,
        fmestrua: this.fmestrua,

        pmestrua: this.pmestrua,
        dmestrua: this.dmestrua,

        cirugias: this.cirugias,
        fpapani: this.fpapani,
        rpapani: this.rpapani,
        fmamogra: this.fmamogra,
        rmamogra: this.rmamogra,
        cirugiasma: this.cirugiasma,

        fparto: this.fparto,
        fcesarea: this.fcesarea,
        faborto: this.faborto,

        complicacion: this.complicacion,
        tipoparto: this.tipopartosel.id,

        semanas: parseInt(this.semanas),
        embarazada: this.embarazadasel.id,
      };

      console.log("payload prepare ", this.payloadData);
    },

    // cargarInfo2
    convertirDatos(gineInfo) {
      // console.log("response ginecologicos.get", gineInfo);
      // idginecologicos: 0,
      this.idmedicos = gineInfo.idmedicos;
      this.idpacientes = parseInt(gineInfo.idpacientes);
      this.idcatencion = gineInfo.idcatencion;
      this.fecha = gineInfo.fecha;
      this.hora = gineInfo.hora;
      this.partos = gineInfo.partos;
      this.cesareas = gineInfo.cesareas;
      this.abortos = gineInfo.abortos;
      this.obitos = gineInfo.obitos;
      this.fmenarquia = gineInfo.fmenarquia;
      this.fmestrua = gineInfo.fmestrua;
      this.pmestrua = gineInfo.pmestrua;
      this.dmestrua = gineInfo.dmestrua;
      this.cirugias = gineInfo.cirugias;
      this.fpapani = gineInfo.fpapani;
      this.rpapani = gineInfo.rpapani;
      this.fmamogra = gineInfo.fmamogra;
      this.rmamogra = gineInfo.rmamogra;
      this.cirugiasma = gineInfo.cirugiasma;

      this.fparto = gineInfo.fparto;
      this.fcesarea = gineInfo.fcesarea;
      this.faborto = gineInfo.faborto;

      this.complicacion = gineInfo.complicacion;

      this.tipopartosel.opcion = this.tipopartoopc[this.tipopartosel.id].opcion;
      this.tipopartosel = {
        opcion: this.tipopartosel.opcion,
        id: gineInfo.tipoparto,
      }

      this.semanas = gineInfo.semanas;
      
      this.embarazadasel.opcion = this.embarazadaopc[this.embarazadasel.id].opcion;
      this.embarazadasel = {
        opcion: this.embarazadasel.opcion,
        id: gineInfo.embarazada,
      }
    },
  },
};
</script>

<style>
</style>