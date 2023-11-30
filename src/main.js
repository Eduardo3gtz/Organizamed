import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'

//i18N Internationalitation
// import i18n from './i18n'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import { languages, defaultLocale } from '@/i18n/index.js';
const messages = Object.assign(languages)


import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: defaultLocale,
  messages
})

Vue.config.productionTip = false

if (process.env.NODE_ENV == "development") {
  Vue.http.options.root = 'http://localhost:8099/apiv3/'
  // Vue.http.options.root = 'https://expediente.pro/apiv3/'
  // }
} else {
  Vue.http.options.root = 'https://expediente.pro/apiv3/'
  // Vue.http.options.root = process.env.VUE_APP_OPTIONS_ROOT
}

// console.log("option root", Vue.http.options.root)

Vue.http.interceptors.push((request, next) => {
  // let token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFudWVsQHNhaXQuY29tLm14IiwidXNlciI6dHJ1ZSwiZXhwIjoxNjY1MzAzMDQyLCJpYXQiOjE2NjE1MzAyNDIsImlzcyI6IkZhYnJpY2EgZGUgU29mdHdhcmUgU0FJVCBNRDMifQ.ektMuAwpozQpLYgOythGesv9jDqxyePXfcIbgNP5rqc"
  // console.log("token", localStorage.tlaKey)
  request.headers.set('Authorization', 'Bearer ' + localStorage.tlaKey)
  request.headers.set('Accept', 'application/json')
  next()
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
