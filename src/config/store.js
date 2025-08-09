import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/services/HttpClient.js'
import { THEME_KEY } from '@/config/environment.js'

Vue.use(Vuex)

 const store = new Vuex.Store({
    state: {
        loginPage: true,
        showHeader: false,
        isMenuVisible: false,
        isMobile: false,
        currentTheme: null,
        user: null,
        treeFilter: ''
    },
    mutations: {
        toggleMenu(state, isVisible) {

            if(!state.user) {
                state.loginPage = true
                state.isMenuVisible = false
                state.showHeader = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setMobile(state, isMobile) {
            state.isMobile = isMobile
        },
        setThemeDefault() {
            const theme = localStorage.getItem(THEME_KEY) || 'light-theme';
            document.body.classList.add(theme);
            this.state.currentTheme = theme
        },
        toggleTheme() {
            this.state.currentTheme = this.state.currentTheme == 'light-theme' ? 'dark-theme' : 'light-theme'            
        },
        setTreeFilter(state, filter) {
            state.treeFilter = filter
        },
        setUser(state, user) {
            state.user = user

            if(user) {
                http.setHeader('Authorization', `Bearer ${user.accessToken}`)
                state.loginPage = false
                state.isMenuVisible = true
                state.showHeader = true
            } else {         
                http.deleteHeader('Authorization')
                state.loginPage = true
                state.isMenuVisible = false
                state.showHeader = false
            }
        }
    },
    actions: {
        updateTreeFilter({ commit }, filter) {
            commit('setTreeFilter', filter);
        },
    }
})

export default store