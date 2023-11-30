<template>
  <v-container class="mt-4">
    <v-toolbar class="mb-3" flat justify="center">
      <h2>EXAMEN FISICO</h2>
      <v-spacer></v-spacer>
      <v-btn
        color="blue lighten-2"
        to="catnotamed"
        dark
        class="mr-3"
      >
        <v-icon class="mx-2">mdi-reply</v-icon>
      </v-btn>
       <v-btn dark color="info" @click="saveinfo">procesar</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card flat>
      <v-row class="mx-2">
        <v-col cols="12" md="3">
          <v-text-field
            label="Edad"
            class="mt-3"
            v-model="edad"
            type="number"
            dense
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            class="mt-3"
            label="Peso(kg)"
            v-model="peso"
            type="number"
            dense
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            class="mt-3"
            label="Altura (metros)"
            v-model="altura"
            type="number"
            dense
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            class="mt-3"
            label="IMC Calculado"
            type="number"
            dense
            v-model="imc"
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="ma-3">
        <v-col cols="8">
          <dsomatometrico></dsomatometrico>
        </v-col>
        <v-col cols="4" class="mt-2">
          <v-text-field
            label="Talla"
            v-model="talla"
            type="number"
            dense
            hide-details
          >
          </v-text-field>
           <v-text-field
            label="Frecuencia cardiaca"
            type="number"
            v-model="fcardiaca"
            hide-details
          >
          </v-text-field>
          <v-text-field
            label="Presion arterial"
            type="number"
            v-model="parterial"
          >
          </v-text-field>
           <v-textarea
            rows="1"
            auto-grow
            label="Diagnostico"
            class="mx-5 mb-3"
            outlined
            v-model="diagnostico"
            hide-details
          >
          </v-textarea>
           <v-textarea
            label="Tratamiento(Receta)"
            class="mx-5"
            outlined
            v-model="tratamiento"
            auto-grow
          >
          </v-textarea>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
import dsomatometrico from '@/views/vistas/notamedica/dsomatometrico'
export default {
  components:{
    dsomatometrico
  },
  data: () => ({

    idnotamedica: 0,
    idmedicos: 0,
    idpacientes: 0,
    idcatencion: 0,
    fecha :'',
    hora:'',

    edad:0,
    peso:0,
    altura:0,
    imc:0,
    talla:0,
    fcardiaca:0,
    parterial:0,
    diagnostico:'',
    tratamiento:'',

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

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
  // created () {
  //   this.initialize()
  // },

  methods: {
    ...mapActions("Expediente", ["setExpediente"]),
    ...mapActions("snackbar", ["showSnack"]),

    consultar() {
      this.loading = true;
      this.$http
        .get("expedientes.get/" + this.idpacientes)
        .then((response) => {
          if (response.status == 200) {
            // console.log(response);
            this.idnotamedica = response.data.result.idnotamedica;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idnotamedica > 0) {
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

    saveinfo(){
      this.dataTransforma();

      console.log("payload", this.payloadData)
      // this.addCita(payload)

      //NUEVO
      if (this.nModo == 1) {
        //Dedinir db name
        this.$http.post('notamedica.insert', this.payloadData).then( response =>{
          console.log("response" ,response)

          this.showSnack({
            text: "Nota medica agregada correctamente",
            color: "success",
            timeout: 2000,
          });

          this.consultar()
          // setTimeout (() => this.$router.push({name:'historiacli'}),2000);
        }).catch(error=>{
          console.log(error)
          this.showSnack({
            text: "Problema para grabar antecedentes patologicos"+ error,
            color: "error",
            timeout: 2000,
          });
   
        })
      }

      //EDITAR
      if ( this.nModo == 2 ){
        console.log("payload modo 2", this.payloadData)
        console.log(this.idnotamedica)
        this.$http.put('notamedica.update/' + this.idnotamedica, this.payloadData).then(() =>{
          this.showSnack({
            text: "Antecedentes no patologicos actualizado correctamente ",
            color: "success",
            timeout: 2000,
          });
          // setTimeout (() => this.$router.push({name:'historiacli'}),2000);
          // this.limpiarUsuario()
        }).catch( (error) =>{
          // console.log("error", error.data)
          this.showSnack({
            text: "Problema para grabar  :" + error.data.message,
            color: "error",
            timeout: 2000,
          });
                   
        })
      }
    },

    dataTransforma() {

      this.payloadData = {
        // idginecologicos: 0,
        idmedicos: this.idmedicos,
        idpacientes: parseInt(this.idpacientes),
        idcatencion: this.idcatencion,
        fecha : this.fecha,
        hora: this.hora,
        // partos: parseInt(this.partos),
        // cesareas: parseInt(this.cesareas),
        // abortos: parseInt(this.abortos),
        // fuma : (this.fuma === true ? 1:0),
        edad: parseInt(this.edad),
        peso: parseFloat(this.peso),
        altura: parseFloat(this.altura),
        imc: parseFloat(this.imc),
        talla: parseFloat(this.talla),
        fcardiaca: parseFloat(this.fcardiaca),
        parterial: parseFloat(this.parterial),
        diagnostico: this.diagnostico,
        tratamiento: this.tratamiento,
      }
      
      console.log("payload prepare ", this.payloadData);

    },

    convertirDatos(notamedInfo) {
      console.log("response notamedica.get", notamedInfo);
      this.idmedicos= notamedInfo.idmedicos
      this.idpacientes= parseInt(notamedInfo.idpacientes)
      this.idcatencion= notamedInfo.idcatencion
      this.fecha = notamedInfo.fecha
      this.hora= notamedInfo.hora

      this.edad = notamedInfo.edad
      this.peso = notamedInfo.peso
      this.altura = notamedInfo.altura
      this.imc = notamedInfo.imc
      this.talla = notamedInfo.talla
      this.fcardiaca = notamedInfo.fcardiaca
      this.parterial = notamedInfo.parterial
      this.diagnostico = notamedInfo.diagnostico
      this.tratamiento = notamedInfo.tratamiento
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },
  },
}
</script>