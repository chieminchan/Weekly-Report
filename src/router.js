import Vue from 'vue'
import Router from 'vue-router'

import host from '@/components/layout/Index.vue';

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
            name: 'home',
            path: '/',
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
                },
                {
                    name: 'members',
                    path: '/members',
                    component: () => import('@/views/department/Members.vue'),
                },
                {
                    name: 'member-reports',
                    path: '/member-reports',
                    component: () => import('@/views/reports/MemberReports.vue'),
                },
                // {
                //     name: 'company',
                //     path: '/company',
                //     component: () => import(''),
                // },
                {
                    path: '/403',
                    name: '403',
                    component: () => import('@/views/403Page.vue'),
                },
            ]
        },

    ]
});


export default router;