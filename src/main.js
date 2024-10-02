import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWxLZXkiOiJ3YnJpdG9AYWlrby5kaWdpdGFsIiwidW5pcXVlX25hbWUiOiJXaWxsaWFuIEJyaXRvIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3Mjc4Mjk3MjgsImV4cCI6MTcyNzkxNjEyOCwiaWF0IjoxNzI3ODI5NzI4LCJpc3MiOiJhaWtvLmRpZ2l0YWwiLCJhdWQiOiJodHRwOi8vYWlrby5kaWdpdGFsLyJ9.4FzPHMOCP8rV1Ij9pqB9Znt63OpuKvaUsjH0otJhyFE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')