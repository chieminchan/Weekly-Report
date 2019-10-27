import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import host from '@/components/layout/Index.vue';

Vue.use(Router);

// roleId = 3
const memberRouters = [{
    path: '/',
    component: host,
    redirect: { name: 'reports' },
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
            name: 'member-reports',
            path: '/member-reports',
            component: () => import('@/views/reports/MemberReports.vue'),
        }
    ]
}];

// roleId = 2
const managerRouters = [{
    path: '/',
    component: host,
    redirect: { name: 'member-reports' },
    children: [{
            name: 'members',
            path: '/members',
            component: () => import('@/views/department/Members.vue'),
        },
        {
            name: 'member-reports',
            path: '/member-reports',
            component: () => import('@/views/reports/MemberReports.vue'),
        },
    ]
}];

// roleId = 1
const adminRouters = [{
    path: '/',
    component: host,
    redirect: { name: 'departments' },
    children: [{
            name: 'members',
            path: '/members',
            component: () => import('@/views/department/Members.vue'),
        },
        {
            name: 'departments',
            path: '/departments',
            component: () => import('@/views/department/Department.vue'),
        },
    ]
}];

const constantRouter = [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Index.vue'),
        meta: { requireAuth: false }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404Page.vue'),
    },
    {
        path: '/',
        component: host,
        meta: { requireAuth: true },
        children: [{
            path: '/403',
            name: '403',
            component: () => import('@/views/403Page.vue'),
            meta: { requireAuth: true }
        }, ]
    },
]


const loadExpandRouter = (roleId) => {
    switch (roleId) {
        case 1:
            return adminRouters;
        case 2:
            return managerRouters;
        case 3:
            return memberRouters;
    }
}

const createRouter = (routes) => new Router({
    routes
});

const router = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/Index.vue'),
            meta: { requireAuth: false }
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/views/403Page.vue'),
            meta: { requireAuth: true }
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/404Page.vue'),
        },
    ]
});

router.beforeEach((to, from, next) => {

    const isLogin = localStorage.getItem('haslogin') || false;
    if (isLogin) {
        // 是否加载userInfo
        if (!store.state.userInfo.roleId) {
            store.dispatch('loadUserInfo').then((response) => {
                const expandRouters = loadExpandRouter(response.data.roleId);
                router.matcher = createRouter(constantRouter).matcher;
                router.addRoutes(expandRouters);
                next(to.path);
            })
            // console.log('uinit1', router);

            // 已加载
        } else {
            // console.log('hasinit', router);
            next();
        }

        // 未登录
    } else {
        if (to.meta.requireAuth && to.path !== '/login') {
            router.push({ name: 'login' });
        } else {
            next();
        }
    }
})

export default router;