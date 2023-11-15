import { createAxios } from 'rich-axios';

const context = require.context('./interface', true, /\.ts/)

const apis = context.keys().reduce((obj, modulePath) => {
  console.log(obj, modulePath, context(modulePath).default)
  const fileName = /[a-zA-Z]+/.exec(modulePath)?.[0] || '';
  return Object.assign(obj, {[fileName]: context(modulePath).default})
}, {})

const modules = {};
const moduleNames = Object.keys(apis);
let length = moduleNames.length;

const instance = createAxios({
  timeout: 5000
});

while(length--) {
  const moduleName = moduleNames[length];
  const moduleApis = apis[moduleName];
  if (Array.isArray(moduleApis) && moduleApis.length > 0) {
    const res = moduleApis.reduce<API>((apis, api) => {
      return Object.assign(apis, {
        [moduleName + '_' + api.name]: (params, resetConfig) => 
          ['POST', 'CANCELPOST'].includes(api.type.toUpperCase()) 
            ? instance[api.type](api.path, params, resetConfig)
            : instance[api.type](api.path, {params})
      });
    }, {});
    Object.assign(modules, res);
  }
}

export default modules;