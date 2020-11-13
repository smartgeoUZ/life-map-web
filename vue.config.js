// vue.config.js
module.exports = {
  "publicPath":  process.env.NODE_ENV === 'production' ? '/' : '/',

  "devServer": {
    "host": "127.0.0.1",
    "port": 80
  },

  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/login',
        '/',
        '/map',
        '/profile',
        '/about'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
