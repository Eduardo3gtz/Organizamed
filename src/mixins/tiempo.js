//Función para dar la hora

export default {

  data () {
    return {
      
    }
  },

  methods: {
    gethora() {
      let f =new Date();
      let hora = f.getHours()
      let minuto = f.getMinutes()
      let segundo = f.getSeconds()
      if(hora < 10){
        hora = "0" + f.getHours()
      }
      if(minuto < 10){
        minuto = "0" + f.getMinutes()
      }
      if(segundo < 10){
        segundo = "0" + f.getSeconds()
      }
      return hora + ":" + minuto
    },
  }
}
