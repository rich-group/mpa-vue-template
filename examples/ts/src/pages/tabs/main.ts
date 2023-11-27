import { createApp } from 'vue';
import App from './demo.vue';
import 'tailwindcss/tailwind.css';

async function bootstrap () {
  const app = createApp(App);
  app.config.performance = true;
  app.config.errorHandler = (err: unknown) => {
    /* 处理错误 */
    console.log(err);
  };
  app.mount('#tabs');
}

bootstrap();