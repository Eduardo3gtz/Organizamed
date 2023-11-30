<template>
  <v-bottom-navigation
    v-model="value"
    background-color="blue"
    dark
    app
  >

    <v-spacer></v-spacer>

    <!-- <v-btn @click="iraviso" value="aviso">
      <span>Aviso de privacidad</span>
      <v-icon>mdi-notebook</v-icon>
    </v-btn> -->

    <v-btn @click="irlogin" value="login">
      <span>Login</span>
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>

    <v-btn href="https://expediente.pro/admin/" target="_blank" value="3">
      <span>Admin</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-btn href="https://expediente.pro/paciente/" class="mr-4" target="_blank" value="4">
      <span>Paciente</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-bottom-navigation>


   
    <!-- <v-bottom-navigation
      app
      color="white"
      hide-on-scroll
      horizontal
      scroll-target="#scroll-threshold-example"
      scroll-threshold="500"
    >
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation> -->

 
</template>

<script>
export default {
  data: () => ({
    value: 'login',
  }),

  methods:{
    iraviso(){
		  this.$router.push({name:'avisopriv'})
    },

    irlogin(){
		  this.$router.push({name:'login'})
    },
    // iradmin(){
    //   this.$router.push({name:'https://expediente.pro/admin/'})
    // },

    // irapp(){
    //   this.$router.push({name:'login'})
    // },
  }
}
</script>

<style>

</style>