import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/index'
import appLeft from '@/view/application/app-left-tab'
import foreCast from '@/view/application/fore_cast'
import intelligentSupply from '@/view/application/intelligent_supply'
import taskList from '@/view/application/task_list'
import order from '@/view/application/order'
import dataLeft from '@/view/data/data-left-tab'
import overView from '@/view/data/overview'
import predictionTask from '@/view/data/prediction-task'
import storeInfor from '@/view/data/store_infor'
import goodsInfor from '@/view/data/goods_infor'
import parameter from '@/view/data/parameter'
import promotion from '@/view/data/promotion'
import supplierInfor from '@/view/data/supplier_infor'
import importExport from '@/view/data/import&export'
import historyData from '@/view/data/history_data'
import command from "@/view/command/command"
import testLeft from "@/view/testing/testing-left-tab"
import dayTest from "@/view/testing/dayTest"
import detailedMessage from "@/view/testing/detailedMessage"
import salesVerification from "@/view/testing/salesVerification"
import materialVerification from "@/view/testing/materialVerification"
import dDetailed from "@/view/testing/3dDetailed"
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path:'/',redirect:{path:'/app'}
    },
    {
      path: '/app',
      name: 'app',
      component: home,
      children: [
        {
          path: 'app-left-tab',
          component:appLeft,
          children:[
            {
              path:'task_list',
              component:taskList
            },
            {
              path:'fore_cast',
              component:foreCast
            },
            {
              path:'intelligent_supply',
              component:intelligentSupply
            },
            {
              path:'order',
              component:order
            },
            {
              path:'/app/app-left-tab',redirect:{path:'/app/app-left-tab/task_list'}
            },
          ]
        },
        {
          path:'/app',redirect:{path:'/testing/testing-left-tab'}
        },
      ]
    },
    {
      path: '/data',
      name: 'data',
      component: home,
      children: [
        {
          path: 'data-left-tab',
          component:dataLeft,
          children:[
            {
              path:'overview',
              component:overView
            },
            {
              path:'store_infor',
              component:storeInfor
            },
            {
              path:'goods_infor',
              component:goodsInfor
            },
            {
              path:"parameter",
              component:parameter
            },
            {
              path:"promotion",
              component:promotion
            },
            {
              path:'supplier_infor',
              component:supplierInfor
            },
            {
              path:'prediction-task',
              component:predictionTask
            },
            {
              path:'import&export',
              component:importExport
            },
            {
              path:"historyData",
              component:historyData
            },
            {
              path:'/data/data-left-tab',redirect:{path:'/data/data-left-tab/overview'}
            }
            
          ]
        },
      ]
    },
    {
      path: '/command',
      name: 'command',
      component: home,
      children:[
        {
          path:"/command",
          component:command,
        }
      ]
    },
    {
      path: '/testing',
      name: 'testing',
      component: home,
      children: [
        {
          path: 'testing-left-tab',
          component:testLeft,
          children:[
            {
              path:'dayTest',
              component:dayTest
            },
            {
              path:"detailedMessage",
              component:detailedMessage
            },
            {
              path:"3dDetailed",
              component:dDetailed
            },
            {
              path:"salesVerification",
              component:salesVerification
            },
            {
              path:"materialVerification",
              component:materialVerification
            },
            {
              path:'/testing/testing-left-tab',redirect:{path:'/testing/testing-left-tab/dayTest'}
            }
        
          ]
        },
      ]
    },

  ]
})
