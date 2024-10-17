import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 const store = new Vuex.Store({
    state: {
        isMenuVisible: true,
        currentTheme: 'light',
        user: {
            name: 'Willian Brito',
            email: 'wbrito@aiko.digital',
            isAdmin: true,
            roles: []
        },
        treeFilter: ''
    },
    mutations: {
        toggleMenu(state, isVisible) {
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
        }
    },
    actions: {
        updateTreeFilter({ commit }, filter) {
            commit('setTreeFilter', filter);
        },
    }
})

export default store