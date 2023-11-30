<template>
  <v-container>
    <v-toolbar dense rounded="lg" dark color="red">Expediente : Juan Perez</v-toolbar>
    
    <v-card elevation="10" height="500">
      
      
    </v-card>
  </v-container>
</template>

<script>
export default {
  //INSTRUCCIONES.
  // 1. Al entrar, mandar señal para poner el navigator drawer en false. Ya que ocupamos espacio.
  // 2. Mostrar en el navigator drawer del expediente minificado.
  // 3. Poner un router view para trabajar dentro de el las vistas del expediente.
  data () {
    return {
      mostrarExpediente: true,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          titulo: 'Panel',
          to: '/panel'
        },
        {
          icon: 'mdi-brain',
          titulo: 'Valoración Psicosocial',
          to: '/valoracionpsi'
        },
        {
          icon: 'mdi-account-group',
          titulo: 'Ficha Social',
          to: '/fichasocial'
        },

        {
          icon: 'mdi-run',
          titulo: 'Expedientes',
          to: '/catexpedientes'
        },
        {
          icon: 'mdi-pencil',
          titulo: 'Nota Médica',
          to: '/notamed'
        },
        {
          icon: 'mdi-book',
          titulo: 'Historia clinica',
          to: '/historiacli'
        },

        {
          icon: 'mdi-account',
          titulo: 'Inventario Personal',
          to: '/invpersonal'
        },

        {
          icon: 'mdi-facebook',
          titulo: 'Inventario Personal',
          to: '/loginfacial'
        },
        
        {
          icon: 'mdi-airplane',
          titulo: 'Valoracion Fisica',
          to: '/valoracionfis'
        },
       
      //  {
      //     icon: 'mdi-airplane',
      //     titulo: 'Recuperar Contraseña',
      //     to: '/olvidacontra'
      //   },
      //   {
      //     icon: 'mdi-airplane',
      //     titulo: 'Registrase',
      //     to: '/registrarse'
      //   },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      
    }
  },

  created() {
    // Definir valores iniciales
    // Fecha inicial Primero de mes.
    let date0 = new Date()
    let mes = date0.getMonth()
    let anio = date0.getFullYear()
            
    // console.log(mes, anio)
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10)
    // this.idusuariosweb = parseInt(this.getdatosUsuario.idusuariosweb)
    this.consultar()
  },

  methods: {
    // ...mapActions('oportunidad',['setOportunidad']),
    consultar(){
      // limpiar
      this.blogs= []
      // console.log(this.getdatosUsuario)
      // let id = this.getdatosUsuario.idusuariosweb
      // console.log('consultar', id)

      this.loading = true
      // let payload = {
      //   fechastart: this.fecha1,
      //   fechaend : this.fecha2,
      //   idusuariosweb: this.idusuariosweb,
      //   idproyecto: this.idproyecto,
      //   idcontacto: this.idcontacto
      // }

      // console.log("payloadfiltros ", payload)
      // this.$http.get("v2/citas.list" ).then(response=>{
      

      this.$http.get("https://soportesait.com/api-blog/v2/blogs.list").then(response=>{

        if (response.data.error===null){
          this.loading = false
          this.blogs = response.data.result
          console.log(response)
          this.blogs.forEach( element => {
 
            if (element.titulo.length > 40) {
              element.titulo = element.titulo.substring(0, 40) + '...'
            }

            if (element.descrip.length > 55) {
              element.descrip = element.descrip.substring(0, 55) + '...'
            }

            element.hora = element.fecha.substr(11,17)
            element.fecha = element.fecha.substr(0,10)
            let cFecha =new Date(element.fecha).toLocaleDateString(
              'es-MX', {
                timeZone: "UTC",
                month: 'short',
                day: 'numeric'
              }
            )
            element.fechacorta = cFecha
            
          })

          console.log("blogss", this.blogs)
        }
          
      }).catch(error=>{
        console.log(error)
      })
    },
      
    editar(item){
      console.log("Renglonitem", item)
      this.$router.push({name:'newblog', params: {blog: item}}).catch(() => {})
    },

    cita(opor1){
      console.log("oportunidad seleccionada",opor1)
      // Mandar llamar al Action.
      this.setOportunidad (opor1)

      this.drawer = !this.drawer
    }

  }
}

</script>




<style>

</style>
