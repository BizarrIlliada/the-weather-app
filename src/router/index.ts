import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import WeatherPage from '../views/weather/WeatherPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Weather Page',
    component: WeatherPage,
  },
  {
		path: '/:pathMatch(.*)*',
		name: '404',
		redirect: { name: 'Weather Page', params: {} },
    meta: {
      title: '404 ;(',
    },
	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
