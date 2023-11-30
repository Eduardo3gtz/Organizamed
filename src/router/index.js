import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [

  { path: '/panel', name: 'panel', component: () => import('../views/panel.vue'), meta: { ADMIN: true } },
  { path: '/crearcuenta', name: 'crearcuenta', component: () => import('../views/crearcuenta.vue'), meta: { ADMIN: true } },
  { path: '/nosotros', name: 'nosotros', component: () => import('../views/nosotros.vue'), meta: { libre: true } },

  { path: '/invpersonal', name: 'invpersonal', component: () => import('../views/vistas/invpersonal/invpersonal.vue'), meta: { ADMIN: true } },
  { path: '/vista', name: 'vista', component: () => import('../views/vistas/invpersonal/vista.vue'), meta: { ADMIN: true } },

  { path: '/fichasocial', name: 'fichasocial', component: () => import('../views/vistas/fichasocial/fichasocial.vue'), meta: { ADMIN: true } },

  // {path: '/fichasocial2',name: 'fichasocial2',component: () => import('../views/vistas/fichasocial/fichasocial2.vue'),meta: { ADMIN: true }},
  { path: '/historiacli', name: 'historiacli', component: () => import('../views/vistas/historiacli/historiacli.vue'), meta: { ADMIN: true } },
  { path: '/catnotamed', name: 'catnotamed', component: () => import('../views/vistas/notamedica/catnotamed.vue'), meta: { ADMIN: true } },
  { path: '/notamedica', name: 'notamedica', component: () => import('../views/vistas/notamedica/notamedica.vue'), meta: { ADMIN: true } },
  //Valoración Fisica
  { path: '/valoracionfis', name: 'valoracionfis', component: () => import('../views/vistas/valfisica/valoracionfis.vue'), meta: { ADMIN: true } },
  { path: '/catvalfisica', name: 'catvalfisica', component: () => import('../views/vistas/valfisica/catvalfisica.vue'), meta: { ADMIN: true } },


  //Valoración PsicoSocial.
  { path: '/valoracionpsi', name: 'valoracionpsi', component: () => import('../views/vistas/valoracionpsi.vue'), meta: { ADMIN: true } },

  // MODULO DE LOGIN
  { path: '/login', name: 'login', component: () => import('../views/login/login.vue'), meta: { libre: true } },
  { path: '/registrarse', name: 'registrarse', component: () => import('../views/login/registrarse.vue'), meta: { libre: true } },
  { path: '/olvidacontra', name: 'olvidacontra', component: () => import('../views/login/olvidacontra.vue'), meta: { libre: true } },
  { path: '/activarusuario/:id', name: 'activarusuario', component: () => import('@/views/login/activarUsuario.vue'), meta: { libre: true } },
  { path: '/cambiacontra/:id', name: 'cambiacontra', component: () => import('@/views/login/cambiacontra.vue'), meta: { libre: true } },

  { path: '/miperfil', name: 'miperfil', component: () => import('../views/miperfil.vue'), meta: { libre: true } },

  // pacientes O expedientes
  { path: '/catexpedientes', name: 'catexpedientes', component: () => import('../views/catalogos/expedientes/catexpedientes'), meta: { libre: true } },
  { path: '/expediente', name: 'expediente', component: () => import('../views/catalogos/expedientes/expediente'), meta: { libre: true } },

  // psico social
  { path: '/ansiedad', name: 'ansiedad', component: () => import('../views/vistas/valoracionpsi/ansiedad'), meta: { ADMIN: true } },
  { path: '/depresion', name: 'depresion', component: () => import('../views/vistas/valoracionpsi/depresion.vue'), meta: { ADMIN: true } },
  { path: '/relacionadas', name: 'relacionadas', component: () => import('../views/vistas/valoracionpsi/relacionadas.vue'), meta: { ADMIN: true } },
  { path: '/conteste', name: 'conteste', component: () => import('../views/vistas/valoracionpsi/conteste.vue'), meta: { ADMIN: true } },

  // AVISO
  { path: '/carta', name: 'carta', component: () => import('../components/carta.vue'), meta: { libre: true } },
  { path: '/avisopriv', name: 'avisopriv', component: () => import('../components/avisopriv.vue'), meta: { libre: true } },
  { path: '/barranav', name: 'barranav', component: () => import('../components/barranav.vue'), meta: { libre: true } },

  //Historia clinica:
  { path: '/apatologicos', name: 'apatologicos', component: () => import('../views/vistas/historiacli/apatologicos.vue'), meta: { ADMIN: true } },
  { path: '/atraumaticos', name: 'atraumaticos', component: () => import('../views/vistas/historiacli/atraumaticos.vue'), meta: { ADMIN: true } },
  { path: '/aquirurgicos', name: 'aquirurgicos', component: () => import('../views/vistas/historiacli/aquirurgicos.vue'), meta: { ADMIN: true } },
  { path: '/anopato', name: 'anopato', component: () => import('../views/vistas/historiacli/anopato.vue'), meta: { ADMIN: true } },
  { path: '/aperinatales', name: 'aperinatales', component: () => import('../views/vistas/historiacli/aperinatales.vue'), meta: { ADMIN: true } },
  { path: '/aginecologicos', name: 'aginecologicos', component: () => import('../views/vistas/historiacli/aginecologicos.vue'), meta: { ADMIN: true } },

  { path: '/notasocial', name: 'notasocial', component: () => import('../views/vistas/notasocial/notasocial.vue'), meta: { ADMIN: true } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // console.log("usuario store",store.state)
  // console.log(process.env.BASE_URL)
  // console.log("stre nivel",store.state.nivel)

  if (to.matched.some(record => record.meta.libre)) {
    // console.log('La ruta es libre => pasa')
    next()

  } else if (store.state.nivel == "ADMIN" || store.state.nivel == "APP") {
    
    // console.log('El usuario es Nivel', store.state)
  
    if (to.matched.some(record => record.meta.ADMIN)) {
      // console.log('Desbloqueo Pat admin')
      // console.log("Estate nivel ADMIN" ,store.state.nivel)
      next()
    }

  } else {
    //No hay nivel => Mando a Login
    // console.log("fallo al login")
    next({
      name: 'login'
    })
  }
})


export default router
