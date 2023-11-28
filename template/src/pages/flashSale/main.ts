import { createApp } from 'vue';
import App from './app.vue';
{{#if tailwind}}
import 'tailwindcss/tailwind.css';
{{/if}}

createApp(App)
  .mount('#flashSale');