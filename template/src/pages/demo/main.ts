import App from './app.vue';
import { createApp } from 'vue';
{{#if tailwind}}
import 'tailwindcss/tailwind.css';
{{/if}}

createApp(App)
  .mount('#demo');