<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card class="mt-1" height="540" rounded="xl">
          <v-row>
            <v-col cols="5">
              <v-card
                dense
                color="blue"
                shaped
                class="pa-7 mx-4"
                v-if="getdatosUsuario.idmedicos > 0"
                >
                  <v-row>
                    <v-col cols="8">
                  <h3 class="black--text">Medico: </h3>
                  <h3 class=" white--text"> {{getMedico.nommed }}</h3>
                  <h5 class="orange--text">Id del medico: ({{getMedico.idmedicos}})</h5>
                    </v-col>
                    <v-col cols="4">
                    <v-list-item-title class="text-h2 mt-4">
                      👋
                    </v-list-item-title>
                    </v-col>
                  </v-row>
              </v-card>
            </v-col>
            <v-col cols="6">
               <v-card elevation="6" rounded="xl" class=" pa-1">
                    
                  <v-card-title class="pa-1">Instrucciones</v-card-title>
                  
                  <p class="ma-1">
                    1. Revisar sus datos personales.
                  </p>
                  <p class="ma-1">
                  2. Seleccionar el Centro de Atención a Migrantes.
                  </p>
                  <p class="ma-1">
                  3. Seleccionar un paciente
                  </p>
                    

                </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="6">
              <v-row class="ml-3">
                <v-col cols="12" md="6" lg="6" sm="6">
                  <v-card color="blue" to="ansiedad" rounded="xl">
                    <v-img
                      class="white--text align-end"
                      height="140px"
                      src="https://as01.epimg.net/deporteyvida/imagenes/2020/03/02/portada/1583142327_324441_1583142752_noticia_normal_recorte1.jpg"
                    >
                      <v-card-title>Nuevo paciente</v-card-title>
                    </v-img>
                  </v-card>
                </v-col>

                <v-col cols="12" md="6" lg="6" sm="6">
                  <v-card color="blue" to="ansiedad" rounded="xl">
                    <v-img
                      class="white--text align-end"
                      height="140px"
                      src="https://as01.epimg.net/deporteyvida/imagenes/2020/03/02/portada/1583142327_324441_1583142752_noticia_normal_recorte1.jpg"
                    >
                      <v-card-title>Catalogo de pacientes</v-card-title>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            
            

            </v-col>
            <v-divider vertical class="mx-2" inset></v-divider>
            <v-col cols="5">
               <leePacientes class="mr- pa-2" dark color="primary"></leePacientes>
              <leeCatencion class="mr- pa-2" dark color="secondary"></leeCatencion>
               <v-img contain max-height="200" src="@/assets/edsm.png" class="mb-6"> </v-img>

            </v-col>
          
           
              
          
          </v-row>
        </v-card>
        <!-- <v-card class="mt-4" height="540"  rounded="xl">
          <v-row align="center" justify="center">

            <v-col cols="12" md="5" xs="12">
              <v-row>
                <v-col>
             
              
         
                 
                </v-col>
              </v-row>
            </v-col>


            <v-col cols="12" md="6" xs="12">
              <v-card elevation="5" rounded="xl" class="pa-2">
                
               
                
                <v-card-title
                  dense v-if="getdatosUsuario.idtrabsocial > 0"
                  >Trabajador Social {{getTrabsocial.nomsoc}} ({{getTrabsocial.idtrabsocial}})
                </v-card-title>

            


                <v-toolbar dense class="ma-2" color="primary" dark rounded="lg">
                  Pacientes
                  <v-spacer></v-spacer>
                  <v-btn class= "ma-4" small @click="irapacientes" dark color="info">Catálogo</v-btn>
                  <v-btn class="ma-2" small @click="nuevo" dark color="success">Nuevo</v-btn>

                </v-toolbar>

              




              </v-card>
            </v-col>
          </v-row>

        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

import leePacientes from '@/components/leePacientes.vue';
import leeCatencion from '@/components/leeCatencion.vue';


export default {
  components:{
    leePacientes,
    leeCatencion
  },
  data() {
    return {
      drawer: false,
      loading: false,
      search: "",
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      json_data: [],
    };
  },

  computed: {
    ...mapGetters('Login', ['getdatosUsuario', 'getLogeado']),
    ...mapGetters('Medicos', ['getMedico']),
    ...mapGetters('pacientes', ['getPaciente']),
    ...mapGetters('Trabsocial', ['getTrabsocial'])
    
  },
 

  created() {
    // console.log("getMedico",this.getMedico)
    // console.log("getdatosUsuario", this.getdatosUsuario)
    this.logo = require("@/assets/logoedsm.png");
    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();

    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
    
    this.getPaciente
    this.getCatencion

  },

  methods: {
    ...mapActions('pacientes',['setPaciente']),

    consultar() {
      
    },

    irapacientes () {
      this.$router.push({ name: "catexpedientes" }).catch(() => {});
    },

    nuevo () {
      let item= {
        idpacientes: 0,
        nompaciente:''
      }
      this.setPaciente(item);
      this.$router.push({ name: 'invpersonal' }).catch(() => {});
    },


  },
};
</script>




