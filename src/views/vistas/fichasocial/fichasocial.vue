<template>
  <v-container class="mt-2">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-toolbar
      color="blue darken-3"
      dark
      rounded="lg"
      class="mb-3"
      width="500"
      dense
    >
      <h2>Ficha social</h2>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card class="mt-2 auto mb-6" flat :loading="loading">
      <!-- <v-progress-linear
        color="info"
        :indeterminate="loading"
        rounded
        height="6"
      ></v-progress-linear> -->

      <v-row class="mx-1">
        <v-col cols="12" md="2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded
                hide-details
                filled
                v-model="date"
                label="Fecha"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
          </v-menu>
        </v-col>

        <v-col cols="12" md="2">
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Hora"
                prepend-inner-icon="mdi-clock-time-four-outline"
                readonly
                filled
                dense
                rounded
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            readonly
            filled
            rounded
            label="Centro de atención:"
            prepend-inner-icon="mdi-map-marker"
            hide-details
            placeholder="clinica, albergue, etc."
            v-model="nomcatencion"
          >
          </v-text-field>
          <!-- <v-text-field
            label="Lugar de expedición del expediente"
            placeholder="Centro de atencion medica"
            hide-details
            filled
            rounded
          >
          </v-text-field> -->
        </v-col>
        <v-col cols="12" md="3" >
            <v-text-field
              readonly
              class="mt-3"
              label="Trab. Social que atendio:"
              prepend-inner-icon="mdi-account"
              hide-details
              v-model="nomcatencion"
              outlined
              filled
              dense
            >
            </v-text-field>
          </v-col>
        <v-col>
          <v-row justify="center" class="mt-1 mb-2">
            <v-btn dark class="mt-2" color="info" @click="saveinfo"
              >Guardar
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-card flat color="transparent" class="mt-2 auto mb-6">
    <vista/>
    </v-card> -->

    <v-card flat rounded="lg" class="mt-2 auto mb-6">
      <v-alert color="white" height="50" dense border="left">
        <h2 class="ml-4">Perfil</h2>
        <v-divider class="mt-1"></v-divider>
      </v-alert>
      <v-row class="mx-1 mt-1">
        <v-col cols="12" md="4">
          <v-select
            label="¿Se identifica como parte de un grupo indígena/étnico?"
            return-object
            dense
            hide-details
            v-model="tipoetniasel"
            :items="tipoetniaopc"
            item-text="opcion"
            @change="desactivaretnia"
            item-value="id"
            persistent-hint
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="tipoetniasel.id===1">
          <v-text-field
            label="Si la respuesta fue afirmativa ¿Cuál?"
            hide-details
            v-model="ednia"
            dense
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Idiomas que habla"
            hide-details
            dense
            v-model="idiomas"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1 mt-1">
        <v-col cols="12" md="4">
          <v-select
            return-object
            label="Situación de vivienda"
            :items="sitviviendaopc"
            v-model="sitviviendasel"
            item-text="opcion"
            item-value="id"
            persistent-hint
            hide-details
            dense
            @change="desactivarvivienda"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="sitviviendasel.id=== 6">
          <v-text-field
            label="¿Qué otro tipo de situación?"
            hide-details
            dense
            v-model="otrovivienda"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            return-object
            label="¿Profesa alguna religión?"
            :items="tiporeligionopc"
            v-model="tiporeligionsel"
            item-text="opcion"
            item-value="id"
            persistent-hint
            dense
            @change="desactivarreligion"
            hide-details
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="tiporeligionsel.id===1">
          <v-text-field
            label="En caso afirmativo ¿Cuál religión?"
            hide-details
            dense
            v-model="religion"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-2 auto mb-6" flat>
      <v-alert color="white" height="50" dense border="left">
        <h2 class="ml-4">Migración</h2>
        <v-divider class="mt-1"></v-divider>
      </v-alert>

      <v-row class="mx-1">
        <v-col cols="12" md="3">
          <!-- <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fsalida"
                label="Fecha de salida del lugar de origen"
                prepend-icon="mdi-calendar"
                readonly
                dense
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fsalida"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu> -->

          <v-menu
            ref="menu"
            v-model="menu3"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fsalida"
                label="Fecha de salida del lugar de origen"
                prepend-inner-icon="mdi-calendar"
                readonly
                dense
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fsalida"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="savefecha"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <!-- <v-col cols="12" md="3">
          <v-text-field
            label="Ciudad de origen"
            hide-details
            v-model="cdorigen"
            dense
          >
          </v-text-field>
        </v-col> -->
        <!-- <v-col cols="12" md="3">
          <v-text-field
            v-model="paisorigen"
            label="País de origen"
            hide-details
            dense
          >
          </v-text-field>
        </v-col> -->
        <v-col cols="12" md="3">
          <v-text-field
            label="¿Cuántas veces ha migrado?"
            v-model="cantmigra"
            hide-details
            dense
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Carácter de migración"
            v-model="tipomigrasel"
            :items="tipomigraopc"
            hide-details
            dense
            return-object
            item-text="opcion"
            item-value="id"
          >
          </v-select>
        </v-col>
        <!-- <v-col cols="12" md="3" v-if="tipomigrasel.id === 5">
          <v-text-field
            label="¿Qué otro tipo?"
            v-model="otromigra"
            hide-details
            dense
          >
          </v-text-field>
        </v-col> -->
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12" md="4">
          <v-select
            label="Estado de acompañamiento de la migración"
            v-model="estmigrasel"
            return-object
            item-text="opcion"
            item-value="id"
            :items="estmigraopc"
            persistent-hint
            dense
            hide-details
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="paisdestino"
            label="País de destino"
            hide-details
            dense
            :rules="validaRules"
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            label="¿El lugar de tránsito lo ve lugar para establecerse?"
            v-model="tipoestasel"
            hide-details
            return-object
            @change="desactivartransito"
            item-text="opcion"
            item-value="id"
            :items="tipoestaopc"
            dense
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row class="mx-1" v-if="tipoestasel.id===1">
        <v-col cols="12" md="12">
          <v-text-field
            label="¿Por qué?"
            v-model="establecerse"
            hide-details
            dense
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12" md="12">
          <v-textarea
            label="Motivo de la migración"
            v-model="motivo"
            rows="1"
            auto-grow
            outlined
            hide-details
            dense
            :rules="validaRules"
            required
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-2 auto mb-6" flat>
      <v-alert color="white" height="50" dense border="left">
        <h2 class="ml-4">Familia</h2>
        <v-divider class="mt-1"></v-divider>
      </v-alert>

      <v-row class="mx-1">
        <v-col cols="12" md="4">
          <v-select
            label="Tipo de familia"
            v-model="tipofamsel"
            :items="tipofamopc"
            return-object
            dense
            hide-details
            item-text="opcion"
            item-value="id"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Número de integrantes de la familia"
            hide-details
            v-model="integrafam"
            dense
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="¿Dónde está su familia?"
            hide-details
            :items="ubicafamopc"
            v-model="ubicafamsel"
            return-object
            item-text="opcion"
            item-value="id"
            dense
          >
          </v-select>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-2 auto mb-6" flat>
      <v-alert color="white" height="50" dense border="left">
        <h2 class="ml-4">Trabajo</h2>
        <v-divider class="mt-1"></v-divider>
      </v-alert>

      <v-row class="mx-1">
        <v-col cols="12" md="5">
          <v-text-field
            label="¿Cuál era su trabajo/ocupación en su lugar de origen?"
            hide-details
            v-model="trabajoorg"
            dense
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Trabaja actualmente"
            hide-details
            v-model="tipotrabajasel"
            dense
            @change="desactivartrabajo"
            :items="tipotrabajaopc"
            return-object
            item-text="opcion"
            item-value="id"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="tipotrabajasel.id===1">
          <v-text-field
            label="En caso afirmativo ¿En cuál actividad/ocupación?"
            hide-details
            outlined
            v-model="trabajoact"
            dense
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12" md="3">
          <v-select
            item-text="opcion"
            item-value="id"
            dense
            return-object
            hide-details
            label="¿Tiene ingresos actualmente?"
            v-model="tipoingresosel"
            @change="desactivaringresos"
            :items="tipoingresoopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="3"  v-if="tipoingresosel.id === 1">
          <v-text-field
            label="¿Cuál es su ingreso semanal?"
            hide-details
            v-model="ingresosem"
            dense
            outlined
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3"  v-if="tipoingresosel.id === 1">
          <v-select
            label="¿Cómo los obtiene?"
            hide-details
            @change="desactivarcomogana"
            v-model="formaingresosel"
            :items="formaingresoopc"
            dense
            return-object
            item-text="opcion"
            item-value="id"
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="3" v-if="formaingresosel.id === 5">
          <v-text-field
            label="¿Cómo los gana?"
            hide-details
            v-model="otroingreso"
            dense
            outlined
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-col cols="12" md="5">
          <v-select
            label="¿Tiene dependientes económicos?"
            hide-details
            return-object
            item-text="opcion"
            item-value="id"
            @change="desactivardepe"
            v-model="tipodependientessel"
            dense
            :items="tipodependientesopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="tipodependientessel.id === 1">
          <v-text-field
            label="En caso afirmativo ¿Cuántas personas?"
            v-model="dependientes"
            hide-details
            outlined
            dense
            type="number"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-2 auto mb-6" flat>
      <v-alert color="white" height="50" dense border="left">
        <h2 class="ml-4">Redes de apoyo</h2>
        <v-divider class="mt-1"></v-divider>
      </v-alert>

      <v-row class="mx-1">
        <v-col cols="12" md="5">
          <v-select
            label="¿Ha tenido algún tipo de necesidad durante su viaje?"
            return-object
            @change="desactivarredes"
            item-text="opcion"
            item-value="id"
            dense
            hide-details
            v-model="tiponecesidadsel"
            :items="tiponecesidadopc"
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row class="mx-1" v-if="tiponecesidadsel.id === 1">
        <v-col cols="12" md="12">
          <p class="">
            ¿Cuáles han sido sus principales necesidades durante el viaje?
            Seleccione en orden de prioridad las 3 principales
          </p>
          <v-text-field
            label="Prioridad 1"
            hide-details
            v-model="necesidad1"
            dense
          >
          </v-text-field>
          <v-text-field label="Prioridad 2" v-model="necesidad2" hide-details>
          </v-text-field>
          <v-text-field label="Prioridad 3" v-model="necesidad3" hide-details>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12" md="4">
          <v-select
            label="¿Ha recibido apoyo durante su viaje?"
            hide-details
            v-model="tipoapoyosel"
            dense
            @change="desactivarapoyo"
            return-object
            item-text="opcion"
            item-value="id"
            :items="tipoapoyoopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4" v-if="tipoapoyosel.id === 1">
          <v-text-field
            label="En caso afirmativo ¿Qué tipo de apoyo?"
            hide-details
            v-model="apoyo"
            dense
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" v-if="tipoapoyosel.id === 1">
          <v-select
            label="¿Quién le ha otorgado apoyo?"
            hide-details
            v-model="quienapoyosel"
            dense
            return-object
            @change="desactivarquien"
            item-text="opcion"
            item-value="id"
            :items="quienapoyoopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="12" v-if="quienapoyosel.id === 8">
          <v-textarea
            label="Quién?"
            hide-details
            dense
            return-object
            rows="1"
            v-model="oapoyo"
            auto-grow
            outlined
          >
          </v-textarea>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12" md="6" v-if="tipoapoyosel.id === 1">
          <p>
            En qué lugar se encuentran las personas que le han apoyado en mayor
            medida para realizar el viaje
          </p>
          <v-select
            label="Respuesta"
            hide-details
            v-model="apoyoporsel"
            dense
            return-object
            item-text="opcion"
            @change="desactivarlugar"
            item-value="id"
            :items="apoyoporopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="12" v-if="apoyoporsel.id === 4">
          <v-textarea
            label="En que lugar?"
            hide-details
            dense
            v-model="olugar"
            rows="1"
            auto-grow
            outlined
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <p>
            ¿Cuál fue el medio a través del cuál se enteró de la existencia de
            organizaciones de apoyo a migrantes?
          </p>
          <v-select
            label="Respuesta"
            hide-details
            return-object
            item-text="opcion"
            item-value="id"
            v-model="conocioensel"
            dense
            @change="desactivarmedio"
            :items="conocioenopc"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="12" v-if="conocioensel.id === 7">
          <v-textarea
            label="Que medio?"
            hide-details
            dense
            v-model="omedio"
            return-object
            rows="1"
            auto-grow
            outlined
          >
          </v-textarea>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn dark class="mb-5 mt-5" color="info" @click="saveinfo"
          >Guardar</v-btn
        >
      </v-row>
    </v-card>
    </v-form>
  </v-container>
