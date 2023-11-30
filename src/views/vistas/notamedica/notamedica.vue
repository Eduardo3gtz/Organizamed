<template>
  <v-container>
    <v-toolbar class="mb-3" flat justify="center">
      <h3>NOTA MÉDICA</h3>
      {{ hora }}
      <v-spacer></v-spacer>
      <v-btn color="orange" to="catnotamed" dark class="mr-3">
        <v-icon class="mx-2">mdi-reply</v-icon>
      </v-btn>
      <v-btn dark color="info" @click="saveinfo">Guardar</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card flat>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="mx-3">
          <v-col cols="12" md="5">
            <v-text-field
              readonly
              label="Nombre del paciente"
              prepend-inner-icon="mdi-account"
              hide-details
              v-model="nompaciente"
              rounded
              filled
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              readonly
              label="Centro de atención"
              prepend-inner-icon="mdi-account"
              hide-details
              v-model="nomcatencion"
              rounded
              filled
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
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
                  v-model="fecha"
                  label="Fecha Nota médica"
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
                v-model="fecha"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-divider class="mt-2 mb-3"></v-divider>

        <v-row>
          <v-col cols="12" md="9">
            <v-row class="mx-2">
              <v-col cols="12" md="3">
                <v-text-field
                  label="Edad del paciente"
                  v-model="edad"
                  type="number"
                  dense
                  color="red"
                  filled
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Peso(kg)"
                  v-model="peso"
                  :min="0"
                  :max="400"
                  :rules="pesoRules"
                  type="number"
                  dense
                  filled
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Talla (m)"
                  v-model="talla"
                  type="number"
                  dense
                  filled
                  :rules="tallaRules"
                  :min="30"
                  :max="220"
                >
                </v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="3">
              <v-text-field
                label="Altura (metros)"
                v-model="altura"
                type="number"
                dense
                hide-details
              >
              </v-text-field>
            </v-col> -->
              <v-col cols="12" md="3">
                <v-text-field
                  label="IMC Calculado"
                  type="number"
                  dense
                  filled
                  readonly
                  v-model="imc"
                  hide-details
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  label="Tipo de sangre"
                  :items="tiposangreopc"
                  v-model="tiposangresel"
                  item-text="opcion"
                  item-value="id"
                  dense
                  readonly
                  class="mt-3"
                  return-object
                >
                </v-select>
                <!-- <v-text-field
                label="Tipo de sangre"
                v-model="tiposangre"
                readonly
                dense
                class="mt-3"
                hide-details
              >
              </v-text-field> -->
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  label="Frecuencia cardiaca"
                  type="number"
                  dense
                  :rules="frecuenciaRules"
                  :min="40"
                  :max="220"
                  class="mt-3"
                  v-model="fcardiaca"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" md="6">
                <v-row class="mt-2">
                  <v-col cols="3">
                    <h4 class="mt-1">Presión</h4>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Sistólica"
                      :rules="sistolicaRules"
                      :min="50"
                      :max="300"
                      type="number"
                      dense
                      v-model="sistolica"
                    >
                    </v-text-field>
                  </v-col>
                  <h1>/</h1>
                  <v-col cols="4">
                    <v-text-field
                      label="Diastólica"
                      type="number"
                      dense
                      :rules="diastolicaRules"
                      :min="20"
                      :max="200"
                      class=""
                      v-model="diastolica"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Circunferencia abdominal"
                  v-model="abdomen"
                  type="number"
                  :rules="circunferenciaRules"
                  :min="20"
                  :max="300"
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Alergia"
                  v-model="alergia"
                  dense
                  hide-details
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  label="Temperatura °C"
                  type="number"
                  :rules="temperaturaRules"
                  :min="30"
                  :max="44"
                  dense
                  v-model="temperatura"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  rows="1"
                  auto-grow
                  label="Motivo de consulta"
                  class="mb-3"
                  outlined
                  v-model="motivo"
                  hide-details
                  :rules="validaRules"
                  required
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  auto-grow
                  label="Principio de evolución"
                  class="mb-3"
                  outlined
                  v-model="evolucion"
                  hide-details
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  auto-grow
                  label="Estado actual"
                  class="mb-3"
                  outlined
                  v-model="edoactual"
                  hide-details
                >
                </v-textarea>
                <leeDiagnosticos color="primary"></leeDiagnosticos>

                <!-- <v-text-field
                  label="Clave de enfermedad"
                  class="mb-3"
                  hide-details
                  outlined
                >
                </v-text-field> -->
                <v-textarea
                  rows="1"
                  auto-grow
                  label="Diagnóstico"
                  class="mb-3"
                  outlined
                  v-model="diagnostico"
                  hide-details
                  :rules="validaRules"
                >
                </v-textarea>
                <v-textarea
                  label="Tratamiento(Receta)"
                  class=""
                  outlined
                  v-model="tratamiento"
                  auto-grow
                  hide-details
                  :rules="validaRules"
                  required
                >
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <dsomatometrico></dsomatometrico>
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" md="3">
            <v-text-field
              label="Nombre del medico"
              dense
              outlined
              readonly
              hide-details
              class="mt-3 mr-2"
              v-model="nommed"
            >
            </v-text-field>
            <v-text-field
              label="Cedula médica"
              dense
              readonly
              hide-details
              outlined
              class="mt-3 mr-2"
              v-model="cedula"
            >
            </v-text-field>
            <v-text-field
              label="Teléfono del doctor"
              dense
              readonly
              hide-details
              outlined
              class="mt-3 mr-2"
              v-model="telefono"
            >
            </v-text-field>
            <v-textarea
              label="Dirección del centro de atencion"
              dense
              outlined
              rows="1"
              auto-grow
              readonly
              class="mt-3 mr-2"
              v-model="direccion"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tiempo from "@/mixins/tiempo.js";
