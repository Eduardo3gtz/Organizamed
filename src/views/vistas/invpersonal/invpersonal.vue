<template>
  <v-container class="mt-2">
    
      <v-toolbar color="blue darken-3" dark rounded="lg" class="mb-3"  width="500" dense>
        <h3>Información del paciente</h3>
      </v-toolbar>
      <!-- COMPONENTE -->
      <vista/>
      

  </v-container>
</template>

<script>
import vista from '@/views/vistas/invpersonal/vista'
export default {
  components: {
    vista,
  },
  data: () => ({
   
  }),
}
</script>
