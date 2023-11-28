import { createApp } from 'vue';
import App from './app.vue';
import { initI18n } from '@/site';
{{#if tailwind}}
import 'tailwindcss/tailwind.css';
{{/if}}

async function bootstrap () {
  const app = createApp(App);
  app.config.performance = true;
  app.use(initI18n());
  app.config.errorHandler = (err: unknown) => {
    /* 处理错误 */
    console.log(err);
  };
  app.mount('#language');
}

bootstrap();