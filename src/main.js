import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'
import router from './router'

import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueApexCharts)

Vue.component('ApexChart', VueApexCharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
