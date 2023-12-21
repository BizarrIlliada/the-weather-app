import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import WeatherPage from '../views/weather-view/WeatherPage.vue';
import WeatherListComponent from '@/views/weather-view/WeatherListComponent.vue';
import FavoritesListComponent from '@/views/weather-view/FavoritesListComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Weather List' },
    name: 'Weather Page',
    component: WeatherPage,
    children: [
      {
        path: 'weather',
        name: 'Weather List',
        component: WeatherListComponent,
      },
      {
        path: 'favorites',
        name: 'Favorites List',
        component: FavoritesListComponent,
      }
    ],
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
