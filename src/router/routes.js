const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/newpaciente/:idpaciente",
        name: "newPaciente",
        component: () => import("pages/pacientes/newPaciente.vue"),
      },
      {
        path: "/catpacientes",
        name: "catPacientes",
        component: () => import("pages/pacientes/catPacientes.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
