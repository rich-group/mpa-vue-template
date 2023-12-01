import config from './config';
import packagejson from './package.json';

export default {
  name: packagejson.name,
  filename: `${packagejson}.js`,
  import: {
    app1: config.env.APP1_CDN + '/app1.js?v=[window.VERSION.V1]'
  },
  export: {
    './loading': './src/pages/demo/app.vue'
  }
};