</template>

<script>
// import vista from '@/views/vistas/invpersonal/vista'
import tiempo from "@/mixins/tiempo.js";
import { mapGetters, mapActions } from "vuex";

export default {
  // components: {
  //   vista,
  // },
  mixins: [tiempo],
  data() {
    return {
      valid: true,
      validaRules: [
        v => !!v || 'Name is required',
      ],

      activePicker: "YEAR",
      nomcatencion: "",

      //DATOS DE GetPaciente
      idpacientes: 0,
      idtrabsocial: 0,
      idcatencion: 0,
      idsocial: 0,

      loading: false,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      fsalida: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      //CAMPOS DE FICHA SOCIAL

      tipoetniaopc: [
        { opcion: "Si", id: 1 },
        { opcion: "No", id: 0 },
      ],
      tipoetniasel: { opcion: "", id: 0 },

      tiporeligionopc: [
        { opcion: "Si", id: 1 },
        { opcion: "No", id: 0 },
      ],
      tiporeligionsel: { opcion: "", id: 0 },

      sitviviendaopc: [
        { opcion: "No contesto ", id: 0 },
        { opcion: "Cuarto o casa rentada ", id: 1 },
        { opcion: "Cuarto o casa prestada", id: 2 },
        { opcion: "Viviendo en situación de calle", id: 3 },
        { opcion: "Viviendo en albergue", id: 4 },
        { opcion: "En hotel", id: 5 },
        { opcion: "Otra", id: 6 },
      ],
      sitviviendasel: { opcion: "", id: 0 },

      estmigraopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Viaja solo", id: 1 },
        { opcion: "Viaja acompañado", id: 2 },
        { opcion: "Viaja con niños/niñas o adolescentes", id: 3 },
        { opcion: "Viaja en grupo o caravana", id: 4 },
      ],
      estmigrasel: { opcion: "", id: 0 },

      tipomigraopc: [
        { opcion: "Ninguna", id: 0 },
        { opcion: "Voluntaria", id: 1 },
        { opcion: "Forzada", id: 2 },
      ],
      tipomigrasel: { opcion: "", id: 0 },

      tipoestaopc: [
        { opcion: "Si", id: 1 },
        { opcion: "No", id: 0 },
      ],
      tipoestasel: { opcion: "", id: 0 },

      tipofamopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Hogar nuclear (padre, madre e hijos)", id: 1 },
        { opcion: "Pareja sola", id: 2 },
        { opcion: "Hogar monoparental femenino", id: 3 },
        { opcion: "Hogar monoparental masculino", id: 4 },
        { opcion: "Hogar extendido", id: 5 },
        { opcion: "Unipersonal", id: 6 },
        { opcion: "Corresidentes", id: 7 },
      ],
      tipofamsel: { opcion: "", id: 0 },

      ubicafamopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Lugar de origen", id: 1 },
        { opcion: "Lugar de destino", id: 2 },
        { opcion: "En ambos", id: 3 },
        { opcion: "Acompañando en viaje", id: 4 },
        { opcion: "En tránsito", id: 5 },
      ],
      ubicafamsel: { opcion: "", id: 0 },

      tipotrabajaopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tipotrabajasel: { opcion: "", id: 0 },

      tipoingresoopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tipoingresosel: { opcion: "", id: 0 },

      tipodependientesopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tipodependientessel: { opcion: "", id: 0 },

      tiponecesidadopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tiponecesidadsel: { opcion: "", id: 0 },

      tipoapoyoopc: [
        { opcion: "No", id: 0 },
        { opcion: "Si", id: 1 },
      ],
      tipoapoyosel: { opcion: "", id: 0 },

      quienapoyoopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Familiares", id: 1 },
        { opcion: "Amigos", id: 2 },
        { opcion: "Conocidos", id: 3 },
        { opcion: "Comunidades", id: 4 },
        { opcion: "Organizaciones de la sociedad civil", id: 5 },
        { opcion: "Gobierno", id: 6 },
        { opcion: "Empresas", id: 7 },
        { opcion: "Otro", id: 8 },
      ],
      quienapoyosel: { opcion: "", id: 0 },

      apoyoporopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Lugar de origen", id: 1 },
        { opcion: "Lugar de tránsito", id: 2 },
        { opcion: "Lugar de destino", id: 3 },
        { opcion: "Otro", id: 4 },
      ],
      apoyoporsel: { opcion: "", id: 0 },

      conocioenopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Familiares", id: 1 },
        { opcion: "Amigos", id: 2 },
        { opcion: "Conocidos", id: 3 },
        { opcion: "Anuncios publicitarios", id: 4 },
        { opcion: "Páginas de internet", id: 5 },
        { opcion: "Radio", id: 6 },
        { opcion: "Otro", id: 7 },
      ],
      conocioensel: { opcion: "", id: 0 },

      formaingresoopc: [
        { opcion: "No contesto", id: 0 },
        { opcion: "Empleo formal", id: 1 },
        { opcion: "Empleo informal", id: 2 },
        { opcion: "Remesas", id: 3 },
        { opcion: "Programas de asistencia", id: 4 },
        { opcion: "Otro", id: 5 },
      ],
      formaingresosel: { opcion: "", id: 0 },

      time: null,
      // menu2: false,
      modal2: false,

      ednia: "",
      idiomas: "",
      // sitvivienda:'',
      // tiporeligion:'',
      religion: "",
      // fsalida: "2010-01-01",
      cdorigen: "",
      paisorigen: "",
      paisdestino: "",
      motivo: "",
      // estmigra:'',
      cantmigra: 1,
      // tipoesta:'',
      establecerse: "",
      // tipofam:'',

      integrafam: 2,
      // ubicafam:'',
      trabajoorg: "",
      // tipotrabaja:'',
      trabajoact: "",

      ingresosem: 0,
      dependientes: 0,
      // tiponecesidad:'',
      necesidad1: "",
      necesidad2: "",
      necesidad3: "",

      oapoyo:'',
      olugar:'',
      omedio:'',

      otroingreso:'',

      otromigra:'',

      otrovivienda:'',


      // tipoapoyo:'',
      apoyo: "",
      // quienapoyo:'',
      // apoyopor:'',
      // conocioen:'',
    };
  },

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),

    validaInfo() {
      return this.paisdestino !== "" &&
      this.motivo !== ""
    },
  },

  created() {
    // console.log(this.getPaciente)
    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    this.getCatencion;
    this.idcatencion = parseInt(this.getCatencion.idcatencion);
    this.nomcatencion = this.getCatencion.nombre;

    this.getExpediente;

    this.getTrabsocial;
    this.idtrabsocial = this.getTrabsocial.idtrabsocial;

    // Definir valores iniciales   // Fecha inicial Primero de mes.
    this.fecha = this.formatDateWithZone(
      new Date(),
      "America/Monterrey"
    ).substr(0, 10);
    let date0 = new Date();
    let mes = date0.getMonth();
    let anio = date0.getFullYear();
    this.fecha1 = new Date(anio, mes, 1).toISOString().substr(0, 10);
    this.time = this.gethora();

    this.consultar();
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    desactivarvivienda(){
      if (this.sitviviendasel.id != 6){
        this.otrovivienda = ''
      }
    },

    desactivarcomogana(){
      if (this.formaingresosel.id != 5){
        this.otroingreso = ''
      }
    },

    desactivarapoyo(){
      if (this.tipoapoyosel.id != 1){
        this.apoyo = ''
      }
    },

    desactivarmedio(){
      if (this.conocioen.id != 7){
        this.omedio = ''
      }
    },

    desactivarlugar(){
      if (this.apoyoporopc.id != 4){
        this.olugar = ''
      }
    },

    desactivarquien(){
      if (this.quienapoyo.id != 8){
        this.oapoyo = ''
      }
    },

    //TRABAJO
    desactivartrabajo(){
      if (this.tipotrabajasel.id != 1){
        this.ingresosem = 0
      }
    },

    desactivardepe(){
      if (this.tipodependientessel.id != 1){
        this.dependientes = 0
      }
    },

    desactivaringresos(){
      if (this.tipoingresosel.id != 1){
        this.trabajoact = ''
      }
    },

    //MIGRACION

    desactivartransito(){
      if (this.tipoestasel.id != 1){
        this.establecerse = ''
      }
    },

    //PERFIL

    desactivaretnia(){
      if (this.tipoetniasel.id != 1){
        this.ednia = ''
      }
    },

    desactivarreligion(){
      if (this.tiporeligionsel.id != 1){
        this.religion = ''
      }
    },

    //REDES
    desactivarredes(){
      if (this.tiponecesidadsel.id != 1){
        this.necesidad1 = '',
        this.necesidad2 = '',
        this.necesidad3 = ''
      }
    },

    consultar() {
      this.loading = true;
      this.$http
        .get("expedientes.get/" + this.idpacientes)
        .then((response) => {
          if (response.status == 200) {
            // console.log ("EXPEDIENTE", response)
            this.idsocial = response.data.result.idsocial;
            this.loading = false;
            this.setExpediente(response.data.result);

            // Determinar modo
            if (this.idsocial > 0) {
              this.nModo = 2;
              this.readonly = true;
              this.cargarInfo();
              this.modo = "Editar";
            } else {
              console.log("nuevo");
              //VALORES INICIALES ALTA
              this.nModo = 1;
              this.modo = "Nuevo";
            }
          }
        })
        .catch((error) => {
          this.showSnack({
            text: "Error al cargar información",
            color: "red",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    saveinfo() {
      // console.log("INICIA GRABAR.")
      if (!this.validaInfo) {
        this.$refs.form.validate()
        this.showSnack({
          text: "Debes llenar el país destino, y motivo de migracion del paciente",
          color: "orange",
          timeout: 2000,
        });
        return;
      }

      let payload = {
        idpacientes: parseInt(this.idpacientes),
        idtrabsocial: this.idtrabsocial,
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        hora: this.gethora(),

        tipoetnia: this.tipoetniasel.id,
        ednia: this.ednia,
        idiomas: this.idiomas,
        sitvivienda: this.sitviviendasel.id,
        otrovivienda: this.otrovivienda,
        tiporeligion: this.tiporeligionsel.id,
        religion: this.religion,

        fsalida: this.fsalida,
        cdorigen: this.cdorigen,
        paisorigen: this.paisorigen,
        paisdestino: this.paisdestino,
        motivo: this.motivo,
        estmigra: this.estmigrasel.id,

        // MIGRACION
        cantmigra: parseInt(this.cantmigra),
        tipoesta: this.tipoestasel.id,
        establecerse: this.establecerse,
        tipomigra: this.tipomigrasel.id,
        otromigra: this.otromigra,

        //FAMILIA
        tipofam: this.tipofamsel.id,
        integrafam: parseInt(this.integrafam),
        ubicafam: this.ubicafamsel.id,

        //TRABAJO
        trabajoorg: this.trabajoorg,
        tipotrabaja: this.tipotrabajasel.id,
        trabajoact: this.trabajoact,
        tipoingreso: this.tipoingresosel.id,
        ingresosem: parseInt(this.ingresosem),
        tipodependientes: this.tipodependientessel.id,
        dependientes: parseInt(this.dependientes),
        formaingreso: this.formaingresosel.id,

        //APOYOS
        tiponecesidad: this.tiponecesidadsel.id,
        necesidad1: this.necesidad1,
        necesidad2: this.necesidad2,
        necesidad3: this.necesidad3,
        tipoapoyo: this.tipoapoyosel.id,
        apoyo: this.apoyo,
        quienapoyo: this.quienapoyosel.id,
        apoyopor: this.apoyoporsel.id,
        conocioen: this.conocioensel.id,

        oapoyo: this.oapoyo,
        olugar: this.olugar,
        omedio: this.omedio,
        otroingreso: this.otroingreso,

        sitvivienda: this.sitviviendasel.id,
        tipoetnia: this.tipoetniasel.id,
      };

      console.log("Payload", payload);
      this.loading = true;

      //DETERMINAR EL MODO
      if (this.nModo == 1) {
        this.$http
          .post("social.insert", payload)
          .then((response) => {
            // console.log (response)
            this.showSnack({
              text: "Se grabó correctamente su registro de social",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.$router.push({ name: "panel" }).catch(() => {});
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al realizar operación",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      } else {
        // social.update/:idsocial
        console.log("payload modo 2", payload);
        console.log(this.idsocial);
        this.$http
          .put("social.update/" + this.idsocial, payload)
          .then((response) => {
            this.showSnack({
              text: "Se actualizó correctamente",
              color: "success",
              timeout: 2000,
            });
            this.loading = false;
            this.consultar();
            this.$router.push({ name: "panel" }).catch(() => {});
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al actualizar los datos",
              color: "red",
              timeout: 2000,
            });
            console.log(error);
          });
      }
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },

    savefecha(date) {
      console.log(date);
      console.log(this.date);
      this.$refs.menu.save(date);
    },

    cargarInfo() {
      this.loading = true;
      // console.log('getPaciente',this.getPaciente)
      this.idpacientes = this.getPaciente.idpacientes;

      this.$http
        .get("social.get.pac/" + this.idpacientes)
        .then((response) => {
          // console.log("response", response);
          // TODO. Proceso para parsear info a forma
          //DEFINIR Si actualizo la fecha. Pienso que si.
          if (response.status != 200) {
            this.showSnack({
              text: "Error al cargar Información",
              color: "red",
              timeout: 2000,
            });
          }
          // pasar Respuesta a la forma
          this.fichasocial = response.data.result;
          this.idsocial = this.fichasocial.idsocial;

          this.ednia = this.fichasocial.ednia;
          this.idiomas = this.fichasocial.idiomas;
          this.religion = this.fichasocial.religion;

          this.fsalida = this.fichasocial.fsalida;
          this.cdorigen = this.fichasocial.cdorigen;
          this.paisorigen = this.fichasocial.paisorigen;
          this.paisdestino = this.fichasocial.paisdestino;
          this.motivo = this.fichasocial.motivo;
          this.estmigra = this.fichasocial.estmigra;

          this.cantmigra = parseInt(this.fichasocial.cantmigra);
          this.tipoesta = this.fichasocial.tipoesta;
          this.establecerse = this.fichasocial.establecerse;
          this.tipomigra = this.fichasocial.tipomigra;
          this.otromigra = this.fichasocial.otromigra;

          this.tipofam = this.fichasocial.tipofam;
          this.integrafam = this.fichasocial.integrafam;
          this.ubicafam = this.fichasocial.ubicafam;

          this.trabajoorg = this.fichasocial.trabajoorg;
          this.tipotrabaja = this.fichasocial.tipotrabaja;
          this.trabajoact = this.fichasocial.trabajoact;
          this.tipoingreso = this.fichasocial.tipoingreso;
          this.formaingreso = this.fichasocial.formaingreso;

          this.ingresosem = this.fichasocial.ingresosem;
          this.tipodependientes = this.fichasocial.tipodependientes;
          this.dependientes = this.fichasocial.dependientes;

          this.tiponecesidad = this.fichasocial.tiponecesidad;
          this.necesidad1 = this.fichasocial.necesidad1;
          this.necesidad2 = this.fichasocial.necesidad2;
          this.necesidad3 = this.fichasocial.necesidad3;
          this.tipoapoyo = this.fichasocial.tipoapoyo;
          this.apoyo = this.fichasocial.apoyo;
          this.quienapoyo = this.fichasocial.quienapoyo;
          this.apoyopor = this.fichasocial.apoyopor;
          this.conocioen = this.fichasocial.conocioen;

          this.otroingreso = this.fichasocial.otroingreso;
          this.oapoyo = this.fichasocial.oapoyo;
          this.olugar = this.fichasocial.olugar;
          this.omedio = this.fichasocial.omedio;
          this.otrovivienda = this.fichasocial.otrovivienda;
          //llamar al procedimeinto de carga y conversión de datos.
          this.convertirDatos(this.fichasocial);

          this.loading = false;
        })
        .catch((error) => {
          this.showSnack({
            text: "Error al realizar operación en api undefined",
            color: "red",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    //Proceso para transformar el result de la consulta en Datos correctos para el data.
    convertirDatos(fichasocial) {
      // console.log("this.fichasocial,tipoetnia", this.fichasocial.tipoetnia)

      //Conversion de Catalogo de Situacion de Vivienda.
      this.sitviviendasel.id = this.fichasocial.sitvivienda;
      this.sitviviendasel.opcion =
        this.sitviviendaopc[this.sitviviendasel.id].opcion;
      this.sitviviendasel = {
        opcion: this.sitviviendasel.opcion,
        id: this.fichasocial.sitvivienda,
      };
      // console.log(this.sitviviendasel )

      //Conversion de Catalogo de tipo etnia.

      this.tipoetniasel.id = this.fichasocial.tipoetnia;
      this.tipoetniasel.opcion = this.tipoetniaopc[this.tipoetniasel.id].opcion;
      this.tipoetniasel = {
        opcion: this.tipoetniasel.opcion,
        id: this.fichasocial.tipoetnia,
      };
      // console.log('probando tipo etnia sel',this.tipoetniasel.id, this.tipoetniasel.opcion )

      //Conversion de Catalogo de tipo religion
      this.tiporeligionsel.id = this.fichasocial.tiporeligion;
      this.tiporeligionsel.opcion =
        this.tiporeligionopc[this.tiporeligionsel.id].opcion;
      this.tiporeligionsel = {
        opcion: this.tiporeligionsel.opcion,
        id: this.fichasocial.tiporeligion,
      };
      // console.log(this.tiporeligionsel )

      //Conversion de Catalogo de estatus de migracion
      this.estmigrasel.id = this.fichasocial.estmigra;
      this.estmigrasel.opcion = this.estmigraopc[this.estmigrasel.id].opcion;
      this.estmigrasel = {
        opcion: this.estmigrasel.opcion,
        id: this.fichasocial.estmigra,
      };
      // console.log(this.estmigrasel )

      //Conversion de Catalogo de tipo establecimiento
      this.tipoestasel.id = this.fichasocial.tipoesta;
      this.tipoestasel.opcion = this.tipoestaopc[this.tipoestasel.id].opcion;
      this.tipoestasel = {
        opcion: this.tipoestasel.opcion,
        id: this.fichasocial.tipoesta,
      };
      // console.log(this.tipoestasel )

      //Conversion de Catalogo de tipo familia
      // console.log("tipofamsel", this.tipofamsel )
      this.tipofamsel.id = this.fichasocial.tipofam;
      this.tipofamsel.opcion = this.tipofamopc[this.tipofamsel.id].opcion;
      this.tipofamsel = {
        opcion: this.tipofamsel.opcion,
        id: this.fichasocial.tipofam,
      };

      // Conversion de Catalogo de ubicacion de familia
      this.ubicafamsel.id = this.fichasocial.ubicafam;
      this.ubicafamsel.opcion = this.ubicafamopc[this.ubicafamsel.id].opcion;
      this.ubicafamsel = {
        opcion: this.ubicafamsel.opcion,
        id: this.fichasocial.ubicafam,
      };
      // console.log(this.ubicafamsel )

      //Conversion de Catalogo de trabaja
      this.tipotrabajasel.id = this.fichasocial.tipotrabaja;
      this.tipotrabajasel.opcion =
        this.tipotrabajaopc[this.tipotrabajasel.id].opcion;
      this.tipotrabajasel = {
        opcion: this.tipotrabajasel.opcion,
        id: this.fichasocial.tipotrabaja,
      };
      // console.log(this.tipotrabajasel )

      //Conversion de Catalogo de tipo ingreso
      // console.log("this.fichasocial.tipoingreso",this.fichasocial.tipoingreso )
      this.tipoingresosel.id = this.fichasocial.tipoingreso;
      this.tipoingresosel.opcion =
        this.tipoingresoopc[this.tipoingresosel.id].opcion;
      this.tipoingresosel = {
        opcion: this.tipoingresosel.opcion,
        id: this.tipoingresosel.id,
      };
      // console.log("tipoingresosel id",this.tipoingresosel.id )

      //Conversion de Catalogo de tipo dependientes
      this.tipodependientessel.id = this.fichasocial.tipodependientes;
      this.tipodependientessel.opcion =
        this.tipodependientesopc[this.tipodependientessel.id].opcion;
      this.tipodependientessel = {
        opcion: this.tipodependientessel.opcion,
        id: this.fichasocial.tipodependientes,
      };
      // console.log(this.tipodependientessel )

      // Conversion de Catalogo de tipo necesidad
      this.tiponecesidadsel.id = this.fichasocial.tiponecesidad;
      this.tiponecesidadsel.opcion =
        this.tiponecesidadopc[this.tiponecesidadsel.id].opcion;
      this.tiponecesidadsel = {
        opcion: this.tiponecesidadsel.opcion,
        id: this.fichasocial.tiponecesidad,
      };
      // console.log(this.tiponecesidadsel )

      // Conversion de Catalogo de tipo apoyo
      this.tipoapoyosel.id = this.fichasocial.tipoapoyo;
      this.tipoapoyosel.opcion = this.tipoapoyoopc[this.tipoapoyosel.id].opcion;
      this.tipoapoyosel = {
        opcion: this.tipoapoyosel.opcion,
        id: this.fichasocial.tipoapoyo,
      };
      // console.log(this.tipoapoyosel )

      // Conversion de Catalogo de quien apoyo
      // console.log("quien apoyo", this.fichasocial.quienapoyo);
      this.quienapoyosel.id = this.fichasocial.quienapoyo;
      this.quienapoyosel.opcion =
        this.quienapoyoopc[this.quienapoyosel.id].opcion;
      this.quienapoyosel = {
        opcion: this.quienapoyosel.opcion,
        id: this.fichasocial.quienapoyo,
      };
      // console.log(this.quienapoyosel )

      // Conversion de Catalogo de apoyo por
      this.apoyoporsel.id = this.fichasocial.apoyopor;
      this.apoyoporsel.opcion = this.apoyoporopc[this.apoyoporsel.id].opcion;
      this.apoyoporsel = {
        opcion: this.apoyoporsel.opcion,
        id: this.fichasocial.apoyopor,
      };
      // console.log(this.apoyoporsel )

      // Conversion de Catalogo de apoyo por
      this.conocioensel.id = this.fichasocial.conocioen;
      this.conocioensel.opcion = this.conocioenopc[this.conocioensel.id].opcion;
      this.conocioensel = {
        opcion: this.conocioensel.opcion,
        id: this.fichasocial.conocioen,
      };
      // console.log(this.conocioensel )

      // Conversion de Catalogo de apoyo por
      this.formaingresosel.id = this.fichasocial.formaingreso;
      this.formaingresosel.opcion = this.formaingresoopc[this.formaingresosel.id].opcion;
      this.formaingresosel = {
        opcion: this.formaingresosel.opcion,
        id: this.fichasocial.formaingreso,
      };
      // console.log(this.formaingresosel )

      // Conversion de Catalogo de apoyo por
      this.tipomigrasel.id = this.fichasocial.tipomigra;
      this.tipomigrasel.opcion = this.tipomigraopc[this.tipomigrasel.id].opcion;
      this.tipomigrasel = {
        opcion: this.tipomigrasel.opcion,
        id: this.fichasocial.tipomigra,
      };
      // console.log(this.tipomigrasel )
    },
  },
};
</script>