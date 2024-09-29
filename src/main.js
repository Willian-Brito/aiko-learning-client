import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWxLZXkiOiJ3YnJpdG9AYWlrby5kaWdpdGFsIiwidW5pcXVlX25hbWUiOiJXaWxsaWFuIEJyaXRvIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3Mjc1NDgxMzQsImV4cCI6MTcyNzYzNDUzNCwiaWF0IjoxNzI3NTQ4MTM0LCJpc3MiOiJhaWtvLmRpZ2l0YWwiLCJhdWQiOiJodHRwOi8vYWlrby5kaWdpdGFsLyJ9.tqRULEF1O6u5AlCDd3tid2gdQstPzPSl1jvpbSHbJkM'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')