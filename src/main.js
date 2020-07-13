import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
import './public/pubFunction.js'
import './mock/index.js'
import './permission.js'

import _ from 'lodash'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import moment from 'moment'

// 关闭moment提示
moment.suppressDeprecationWarnings = true;

import router from './router/index'
Vue.use(_)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(moment)
Vue.config.productionTip = false

const {
  mockXHR
} = require('./mock')
mockXHR()

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
})