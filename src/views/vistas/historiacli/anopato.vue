<template>
  <v-container>
    <v-card rounded="xl" class="mb-6" flat>

      <v-card flat class="mb-1" rounded="xl">
        <v-row c>
          <v-col cols="12" md="4" lg="4" sm="5">
            <h3 class="ml-13">Antecedentes no patológicos</h3>
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
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-row justify="center" class="mb-3 mt-1">
            <v-btn color="orange" class="mr-4 mt-1" :to="{name:'historiacli'}" dark>
              <v-icon class="mx-2">mdi-reply</v-icon>
            </v-btn>
            <v-btn dark class="mt-1" color="info" @click="saveinfo">GUARDAR</v-btn>
          </v-row>
        </v-row>
      </v-card>

      <!-- <v-row>
        <v-col>
          <h3 class="ml-4">Antecedentes no patológicos</h3>
        </v-col>
        <v-btn class="mt-2 mr-4" dark color="info" @click="saveinfo">procesar</v-btn>
      </v-row> -->

      <v-row class="mt-4 mx-2">
        <v-col cols="12" md="3">
          <v-card color="blue-grey lighten-5" class="mb-3"  rounded="xl">
            <v-row >
              <v-col>
                <v-row justify="center">
                  <v-col>
                    <v-row justify="center">
                      <h3 class="mt-4">¿Fuma?</h3>
                    </v-row>
                    <v-row justify="center" >
                      <v-switch
                        v-model="fuma"
                        :label="opcionfuma"
                        @change="activarfuma"
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                <v-text-field
                  v-if="mostrarfuma = fuma"
                  label="¿Desde qué edad fuma?"
                  dense
                  v-model="edadfuma"
                  class=" mx-2 mt-3"
                >
                </v-text-field>
                <v-text-field
                  v-if="mostrarfuma = fuma"
                  label="¿Cuántos cigarros fuma al día?"
                  dense
                  v-model="cantfuma"
                  class="mx-2 mt-2"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="blue-grey lighten-5" class="mb-3" rounded="xl">
            <v-row>
              <v-col>
                <v-row class="mt-2" justify="center">
                  <v-col>
                    <v-row justify="center">
                      <h4>¿Consume bebidas alcohólicas?</h4>
                    </v-row>
                    <v-row justify="center" >
                      <v-switch
                        v-model="bebidas"
                        :label="opcionbebidas"
                        @change="activarbebidas"
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                <v-text-field
                  v-if="mostrarbebidas = bebidas"
                  label="Si consume ¿desde qué edad?"
                  dense
                  v-model="edadbebida"
                  class="mx-2 mt-3"
                >
                </v-text-field>
                <v-text-field
                  v-model="cantbebida"
                  v-if="mostrarbebidas = bebidas"
                  label="Cantidad de tragos a la semana?"
                  dense
                  class="mx-2 mt-3"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>


        <v-col cols="12" md="3">
          <v-card color="blue-grey lighten-5" rounded="xl" class="mb-3">
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <v-row justify="center">
                      <h4 class="mt-5">¿Consume drogas?</h4>
                    </v-row>
                    <v-row justify="center" >
                      <v-switch
                        v-model="drogas"
                        :label="opciondrogas"
                        @change="activardrogas"
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                 <v-text-field
                  v-if="mostrardrogas = drogas"
                  label="¿Desde qué edad?"
                  dense
                  v-model="edaddroga"
                  class="mx-2 mt-3"
                >
                </v-text-field>
                <v-text-field
                  v-if="mostrardrogas = drogas"
                  label="¿Qué tipo de drogas consume?"
                  dense
                  v-model="tipodroga"
                  class="mx-2 mt-1"
                >
                </v-text-field>
                 <v-text-field
                  v-if="mostrardrogas = drogas"
                  label="Cantidad de droga qué consume por semana"
                  dense
                  v-model="cantdroga"
                  class="mx-2 mt-2"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="blue-grey lighten-5" rounded="xl">
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <v-row justify="center" class="mt-2">
                      <h4>¿Ha tenido relaciones sexuales?</h4>
                    </v-row>
                    <v-row justify="center" >
                      <v-switch
                        v-model="relaciones"
                        :label="opcionrelaciones"
                        @change="activarrelaciones"
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                <v-text-field
                  v-if="mostrarrelaciones = relaciones"
                  label="¿Desde qué edad?"
                  dense
                  v-model="edadsexual"
                  class="mx-2 mt-3"
                >
                </v-text-field>
          <!-- <v-select
            label="¿Quién le ha otorgado apoyo?"
            hide-details
            v-model="quienapoyosel"
            dense
            return-object
            @change="desactivarquien"
            item-text="opcion"
            item-value="id"
            :items="quienapoyoopc"
          >
          </v-select> -->
                <v-select
                  v-if="mostrarrelaciones = relaciones"
                  label="¿Con quien?"
                  dense
                  :items="conquienopc"
                  v-model="conquiensel"
                  class="mx-2 "
                  hide-details
                  item-text="opcion"
                  return-object
                  item-value="id"
                >
                </v-select>
                <v-text-field
                  label="Otra opción:"
                  dense
                  v-model="otroquien"
                  v-if="conquiensel.id === 5"
                  class="mx-2 mt-5"
                >
                </v-text-field>
                 <v-select
                  v-if="mostrarrelaciones = relaciones"
                  label="¿Usa usted algún método para prevenir embarazo?"
                  dense
                  @change="desactivarmetodo"
                  :items="tipometodoopc"
                  v-model="tipometodosel"
                  item-text="opcion"
                  return-object
                  item-value="id"
                  class="mx-2 mt-5"
                >
                </v-select>
                 <v-text-field
                  v-if="tipometodosel.id === 1"
                  label="¿Qué tipo de método para prevenir embarazo?"
                  dense
                  v-model="metodoprev"
                  class="mx-2 mt-1"
                >
                </v-text-field>
                <!-- <v-text-field
                  v-if="mostrarrelaciones = relaciones"
                  label="¿Usa condón o algún otro método para prevención de infecciones de trasmisión sexual?"
                  dense
                  class="mx-2 mt-1"
                >
                </v-text-field> -->
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" align="center" class="mt-5 mb-3">
        <v-btn dark class="mt-1 mb-2" color="info" @click="saveinfo">Guardar</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
