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

    <v-row>
      <v-col>
        <v-card>
          <apatologicos />
        </v-card>
        <v-row>
          <v-col>
            <v-card class="mb-6 mt-2" flat>
              <atraumaticos />
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mb-6 mt-2" flat>
              <aquirurgicos />
            </v-card>
          </v-col>
        </v-row>
        <v-card class="mb-6 mt-2" flat>
          <anopato />
        </v-card>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mb-6 mt-2" flat>
              <aperitinales />
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card width="600" class="mb-6 mt-2" flat>
              <aginecologicos />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apatologicos from "@/views/vistas/historiacli/apatologicos";
import atraumaticos from "@/views/vistas/historiacli/atraumaticos";
import aquirurgicos from "@/views/vistas/historiacli/aquirurgicos";
import anopato from "@/views/vistas/historiacli/anopato";
import aperitinales from "@/views/vistas/historiacli/aperitinales";
import aginecologicos from "@/views/vistas/historiacli/aginecologicos";
export default {
  components: {
    aquirurgicos,
    atraumaticos,
    apatologicos,
    anopato,
    aperitinales,
    aginecologicos,
    // apatologicos
  },
  data: () => ({
 
    // modal2: false,
  }),

  created() {
    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();

    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
    // this.idusuariosweb = parseInt(this.getdatosUsuario.idusuariosweb)
    this.consultar();
  },

  methods: {
    // ...mapActions('oportunidad',['setOportunidad']),
    consultar() {},
    cita(opor1) {
      console.log("oportunidad seleccionada", opor1);
    },
  },
};
</script>

<style scoped>
.doctor {
  top: -95px;
}
</style>