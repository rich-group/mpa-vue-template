import axios from 'axios';

const context = require.context('./interface', true, /\.ts/);

const apis = context.keys().reduce((obj, modulePath) => {
  const fileName = /[a-zA-Z]+/.exec(modulePath)?.[0] || '';
  return Object.assign(obj, {[fileName]: context(modulePath).default});
}, {});

const modules = {};
const moduleNames = Object.keys(apis);
let length = moduleNames.length;

const instance = axios.create({
  timeout: 5000
});

while(length--) {
  const moduleName = moduleNames[length];
  const moduleApis = apis[moduleName];
  if (Array.isArray(moduleApis) && moduleApis.length > 0) {
    const res = moduleApis.reduce((modules, api) => {
      const apiPath = `${process.env[`${moduleName}`]}${api.path}`;
      const obj = {
        [api.name]: (params, resetConfig) => {
          const method = ['POST', 'CANCELPOST'].includes(api.type.toUpperCase()) 
            ? instance[api.type](apiPath, params, resetConfig)
            : instance[api.type](apiPath, {params});
          return method.then(res => res.data);
        }
      };
      modules[moduleName] = modules[moduleName] ? {...modules[moduleName], ...obj} : obj;
      return modules;
    }, {});
    Object.assign(modules, res);
  }
}

export default modules;