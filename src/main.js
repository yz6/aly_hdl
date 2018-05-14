// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import $ from 'jquery'
import 'font-awesome/css/font-awesome.css'
import echarts from 'echarts'
import "echarts-gl"
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

