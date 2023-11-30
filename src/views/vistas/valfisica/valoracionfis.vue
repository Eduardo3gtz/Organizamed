<template>
  <v-container>
    <v-card color="blue darken-3" dark rounded="lg" class="mb-3" dense>
      <v-row>
        <h2 class="mx-5">Documentos digitales</h2>
        <v-spacer></v-spacer>
        <v-btn v-if="ntipo === 1" small class="ma-1" dark color="blue"
          >Laboratorios</v-btn
        >
        <v-btn v-if="ntipo === 2" small class="ma-1" dark color="blue"
          >Radiografías</v-btn
        >
        <v-btn v-if="ntipo === 3" small class="ma-1" dark color="blue"
          >Vacunas</v-btn
        >
        <v-btn v-if="ntipo === 4" small class="ma-1" dark color="blue"
          >Transfusiones</v-btn
        >
        <v-btn small class="ma-1" to="catvalfisica" dark color="blue"
          ><v-icon>mdi-reply</v-icon></v-btn
        >
        <v-spacer></v-spacer>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" md="5">
        <v-card flat :loading="loading">
          <v-col cols="12">
            <v-row class="ma-0">
              <v-col cols="7">
                <h3>
                  {{ getPaciente.nompaciente }}
                </h3>
              </v-col>

              <v-col cols="2">
                <v-spacer></v-spacer>
                <v-btn small class="ma-1" @click="saveinfo" dark color="blue"
                  >Grabar</v-btn
                >
              </v-col>
            </v-row>

            <v-text-field
              v-if="ntipo === 1"
              label="Tipo de sangre"
              class="mx-3 mt-3"
              dense
              v-model="tiposangre"
            >
            </v-text-field>

            <v-text-field
              v-if="ntipo === 1"
              label="Último valor hemoglobina"
              class="mx-3"
              dense
              v-model="hemoglobina"
            >
            </v-text-field>

            <v-text-field
              v-if="ntipo === 1"
              label="Última valor glucosa"
              class="mx-3"
              dense
              v-model="glucosa"
            >
            </v-text-field>

            <v-text-field
              v-if="ntipo === 1"
              label="Última valor colesterol"
              class="mx-3"
              dense
              v-model="colesterol"
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
                  v-model="fechaval"
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
                dense
                v-model="fechaval"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>

            <v-text-field
              v-if="ntipo === 2"
              v-model="lugar"
              label="Lugar del cuerpo"
              class="mx-3"
              dense
            >
            </v-text-field>

            <v-text-field
              v-if="ntipo === 3"
              label="Cantidad de dosis covid y refuerzos"
              class="mx-3"
              v-model="cantvacunas"
              dense
            >
            </v-text-field>

            <v-textarea
              v-model="obs"
              outlined
              label="Observación"
              class="mx-3"
              rows="2"
              auto-grow
              dense
            >
            </v-textarea>

            <v-divider></v-divider>

            <v-card-text>
              <!-- <v-file-input
                small-chips
                show-size
                v-model="files"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Selecciona tus imagenes"
                prepend-icon="mdi-camera"
                label="Anexar archivos"
                @change="cargar()"
              ></v-file-input> -->
              
              <v-file-input
                v-model="files"
                color="info"
                accept=".pdf, image/png, image/jpeg, image/bmp"
                placeholder="Selecciona tus imagenes y pdfs"
                counter
                label="File input"
                multiple
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
                @change="cargar()"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary" dark label small>
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-card-text>
          </v-col>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                xl="3"
                lg="3"
                md="4"
                sm="6"
                xs="12"
                v-for="(img, i) in vistaPrevias"
                :key="i"
              >
                <v-card @click="mostrarFoto(i)" class="py-2">
                  <v-img :src="img.url" contain aspect-ratio="2">
                    <v-row
                      align="end"
                      class="lightbox white--text pa-2 fill-height"
                    >
                      <v-col align="right">
                        <v-btn
                          color="error"
                          samll
                          @click="eliminarFoto(img.url)"
                          icon
                          ><v-icon>delete</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>


        <v-card flat height="395">
          <v-img contain height="390" :src="urlimagen"> </v-img>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tiempo from "@/mixins/tiempo.js";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [tiempo],
  data: () => ({

    // cantvacunasopc: [
    //   { opcion: "0", id: 0 },
    //   { opcion: "1", id: 1 },
    //   { opcion: "2", id: 2 },
    //   { opcion: "3", id: 3 },
    //   { opcion: "4", id: 4 },
    //   // { opcion: "5", id: 5 },
    // ],
    // cantvacunassel: { opcion: "", id: 0 },

    currentPage: 0,
    pageCount: 0,
    rules: [
      (value) =>
        !value || value.size < 200000 || "Las imagenes deben ser hasta 2 MB!",
    ],
    idpacientes: 0,
    idcatencion: 0,
    idmedicos: 0,

    on: "",
    attrs: "",
    files: [],
    vistaPrevias: [],
    urlimagen: "",
    tipo: "",

    ntipo: 0,
    dialog: false,
    dialogDelete: false,

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    fechaval: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    menu: false,
    modal: false,
    menu2: false,

    lugar: "",
    hora: "",
    tiposangre: "",
    hemoglobina: "",
    glucosa: "",
    colesterol: "",
    obs: "",
    cantvacunas: "",
    loading: false,

  }),

  computed: {
    ...mapGetters("pacientes", ["getPaciente"]),
    ...mapGetters("Catencion", ["getCatencion"]),
    ...mapGetters("Expediente", ["getExpediente"]),
    ...mapGetters("Medicos", ["getMedico"]),
    

    validaInfo() {
      return this.idpacientes > 0 && this.files.length > 0;
    },
  },

  created() {
    // console.log("route", this.$route.params);
    this.tipo = this.$route.params.tipo;

    if (this.tipo === "Resultados de Laboratorios") {
      this.ntipo = 1;
    }
    if (this.tipo === "Radiografias") {
      this.ntipo = 2;
    }
    if (this.tipo === "Vacunas") {
      this.ntipo = 3;
    }
    if (this.tipo === "Transfusiones") {
      this.ntipo = 4;
    }

    this.getPaciente;
    this.idpacientes = parseInt(this.getPaciente.idpacientes);

    this.getCatencion;
    this.idcatencion = parseInt(this.getCatencion.idcatencion);
    this.getExpediente;

    this.getMedico;
    this.idmedicos = this.getMedico.idmedicos;



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

  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    ...mapActions("Expediente", ["setExpediente"]),

    consultar() {
      // console.log("router", this.$route.params);
      this.idvalfisica = this.$route.params.idvalfisica;

      //MODO EDITAR
      if (this.idvalfisica !== undefined) {
        this.nModo = 2;
        this.readonly = true;
        this.cargarInfo(this.$route.params);
        this.modo = "Editar";
      } else {
        // console.log("nuevo");
        //VALORES INICIALES ALTA
        this.nModo = 1;
        this.modo = "Nuevo";
      }
    },

    cargarInfo() {
      this.loading = true;
      //  madnar cargar la información del paciente por idansiedad
      // ansiedad.update/:idansiedad
      // console.log("payload modo 2", this.idpacientes);
      // console.log(this.idansiedad)
      this.$http
        .get("valfisica.get/" + this.idvalfisica)
        .then((response) => {
          console.log("response valfisica", response);
          if (response.status != 200) {
            this.showSnack({
              text: "El expediente encontró un error al cargar información",
              color: "red",
              timeout: 2000,
            });
          } else {
            // Convertir el response.result al Data de la vista.
            this.convertirDatos(response.data.result);
          }
          this.loading = false;
        })
        .catch((error) => {
          this.showSnack({
            text: "Error al realizar operación",
            color: "red",
            timeout: 2000,
          });
          console.log(error);
        });
    },

    saveinfo() {
      if (!this.validaInfo) {
        this.showSnack({
          text: "Debe cargar un archivo",
          color: "red",
          timeout: 2000,
        });
        return;
      }

      this.dataTransforma();
      console.log("Save files", this.files);
      console.log("payloadData", this.payloadData);
      //mandar Subir Fotos.
      this.subirFotos();

      //NUEVO
      if (this.nModo == 1) {
        //Dedinir db name
        this.$http
          .post("valfisica.insert", this.payloadData)
          .then((response) => {
            console.log("response", response);

            this.showSnack({
              text: "Valoración Física agregada correctamente",
              color: "success",
              timeout: 2000,
            });

            this.consultar();
            setTimeout(() => this.$router.push({ name: "catvalfisica" }), 2000);
          })
          .catch((error) => {
            console.log(error);
            this.showSnack({
              text: "Problema para grabar ",
              color: "error",
              timeout: 2000,
            });
          });
      }

      //EDITAR
      if (this.nModo == 2) {
        console.log("payload modo 2", this.payloadData);
        console.log(this.idvalfisica);
        this.$http
          .put("valfisica.update/" + this.idvalfisica, this.payloadData)
          .then(() => {
            this.showSnack({
              text: "Valoración física actualizado correctamente ",
              color: "success",
              timeout: 2000,
            });
            setTimeout(() => this.$router.push({ name: "catvalfisica" }), 2000);
            // this.limpiarUsuario()
          })
          .catch((error) => {
            // console.log("error", error.data)
            this.showSnack({
              text: "Problema para grabar  :" + error.data.message,
              color: "error",
              timeout: 2000,
            });
          });
      }
    },

    dataTransforma() {
      console.log("files", this.files[0]);
      console.log("files", this.files[0].name);
      console.log("files", this.files[0].lastModified);

      this.payloadData = {
        idmedicos: this.idmedicos,
        idpacientes: parseInt(this.idpacientes),
        idcatencion: this.idcatencion,
        fecha: this.fecha,
        hora: this.gethora(),
        tipo: this.ntipo,
        urlimagen: this.files[0].name,

        lugar: this.lugar,
        tiposangre: this.tiposangre,
        hemoglobina: this.hemoglobina,
        glucosa: this.glucosa,
        colesterol: this.colesterol,
        fechaval: this.fechaval,
        obs: this.obs,
        cantvacunas: this.cantvacunas
      };

      console.log("payload prepare ", this.payloadData);
    },

    
    convertirDatos(valfisicaInfo) {

      console.log("response valfisica.get", valfisicaInfo);
      this.idmedicos = valfisicaInfo.idmedicos;
      this.idpacientes = parseInt(valfisicaInfo.idpacientes);
      this.idcatencion = valfisicaInfo.idcatencion;
      this.fecha = valfisicaInfo.fecha;
      this.hora = valfisicaInfo.hora;

    
      //Manejo de Imagenes
      const urlbase = "https://expediente.pro/fotossait/";
      this.urlimagen= urlbase + valfisicaInfo.urlimagen;
      
      this.ntipo = valfisicaInfo.tipo
      this.tiposangre= valfisicaInfo.tiposangre
      this.hemoglobina = valfisicaInfo.hemoglobina
      this.glucosa = valfisicaInfo.glucosa
      this.colesterol = valfisicaInfo.colesterol
      
      this.cantvacunas = valfisicaInfo.cantvacunas;

      this.fechaval = valfisicaInfo.fechaval
      this.obs = valfisicaInfo.obs;
      this.lugar = valfisicaInfo.lugar

    },


    mostrarFoto(i) {
      console.log("foto", i);
      this.urlimagen = this.vistaPrevias[i].url;
      console.log("url", this.urlimagen);
    },

    cargar() {
      // this.loading = true

      if (this.files.length < 1) {
        return;
      }

      this.files.forEach((element, index) => {
        // creamos una variable tipo FormData
        let formData = new FormData();
        //se crea el objeto y se le agrega como un apendice el archivo
        formData.append("file", element);
        //mandamos a ocvertir la imagen a base64 pero mandamos el docuemnto, el formdata, el nombre
        this.getBase64(element, formData);
      });
    },

    getBase64(file, formData) {
      var me = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        me.vistaPrevias.push({
          url: reader.result,
          formData: formData,
        });
        // console.log(me.vistaPrevias[0].url);
        me.urlimagen = me.vistaPrevias[0].url;
      };
    },

    subirFotos() {
      // Recorremos las imagenes previas cargadas para poder agregarlas al servidor y guardar el nombre en la base de datos
      this.vistaPrevias.forEach((element, index) => {
        // Mandamos el formdata (archivo de la imagen) al servidor
        console.log("formdata element", element);

        // obteniendo el nombre.

        this.$http
          .post("subirimagen", element.formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            //  y se gguar tambien en la base de datos, solo se guarda el nombre de la imagen
            if (index == 0) {
              this.showSnack({
                text: "Las fotos se han subido al expediente.",
                color: "success",
                timeout: 2000,
              });

              // Limpiamos las imagenes previas ya cuando se haya terminado el recorrido del foreach
              this.vistaPrevias = [];
              // this.saveinfo()
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
      });
    },

    eliminarFoto(value) {
      // console.log(this.vistaPrevias);
      this.vistaPrevias.forEach((element, index) => {
        if (element.url == value) {
          console.log("mi index a eliminar", index);
          this.vistaPrevias.splice(index, 1);
          this.files.splice(index, 1);
        }
      });
    },

    formatDateWithZone(date, tz) {
      let s = date.toLocaleString("en-GB", { timeZone: tz });
      let a = s.split(/\D/);
      return (
        a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5] + ":" + a[6]
      );
    },
  },
};
</script>
