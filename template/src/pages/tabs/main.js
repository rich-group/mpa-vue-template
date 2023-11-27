import { createApp } from 'vue';
import App from './demo.vue';
{{#if tailwind}}
import 'tailwindcss/tailwind.css';
{{/if}}

async function bootstrap () {
  const app = createApp(App);
  app.config.performance = true;
  app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log(err);
  };
  app.mount('#tabs');
}

bootstrap();