<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" xs="12" sm="5" md="5" class="pa-2">
        <v-card>
          <v-col cols="12">
            <v-toolbar color="primary" dark>
              <v-toolbar-title> Cambiar Contraseña </v-toolbar-title>
            </v-toolbar>
          </v-col>
        </v-card>

        <v-card class="mt-1 pa-3" align="center">
          <v-img :src="logo" contain class="ma-2 pa-2"></v-img>

          Bienvenido {{ nomuser }}
          <!-- EMAIL -->
          <v-col>
            <v-text-field
              v-model="email"
              prepend-icon="email"
              label="Correo"
              required
              dense
              hide-details
              type="text"
              readonly
            >
            </v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="password"
              prepend-icon="lock"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Nueva contraseña"
              hint="At least 8 characters"
              dense
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              dense
              v-model="password2"
              prepend-icon="lock"
              :append-icon="show2 ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirma contraseña"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions class="mt-1 mx-3">
            <v-btn dark small color="info" :to="{ name: 'login' }"
              >Cancelar</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              small
              color="primary"
              dark
              @click="cambiarContra"
              class="elevation-5"
            >
              Grabar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      nomuser:'',
      logo: "https://expediente.pro/sloganedsm.png",
      id: "",
      EmailOrg: "",
      password: "",
      password2: "",
      email: "",

      show1: true,
      show2: true,
      isPaste: false,
      drawer: null,
      error: "",

      rules: {
        required: (value) => !!value || "Requerido.",
        min: (v) => v.length >= 8 || "Minimo 8 caracteres",
        emailMatch: () => "El correo y/o la contraseña no son correctos",
      },

      NombreAsig: "",
      Nomuser: "",
    };
  },

  created() {
    this.id = this.$route.params.id;
    // MANDO A TRAER LOS DATOS DEL USUARIO "ID"
    this.DatosUser();
  },

  computed: {
    validaInfo() {
      return this.email !== "" && this.password !== "" && this.password2 !== "";
    },

    validaPassword() {
      return this.password.localeCompare(this.password2);
    },
  },

  methods: {
    ...mapActions("snackbar", ["showSnack"]),

    DatosUser() {
      const payload = { Idusuariosweb: parseInt(this.id) };
      
      let urlgetuser = this.$http.options.root.replace("apiv3/", "getuserxid");

      this.$http
        .post("getuserxid", payload)
        .then(function (response) {
          this.EmailOrg = response.data.result.email;
          this.email = response.data.result.email
          this.nomuser = response.data.result.nomuser
          // console.log(response);
        })
        .catch( (error) =>{
          this.showSnack({
            text: "El expediente no pudo obtener sus datos.",
            color: "error",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    cambiarContra() {
      let me = this;

      if (!this.validaInfo) {
        this.showSnack({
          text: "No se deben faltar datos",
          color: "error",
          timeout: 3000,
        });
        return;
      }

      if (this.validaPassword != 0) {
        this.showSnack({
          text: "Las contraseñas No coinciden.",
          color: "error",
          timeout: 3000,
        });
        return;
      }

      if (this.EmailOrg != this.email) {
        this.showSnack({
          text: "El correo no coincide con su usuario.",
          color: "red",
          timeout: 3000,
        });
        return;
      }

      this.error = null;
      let md5 = require("md5");

      var payload = { password: md5(this.password) };


      return new Promise((resolve, reject) => {
        // let urlcambiar = this.$http.options.root.replace("apiv3/", "cambiarcontra/");
        this.$http
          .put("cambiarcontra/" + this.id, payload)
          .then((respuesta) => {
            return respuesta.json();
          })
          .then((respuestaJson) => {
            if (respuestaJson.result === null) {
              this.showSnack({
                text: "Error al Actualizar su contraseña",
                color: "red",
                timeout: 3000,
              });
            } else {
              this.showSnack({
                text: "Su contraseña se ha actualizado correctamente.",
                color: "success",
                timeout: 3000,
              });

              setTimeout(function () {
                me.$router.push({ name: "login" });
              }, 3000);
            }
          })
          .catch((error) => {
            this.showSnack({
              text: "Error al Actualizar su contraseña",
              color: "red",
              timeout: 3000,
            });

            console.log("error", error);
          });
      });
    },
  },
};
</script>

<style scoped>
.logo {
  align-content: "center";
  text-align: center;
}
</style>