export default {
  data () {
    return {

      payloadData:{

      },

      tipometodoopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tipometodosel: { opcion: "", id: 0 },

      conquienopc: [
        { opcion: "Ninguno", id: 0 },
        { opcion: "Hombre – hombre ", id: 1 },
        { opcion: "Hombre – mujer ", id: 2},
        { opcion: "Mujer – Mujer ", id: 3 },
        { opcion: "Mujer – Hombre", id: 4 },
        { opcion: "Otro", id: 5 },
      ],
      conquiensel: { opcion: "", id: 0 },
      otroquien:'',

      // fuma
      edadfuma:'',
      cantfuma:'',

      // bebidas:
      edadbebida:'',
      cantbebida:'',

      //droga:
      edaddroga:'',
      tipodroga:'',
      cantdroga:'',

      //relaciones:
      edadsexual:'',
      metodo:'',
      metodoprev:'',



      fuma: false,
      opcionfuma: 'No',
      mostrarfuma: true,

      bebidas: false,
      opcionbebidas: 'No',
      mostrarbebidas: true,

      drogas: false,
      opciondrogas: 'No',
      mostrardrogas: true,

      relaciones: false,
      opcionrelaciones: 'No',
      mostrarrelaciones: true,
    }
  },

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

  methods:{
    ...mapActions("Expediente", ["setExpediente"]),
    ...mapActions("snackbar", ["showSnack"]),

    desactivarmetodo(){
      if (this.tipometodosel.id != 1){
        this.metodoprev = ''
      }
    },

    consultar() {
      this.loading = true;
      this.$http
        .get("expedientes.get/" + this.idpacientes)
        .then((response) => {
          if (response.status == 200) {
            // console.log(response);
            this.idnopatologicos = response.data.result.idnopatologicos;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idnopatologicos > 0) {
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
        .get("nopatologicos.get/" + this.idnopatologicos)
        .then((response) => {
          console.log("response nopatologicos", response);
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
        this.$http.post('nopatologicos.insert', this.payloadData).then( response =>{
          console.log("response" ,response)

          this.showSnack({
            text: "Antecedentes agregados correctamente",
            color: "success",
            timeout: 2000,
          });

          this.consultar()
          setTimeout (() => this.$router.push({name:'historiacli'}),2000);
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
        console.log(this.idnopatologicos)
        this.$http.put('nopatologicos.update/' + this.idnopatologicos, this.payloadData).then(() =>{
          this.showSnack({
            text: "Antecedentes no patologicos actualizado correctamente ",
            color: "success",
            timeout: 2000,
          });
          setTimeout (() => this.$router.push({name:'historiacli'}),2000);
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

    convertirDatos(nopatoInfo) {
      console.log("response nopatlogicos.get", nopatoInfo);

      this.fuma = nopatoInfo.fuma === 0 ? false : true
      this.activarfuma (this.fuma)
      this.edadfuma = nopatoInfo.edadfuma
      this.cantfuma = nopatoInfo.cantfuma

      this.bebidas = nopatoInfo.bebidas === 0 ? false : true
      this.activarbebidas (this.bebidas)
      this.edadbebida = nopatoInfo.edadbebida
      this.cantbebida = nopatoInfo.cantbebida

      this.drogas = nopatoInfo.drogas === 0 ? false : true
      this.activardrogas (this.drogas)
      this.edaddroga = nopatoInfo.edaddroga
      this.tipodroga = nopatoInfo.tipodroga
      this.cantdroga = nopatoInfo.cantdroga

      this.relaciones = nopatoInfo.relaciones === 0 ? false : true
      this.activarrelaciones (this.relaciones)
      this.edadsexual = nopatoInfo.edadsexual
      // this.metodo = nopatoInfo.metodo
      this.metodoprev = nopatoInfo.metodoprev
      this.otroquien = nopatoInfo.otroquien
      
      // SELECT DE CON QUIEN
      this.conquiensel.id = nopatoInfo.conquien;

      this.conquiensel.opcion = this.conquienopc[this.conquiensel.id].opcion;
      this.conquiensel = {
        opcion: this.conquiensel.opcion,
        id: nopatoInfo.conquien,
      };


      // SELECT DE CON QUIEN
      this.tipometodosel.id = nopatoInfo.tipometodo;

      this.tipometodosel.opcion = this.tipometodoopc[this.tipometodosel.id].opcion;
      this.tipometodosel = {
        opcion: this.tipometodosel.opcion,
        id: nopatoInfo.tipometodo,
      };
      // console.log(this.conquiensel )
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
        fuma : (this.fuma === true ? 1:0),
        edadfuma: this.edadfuma,
        cantfuma: this.cantfuma,

        bebidas : (this.bebidas === true ? 1:0),
        edadbebida : this.edadbebida,
        cantbebida : this.cantbebida,

        drogas : (this.drogas === true ? 1:0),
        tipodroga : this.tipodroga,
        edaddroga : this.edaddroga,
        cantdroga : this.cantdroga,

        relaciones : (this.relaciones === true ? 1:0),
        edadsexual : this.edadsexual,
        // metodo : this.metodo,
        metodoprev : this.metodoprev,
        otroquien : this.otroquien,

        conquien: this.conquiensel.id,
        tipometodo: this.tipometodosel.id,
      }
      
      console.log("payload prepare ", this.payloadData);

    },

    activarfuma(value){
      // console.log(value)
      if(value == true){
        this.opcionfuma = 'Si'
      }
      else{
        this.opcionfuma = 'No'
      }
    },

    activarbebidas(value){
      // console.log(value)
      if(value == true){
        this.opcionbebidas = 'Si'
      }
      else{
        this.opcionbebidas = 'No'
      }
    },

    activardrogas(value){
      // console.log(value)
      if(value == true){
        this.opciondrogas = 'Si'
      }
      else{
        this.opciondrogas = 'No'
      }
    },

    activarrelaciones(value){
      // console.log(value)
      if(value == true){
        this.opcionrelaciones = 'Si'
      }
      else{
        this.opcionrelaciones = 'No'
      }
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },
  }
}
</script>