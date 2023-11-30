<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <!-- APP DRAWER MENU DERECHO MEDICO  -->
    <v-navigation-drawer
      v-if="getLogeado"
      v-model="drawer"
      fixed
      clipped-right
      dark
      app
      temporary
      right
      color="teal"
    >
      <v-card color="transparent" flat class="ma-5">
        <v-img
          contain
          height="140"
          class="mb-2"
          v-if="getdatosUsuario.idtrabsocial > 0"
          src="@/assets/logof.png"
        >
        </v-img>
        <v-img
          contain
          v-if="getdatosUsuario.idmedicos > 0"
          height="140"
          class="mb-2"
          src="@/assets/logof.png"
        >
        </v-img>
      </v-card>
      <!-- </v-avatar> -->

      <v-divider></v-divider>
      <v-row class="ma-1">
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar> -->

        <!-- <v-list-item-title>{{getdatosUsuario.nomuser}} </v-list-item-title> -->

        <!-- <v-row justify="center" v-if="getdatosUsuario.idmedicos > 0" class="mt-2 mb-1">
         <h4 class="white--text">{{getMedico.nommed}}</h4>
          <v-chip
            class="ma-2"
            color="white"
            outlined
            pill
          >
            Medico
            <v-icon right>
              mdi-doctor
            </v-icon>
          </v-chip>
        </v-row> -->
        <v-row
          justify="center"
          v-if="getdatosUsuario.idmedicos > 0"
          class="mt-2 mb-1"
        >
          <h4 class="white--text">{{ getMedico.nommed }}</h4>

          <v-chip class="ma-2" color="white" outlined pill>
            Médico
            <v-icon right> mdi-doctor </v-icon>
          </v-chip>
        </v-row>

        <v-row
          justify="center"
          v-if="getdatosUsuario.idtrabsocial > 0"
          class="mt-2 mb-1"
        >
          <h4 class="white--text">{{ getTrabsocial.nomsoc }}</h4>
          <v-chip class="ma-2" color="white" outlined pill>
            Trabajador social
            <v-icon right> mdi-account-edit </v-icon>
          </v-chip>
        </v-row>

        <!-- <v-card-title v-if="getdatosUsuario.idtrabsocial > 0">
          <h1></h1>
           <v-subheader>Trabajador Social</v-subheader>
        </v-card-title> -->

        <!-- <v-btn
          icon
          small
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-row>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item
          v-for="item in items"
          :key="item.titulo"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <!-- <v-list-item-content dark class="mt-2">
            <v-list-item-title @click="salir">Salir</v-list-item-title>
          </v-list-item-content> -->
          <v-dialog v-model="dialog" persistent max-width="310">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon>
                <v-btn icon v-if="getLogeado == true">
                  <v-icon>exit_to_app</v-icon>
                </v-btn>
              </v-list-item-icon>

              <v-list-item-content dark class="mt-2">
                <v-list-item-title v-bind="attrs" v-on="on"
                  >Salir</v-list-item-title
                >
              </v-list-item-content>
            </template>
            <v-card>
              <br />
              <h4 class="ml-5">¿Estás seguro que quieres cerrar tu sesión?</h4>
              <v-card-text
                >En caso de que sí, da clic en el botón de aceptar y te llevara
                al login.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="red" text @click="salir"> Aceptar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- EXP DRAWER del EXPEDIENTE -->
    <v-navigation-drawer
      v-if="mostrarExpediente"
      v-model="drawerexp"
      mini-variant-width="60"
      :mini-variant.sync="miniexp"
      fixed
      dark
      app
      temporary
      clipped-left
      color="info"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/logoedsm.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Expediente Digital</v-list-item-title>

        <v-btn icon @click.stop="miniexp = !miniexp">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-card color="green" class="mt-1">
        <v-list-item class="px-1">
          <v-list-item-avatar>
            <v-avatar color="teal">
              <v-icon dark class="mr-2"> mdi-account-circle </v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-row class="mt-1 mb-1">
            <v-col>
              <v-list-item-subtitle>Paciente:</v-list-item-subtitle>
              <h4>{{ getPaciente.nompaciente }}</h4>

              <v-list-item-subtitle class="mt-1">
                Centro médico:
              </v-list-item-subtitle>
              <p>{{ getCatencion.nombre }}</p>

              <v-row>
                <v-col>
                  <v-list-item-subtitle>
                    Depresion: {{ getPaciente.tipodep }}
                  </v-list-item-subtitle>
                  <h5>{{ nomdep }}</h5>
                </v-col>
                <v-col>
                  <v-list-item-subtitle>
                    Ansiedad: {{ getPaciente.tipoans }}
                  </v-list-item-subtitle>
                  <h5>{{ nomans }}</h5>
                </v-col>
              </v-row>

              <!-- <v-list-item-subtitle>Depresion:</v-list-item-subtitle> -->
            </v-col>
          </v-row>
        </v-list-item>
      </v-card>

      <v-divider></v-divider>

      <!-- <v-list-item dense
        v-for="(expediente, i) in expedientes"
        :key="i"
        :to="expediente.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon
            v-bind="attrs"
            v-on="on"
          >{{ expediente.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="expediente.titulo" />
        </v-list-item-content>
      </v-list-item> -->

      <v-col v-if="getdatosUsuario.idmedicos > 0" class="pa-1">
        <v-list-item
          dense
          v-for="(menumedico, i) in menumedicos"
          :key="i"
          :to="menumedico.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon v-bind="attrs" v-on="on">{{ menumedico.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menumedico.titulo" />
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col v-if="getdatosUsuario.idtrabsocial > 0" class="pa-1">
        <v-list-item
          dense
          v-for="(menutrabsociales, i) in menutrabsocial"
          :key="i"
          :to="menutrabsociales.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon v-bind="attrs" v-on="on"
              >{{ menutrabsociales.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="menutrabsociales.titulo" />
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-navigation-drawer>

    <!-- BARRA SUPERIOR -->
    <v-app-bar app color="blue darken-3" dark clipped-left height="60">
      <v-app-bar-nav-icon
        @click.stop="drawerexp = !drawerexp"
      ></v-app-bar-nav-icon>

      <v-card flat color="transparent" to="panel">
        <!-- <v-img
          class="hidden-sm-and-down"
          max-width="150"
          contain
          height="120"
          src="@/assets/logo.png"
        >
        </v-img> -->
      </v-card>

      <p class="ma-5 hidden-sm-and-down">
        Paciente: {{ getPaciente.nompaciente }}
      </p>
      <v-spacer></v-spacer>

      <!-- <v-img
        src="@/assets/conacytblanco.png"
      ></v-img> -->

      <!-- <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
      </div> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-col cols="3">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          menu-props="auto"
          label="Idioma"
          hide-details
          prepend-icon="mdi-map"
          single-line
        ></v-select>
      </v-col> -->

      <!-- <v-btn icon v-if="getLogeado == true" @click="salir">
        <v-icon>exit_to_app</v-icon>
      </v-btn> -->

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
        <snackbar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import snackbar from "@/components/Snackbar";
export default {
  components: {
    snackbar,
  },
  name: "App",

  computed: {
    ...mapGetters("Login", ["getdatosUsuario", "getLogeado"]),
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
    ...mapGetters("Catencion", ["getCatencion"]),

    // ...nomtiposans()
  },

  created() {
    
  },

  watch: {
    getPaciente() {
      if (
        this.getPaciente.idpacientes != "" &&
        this.getCatencion.idcatencion > 0
      ){
        this.mostrarExpediente = true;
        this.nomtiposans();
        this.nomtiposdep();
      }
      else {
        this.mostrarExpediente = false;
      }
    },


    
  },

  data() {
    return {
      dialog: false,
      nomans: "Manuel",
      nomdep: "Manuel",

      mobile: false,
      mobileBreakpoint: 300,
      attrs: "",
      on: "",
      title: "Expdiente Médico de Salud Migrante",

      //DATOS EXPEDIENTE PACIENTE
      mostrarExpediente: false,
      langs: ["es", "en"],
      clipped: false,

      miniexp: true,
      drawerexp: true,

      fixed: false,

      // miniVariant: false,

      right: true,
      rightDrawer: false,

      // DATOS MEDICO MENU DERECHO
      drawer: true,
      mini: true,

      items: [
        {
          icon: "mdi-chart-bubble",
          titulo: "Panel",
          to: "/panel",
        },
        {
          icon: "mdi-file-document-multiple",
          titulo: "Expedientes",
          to: "/catexpedientes",
        },
        {
          icon: "mdi-face-recognition",
          titulo: "Mi Perfil",
          to: "/miperfil",
        },
      ],

      menumedicos: [
        { icon: "mdi-home", titulo: "Panel", to: "/panel" },

        {
          icon: "mdi-account",
          titulo: "Inventario Personal",
          to: "/invpersonal",
        },

        // {
        //   icon: "mdi-book",
        //   titulo: "Historia clinica",
        //   to: "/historiacli",
        // },
        {
          icon: "mdi-pencil",
          titulo: "Nota Médica",
          to: "/catnotamed",
        },

        // {
        //   icon: "mdi-run",
        //   titulo: "Documentos digitales",
        //   to: "/catvalfisica",
        // },

        // {
        //   icon: "mdi-account",
        //   titulo: "Crear cuenta",
        //   to: "/crearcuenta",
        // },
      ],

      menutrabsocial: [
        { icon: "mdi-home", titulo: "Panel", to: "/panel" },
        {
          icon: "mdi-account",
          titulo: "Inventario Personal",
          to: "/invpersonal",
        },
        {
          icon: "mdi-account-group",
          titulo: "Ficha Social",
          to: "/fichasocial",
        },
        // {
        //   icon: "mdi-brain",
        //   titulo: "Valoración Psicosocial",
        //   to: "/valoracionpsi",
        // },
        {
          icon: "mdi-book",
          titulo: "Nota social",
          to: "/notasocial",
        },

        {
          icon: "mdi-account",
          titulo: "Crear cuenta",
          to: "/crearcuenta",
        },
      ],

      // snackbar: false,
      // isPaste: false,
      // show1: false,
      // password: '',
      // email:'',
      // drawer: true,
    };
  },
  methods: {
    ...mapActions("tema", ["traerTema"]),
    ...mapActions("Login", ["salirLogin", "infoCIA"]),

    mostrarmenu() {},

    salir() {
      this.salirLogin();
      // Mando a llamar la accion salir
      this.$store.dispatch("salir");
    },

    nomtiposans() {
      console.log(this.getPaciente)
      console.log("lalo: ",this.getPaciente.tipoans)
      switch (this.getPaciente.tipoans) {
      case "1":
        this.nomans = "No ansiedad";
        break;

      case "2":
        this.nomans = "Ansiedad leve";
        break;

      case "3":
        this.nomans = "Ansiedad moderada";
        break;

      case "4":
        this.nomans = "Ansiedad grave";
        break;
      }

    
    },

    nomtiposdep() {
      console.log(this.getPaciente)
      console.log("lalo: ",this.getPaciente.tipodep)
      switch (this.getPaciente.tipodep) {
      case "1":
        this.nomdep = "No depresión";
        break;

      case "2":
        this.nomdep = "Depresión leve";
        break;

      case "3":
        this.nomdep = "Depresión moderada";
        break;

      case "4":
        this.nomdep = "Depresión grave";
        break;
      }

    
    },
    
  },
};
</script>
