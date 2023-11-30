<template>
  <v-container class="mt-2">
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar height="56" rounded="lg" shaped flat>
            <h3>MI PERFIL</h3>

            <v-spacer></v-spacer>
            <v-btn class="ma-2" dark color="blue" @click="saveinfo">
              Guardar
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="12" md="6">
              <v-row class="mt-3" v-if="getdatosUsuario.idmedicos > 0">
                <v-col>
                  <v-img contain height="270" src="@/assets/logo.png"> </v-img>
                  <v-file-input
                    chips
                    dense
                    hide-details
                    class="mt-5 mx-8"
                    multiple
                    label="Subir foto"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row class="mt-3" v-if="getdatosUsuario.idtrabsocial > 0">
                <v-col>
                  <v-img contain height="270" src="@/assets/logo.png"> </v-img>
                  <v-file-input
                    chips
                    dense
                    hide-details
                    class="mt-5 mx-8"
                    multiple
                    label="Subir foto"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-col>

            <v-divider vertical></v-divider>

            <!-- VISTA DE MEDICO -->
            <v-col cols="12" md="6" v-if="getdatosUsuario.idmedicos > 0">
              <v-row class="mx-2 mt-1">
                <v-col>
                  <v-text-field
                    label="Email"
                    hide-details
                    readonly
                    v-model="email"
                  >
                  </v-text-field>
                  <v-text-field label="Nombre" v-model="nommed"> </v-text-field>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Cedula medica"
                        hide-details
                        v-model="cedula"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field label="CLUES" hide-details v-model="clues">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field label="CURP" hide-details v-model="curp">
                  </v-text-field>
                  <v-row>
                    <v-col>
                      <v-text-field label="Ciudad" v-model="ciudad">
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Telefono"
                        hide-details
                        v-model="telefono"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    class="mb=2"
                    label="Direccion"
                    v-model="direccion"
                  >
                  </v-text-field>

                  <v-row>
                    <leeCatencion></leeCatencion>
                  </v-row>

                  <v-chip
                    class="ma-2"
                    color="green"
                    outlined
                    pill
                    v-if="getdatosUsuario.idmedicos > 0"
                  >
                    Medico
                    <v-icon right> mdi-doctor </v-icon>
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="orange"
                    outlined
                    v-if="getdatosUsuario.idtrabsocial > 0"
                    pill
                  >
                    Trabajador social
                    <v-icon right> mdi-account-edit </v-icon>
                  </v-chip>
                  <v-chip class="ma-2" color="primary" outlined pill>
                    Admin
                    <v-icon right> mdi-clipboard-edit </v-icon>
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>

            <!-- VISTA DE TRABAJADOR SOCIAL -->
            <v-col cols="12" md="6" v-if="getdatosUsuario.idtrabsocial > 0">
              <v-row class="mx-2 mt-1">
                <v-col>
                  <v-text-field
                    label="Email"
                    hide-details
                    readonly
                    v-model="email"
                  >
                  </v-text-field>
                  <v-text-field label="Nombre" v-model="nomsoc"> </v-text-field>

                  <v-text-field
                    label="Telefono"
                    hide-details
                    v-model="telefono"
                  >
                  </v-text-field>
                  <v-text-field label="Ciudad" hide-details v-model="ciudad">
                  </v-text-field>

                  <v-text-field label="Direccion" v-model="direccion">
                  </v-text-field>

                  <v-row class="mx-1 mb-1">
                    <leeCatencion></leeCatencion>
                  </v-row>

                  <v-chip
                    class="ma-2"
                    color="orange"
                    outlined
                    v-if="getdatosUsuario.idtrabsocial > 0"
                    pill
                  >
                  
                    Trabajador social
                    <v-icon right> mdi-account-edit </v-icon>
                  </v-chip>
                  <v-chip class="ma-2" color="primary" outlined pill>
                    Admin
                    <v-icon right> mdi-clipboard-edit </v-icon>
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <!-- {{getMedico}} -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import leeCatencion from "@/components/leeCatencion.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    leeCatencion,
  },

  computed: {
    ...mapGetters("Login", ["getdatosUsuario"]),
    ...mapGetters("Medicos", ["getMedico"]),
    ...mapGetters("Trabsocial", ["getTrabsocial"]),
    ...mapGetters("Catencion", ["getCatencion"]),

    validaInfo() {
      return (
        this.nommed !== "" &&
        this.ciudad !== "" &&
        this.telefono !== "" &&
        this.cedula !== ""
      );
    },

    validaTrab() {
      return (
        this.nomsoc !== "" &&
        this.ciudad !== "" &&
        this.telefono !== ""
      );
    },
  },
  data() {
    return {
      snackbar: false,
      niveles: ["Admin", "Trabajador social", "Personal medico"],

      //Trab social
      nomsoc: "",

      //Medicos
      idusuarioweb: 0,
      idmedicos: 0,
      idtrabsocial: 0,
      idcatencion: 0,

      nommed: "",
      telefono: "",
      ciudad: "",
      direccion: "",
      email: "",
      cedula: "",
      curp: "",
      clues: "",

      loading: false,
      // nommed:'',
      // nomplanta:'',
      // idplanta: 0,
      // nomarea: '',
      // idarea:0,
      // nomina: '',
      // idusuarioweb:'',

      nivel: ["ADMIN", "  APP"],
      nivelactual: "  APP",

      rules: {
        required: (value) => !!value || "Requerido.",
        min: (v) => v.length >= 8 || "Minimo 8 caracteres",
        emailMatch: () => "El correo y/o la contraseña no son correctos",
      },

      NomlinRules: [
        (v) => !!v || "El nombre es requerido",
        (v) => v.length <= 30 || "El nombre debe ser menor de 30 letras",
      ],
    };
  },

  created() {
    // console.log(this.getdatosUsuario);
    this.nomsoc = this.getdatosUsuario.nomuser;
    this.nommed = this.getdatosUsuario.nomuser;
    this.email = this.getdatosUsuario.email;

    this.idusuariosweb = this.getdatosUsuario.idusuariosweb;
    this.idcatencion = this.getdatosUsuario.idcatencion;
    // console.log("TrabSocial", this.getTrabsocial);

    this.cargarInfo();
  },

  methods: {
    ...mapActions("Medicos", ["setMedico"]),
    ...mapActions("Trabsocial", ["setTrabsocial"]),
    ...mapActions("snackbar", ["showSnack"]),

    cargarInfo() {
      //CAtencion
      if (this.getCatencion.idcatencion > 0) {
        this.idcatencion = this.getCatencion.idcatencion;
      }

      if (this.getdatosUsuario.idtrabsocial > 0) {
        //TRAB SOCIAL
        // this.idusuarioweb = this.getTrabsocial.idusuarioweb;
        this.idtrabsocial = this.getTrabsocial.idtrabsocial;

        this.telefono = this.getTrabsocial.telefono;
        this.ciudad = this.getTrabsocial.ciudad;
        this.direccion = this.getTrabsocial.direccion;
      }

      if (this.getdatosUsuario.idmedicos > 0) {
        //MEDICOS
        // this.idusuariosweb = this.getMedico.idusuariosweb;
        this.idmedicos = this.getMedico.idmedicos;
        this.telefono = this.getMedico.telefono;
        this.ciudad = this.getMedico.ciudad;
        this.direccion = this.getMedico.direccion;

        this.cedula = this.getMedico.cedula;
        this.clues = this.getMedico.clues;
        this.curp = this.getMedico.curp;
      }
    },

    saveinfo() {
      console.log(this.getCatencion)
      if (this.getCatencion.idcatencion > 0) {
        this.idcatencion = this.getCatencion.idcatencion;
      }

      console.log("catencion", this.idcatencion);
      if (this.getdatosUsuario.idmedicos > 0) {
        if (!this.validaInfo) {
          this.showSnack({
            text: "Debes registrar los datos del medicos ",
            color: "orange",
            timeout: 2000,
          });
          return;
        }
      }

      if (this.getdatosUsuario.idtrabsocial > 0) {
        if (!this.validaTrab) {
          this.showSnack({
            text: "Debes registrar el telefono y ciudad ",
            color: "orange",
            timeout: 2000,
          });
          return;
        }
      }

      //GRABAR idcatencion en Usuariosweb
      if (this.getCatencion.idcatencion > 0) {
        this.idcatencion = this.getCatencion.idcatencion;

        let paycat = {
          nomuser: this.nommed,
          avatarurl: "https://expediente.pro/logoedsm.png",
          nivel: this.getdatosUsuario.nivel,
          idcatencion: parseInt(this.idcatencion),
        };
        console.log("paycat",paycat);
        console.log(this.idusuariosweb)
        
        this.$http
          .patch("usuariosweb.patch.med/" + this.idusuariosweb, paycat)
          .then(() => {
            this.showSnack({
              text: "Usuario actualizado correctamente ",
              color: "success",
              timeout: 1000,
            });
          })
          .catch((error) => {
            // console.log("error", error.data);
            this.showSnack({
              text: "Problema para grabar  :",
              color: "error",
              timeout: 2000,
            });
          });
      }

      var payload = {
        idusuarioweb: this.idusuarioweb,
        nommed: this.nommed,
        email: this.email,
        telefono: this.telefono,
        ciudad: this.ciudad,
        direccion: this.direccion,
        clues: this.clues,
        curp: this.curp,
        cedula: this.cedula,
      };

      // console.log("payload", payload);

      var payloadtrab = {
        idusuarioweb: this.idusuarioweb,
        // idmedicos:    this.idmedicos,
        idcatencion: this.idcatencion,
        nomsoc: this.nomsoc,
        email: this.email,
        telefono: this.telefono,
        ciudad: this.ciudad,
        direccion: this.direccion,
      };

      // console.log("payloadtrab", payloadtrab);
      // this.addCita(payload)

      //EDITAR
      if (this.getdatosUsuario.idmedicos > 0) {
        // console.log(this.idmedicos);
        this.$http
          .put("medicos.update/" + this.idmedicos, payload)
          .then(() => {
            this.showSnack({
              text: "Medico actualizado correctamente ",
              color: "success",
              timeout: 2000,
            });
            setTimeout(() => this.$router.push({ name: "panel" }), 2000);
            // this.limpiarUsuario()
            this.actualizamedico();
          })
          .catch(() => {
            // console.log("error", error.data);
            this.showSnack({
              text: "Problema para grabar  :",
              color: "error",
              timeout: 2000,
            });
          });
      }

      if (this.getdatosUsuario.idtrabsocial > 0) {
        // console.log(this.idtrabsocial);
        this.$http
          .put("trabsocial.update/" + this.idtrabsocial, payloadtrab)
          .then(() => {
            this.showSnack({
              text: "Trabajador social actualizado correctamente ",
              color: "success",
              timeout: 2000,
            });
            setTimeout(() => this.$router.push({ name: "panel" }), 2000);
            // this.limpiarUsuario()
            this.actualizatrabsocial();
          })
          .catch(() => {
            // console.log("error", error.data);
            this.showSnack({
              text: "Problema para grabar  :",
              color: "error",
              timeout: 2000,
            });
          });
      }
    },

    actualizaUsuario() {},

    actualizamedico() {
      let medico = {
        idmedicos: this.idmedicos,
        nommed: this.nommed,
        email: this.email,
        cedula: this.cedula,
        curp: this.curp,
        clues: this.clues,
        telefono: this.telefono,
        ciudad: this.ciudad,
        direccion: this.direccion,
      };

      this.setMedico(medico);
    },

    actualizatrabsocial() {
      let trabsocial = {
        idtrabsocial: this.idtrabsocial,
        nomsoc: this.nomsoc,
        email: this.email,
        telefono: this.telefono,
        ciudad: this.ciudad,
        direccion: this.direccion,
      };

      this.setTrabsocial(trabsocial);
    },
  },
};
</script>