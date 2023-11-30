<template>
  <v-card color="transparent" flat>
    <v-card rounded="lg" class="mb-5" flat>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="pa-2">
          <v-col cols="12" md="3" sm="3" lg="3">
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
                  v-model="date"
                  label="Fecha de creación"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  rounded
                  filled
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="2" sm="4" lg="2">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Hora"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  rounded
                  filled
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <!-- <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker> -->
            </v-menu>
          </v-col>

          <v-col cols="12" md="3" sm="4" lg="3">
            <v-text-field
              readonly
              label="Centro de atencion"
              prepend-inner-icon="mdi-map-marker"
              hide-details
              placeholder="clinica, albergue, etc."
              v-model="nomcatencion"
              rounded
              filled
            >
            </v-text-field>
          </v-col>

          <!-- <v-row justify="center" class="mt-5 mb-3">
          <v-btn dark color="info" @click="saveinfo">Guardar </v-btn>
        </v-row> -->
        </v-row>

        <v-divider class="mt-2"></v-divider>

        <!-- SECCION 2    HOLA           -->
        <v-row class="mx-2 mt-4">
          <v-col cols="12" md="2" sm="2" lg="2">
            <v-row justify="center" align="center" class="mr-10">
              <v-avatar class="ml-10" size="100" rounded="xl">
                <v-img src="@/assets/logoedsm.png"></v-img>
              </v-avatar>
            </v-row>
          </v-col>

          <v-col cols="12" md="10" sm="10">
            <v-row>
              <v-col cols="12" md="4" sm="4" lg="4">
                <v-text-field
                  label="Nombre(s)"
                  hide-details
                  dense
                  v-model="nombres"
                  prepend-inner-icon="mdi-account"
                  :rules="validaRules"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="4" lg="4">
                <v-text-field
                  label="Apellido paterno"
                  hide-details
                  v-model="appaterno"
                  dense
                  :rules="validaRules"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="4" lg="4">
                <v-text-field
                  label="Apellido materno"
                  hide-details
                  v-model="apmaterno"
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="3" sm="5" lg="3">
                <v-menu
                  ref="menu"
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fechanac"
                      label="Fecha de nacimiento"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      dense
                      hide-details
                      v-bind="attrs"
                      v-on="on"
                      :rules="validaRules"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fechanac"
                    :active-picker.sync="activePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="calcularedad"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="2" sm="2" lg="2">
                <v-text-field
                  label="Peso (kg)"
                  hide-details
                  v-model="peso"
                  @blur="calimc"
                  dense
                  type="number"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="2" lg="2">
                <v-text-field
                  label="Talla (m)"
                  hide-details
                  type="number"
                  @blur="calimc"
                  v-model="talla"
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="3" lg="2">
                <v-text-field
                  label="IMC"
                  hide-details
                  type="number"
                  v-model="imc"
                  readonlys
                  dense
                >
                </v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="4" sm="4" lg="4">
              <v-text-field
                label="Trabajo actual"
                v-model="ocupacion"
                dense
                hide-details
                prepend-inner-icon="mdi-briefcase"
              >
              </v-text-field>
            </v-col> -->
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="2" sm="4" lg="2">
                <v-select
                  return-object
                  label="Sexo"
                  :items="generoopc"
                  hide-details
                  v-model="generosel"
                  dense
                  item-text="opcion"
                  item-value="id"
                  persistent-hint
                  prepend-inner-icon="mdi-gender-male-female"
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="3" sm="4" lg="3">
                <v-select
                  return-object
                  label="Género con el que se identifica"
                  :items="generoideopc"
                  v-model="generoidesel"
                  hide-details
                  item-text="opcion"
                  @change="desactivargenero"
                  item-value="id"
                  persistent-hint
                  dense
                  prepend-inner-icon="mdi-gender-male-female"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="2" v-if="generoidesel.id === 3">
                <v-text-field
                  label="Qué género?"
                  hide-details
                  dense
                  v-model="generoab"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3" sm="4" lg="3">
                <v-select
                  label="Estado civil"
                  :items="edocivilopc"
                  v-model="edocivilsel"
                  item-text="opcion"
                  item-value="id"
                  persistent-hint
                  dense
                  return-object
                  prepend-inner-icon="mdi-account-supervisor-circle"
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="3" sm="3" lg="3">
                <v-text-field
                  label="Teléfono"
                  dense
                  v-model="telefono"
                  hide-details
                  prepend-inner-icon="mdi-phone"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="2" sm="2" lg="2">
                <v-text-field
                  type="number"
                  label="Edad"
                  hide-details
                  dense
                  v-model="edad"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="3" lg="3">
                <v-select
                  label="Tipo de sangre"
                  :items="tiposangreopc"
                  v-model="tiposangresel"
                  item-text="opcion"
                  item-value="id"
                  dense
                  return-object
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="3" sm="4" lg="3">
                <v-select
                  label="Escolaridad"
                  hide-details
                  :items="escolaridadopc"
                  dense
                  return-object
                  item-text="opcion"
                  item-value="id"
                  v-model="escolaridadsel"
                  prepend-inner-icon="mdi-school"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="4" sm="5" lg="4">
                <v-text-field
                  label="Correo electrónico"
                  dense
                  v-model="email"
                  hide-details
                  prepend-inner-icon="mdi-gmail"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="2" sm="2" lg="2">
                <v-switch
                  v-model="menor"
                  class="mt-1"
                  hide-details
                  label="Menor de edad"
                  @change="desactivar"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-card class="mt-2" rounded="lg" flat>
      <v-row>
        <v-col>
          <h4 class="ml-13">Datos del lugar de origen</h4>
        </v-col>
      </v-row>
      <v-row>
     
        <v-col cols="12" md="4" sm="6" lg="4">
          <leePaises></leePaises>
        </v-col>

        <v-col cols="12" md="3" sm="3" lg="3">
          <v-text-field
            class="mx-3"
            label="Ciudad/Provincia"
            v-model="ciudad"
            hide-details
            dense
          >
          </v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="3" sm="3" lg="3">
          <v-text-field
            class="mx-3"
            label="Estado"
            v-model="estado"
            hide-details
            dense
          >
          </v-text-field>
        </v-col> -->
        <v-col cols="12" md="3" sm="3" lg="3">
          <v-select
            class="mx-3 mb-2"
            label="Tipo de localidad"
            v-model="tipopueblosel"
            :items="tipopuebloopc"
            hide-details
            dense
            return-object
            item-text="opcion"
            item-value="id"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="6" sm="6" lg="3" v-if="menor === true">
          <v-text-field
            class="mx-3"
            label="Nombre de padre/madre/tutor en caso de menor de edad"
            hide-details
            dense
            v-model="tutor"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-5 mb-3">
        <!-- <v-col cols="12" md="3" sm="4" lg="3">
            <v-text-field
              readonly
              label="Trab. Social que atendio:"
              prepend-inner-icon="mdi-account"
              hide-details
              v-model="nomcatencion"
              outlined
              filled
              dense
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="4" lg="3">
            <v-text-field
              readonly
              filled
              label="Medico que atendio:"
              prepend-inner-icon="mdi-doctor"
              hide-details
              placeholder="clinica, albergue, etc."
              v-model="nomcatencion"
              outlined
              dense
            >
            </v-text-field>
          </v-col> -->
        <v-btn dark color="info" class="mb-3 mt-4" @click="saveinfo">Guardar </v-btn>
      </v-row>
    </v-card>
    
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tiempo from "@/mixins/tiempo.js";
import leePaises from "@/components/leepaises";

