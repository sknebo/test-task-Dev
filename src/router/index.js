import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Map',
        component: () => import('@/views/Map.vue')
    },
];

const router = new VueRouter({
    routes
});

export default router;
