module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath:   '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Expediente Médico Digital';
        return args;
      });
  },

  
}
