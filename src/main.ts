import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/main.scss';
import store from './stores';
import router from './router';
import i18n from './i18n';

import { globalComponents } from './components/global';

const app = createApp(App);

globalComponents.forEach(component => {
  app.component(component.name, component);
});

import { clickOutside } from './tools/directives';
app.directive('click-outside', clickOutside);

app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app');
