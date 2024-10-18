import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import '@/config/messages'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

new Vue({
  store,
  created() {    
    this.$store.commit('setThemeDefault')
  },
  router,
  render: h => h(App)
}).$mount('#app')