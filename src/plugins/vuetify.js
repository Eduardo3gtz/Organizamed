import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
// Vuetify.config.silent = true

// Translation provided by Vuetify (javascript)
import es from 'vuetify/lib/locale/es'
import en from 'vuetify/lib/locale/en'

import colors from 'vuetify/lib/util/colors'

// Vue.component('my-component', {
//   methods: {
//     changeLocale () {
//       this.$vuetify.lang.current = 'es'
//     },
//   },
// })

export default new Vuetify({
  lang: {
    locales: { es, en },
    current: 'es',
  },
  icons: {
    iconfont: 'fa' || 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: colors.blue.lighten3,
        background: '#ECEFF1'
      },
      
    }
  }
});

