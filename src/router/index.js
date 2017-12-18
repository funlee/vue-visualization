import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

import TakepoliceOverview from '@/components/takepolice/overview/Overview'
import TakepoliceTrend from '@/components/takepolice/trend/Trend'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component:Layout,
    redirect:'takepolice/overview',
    children:[{
      path:'takepolice/overview',
      component:TakepoliceOverview
    }]
  }]
})