export default {
  mixins: [tiempo],
  components: {
    leePaises,
  },

  data: () => ({
    valid: true,
    validaRules: [(v) => !!v || "Name is required"],
    menor: false,

    //DATOS DE GetPaciente
    idpacientes: 0,
    idtrabsocial: 0,
    idcatencion: 0,
    idsocial: 0,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fechanac: "",

    menu: false,
    modal: false,
    menu1: false,

    menu3: false,
    activePicker: "YEAR",

    // idpacientes: 3,
    // idsocial: 3,

    nomcatencion: "",

    nombres: "",
    appaterno: "",
    apmaterno: "",
    nompaciente: "",

    // fechanac: "",
    genero: "",
    generoab: "",
    edocivil: "",
    peso: 0,
    talla: 0,
    imc: 0,
    ocupacion: "",
    edad: 0,
    escolaridad: "",
    email: "",
    telefono: "",

    calle: "",
    numext: "",
    colonia: "",
    ciudad: "",
    estado: "",
    pais: "",
    tutor: "",

    // hora
    time: null,

    menu2: false,
    modal2: false,
    tiposangreopc: [
      { opcion: "Ninguno", id: 0 },
      { opcion: "A+", id: 1 },
      { opcion: "O+", id: 2 },
      { opcion: "B+", id: 3 },
      { opcion: "AB+", id: 4 },
      { opcion: "A-", id: 5 },
      { opcion: "O-", id: 6 },
      { opcion: "B-", id: 7 },
      { opcion: "AB-", id: 8 },
    ],
    tiposangresel: { opcion: "", id: 0 },

    generoopc: [
      { opcion: "No contestó", id: 0 },
      { opcion: "Masculino", id: 1 },
      { opcion: "Femenino", id: 2 },
      // { opcion: "Otro", id: 3 },
    ],
    generosel: { opcion: "", id: 1 },

    generoideopc: [
      { opcion: "No contestó", id: 0 },
      { opcion: "Masculino", id: 1 },
      { opcion: "Femenino", id: 2 },
      { opcion: "Otro", id: 3 },
    ],
    generoidesel: { opcion: "", id: 1 },

    edocivilopc: [
      { opcion: "No contestó", id: 0 },
      { opcion: "Soltero", id: 1 },
      { opcion: "Casado", id: 2 },
      { opcion: "Separado/Divorciado", id: 3 },
      { opcion: "Viudo", id: 4 },
      { opcion: "Union libre", id: 5 },
    ],
    edocivilsel: { opcion: "", id: 0 },

    escolaridadopc: [
      { opcion: "No contestó", id: 0 },
      { opcion: "Primaria", id: 1 },
      { opcion: "Primaria trunca", id: 2 },
      { opcion: "Secundaria", id: 3 },
      { opcion: "Secundaria trunca", id: 4 },
      { opcion: "Carrera técnica", id: 5 },
      { opcion: "Carrera técnica trunca", id: 6 },
      { opcion: "Preparatoria", id: 7 },
      { opcion: "Preparatoria profesional", id: 8 },
      { opcion: "Preparatoria trunca", id: 9 },
      { opcion: "Licenciatura", id: 10 },
      { opcion: "Licenciatura trunca", id: 11 },
      { opcion: "Posgrado", id: 12 },
    ],
    escolaridadsel: { opcion: "", id: 0 },

    tipopuebloopc: [
      { opcion: "No contestó", id: 0 },
      { opcion: "Rural", id: 1 },
      { opcion: "Semiurbano", id: 2 },
      { opcion: "Urbano", id: 3 },
    ],
    tipopueblosel: { opcion: "", id: 0 },
  }),

  created() {
    // console.log(this.getPaciente)
    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    this.getCatencion;
    this.idcatencion = parseInt(this.getCatencion.idcatencion);

    this.getExpediente;

    this.time = this.gethora();
    this.nomcatencion = this.getCatencion.nombre;

    // this.idusuarioweb = this.getdatosUsuario.idusuarioweb
    // SE va a usar GetPaciente para cargar datos de vista.
    //MODO EDITAR
    if (this.getPaciente.idpacientes !== 0) {
      this.nModo = 2;
      this.readonly = true;
      this.cargarInfo(this.$route.params);
      this.modo = "Editar";
    } else {
      // console.log("nuevo");
      //VALORES INICIALES ALTA
      this.nModo = 1;
      this.modo = "Nuevo";
    }
  },

  computed: {
    ...mapGetters("Login", ["getdatosUsuario", "getLogeado"]),
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("paises", ["getPais"]),

    validaInfo() {
      
      return (
        this.nombres !== "" &&
        this.appaterno !== "" &&
        this.fechanac !== "" &&
        // this.generosel.id > 0 &&
        // this.escolaridadsel.id > 0 &&
        // this.edocivilsel.id > 0 &&
        this.getPais.iso3 !== ""
      );
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("pacientes", ["setPaciente"]),
    ...mapActions("paises", ["setPais"]),

    // validate () {
    //   this.$refs.form.validate()
    // },
    calcularedad(fechanac) {
      const fechaact = new Date();

      //FECHA DE HOY
      const añoact = parseInt(fechaact.getFullYear());
      const mesact = parseInt(fechaact.getMonth());
      const diaact = parseInt(fechaact.getDay());
      // console.log(añoact);

      //FECHA DE NACIMIENTO
      const añonacimiento = parseInt(String(this.fechanac).substring(0, 4));
      const mesnacimiento = parseInt(String(this.fechanac).substring(5, 7));
      const dianacimiento = parseInt(String(this.fechanac).substring(8, 10));
      // console.log(añonacimiento);

      let edad2 = añoact - añonacimiento;
      // console.log(edad2);

      if (mesact < mesnacimiento) {
        edad2 = edad2 - 1;
      } else if (mesact === mesnacimiento) {
        if (diaact < dianacimiento) {
          edad2 = edad2 - 1;
        }
      }

      this.edad = edad2;
    },

    calimc() {
      if (this.peso > 0 && this.talla > 0) {
        this.imc = (this.peso / (this.talla * this.talla)).toFixed(2);

        // console.log(imc)
      }
    },

    desactivargenero() {
      if (this.generoidesel.id != 3) {
        this.generoab = "";
      }
    },

    desactivar() {
      if (this.menor === false) {
        this.tutor = "";
      }
    },

    savefecha(date) {
      // console.log(date);
      // console.log(this.date);
      this.$refs.menu.save(date);
    },

    cargarInfo() {
      this.loading = true;
      console.log("payload modo 2 GetPaciente", this.getPaciente);
      this.idpacientes = this.getPaciente.idpacientes;


      this.nombres = this.getPaciente.nombres;
      this.appaterno = this.getPaciente.appaterno;
      this.apmaterno = this.getPaciente.apmaterno;
      this.nompaciente =
        this.nombres + " " + this.appaterno + " " + this.apmaterno;

      this.fechanac = this.getPaciente.fechanac;
      this.genero = this.getPaciente.genero;
      this.generoab = this.getPaciente.generoab;
      this.edocivil = this.getPaciente.edocivil;
      this.ocupacion = this.getPaciente.ocupacion;
      this.edad = this.getPaciente.edad;

      this.peso = this.getPaciente.peso;
      this.talla = this.getPaciente.talla;
      this.imc = this.getPaciente.imc;
      this.tiposangre = this.getPaciente.tiposangre;

      this.email = this.getPaciente.email;
      this.telefono = this.getPaciente.telefono;

      this.calle = this.getPaciente.calle;
      this.numext = this.getPaciente.numext;
      // this.numint = this.getPaciente.numint;
      this.colonia = this.getPaciente.colonia;
      this.ciudad = this.getPaciente.ciudad;
      this.estado = this.getPaciente.estado;
      this.pais = this.getPaciente.pais;
      this.tipopueblo = this.getPaciente.tipopueblo;

      this.tutor = this.getPaciente.tutor;
      if (this.tutor != "") {
        this.menor = true;
      }

      // this.escolaridad = this.getPaciente.escolaridad;
      this.convertirDatos(this.getPaciente);
    },

    saveinfo() {
      // console.log("getPais",this.getPais)
      this.$refs.form.validate();
      if (!this.validaInfo) {
        
        this.showSnack({
          text: "Debes registrar el nombre(s), primer apellido ,fecha de nacimiento y país",
          color: "orange",
          timeout: 2000,
        });
        return;
      }

      this.nompaciente =
        this.nombres + " " + this.appaterno + " " + this.apmaterno;

      let payload = {
        //Nombres
        nombres: this.nombres,
        appaterno: this.appaterno,
        apmaterno: this.apmaterno,

        //Domicilio
        calle: this.calle,
        numext: this.numext,
        // numint: this.numint,
        colonia: this.colonia,
        ciudad: this.ciudad,
        estado: this.estado,
        pais: this.pais,
        tutor: this.tutor,

        //Datos paciente
        fechanac: this.fechanac,
        generoab: this.generoab,

        peso: parseFloat(this.peso),
        talla: parseFloat(this.talla),
        imc: parseFloat(this.imc),

        ocupacion: this.ocupacion,
        edad: parseInt(this.edad),
        telefono: this.telefono,

        // ALTA DE USUARIO PACIENTE
        email: this.email,
        nompaciente: this.nompaciente,

        //Datos expediente
        fechaalta: this.date,
        horaalta: this.gethora(),
        idcatencion: parseInt(this.getCatencion.idcatencion),

        //DATOS DE CATALOGOS SELECTS
        edocivil: this.edocivilsel.id,
        escolaridad: this.escolaridadsel.id,
        genero: this.generosel.id,
        generoide: this.generoidesel.id,
        tipopueblo: this.tipopueblosel.id,
        tiposangre: this.tiposangresel.id,

        //Grabar codigo pais iso3 en pacientes
        iso3: this.getPais.iso3,
      };

      // console.log("payload", payload);

      //NUEVO
      if (this.nModo == 1) {
        this.$http
          .post("pacientes.insert", payload)
          .then((response) => {
            // console.log("response", response);

            this.showSnack({
              text: "Paciente agregado correctamente",
              color: "success",
              timeout: 2000,
            });

            // Se Asigna el this.idpacientes al payload para meterlo vuex del pacientes.
            payload.idpacientes = response.data.result.idpacientes;
            //ASIGNAR PACIENTE al VUex
            this.setPaciente(payload);
            this.limpiar();
            setTimeout(() => this.$router.push({ name: "panel" }), 2000);
          })
          .catch((error) => {
            console.log(error);
            this.showSnack({
              text: "Problema para grabar al paciente",
              color: "error",
              timeout: 2000,
            });
          });
      }

      //EDITAR
      if (this.nModo == 2) {
        // Se Asigna el this.idpacientes al payload para meterlo vuex del pacientes.
        payload.idpacientes = parseInt(this.idpacientes);

        // console.log("paylo", payload);
        this.$http
          .put("pacientes.update/" + this.idpacientes, payload)
          .then(() => {
            this.showSnack({
              text: "Paciente actualizado correctamente ",
              color: "success",
              timeout: 2000,
            });
            this.setPaciente(payload);
            this.limpiar();
            setTimeout(() => this.$router.push({ name: "panel" }), 2000);
          })
          .catch((error) => {
            // console.log("error", error.data)
            this.showSnack({
              text: "Problema para grabar  :" + error.data.message,
              color: "error",
              timeout: 2000,
            });
          });
      }
    },

    limpiar() {
      let item = {
        iso3: 0,
        name: "",
      };
      this.setPais(item);
    },

    convertirDatos() {
      this.getPaciente;
      //ESTADO CIVIL




      this.edocivilsel.id = parseInt(this.getPaciente.edocivil);
      this.edocivilsel.opcion = this.edocivilopc[this.edocivilsel.id].opcion;
      this.edocivilsel = {
        opcion: this.edocivilsel.opcion,
        id: this.edocivilsel.id,
      };

      // ESCOLARIDAD

      this.escolaridadsel.id = parseInt(this.getPaciente.escolaridad);
      this.escolaridadsel.opcion =
        this.escolaridadopc[this.escolaridadsel.id].opcion;
      this.escolaridadsel = {
        opcion: this.escolaridadsel.opcion,
        id: this.escolaridadsel.id,
      };

      // GENERO
      this.generosel.id = parseInt(this.getPaciente.genero);
      this.generosel.opcion = this.generoopc[this.generosel.id].opcion;
      this.generosel = {
        opcion: this.generosel.opcion,
        id: this.generosel.id,
      };

      // GENERO ID
      // console.log("this.getPaciente, genero id", this.getPaciente);
      this.generoidesel.id = parseInt(this.getPaciente.generoide);

      // console.log ("generoide", this.generoidesel)
      this.generoidesel.opcion = this.generoideopc[this.generoidesel.id].opcion;

      this.generoidesel = {
        opcion: this.generoidesel.opcion,
        id: this.generoidesel.id,
      };

      //  Poises
      // console.log("Paciente pais iso3", this.getPaciente);
      this.iso3 = this.getPaciente.iso3;
      this.pais = this.getPaciente.pais;

      this.$http.get("paises.get/" + this.iso3).then(
        (response) => {
          // console.log("respone ger Pais", response);
          this.setPais(response.data.result);
          // console.log("response catencion.get", response.data.result)
          // dispatch('paises/setPais', response.data.result, { root: true })
        },
        (error) => {
          console.log(error);
        }
      );

      // tipopueblo
      // console.log("this.getPaciente,tipopueblo", this.getPaciente);

      this.tipopueblosel.id = parseInt(this.getPaciente.tipopueblo);
      // console.log("tipopueblo", this.tipopueblosel.id);
      this.tipopueblosel.opcion =
        this.tipopuebloopc[this.tipopueblosel.id].opcion;
      this.tipopueblosel = {
        opcion: this.tipopueblosel.opcion,
        id: this.tipopueblosel.id,
      };

      // this.tiposangresel.id = parseInt(this.getPaciente.tiposangre);
      // console.log(this.tiposangresel.id)
      // this.tiposangresel.opcion =
      //   this.tiposangreopc[this.tiposangresel.id - 1].opcion;
      // this.tiposangresel = {
      //   opcion: this.tiposangresel.opcion,
      //   id: this.tiposangresel.id,
      // };

      this.tiposangresel.id = parseInt(this.getPaciente.tiposangre);
      // console.log("tipo de sangre", this.tiposangresel.id);
      this.tiposangresel.opcion =
        this.tiposangreopc[this.tiposangresel.id].opcion;
      this.tiposangresel = {
        opcion: this.tiposangresel.opcion,
        id: this.tiposangresel.id,
      };
    },
  },
};
</script>