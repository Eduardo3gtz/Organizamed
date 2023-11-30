<template>
  <q-page>
    <q-toolbar class="bg-cyan-4">
      <q-btn color="grey" to="/catpacientes" icon="arrow_back"></q-btn>
      <q-item class="align-center">
        <q-item-section class="align-center">
          <q-item-label class="titulo text-white">Nuevo Paciente</q-item-label>
        </q-item-section>
      </q-item>

      <q-space></q-space>
      <q-btn
        label="Guardar"
        :loading="loading"
        color="cyan"
        push
        v-close-popup
      />
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-toolbar>
    <div class="row q-pa-md">
      <div class="col-12 col-md-7">
        <div class="row">
          <p class="q-mt-md contactocel text-blue-9">
            {{ nomcli }}
          </p>
          <q-space></q-space>
        </div>
        <div class="row">
          <div class="col-12 col-md-7">
            <q-input dense label="Cliente" v-model="nomcli"></q-input>
          </div>
          <q-space></q-space>
          <div class="col-12 col-md-4">
            <q-input
              dense
              label="Nombre comercial"
              v-model="nomcomer"
            ></q-input>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6">
            <q-input outlined dense v-model="calle" label="Calle"></q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input outlined dense v-model="numint" label="Num INT"></q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input outlined dense v-model="numext" label="Num EXT"></q-input>
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-12 col-md-4">
            <q-input outlined dense v-model="colonia" label="Colonia"></q-input>
          </div>
          <div class="col-12 col-md-4">
            <q-input outlined dense v-model="ciudad" label="Ciudad"></q-input>
          </div>
          <div class="col-12 col-md-4">
            <q-input outlined dense v-model="estado" label="Estado"></q-input>
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-12 col-md-3">
            <q-input outlined dense v-model="rfc" label="RFC"></q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              dense
              v-model="cp"
              label="Codigo postal"
            ></q-input>
          </div>
        </div>
      </div>
      <q-space></q-space>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

//notify
import { useQuasar } from "quasar";
const $q = useQuasar();

//router
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const nmodo = ref(1);
const cmodo = ref("");
const filter = ref("");

const idcliente = ref(0);
const nomcli = ref("");
const nomcomer = ref("");
const calle = ref("");
const numint = ref("");
const numext = ref("");
const colonia = ref("");
const ciudad = ref("");
const estado = ref("");
const rfc = ref("");
const cp = ref("");
const telefono = ref("");
const fax = ref("");
const atvent = ref("");
const atcobr = ref("");
const email1 = ref("");
const email2 = ref("");
const obs = ref("");
const contactos = ref([]);
const actividades = ref([]);
</script>
