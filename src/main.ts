import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/main.scss';
import store from './stores';
import router from './router';

import { globalComponents } from './components/global';

const app = createApp(App);

globalComponents.forEach(component => {
  app.component(component.name, component);
});

app
  .use(store)
  .use(router)
  .mount('#app');
