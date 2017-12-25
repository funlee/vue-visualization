import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

import Castle from '@/components/fantasy/castle/Castle'
import Fireworks from '@/components/stride/fireworks/Fireworks'
import Sailor from '@/components/excleamation/sailor/Sailor'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component:Layout,
    redirect:'fantasy/castle',
    children:[{
      path:'fantasy/castle',
      component: Castle
    },{
        path: 'stride/fireworks',
        component: Fireworks
    },{
        path: 'excleamation/sailor',
        component: Sailor
    }]
  }]
})
