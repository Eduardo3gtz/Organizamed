<template>
  <v-container class="mt-6">
    <v-row justify="center" align="center">
      <v-col cols="8">
        
        <v-card rounded="lg">
          <v-row class="pa-3 ml-2">
          <h3>Instrucciones para que el paciente entre a su plataforma:</h3>
          <v-spacer></v-spacer>
          <v-btn class="mr-4" color="green" dark>
            Procesar
          </v-btn>
          </v-row>
          <v-row class="pa-3">
            <v-col cols="6">
              
              <p>
                1.- Escribir el correo del paciente y dar click en procesar.
              </p>
              <p>
                2.- Se enviara un correo al paciente para que pueda configurar
                su contraseña.
              </p>
              <p>
                3.- Usar correo y contraseña en la plataforma del paciente.
              </p>

              
            </v-col>
            <v-col>
              <v-col cols="12">
                
              <v-text-field
                filled
                label="Correo del paciente"
              >
              </v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  name:'CrearCuenta',
}
</script>

<style>

</style>