<template>
  <v-container class="mt-2">
    <v-toolbar
      color="blue darken-3"
      dark
      rounded="lg"
      class="mb-1"
      width="500"
      dense
    >
      <h2>Historia clínica</h2>
    </v-toolbar>
    <v-card class="mt-3" flat color="transparent">

    <v-row>
      <v-col cols="12" md="4">
        <v-card
            color="teal"
            dark
            to="apatologicos"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >Patológicos</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idpatologicos > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idpatologicos === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="https://www.mexicosocial.org/wp-content/uploads/2022/04/Enfermedades-respiratorias-no-debe-bajarse-la-guardia-816x600.jpg"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
            color="green"
            dark
            to="atraumaticos"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >Traumáticos</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idtraumaticos > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idtraumaticos === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="https://staticsnews.medsbla.com/news-es/wp-content/uploads/2019/08/09133255/lesiones-musculares.jpg"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
            color="blue"
            dark
            to="aquirurgicos"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >Quirúgicos</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idquirurgicos > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idquirurgicos === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="data:image/jpeg;base64,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"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
            color="orange"
            dark
            to="anopato"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >No Patológicos</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idnopatologicos > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idnopatologicos === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="https://www.redaccionmedica.com/images/destacados/murcia-la-comunidad-donde-mas-se-fuma-asturias-donde-menos-5260_620x368.jpg"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
            color="indigo"
            dark
            to="aperinatales"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >Perinatales</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idperinatales > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idperinatales === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="https://www.natalben.com/sites/default/files/inline-images/periodo-perinatal-y-neonatal-d.jpg"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>

      <v-col cols="12" md="4" v-if="getPaciente.genero == '2' ">
        <v-card
            color="cyan"
            dark
            to="aginecologicos"
            rounded="xl"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <!-- <p class="palabra">Antecedentes</p> -->
                <v-card-title
                  class="text-h5 mt-4"
                  
                >Ginecológicos</v-card-title>

                <v-card-subtitle >Antecedentes</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Estatus:
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idginecologicos > 0"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-check-circle</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    v-if="idginecologicos === 0"
                    color="red"
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                
              >
                <v-img src="data:image/jpeg;base64,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"></v-img>
              </v-avatar>
            </div>
          </v-card>
      </v-col>
    </v-row>

    </v-card>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed:{
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    // ...mapGetters("pacientes", ["getPaciente"]),

  },
  data: () => ({
    idpacientes: 0,
    idpatologicos:0,
    idquirurgicos:0,
    idtraumaticos:0,
    idnopatologicos:0,
    idginecologicos:0,
    idperinatales:0
  }),

  created(){
    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    //TRAE DATOS DEL PACIENTE
    this.genero = this.getPaciente.genero;
    console.log(this.getPaciente)

    this.idpacientes = this.getPaciente.idpacientes
    this.consultar()
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions('Expediente', ['setExpediente']),

    consultar() {
      this.loading= true
      this.$http.get('expedientes.get/'+ this.idpacientes).then(response=>{
        // console.log(response)
        if (response.status == 200){
          this.loading= false
          this.setExpediente(response.data.result)
          this.idpatologicos = response.data.result.idpatologicos
          this.idquirurgicos = response.data.result.idquirurgicos
          this.idtraumaticos = response.data.result.idtraumaticos
          this.idnopatologicos = response.data.result.idnopatologicos
          this.idginecologicos = response.data.result.idginecologicos
          this.idperinatales = response.data.result.idperinatales
 
          this.getExpediente

        }
        
      }).catch(error=>{
        this.showSnack({
          text: "Error al cargar información",
          color: "red",
          timeout: 2000,
        });
        console.log(error)
      })

    },

    cargarInfo(){

    }
  }
}
</script>
