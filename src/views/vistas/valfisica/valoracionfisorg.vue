<template>
  <v-container class="mt-2">

    <v-toolbar color="blue darken-3" dark rounded="lg" class="mb-3"  width="500" dense>
      <h2>Valoracion fisica</h2>
    </v-toolbar>

    <v-row>
      <v-col cols="12" md="5">
        <v-card flat>
          <v-col cols="11">
          <h3 class="ml-4">Laboratorios</h3>
          <v-text-field
            label="Tipo de sangre"
            class="mx-3 mt-3"
            dense
          >
          </v-text-field>
          <v-text-field
            label="Ultima determinación de hemoglobina"
            class="mx-3"
            dense
          >
          </v-text-field>
          <v-text-field
            label="Ultima determinación de glucosa"
            class="mx-3"
            dense
          >
          </v-text-field>
          <v-text-field
            label="Ultima determinacion de colesterol"
            class="mx-3"
            dense
          >
          </v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha de últimos laboratorios"
                append-icon="mdi-calendar"
                readonly
                dense
                rounded
                filled
                class="mx-3"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            label="Adjuntar foto de resultados"
            readonly
            dense
            prepend-inner-icon="mdi-camera"
            outlined
            class="mx-3"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card
          flat
          height="395"
        >
          <v-img
            contain
            height="390"
            src="@/assets/img/resultados.png"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
        <v-card flat>
          <v-col cols="11">
          <h3 class="ml-4">Radiografias</h3>
          <v-text-field
            label="Lugar"
            class="mx-3 mt-4"
            dense
          >
          </v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha"
                append-icon="mdi-calendar"
                readonly
                dense
                rounded
                filled
                class="mx-3"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            label="Adjuntar foto de radiografias"
            readonly
            dense
            prepend-inner-icon="mdi-camera"
            outlined
            class="mx-3"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card
          flat
          height="258"
        >
          <v-img
            contain
            height="258"
            src="@/assets/img/radiografia.jpg"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
        <v-card flat>
          <v-col cols="11">
          <h3 class="ml-4">Vacunas</h3>
          <v-text-field
            label="Lugar"
            class="mx-3 mt-4"
            dense
          >
          </v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha"
                append-icon="mdi-calendar"
                readonly
                dense
                rounded
                filled
                class="mx-3"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            label="Adjuntar comprobante de vacunacion"
            readonly
            dense
            prepend-inner-icon="mdi-camera"
            outlined
            class="mx-3"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card
          flat
          height="258"
        >
          <v-img
            contain
            height="258"
            src="@/assets/img/vacunacion.jpg"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
        <v-card flat>
          <v-col cols="11">
          <h3 class="ml-4">Transfusiones</h3>
          <v-text-field
            label="Lugar"
            class="mx-3 mt-4"
            dense
          >
          </v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha"
                append-icon="mdi-calendar"
                readonly
                dense
                rounded
                filled
                class="mx-3"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            label="Adjuntar comprobante de transfusiones"
            readonly
            dense
            prepend-inner-icon="mdi-camera"
            outlined
            class="mx-3"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card
          flat
          height="258"
        >
          <v-img
            contain
            height="255"
            src="@/assets/img/comprobante.jpg"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data: () => ({

    dialog: false,
    dialogDelete: false,

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
      
    singleSelect: false,
    selected: [],
    headers: [
      { text: 'Id', value: 'id'},
      {
        text: 'Enfermedad',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '¿Tiene esa enfermedad?', value: 'actions', sortable: false  },
      { text: 'Describir', value: 'describir' },
      
    ],
    enfermedades: [
      {id: 1,name: 'Piel', opcionenf: 'Si'},
      {id: 2,name: 'Cabeza', opcionenf: 'No'},
      {id: 3,name: 'Faringe', opcionenf: 'No'},
      {id: 4,name: 'Oidos', opcionenf: 'No'},
      {id: 5,name: 'Cuello', opcionenf: 'No'},
      {id: 6,name: 'Tórax pulmonar', opcionenf: 'No'},
      {id: 7,name: 'Tórax cardiovascular', opcionenf: 'No'},
      {id: 8,name: 'Abdomen', opcionenf: 'No'},
      {id: 9,name: 'Genitales', opcionenf: 'No'},
      {id: 10,name: 'Extremdidades', opcionenf: 'No'},
      {id: 11,name: 'Neurológico', opcionenf: 'No'},
    ],

  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  
  created () {
    this.initialize()
  },

  methods: {

    activarenf(item){
      // console.log(item)
      console.log(this.enfermedades[item.id-1])
      if (item.opcionenf[item.id-1] == 'No'){
        console.log("hola")
        this.enfermedades.opcionenf = 'Si'
      }
      else{
        this.enfermedades.opcionenf = 'No'
      }
    },

    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>

</style>