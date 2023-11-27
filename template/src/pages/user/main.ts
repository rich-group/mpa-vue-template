import { createApp } from 'vue';
import App from './app.vue';
import '@/mock';

async function bootstrap () {
  const app = createApp(App);
  app.config.errorHandler = (err: unknown) => {
    /* 处理错误 */
    console.log(err)
  };
  app.mount('#user');
}

bootstrap();