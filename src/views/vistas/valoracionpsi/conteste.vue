<template>
  <v-container class="mt-2"  flat>

    <v-row>
      <v-col>
        <v-progress-linear
          color="info"
          :indeterminate="loading"
          rounded
          height="6"
        ></v-progress-linear>

        <v-alert
          dense
          border="left"
          color="teal"
          dark
        >
          <v-row class="py-0">
            <v-col cols="12" md="12">
              <h3 class="mb-1">({{ idnotasocial}}) OTROS ITEMS RELACIONADOS CON LA ASIMILACION DE LAS PERSONAS MIGRANTES</h3>
              Por favor, ¿me podría decir que tanto siente o piensa en lo siguiente…?
              <v-row>
                <v-col cols="12" md="9">
                  <!-- <h4>Puntuacion: {{nTotal}}</h4> -->
                </v-col>
                <!-- <v-spacer></v-spacer> -->
                <v-col cols="6" md="1">
                  <v-btn
                    color="blue lighten-2"
                    :to="{name:'valoracionpsi'}"
                    dark
                    small
                  >
                    <v-icon class="mx-2">mdi-reply</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" md="2">
                  <v-btn
                    small
                    dark
                    color="success"
                    @click="saveinfo"
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-alert>

        <v-data-table
          :headers="headers"
          :items="contesteprg"
          class="elevation-0"
          dense
          hide-default-footer
          :items-per-page="contesteprg.length"
          :loading="loading"
        >
          <template v-slot:item.nunca="{ item }">

            <v-simple-checkbox
              color="red"
              :ripple="false"
              v-model="item.nunca"
              @input="nuncaok(item)"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.algunas="{ item }">
            <v-simple-checkbox
              color = "orange"
              :ripple="false"
              v-model="item.algunas"
              @input="algunasok(item)"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.siempre="{ item }">
            <v-simple-checkbox
              color = "blue"
              :ripple="false"
              v-model="item.siempre"
              @input="siempreok(item)"
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
export default {

  data: () => ({
    contesteInfo:[],

    //DATOS DE GetPaciente
    idpacientes: 0,
    idtrabsocial: 0,
    idcatencion: 0,
    idconteste: 0,
    idnotasocial:0,

    nModo: 1,
    loading:false,

    c1:0,
    c2:0,
    c3:0,
    c4:0,
    c5:0,
    c6:0,

    nTotal: 0.00,
    nTipoCon:0,
    termino: false,

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu1: false,

    singleSelect: false,
    selected: [],
    headers: [
      { text: 'Id', value: 'id'},
      {
        // text: '¿me podría decir que tanto siente o piensa en lo siguiente…?',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Nunca', value: 'nunca' },
      { text: 'Algunas veces', value: 'algunas' },
      { text: 'Siempre', value: 'siempre' },
    ],

    contesteprg: [
      { id: 1,name: 'Piensa que es difícil adaptarse a la vida aquí' , nunca: false, algunas: false, regular: false, siempre: false },
      { id: 2,name: 'Se siente preocupado por no conocer la ciudad' , nunca: false, algunas: false, regular: false, siempre: false },
      { id: 3,name: 'Le preocupa salir a la calle' , nunca: false, algunas: false, regular: false, siempre: false },
      { id: 4,name: 'Ha tenido problemas para comunicarse con otras personas por su acento o por utilizar palabras que poco personas no entienden ' , nunca: false, algunas: false, regular: false, siempre: false },
      { id: 5,name: 'Le preocupa no tener amistades' , nunca: false, algunas: false, regular: false, siempre: false },
      { id: 6,name: 'Se siente solo ' , nunca: false, algunas: false, regular: false, siempre: false },
    ],
    // hora
    time: null,
    menu2: false,
    modal2: false,
  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
  },

  created() {
    console.log("router", this.$route.params);
    this.idconteste = this.$route.params.idconteste;
    this.idnotasocial = this.$route.params.idnotasocial;

    this.getPaciente
    this.idpacientes = this.getPaciente.idpacientes
    
    this.getCatencion
    this.idcatencion = this.getCatencion.idcatencion
    this.getExpediente
    
    this.idtrabsocial = this.getTrabsocial.idtrabsocial;


    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(new Date(), 'America/Monterrey').substr(0, 10)
    let date0 = new Date()
    let mes = date0.getMonth()
    let anio = date0.getFullYear()
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10)
    
    // this.consultar()
    // Determinar modo
    if (this.idconteste > 0) {
      this.nModo = 2;
      // this.readonly = true;
      this.cargarInfo();
      this.modo = "Editar";
    } else {
      console.log("nuevo");
      //VALORES INICIALES ALTA
      this.nModo = 1;
      this.modo = "Nuevo";
    }
  },
    
  methods:{
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions('Expediente', ['setExpediente']),

    // consultar() {
    //   this.loading= true
    //   this.$http.get('expedientes.get/'+ this.idpacientes).then(response=>{

    //     if (response.status == 200){
    //       // console.log (response)
    //       this.idconteste = response.data.result.idconteste
    //       this.loading= false
    //       this.setExpediente(response.data.result)

    //       // Determinar modo
    //       if (this.idconteste > 0) {
    //         this.nModo = 2
    //         this.readonly = true
    //         this.cargarInfo()
    //         this.modo = "Editar"
    //       } else {
    //         // console.log("nuevo")
    //         //VALORES INICIALES ALTA
    //         this.nModo = 1
    //         this.modo = "Nuevo"
    //       }
    //     }
        
    //   }).catch(error=>{
    //     this.showSnack({
    //       text: "Error al cargar información",
    //       color: "red",
    //       timeout: 2000,
    //     });
    //     console.log(error)
    //   })

    // },


    nuncaok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.nunca === true ){
        // console.log("contesteprg", this.contesteprg[nuncaRow.id-1])
        this.contesteprg[nuncaRow.id-1].algunas = false
        this.contesteprg[nuncaRow.id-1].siempre = false
      }
    },

    algunasok(nuncaRow) {
      // console.log(nuncaRow)
      if (nuncaRow.algunas === true ){
        // console.log("contesteprg", this.contesteprg[nuncaRow.id -1])
        this.contesteprg[nuncaRow.id-1].nunca = false
        this.contesteprg[nuncaRow.id-1].siempre = false
      }
    },

    siempreok(nuncaRow){
      // console.log(nuncaRow)
      if (nuncaRow.siempre === true ){
        // console.log("contesteprg", this.contesteprg[nuncaRow.id- 1])
        this.contesteprg[nuncaRow.id-1].nunca = false
        this.contesteprg[nuncaRow.id-1].algunas = false
      }
    },

    iratras() {
      this.$router
        .push({
          name: "valoracionpsi",
          params: {
            idansiedad: this.idconteste,
            idnotasocial: parseInt(this.idnotasocial),
          },
        })
        .catch(() => {});
    },

    saveinfo(){
      // console.log("INICIA GRABAR.")

      /// VALIDAR QUE TERMINE
      this.termino = true
      this.contesteprg.every(element=>{
        //Ciclo para buscar un true en cada pregunta.
        // every. Se detiene cuando respondes false.
        let respuesta = element.nunca || element.siempre || element.algunas
        // console.log (respuesta)
        if (respuesta === false){
          this.termino = false
          return false;
        }
        return true
      })
      // Valiadar que termine de contestar todo.
      if (this.termino === false) {
        //TODO  Mostrar snackbar. Que le falta.
        this.showSnack({
          text: "Debe Completar las preguntas",
          color: "orange",
          timeout: 2000,
        });
        console.log("LE FALTA TERMINAR")
        return
      }


      //// 2. Calcular resultado.
      let nSuma = 0
      this.contesteprg.forEach(element=>{
        let nValRow = 0
        if (element.nunca === true){
          nValRow = 1
        }
        if (element.algunas === true){
          nValRow = 2
        }
        if (element.siempre === true){
          nValRow = 3
        }
        nSuma = nSuma + nValRow
      })
      // console.log("SUMA", nSuma)
      this.nTotal= (nSuma * 100 / 30).toFixed(2)
      // console.log("Data actual", this.contesteprgprg)

      // Clasificar la contesteprg segun la siguiente tabla
      // 10 a 40 	No hay contesteprg
      // 41 a 49	contesteprg Moderada
      // 50 a 60	contesteprg grave

      this.nTipoCon=0
      if (this.nTotal >= 10 && this.nTotal < 40){
        this.nTipoCon = 1
      }
      
      if (this.nTotal >= 40 && this.nTotal < 50){
        this.nTipoCon = 2
      }
      
      if (this.nTotal >= 50 && this.nTotal <= 100){
        this.nTipoCon = 3
      }

      // console.log("TIpo de conteste", this.nTipoCon)

      /// 3. Saveinfo.
      // Hay que pasar de contesteprgprg a payload contesteprg.
      // cada pregunta pasarla a un campo An donde n es id de la pregunta.
      
      let nRow = 1
      this.contesteprg.forEach(element=>{
        let nColumna = 'c'+ nRow.toString()
        // para asignar dinamicamente la varible del data.

        if([nColumna === nRow]){
          let nValorRow = 0
          if (element.nunca === true){
            nValorRow = 1
          }
          if (element.algunas === true){
            nValorRow = 2
          }
          if (element.siempre === true){
            nValorRow = 3
          }
          this[nColumna]= nValorRow
        }
        nRow = nRow + 1
      })

      /// ASIGNAR PAYLOAD
      let payload = {
        "idpacientes": parseInt(this.idpacientes),
        "idtrabsocial": this.idtrabsocial,
        "idcatencion": this.idcatencion,
        "fecha": this.fecha,
        "hora": this.hora(),
        "c1": this.c1,
        "c2": this.c2,
        "c3": this.c3,
        "c4": this.c4,
        "c5": this.c5,
        "c6": this.c6,
        "resultado":  parseFloat(this.nTotal),
        "tipocon": this.nTipoCon,
        "idnotasocial": this.idnotasocial
      }
      // console.log("Payload", payload)
      this.loading= true

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        
        this.$http.post('conteste.insert', payload).then(response=>{
          // console.log (response)
          this.showSnack({
            text: "Se grabó correctamente su registro de conteste",
            color: "success",
            timeout: 2000,
          });
          this.loading= false
          this.$router
            .push({
              name: "valoracionpsi",
              params: {
                idansiedad: this.idconteste,
                idnotasocial: parseInt(this.idnotasocial),
              },
            })
            .catch(() => {});
        }).catch(error=>{
          this.showSnack({
            text: "Error al realizar operación",
            color: "red",
            timeout: 2000,
          });
          // console.log(error)
        })

      }  else {
        // contesteprg.update/:idcontesteprg
        // console.log("payload modo 2", payload)
        // console.log(this.idconteste)
        this.$http.put( 'conteste.update/' + this.idconteste, payload).then(response=>{
          this.showSnack({
            text: "Se actualizó correctamente",
            color: "success",
            timeout: 2000,
          });
          this.loading= false
          this.$router
            .push({
              name: "valoracionpsi",
              params: {
                idansiedad: this.idconteste,
                idnotasocial: parseInt(this.idnotasocial),
              },
            })
            .catch(() => {});
        }).catch(error=>{
          this.showSnack({
            text: "Error al realizar operación",
            color: "red",
            timeout: 2000,
          });
          console.log(error)})
      }
    },


    cargarInfo () {
      // console.log('cargarInfo')
      this.loading= true
      // this.$http.get( 'conteste.get.pac/' + this.idpacientes).then(response=>{
      this.$http.get( 'conteste.get/' + this.idconteste).then(response=>{
    
        // console.log("response", response)
        // TODO. Proceso para parsear info a forma
        //DEFINIR Si actualizo la fecha. Pienso que si.
        if (response.status != 200){
          this.showSnack({
            text: "Error al cargar Información",
            color: "red",
            timeout: 2000,
          });
        }
        // pasar Respuesta a la forma
        this.contesteInfo = response.data.result
        this.idconteste = this.contesteInfo.idconteste
        
        this.c1 = this.contesteInfo.c1
        this.c2 = this.contesteInfo.c2
        this.c3 = this.contesteInfo.c3
        this.c4 = this.contesteInfo.c4
        this.c5 = this.contesteInfo.c5
        this.c6 = this.contesteInfo.c6

        this.nTotal = this.contesteInfo.resultado
        this.nTipoCon = this.contesteInfo.tipocon
        
        //llamar al procedimeinto de carga y conversión de datos.
        this.convertirDatos()
       
        this.loading= false
      }).catch(error=>{
        this.showSnack({
          text: "Error al realizar operación",
          color: "red",
          timeout: 2000,
        });
        console.log(error)})
    },


    formatDateWithZone(date, tz) {
      let s = date.toLocaleString('en-GB', { timeZone: tz });
      let a = s.split(/\D/);
      return a[2] + '-' + a[1] + '-' + a[0] + ' ' + a[4] + ':' + a[5] + ':' + a[6];
    },

    hora() {
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
    
    convertirDatos(){
      // pasar Respuesta a la forma
        
      // console.log(this.a1, this.a2, this.a3)
      if (this.c1=== 1){
        this.contesteprg[1-1].nunca = true
      }
      if (this.c1=== 2){
        this.contesteprg[1-1].algunas = true
      }
      if (this.c1=== 3){
        this.contesteprg[1-1].siempre = true
      }
      ///DOS
      if (this.c2=== 1){
        this.contesteprg[2-1].nunca = true
      }
      if (this.c2=== 2){
        this.contesteprg[2-1].algunas= true
      }
      if (this.c2=== 3){
        this.contesteprg[2-1].siempre = true
      }
      ///tres
      if (this.c3 === 1){
        this.contesteprg[3-1].nunca = true
      }
      if (this.c3 === 2){
        this.contesteprg[3-1].algunas = true
      }
      if (this.c3 === 3){
        this.contesteprg[3-1].siempre = true
      }
      //Cuatro
      if (this.c4 === 1){
        this.contesteprg[4-1].nunca = true
      }
      if (this.c4 === 2){
        this.contesteprg[4-1].algunas = true
      }
      if (this.c4 === 3){
        this.contesteprg[4-1].siempre = true
      }
      //Cinco
      if (this.c5 === 1){
        this.contesteprg[5-1].nunca = true
      }
      if (this.c5 === 2){
        this.contesteprg[5-1].algunas = true
      }
      if (this.c5 === 3){
        this.contesteprg[5-1].siempre = true
      }
      //Seis
      if (this.c6 === 1){
        this.contesteprg[6-1].nunca = true
      }
      if (this.c6 === 2){
        this.contesteprg[6-1].algunas = true
      }
      if (this.c6 === 3){
        this.contesteprg[6-1].siempre = true
      }
    }


  }
    
}
</script>
