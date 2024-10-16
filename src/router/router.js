import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home/Home'
import AdminPages from '@/pages/admin/AdminPages'
import ArticlesByCategory from '@/pages/article/ArticlesByCategory'
import ArticleById from '@/pages/article/ArticleById'
import Auth from '@/pages/auth/Auth'

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
        component: AdminPages
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
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router