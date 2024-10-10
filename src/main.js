import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import '@/config/messages'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

// TEMPORÁRIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWxLZXkiOiJ3YnJpdG9AYWlrby5kaWdpdGFsIiwidW5pcXVlX25hbWUiOiJXaWxsaWFuIEJyaXRvIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3Mjg1MTAwNzQsImV4cCI6MTcyODU5NjQ3NCwiaWF0IjoxNzI4NTEwMDc0LCJpc3MiOiJhaWtvLmRpZ2l0YWwiLCJhdWQiOiJodHRwOi8vYWlrby5kaWdpdGFsLyJ9.WMiJKjhk-DKwAIYrAP90mvkk4WmiECV1bjvhOC1WFtU'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')