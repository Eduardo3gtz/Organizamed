<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-toolbar color="teal" dark>
            <h3>Proyecto EDSM</h3>
          </v-toolbar>
          <v-row class="ma-1">
            <v-col>
              <p>
    
                <b>Proyecto Expediente Digital Salud Migrante (EDSM)</b>
                <br><br>
                El Grupo Salud Migrante (GSM) conformado por investigadores del proyecto autorizado en
                el marco de los Programas Nacionales Estratégicos-Conacyt, proyecto No. 319126, con
                domicilio en Avenida Universidad sin número, Ciudad Universitaria, C.P. 66450, San
                Nicolás de los Garza, Nuevo León, es el responsable del tratamiento de los datos
                personales proporcionados, los cuales serán protegidos conforme a lo dispuesto por la
                Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y
                demás normatividad que resulte aplicable.
                <br><br>
                  
              </p>
              
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  <barranav/>

  </v-container>
</template>

<script>
import barranav from '@/components/barranav'
export default {
  components:{
    barranav,
  },
  data: () => ({

  }),
}
</script>

<style>

</style>