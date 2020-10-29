import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FarmerList from '@/pages/FarmerList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/farmer/list',
      name: 'FarmerList',
      component: () => import('@/pages/FarmerList')
    },
    {
      path: '/map/view',
      name: 'MapView',
      component: () => import('@/pages/MapView')
    },
    {
      path: '/farmer/info',
      name: 'FarmerInfo',
      component: () => import('@/pages/FarmerInfo')
    },
  ]
})
