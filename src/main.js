import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import '@/config/messages'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

// TEMPORÁRIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWxLZXkiOiJ3YnJpdG9AYWlrby5kaWdpdGFsIiwidW5pcXVlX25hbWUiOiJXaWxsaWFuIEJyaXRvIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3MjgyMjM3NDcsImV4cCI6MTcyODMxMDE0NywiaWF0IjoxNzI4MjIzNzQ3LCJpc3MiOiJhaWtvLmRpZ2l0YWwiLCJhdWQiOiJodHRwOi8vYWlrby5kaWdpdGFsLyJ9.PL8HROvR0xmbDsemQ5IdS2eF5Yd6dNsAxY-V1HxQVDE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')