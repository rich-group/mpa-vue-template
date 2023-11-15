import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import path from 'path';
import config from '../config';
import loaders from './vue-loader.config';
import { globSync } from 'glob';
import minimist from 'minimist';

const parseArgv = minimist(process.argv.slice(2))
const moduleName = parseArgv.module //

const { ModuleFederationPlugin } = webpack.container;

const devMode = process.env.NODE_ENV !== 'production';

/**
 * @description 根据src下目录结构或命令行参数动态配置入口
 * @param { string } rootName 多页父级目录
 * @param { string } moduleName 指定的页面名称
 * @returns { Object } entry
 */
function getEntries (rootName, moduleName) {
  if (fs.existsSync(rootName)) {
    const pages = globSync(`${rootName}/*`).map(filePath => filePath.replace(/\\/g, '/').replace(/src\/([0-9a-zA-Z])+\//, ''));
    return moduleName === undefined 
      ? pages.reduce((entry, pageName) => {
        entry[pageName] = `./${rootName}/${pageName}/main.ts`;
        return entry;
      }, {})
      : {[moduleName]: `./${rootName}/${moduleName}/main.ts`};
  }
  throw new Error('The pages folder is missing in the src directory');
}

const entryObj = getEntries('src/pages', moduleName);

/**
 * @description 添加配置多入口的htmlplugin
 * @param {*} pageNames 所有的pagename
 * @param {*} baseConfig 基础配置
 */
function appendHtmlPlugins (pageNames, baseConfig) {
  pageNames.forEach(page => {
    const ins = new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      template: `./src/index.html`, 
      filename: `${page}/index.html`,
      app: `<div id="${page}"></div>`,
      chunks: [page], // 防止其他page打包后的css、js引入所有的html
      hash: true
    });
    (baseConfig.plugins || [])?.push(ins);
  });
}

const baseConfig = {
  experiments: {
    topLevelAwait: true,
  },
  entry: {
    ...entryObj
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: devMode
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath,
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    alias: {
      'vue': '@vue/runtime-dom',
      '@utils': '/utils',
      '@': '/src',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-top-level-await'],
              cacheDirectory: true // 自动babel缓存
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
      },
      ...loaders
    ]
  },
  plugins: [
    new WebpackBar({}),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': JSON.stringify(Object.assign({}, config.build.env, {language})),
      'process.env': JSON.stringify(config.build.env)
    }),
    new webpack.ProvidePlugin({
      $API: [path.resolve(__dirname, '../src/apis'), 'default'],
      createStore: [path.resolve(__dirname, '../src/utils/reactive'), 'createStore']
    }),
    new ModuleFederationPlugin({
      name: 'remote_activities',
      exposes: {},
      remotes: {},
      shared: {}
    }),
  ],
};

appendHtmlPlugins(Object.keys(entryObj) ,baseConfig);

export default baseConfig;