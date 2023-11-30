<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-blue-10">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-blue-10" v-model="leftDrawerOpen" show-if-above>
      <q-list padding class="q-mx-md subtemas listbtn">
        <q-item
          v-for="contact in offline"
          :key="contact.id"
          class="roundedbtn"
          clickable
          :to="`/miperfil/${loginStore.getUser.idusuariosweb}`"
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img
                src="https://img.freepik.com/vector-gratis/fondo-semitono-abstracto-verde_1409-898.jpg"
              />
            </q-avatar>
            <q-tooltip>Super usuario</q-tooltip>
          </q-item-section>

          <q-item-section class="">
            <q-item-label class="text-white">{{
              loginStore.getUser.nomuser
            }}</q-item-label>
            <q-item-label caption lines="1" class="text-green q-mb-sm">{{
              loginStore.getUser.email
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="text-white roundedbtn texto" clickable to="/panelview">
          <q-item-section avatar>
            <q-icon name="apps" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Panel</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator></q-separator>
        <q-separator></q-separator>
        <!-- <q-separator /> -->

        <q-item
          class="text-white roundedbtn texto"
          clickable
          to="/catpacientes"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pacientes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="text-white roundedbtn texto" clickable to="/catclientes">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Doctores</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-separator /> -->
        <q-separator></q-separator>
        <q-separator></q-separator>

        <q-item class="text-white roundedbtn texto" clickable to="/catcitas">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Citas</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.listbtn {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
}

.rounded {
  border-radius: 40px 40px 40px 40px;
  /* padding-bottom: 10px; */
}

.subtemas {
  color: grey;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 17px;
}

.texto {
  /* background-color: grey; */
  /* color: white; */
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.roundedbtn {
  border-radius: 10px 10px 10px 10px;
}

.crear {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
}

.hora {
  font-size: 25px;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
