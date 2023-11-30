<template>
  <q-page class="bg-white">
    <q-toolbar class="bg-white">
      <q-item class="align-center">
        <!-- <q-item-section class="align-center"> </q-item-section> -->
        <q-item-section class="align-center">
          <q-item-label class="titulo text-black" overline
            >PACIENTES</q-item-label
          >
          <q-item-label class=""
            >Este es tu catalogó de pacientes, registra cuantos
            quieras.</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-space></q-space>
      <q-item>
        <q-icon color="white" size="45px" name="people"></q-icon>
      </q-item>
    </q-toolbar>

    <!-- LO QUE SE VE EN PC -->
    <div class="row">
      <div class="col-3 q-mt-md q-mx-md">
        <q-input
          dense
          standout="bg-green text-white"
          v-model="filter"
          label="Buscar paciente"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-4"></div>
      <q-space></q-space>

      <div class="col-2">
        <q-btn
          class="q-mt-md q-ml-md"
          color="orange"
          label="Crear paciente"
          to="/newpaciente/new"
        ></q-btn>
      </div>

      <div class="col-12 q-pa-md">
        <q-table
          class="rounded my-sticky-header-table texto"
          separator="cell"
          @row-click="editar"
          :rows="contactos"
          :filter="filter"
          :columns="columns"
          style="height: 420px"
          virtual-scroll
          flat
          dense
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-nombre="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-item-label>{{ props.row.nombre }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- LO QUE SE VE EN CELULAR -->
    <!-- <div class="row justify-center" v-if="$q.screen.lt.md">
      <div class="col-12">
        <div class="row">
          <div class="col-10">
            <q-input
              dense
              standout="bg-orange text-white"
              v-model="text"
              class="q-mx-sm q-mt-sm"
              label="Buscar contacto"
              @keyup.enter="buscar"
            >
              <template v-slot:append>
                <q-icon name="search" @click="buscar" />
              </template>
            </q-input>
          </div>
          <div class="col-2">
            <q-btn
              to="/newcontacto/new"
              class="q-mt-sm"
              square
              color="orange"
              icon="edit"
            />
          </div>
        </div>

        <q-separator class="q-mt-sm"></q-separator>
      </div>

      <div class="col-12">
        <q-card class="rounded q-mt-sm" flat>
          <div class="row">
            <div class="col">
              <q-virtual-scroll
                style="max-height: 500px"
                :items="contactos"
                separator
                :filter="filter"
              >
                <template #default="{ item, index }">
                  <q-item
                    :filter="filter"
                    :key="index"
                    dense
                    :to="`/newcontacto/${item.idcontacto}`"
                  >
                    <q-item-section class="contactos q-mt-sm q-mb-sm">
                      <q-item-label>
                        {{ item.nomcont }}
                      </q-item-label>
                      <q-space></q-space>
                      <q-item-label lines="1" caption>
                        {{ item.empresa }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-virtual-scroll>

            </div>
          </div>
        </q-card>
      </div>
    </div> -->
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { api } from "boot/axios";
import { useRouter } from "vue-router";

//router
const router = useRouter();

const search = ref("search");
const tab = ref("mails");
const loading = ref(false);
const text = ref("");
const filter = ref("");
const pagination = ref([]);
const contactos = ref([]);

const createMenu = [
  { icon: "person_add", text: "Crear contacto", to: "/newcontacto/new" },
];

const columns = [
  // {
  //   name: "idcards",
  //   label: "Id",
  //   field: "idcards",
  //   sortable: true,
  //   align: "center",
  // },
  {
    name: "nombreTabla",
    label: "Nombre",
    field: "nombreTabla",
    sortable: true,
    align: "left",
  },
  {
    name: "edad",
    label: "Edad",
    field: "edad",
    sortable: true,
    align: "left",
  },
  {
    name: "pais",
    label: "Pais",
    field: "pais",
    sortable: true,
    align: "left",
  },

  {
    name: "telefono",
    label: "Telefono",
    field: "telefono",
    sortable: true,
    align: "center",
  },
];

onMounted(() => {
  consultar();
});

const consultar = async () => {
  contactos.value = [];
  // loading.value = true;

  try {
    const request = await api.get("contactos.list");
    // console.log("result", request);
    if (request.data.result != null) {
      // console.log("resul", request.result);

      contactos.value = request.data.result;
      loading.value = false;

      contactos.value.forEach((element) => {
        element.nombreTabla = element.nomcont.substring(0, 20);
        // element.descr = element.obs.substring(0, 20) + ".";
        // element.descrMovi = element.obs.substring(0, 60) + ".";
        // element.nomcont = element.nomcont.substring(0, 30);
        // element.nomvend = element.nomvend.substring(0, 20);
        // element.nomvend = element.nomvend.substring(0, 20);
      });
      // contactos.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
    } else {
      // contactos.value = []
    }
  } catch (error) {
    console.warn("Error al tratar de obtener contactos, " + error.toString());
  }
};

const editar = (evt, row) => {
  router.push({ path: "newcontacto/" + row.idcontacto });
};

const buscar = async () => {
  contactos.value = [];
  const payload = {
    buscar: text.value,
  };

  try {
    const request = await api.post("buscar.contacto", payload);
    // console.log("result", request);
    if (request.data.result != null) {
      // console.log("resul", request.result);
      contactos.value = request.data.result;
      loading.value = false;
      // contactos.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
    } else {
      // contactos.value = []
    }
  } catch (error) {
    console.warn("Error al tratar de obtener contactos, " + error.toString());
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 13px 13px 13px 13px;
}

.contactos {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
}
.titulo {
  color: white;
  font-size: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.fondo {
  background-color: #d35400;
}
</style>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
