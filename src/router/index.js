import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import FarmerList from '@/pages/FarmerList'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/farmer/list',
      name: 'FarmerList',
      component: () => import('@/pages/farmer/FarmerList')
    },
    // {
    //   path: '/map/view',
    //   name: 'MapView',
    //   component: () => import('@/pages/MapView')
    // },
    {
      path: '/farmer/info',
      name: 'FarmerInfo',
      component: () => import('@/pages/farmer/FarmerInfo')
    },
    {
      path: '/farmer/add',
      name: 'FarmerAdd',
      component: () => import('@/pages/farmer/FarmerInfo')
    },
    {
      path: '/point/info',
      name: 'PointInfo',
      component: () => import('@/pages/point/PointInfo')
    },
    {
      path: '/point/list',
      name: 'PointList',
      component: () => import('@/pages/point/PointList')
    },
    {
      path: '/point/add',
      name: 'PointAdd',
      component: () => import('@/pages/point/PointInfo')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
  ]
})

export default router
