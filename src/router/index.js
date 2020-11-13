const routes = [
    {
        path: '/404',
        name: '404',
        meta: {
            layout: 'main',
            withoutAuth: false
        },
        component: () => import('../views/NotFound.vue'),
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/admin',
        redirect: '/admin/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'empty',
            withoutAuth: true
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            layout: 'empty',
            requiresAuth: false,
            withoutAuth: true
        },
        component: () => import('../views/Register.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: {
            layout: 'map',
            requiresAuth: false
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/event/:id',
        name: 'homeWithEvent',
        meta: {
            layout: 'map',
            requiresAuth: false
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/map',
        name: 'Map',
        meta: {
            layout: 'map',
            requiresAuth: false
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            layout: 'main',
            withoutAuth: false
        },
        component: () => import('../views/About.vue')
    },
    {
        path: '/terms',
        name: 'Terms',
        meta: {
            layout: 'main',
            withoutAuth: false
        },
        component: () => import('../views/Terms/MainTermsPage.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'main',
            requiresAuth: true
        },
        component: () => import('../views/Profile.vue')
    },
    {
        path: '/admin/',
        name: 'admin',
        meta: {
            layout: 'main',
            requiresAuth: true
        },
        component: () => import('../views/Admin/MainAdminPage.vue'),
        children: [
            {
                path: '/admin/dashboard',
                name: 'dashboard',
                component: () => import('../views/Admin/Dashboard.vue'),
            },
            {
                path: '/admin/events',
                name: 'events',
                component: () => import('../views/Admin/Events.vue'),
            },

            {
                path: '/admin/users',
                name: 'users',
                component: () => import('../views/Admin/Users.vue'),
            },
            {
                path: '/admin/role',
                name: 'role',
                component: () => import('../views/Admin/Role.vue'),
            },
            {
                path: '/admin/layers',
                name: 'layers',
                component: () => import('../views/Admin/Layers.vue'),
            },
        ]
    }
]

export default routes
