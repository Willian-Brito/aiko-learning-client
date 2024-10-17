import Vue from 'vue'
import App from './App'

import '@/config/bootstrap'
import '@/config/messages'
import store from '@/config/store'
import router from '@/router/router'

Vue.config.productionTip = false

// TEMPORÁRIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiRW1haWxLZXkiOiJ3YnJpdG9AYWlrby5kaWdpdGFsIiwidW5pcXVlX25hbWUiOiJXaWxsaWFuIEJyaXRvIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3Mjg5NDIzNDcsImV4cCI6MTcyOTAyODc0NywiaWF0IjoxNzI4OTQyMzQ3LCJpc3MiOiJhaWtvLmRpZ2l0YWwiLCJhdWQiOiJodHRwOi8vYWlrby5kaWdpdGFsLyJ9.QrBWEo4dQdm8zfJ83xfqJwrR9Fa2uMSNj5A0rtv0kSE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')