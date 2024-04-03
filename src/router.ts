import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from './components/Home.vue';
import About from './components/About.vue';
import ScanCodePage from './components/ScanCodePage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, 
  { 
    path: '/about',
    name: 'About',
    component: About,
  }, 
  { 
    name: 'ScanCodePage', 
    path: '/ScanCodePage', 
    component: ScanCodePage,
  }
];

const router = createRouter({
    history: createWebHistory("/"),
  routes,
});

export default router;
