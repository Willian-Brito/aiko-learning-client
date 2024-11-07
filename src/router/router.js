import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home/Home'
import AdminPages from '@/pages/admin/AdminPages'
import ArticlesByCategory from '@/pages/article/ArticlesByCategory'
import ArticleById from '@/pages/article/ArticleById'
import Auth from '@/pages/auth/Auth'
import Profile from '@/pages/profile/Profile'
import { USER_KEY } from '@/config/environment.js'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages,
        meta: { requiresAdmin: true }
    },
    {
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    },
    {
        name: 'articleById',
        path: '/articles/:id',
        component: ArticleById
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // TODO: implementar rota no back-end para verificar se usuário é admin auth/validateAdmin
    const json = localStorage.getItem(USER_KEY)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        const isAdmin = user.roles.includes('Administrator')

        user && isAdmin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router