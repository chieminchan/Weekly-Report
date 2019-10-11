import Vue from 'vue'
import Router from 'vue-router'

import host from '@/views/layout/Index.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        // 登录
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/Index.vue'),
        },
        {
            path: '/',
            name: 'home',
            component: host,
            redirect: {
                name: 'reports'
            },
            children: [{
                    name: 'reports',
                    path: '/reports',
                    component: () => import('@/views/reports/Index.vue'),
                },
                {
                    name: 'new-report',
                    path: '/new-report',
                    component: () => import('@/views/reports/NewReport.vue'),
                }
            ]
        },
    ]
});


export default router;