const configBuilder = require('webpack-focus').configBuilder;
const customConfig = {
  stats: {
        colors: true,
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        modules: true,
        reasons: true,
        children: true,
        source: true,
        errors: true,
        errorDetails: true,
        warnings: true
    },

    proxy: null,
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'redux-devtools': 'redux-devtools',
      'react-addons-css-transition-group': {
          root: ['React', 'addons', 'CSSTransitionGroup']
      },
      moment: 'moment',
      lodash: 'lodash'
    }
}

module.exports = configBuilder(customConfig);