import leeDiagnosticos from "@/components/leeDiagnosticos.vue";
import dsomatometrico from "@/views/vistas/notamedica/dsomatometrico";
export default {
  mixins: [tiempo],
  components: {
    dsomatometrico,
    leeDiagnosticos,
  },
  data: () => ({
    valid: true,
    validaRules: [(v) => !!v || "Name is required"],

    // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    fechanac: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    idnotamedica: 0,
    idmedicos: 0,
    idpacientes: 0,
    idcatencion: 0,
    fecha: "",
    hora: "",

    edad: 0,
    peso: 0,
    // altura: 0,
    imc: 0,
    talla: 0,
    fcardiaca: 0,
    parterial: 0,
    diastolica: 0,
    sistolica: 0,
    iddiagnostico: 0,
    diagnostico: "",
    tratamiento: "",
    temperatura: 0,

    abdomen: 0,
    alergia: "",

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

    motivo: "",
    evolucion: "",
    edoactual: "",

    menu: false,
    modal: false,
    menu2: false,

    pesoRules: [
      (value) =>
        (value >= 0 && value <= 400) || "El peso debe estar entre 1 y 400", // Verifica el rango de valores
    ],
    tallaRules: [
      (value) =>
        (value >= 0.3 && value <= 2.2) ||
        value == 0 ||
        "La talla (m) debe estar entre 0.3 y 2.20", // Verifica el rango de valores
    ],
    frecuenciaRules: [
      (value) =>
        (value >= 40 && value <= 220) ||
        value == 0 ||
        "La frecuencia debe estar entre 40 y 220", // Verifica el rango de valores
    ],
    sistolicaRules: [
      (value) =>
        (value >= 50 && value <= 300) ||
        value == 0 ||
        "El valor debe estar entre 50 y 300", // Verifica el rango de valores
    ],
    diastolicaRules: [
      (value) =>
        (value >= 20 && value <= 200) ||
        value == 0 ||
        "El valor debe estar entre 20 y 200", // Verifica el rango de valores
    ],
    circunferenciaRules: [
      (value) =>
        (value >= 20 && value <= 300) ||
        value == 0 ||
        "El valor debe estar entre 20 y 300", // Verifica el rango de valores
    ],
    temperaturaRules: [
      (value) =>
        (value >= 30 && value <= 44) ||
        value == 0 ||
        "El valor debe estar entre 30 y 44", // Verifica el rango de valores
    ],
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("diagnosticos", ["getDiagnostico"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),

    validaInfo() {
      this.$refs.form.validate();
      // if (this.peso > 0) {
      //   return this.peso >= 1 && this.peso <= 400;
      // }
      // if (this.talla > 0) {
      //   return this.talla >= 0.3 && this.talla <= 2.2;
      // }

      // if (this.fcardiaca > 0) {
      //   return this.fcardiaca >= 0 && this.fcardiaca <= 400;
      // }

      return (
        this.idpacientes > 0 &&
        this.idmedicos > 0 &&
        this.motivo !== "" &&
        this.diagnostico !== "" &&
        this.tratamiento !== ""
        // this.peso >= 0 &&
        // this.peso <= 400 &&
        // if (this.talla >  0) {
        // }
        // this.talla >= 0.3 &&
        // this.talla <= 2.20
      );
    },

    validaPeso() {
      this.$refs.form.validate();
      // if (this.peso > 0) {
      //   return this.peso >= 1 && this.peso <= 400;
      // }
      return this.peso >= 0 && this.peso <= 400;
    },
    validaTalla() {
      this.$refs.form.validate();
      if (this.talla > 0) {
        return this.talla >= 0.3 && this.talla <= 2.2;
      }
      return (
        // this.talla >= 0.3 && this.talla <= 2.20
        this.talla
      );
    },
  },

  created() {
    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    this.getCatencion;
    this.idcatencion = parseInt(this.getCatencion.idcatencion);

    this.getMedico;
    this.idmedicos = this.getMedico.idmedicos;

    this.getExpediente;

    //TRAE DATOS DEL PACIENTE
    this.nompaciente = this.getPaciente.nompaciente;
    this.peso = this.getPaciente.peso;
    this.talla = this.getPaciente.talla;
    this.imc = this.getPaciente.imc;
    this.edad = this.getPaciente.edad;
    // this.tiposangre = this.getPaciente.tiposangre;

    // console.log(this.getPaciente);
    // this.tiposangresel.id = parseInt(this.getPaciente.tiposangre);
    // this.tiposangresel.opcion =
    //   this.tiposangreopc[this.tiposangresel.id - 1].opcion;

    //   this.tiposangresel = {
    //   opcion: this.tiposangresel.opcion,
    //   id: this.tiposangresel.id,
    // };

    //TRAE DATOS DEL CENTRO DE ATENCION
    this.nomcatencion = this.getCatencion.nombre;
    this.direccion = this.getCatencion.direccion;

    //TRAE DATOS DEL MEDICO
    this.telefono = this.getMedico.telefono;
    this.nommed = this.getMedico.nommed;
    this.cedula = this.getMedico.cedula;

    this.hora = this.gethora();

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
    this.consultar();
  },

  methods: {
    ...mapActions("Expediente", ["setExpediente"]),
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("diagnosticos", ["setDiagnostico"]),

    consultar() {
      console.log("router", this.$route.params);
      this.idnotamedica = this.$route.params.idnotamedica;

      //MODO EDITAR
      if (this.idnotamedica !== undefined) {
        this.nModo = 2;
        this.readonly = true;
        this.cargarInfo(this.$route.params);
        this.modo = "Editar";
      } else {
        console.log("nuevo");
        //VALORES INICIALES ALTA
        this.nModo = 1;
        this.modo = "Nuevo";
      }
    },

    cargarInfo() {
      this.loading = true;
      //  madnar cargar la información del paciente por idansiedad
      // ansiedad.update/:idansiedad
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idansiedad)
      this.$http
        .get("notamedica.get/" + this.idnotamedica)
        .then((response) => {
          console.log("response notamedica", response);
          if (response.status != 200) {
            this.showSnack({
              text: "El expediente encontró un error al cargar información",
              color: "red",
              timeout: 2000,
            });
          } else {
            // Convertir el response.result al Data de la vista.
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
      if (!this.validaInfo) {
        this.showSnack({
          text: "Debe llenar el motivo de consulta,diagnostico y tratatamiento",
          color: "orange",
          timeout: 2000,
        });
        return;
      }

      if (!this.validaPeso) {
        this.showSnack({
          text: "Debe colocar un valor dentro del rango de peso",
          color: "black",
          timeout: 2000,
        });
        return;
      }

      if (!this.validaTalla) {
        this.showSnack({
          text: "Debe colocar un valor dentro del rango de talla",
          color: "black",
          timeout: 2000,
        });
        return;
      }

      this.dataTransforma();

      console.log("payload", this.payloadData);
      // this.addCita(payload)

      //NUEVO
      if (this.nModo == 1) {
        //Dedinir db name
        this.$http
          .post("notamedica.insert", this.payloadData)
          .then((response) => {
            console.log("response", response);

            this.showSnack({
              text: "Nota medica agregada correctamente",
              color: "success",
              timeout: 2000,
            });
            this.limpiarDiag();
            this.consultar();
            setTimeout(() => this.$router.push({ name: "catnotamed" }), 2000);
          })
          .catch((error) => {
            console.log(error);
            this.showSnack({
              text: "Problema para grabar la nota médica" + error,
              color: "error",
              timeout: 2000,
            });
          });
      }

      //EDITAR
      if (this.nModo == 2) {
        console.log("payload modo 2", this.payloadData);
        console.log(this.idnotamedica);
        this.$http
          .put("notamedica.update/" + this.idnotamedica, this.payloadData)
          .then(() => {
            this.showSnack({
              text: "Nota médica actualizada correctamente ",
              color: "success",
              timeout: 2000,
            });
            setTimeout(() => this.$router.push({ name: "catnotamed" }), 2000);
            // this.limpiarDiagUsuario()
            this.limpiarDiag();
          })
          .catch((error) => {
            // console.log("error", error.data)
            this.showSnack({
              text: "Problema para grabar  :" + error,
              color: "error",
              timeout: 2000,
            });
          });
      }
    },

    dataTransforma() {
      this.payloadData = {
        // idginecologicos: 0,
        idmedicos: this.idmedicos,
        idpacientes: parseInt(this.idpacientes),
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        horaalta: this.gethora(),
        hora: this.hora,
        // partos: parseInt(this.partos),
        // cesareas: parseInt(this.cesareas),
        // abortos: parseInt(this.abortos),
        // fuma : (this.fuma === true ? 1:0),
        edad: parseInt(this.edad),
        peso: parseFloat(this.peso),
        // altura: parseFloat(this.altura),
        imc: parseFloat(this.imc),
        talla: parseFloat(this.talla),
        fcardiaca: parseFloat(this.fcardiaca),
        parterial: parseFloat(this.parterial),
        diastolica: parseFloat(this.diastolica),
        sistolica: parseFloat(this.sistolica),

        abdomen: parseFloat(this.abdomen),
        alergia: this.alergia,

        motivo: this.motivo,
        evolucion: this.evolucion,
        edoactual: this.edoactual,
        diagnostico: this.diagnostico,
        tratamiento: this.tratamiento,
        temperatura: parseFloat(this.temperatura),

        iddiagnostico: parseInt(this.getDiagnostico.iddiagnostico),
      };

      console.log("payload prepare ", this.payloadData);
    },

    convertirDatos(notamedInfo) {
      console.log("response notamedica.get", notamedInfo);
      this.idmedicos = notamedInfo.idmedicos;
      this.idpacientes = parseInt(notamedInfo.idpacientes);
      this.idcatencion = notamedInfo.idcatencion;
      this.fecha = notamedInfo.fecha;
      this.hora = notamedInfo.hora;

      this.edad = notamedInfo.edad;
      this.peso = notamedInfo.peso;
      // this.altura = notamedInfo.altura;
      this.imc = notamedInfo.imc;
      this.talla = notamedInfo.talla;
      this.fcardiaca = notamedInfo.fcardiaca;
      this.parterial = notamedInfo.parterial;
      this.diastolica = notamedInfo.diastolica;
      this.sistolica = notamedInfo.sistolica;

      this.abdomen = notamedInfo.abdomen;
      this.alergia = notamedInfo.alergia;

      this.motivo = notamedInfo.motivo;
      this.evolucion = notamedInfo.evolucion;
      this.edoactual = notamedInfo.edoactual;
      this.diagnostico = notamedInfo.diagnostico;
      this.tratamiento = notamedInfo.tratamiento;
      this.temperatura = notamedInfo.temperatura;

      this.tiposangresel.id = parseInt(this.getPaciente.tiposangre);
      this.tiposangresel.opcion =
        this.tiposangreopc[this.tiposangresel.id].opcion;
      this.tiposangresel = {
        opcion: this.tiposangresel.opcion,
        id: this.tiposangresel.id,
      };

      this.iddiagnostico = notamedInfo.iddiagnostico;
      // console.log(medicos);
      if (notamedInfo.iddiagnostico == "") {
        this.iddiagnostico = 0;
        this.catalog_key = "A00";
      }

      //  Poises
      // console.log("Paciente pais iddiagnostico", this.getMedico);
      // this.catalog_key = medicos.catalog_key;

      this.$http.get("diagnosticos.get/" + this.iddiagnostico).then(
        (response) => {
          this.catalog_key = parseInt(response.data.result.catalog_key);
          let odiagnostico = response.data.result;
          console.log("buscando odiagnostico", odiagnostico);
          odiagnostico.catalog_key = this.catalog_key;
          // console.log("respone ger Pais", response);
          this.setDiagnostico(odiagnostico);
          // console.log("response catencion.get", response.data.result)
          // dispatch('paises/setPais', response.data.result, { root: true })
        },
        (error) => {
          console.log(error);
        }
      );
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },

    limpiarDiag() {
      let item = {
        iddiagnostico: 0,
        nombre: "",
      };
      this.setDiagnostico(item);
    },
  },
};
</script>
