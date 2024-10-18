import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

 const store = new Vuex.Store({
    state: {
        loginPage: true,
        showHeader: false,
        isMenuVisible: false,
        currentTheme: 'light',
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
        toggleTheme() {
            this.state.currentTheme = this.state.currentTheme == 'light' ? 'dark' : 'light'
        },
        setTreeFilter(state, filter) {
            this.state.treeFilter = filter
        },
        setUser(state, user) {
            state.user = user

            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.accessToken}`
                state.loginPage = false
                state.isMenuVisible = true
                state.showHeader = true
            } else {                
                delete axios.defaults.headers.common['Authorization']
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