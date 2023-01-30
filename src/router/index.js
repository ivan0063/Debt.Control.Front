import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/debt/add',
    name: 'AddDebt',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddDebtView.vue')
  },
  {
    path: '/debt/all',
    name: 'AllDebts',
    component: () => import(/* webpackChunkName: "about" */ '../views/AllDebtsView.vue')
  },
  {
    path: '/payment/do',
    name: 'CardPayments',
    component: () => import(/* webpackChunkName: "about" */ '../views/CardPaymentView.vue')
  },
  {
    path: '/debt/projection',
    name: 'DebtProjection',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectionView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
