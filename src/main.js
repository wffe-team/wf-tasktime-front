// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import util from './common/util'
import './element-variables.scss'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.util = util

// 日期过滤器
Vue.filter('dateFormat', function (value, rule) {
  if (value === '') {
    return ''
  }
  return util.formatDate(new Date(value), rule)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
