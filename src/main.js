// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // 必须在最开始引入垫片
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueParticles from 'vue-particles'
import i18n from './lang' // Internationalization
import * as utils from '@/utils'
import 'font-awesome/less/font-awesome.less'
// 引入定制标题的指令
import 'directives/customTitle.js'
// 在入口处引入模拟的假数据
import '@/mock'
//element-ui 全局引入
import ElementUI from 'element-ui';
//mavonEditor 加载
import autoTextarea from 'auto-textarea'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//glw添加的公共js
import common from './common/common.js'

Vue.use(ElementUI);

//markdown 
Vue.use(mavonEditor);
Vue.use(autoTextarea)


Vue.prototype.$axios = axios
Vue.use(VueParticles)

//加载公共函数
Vue.prototype.$common = common

// Vue 的全局配置
Vue.config.productionTip = false

// 上线全局请求配置
axios.defaults.baseURL = 'api/v1/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 如果本地存储中有token字段， 就为所有请求加上Authorization请求头
    if (localStorage.token) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`
    }
    return config;
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 如果后端返回没有权限
        case 401:
          // 清除token信息并跳转到登录页面
          localStorage.clear()
          router.replace("/signin");
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
