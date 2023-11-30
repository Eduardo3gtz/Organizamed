<template>
  <v-container>
    <v-row class="mt-4 justify-center">
      <v-col cols="12" md="5" xm="12">
        <v-card align="center" class="contenido elevation-2">
          <v-row justify="center" align="center">
            <v-col cols="12" md="4">
              <v-img contain height="150" src="@/assets/edsm.png"> </v-img>
            </v-col>
            <v-col cols="12" md="4">
              <v-img contain height="130" src="@/assets/conacyt.jpeg"> </v-img>
            </v-col>
          </v-row>

          <p class="mt-3">{{ mensaje }}</p>
          <v-spacer></v-spacer>
          <!-- <p>Nivel {{ nivel }}</p> -->
          <!-- <v-btn color="primary" @click="rutalogin">Iniciar Sesión</v-btn> -->

          <v-btn
            v-if="nivel === 'APP'"
            color="primary"
            @click="irlogin"
            value="login"
          >
            <span>Login</span>
            <v-icon>mdi-login-variant</v-icon>
          </v-btn>

          <v-btn
            v-if="nivel === 'ADMIN'"
            color="primary"
            href="https://expediente.pro/admin/"
            target="_blank"
            value="3"
          >
            <span>Admin</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>

          <v-btn
            v-if="nivel === 'USER'"
            color="primary"
            href="https://expediente.pro/paciente/"
            class="mr-4"
            target="_blank"
            value="4"
          >
            <span>Paciente</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      logo: "",
      nivel: "",
      mensaje: "",
    };
  },

  created() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    this.activarcorreo();
    this.consultarNivel();
    this.$router.push({ name: "olvidacontra" });
  },
  methods: {
    irlogin() {
      this.$router.push({ name: "login" });
    },

    consultarNivel() {
      const payload = {
        idusuariosweb: parseInt(this.id),
      };
      this.$http
        .post("getuserxid", payload)
        .then((response) => {
          // console.log(response);
          this.nivel = response.data.result.nivel;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    activarcorreo() {
      this.$http
        .get("activarusuario/" + this.id)
        .then((response) => {
          console.log(response);
          this.mensaje = response.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.contenido {
  padding: 48px;
}

.titulo {
  font-family: black;
  font-size: 30px;
}

.sait {
  font-family: black;
  font-size: 18px;
}

.infoEmpresa {
  font-size: 11px;
}
</style>
