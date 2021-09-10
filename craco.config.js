const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions:{
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(27, 85, 197)',
              '@font-size-base': '16px'
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
}