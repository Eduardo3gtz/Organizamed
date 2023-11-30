
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],

  'extends': [
    'plugin:vue/essential'
  ],

  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },

  // add your custom rules here
  rules: {

    'vue/multi-word-component-names': ['error', {
      'ignores': ['Snackbar', 'avisopriv', 'barranav', 'relacionadas','depresion',
        'conteste','ansiedad', 'valoracionpsi', 'valoracionfis', 'catvalfisica', 'notasocial','notamedica',
        'catnotamed','vista' ,'invpersonal', 'historiacli', 'atraumaticos', 'aquirurgicos','aperinatales',
        'apatologicos','anopato','dsomatometrico','aginecologicos','fichasocial','nosotros','panel','miperfil',
        'registrarse','olvidacontra','login','expediente','catexpedientes','leepaises','carta',
        'Home','cambiacontra'
      ]
    }],

    
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],

    'no-console': 'off',
    'no-tabs': 'off',

    indent: [2, 2],
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: true
      }
    ],
  },

}