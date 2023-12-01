import App from './app.vue';
import { createApp } from 'vue';
import 'tailwindcss/tailwind.css';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';

createApp(App)
  .use(ElementPlus)
  .mount('#demo');