// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import ajax from './components/ajax'
import router from './router'
import { Group, Cell, LoadMore, Loading, XInput, XAddress, Selector, 
  PopupPicker, Checker, CheckerItem, Popup, PopupHeader, Picker, XTextarea,
  XDialog, XButton, AlertPlugin, Datetime, Checklist } from 'vux'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: '29HBufmFD2Edbi4fRK5CRObrlDk8lzr7'
})

Vue.use(AlertPlugin)

FastClick.attach(document.body)
Vue.component('Group', Group)
Vue.component('cell', Cell)
Vue.component('load-more', LoadMore)
Vue.component('loading', Loading)
Vue.component('x-input', XInput)
Vue.component('x-textarea', XTextarea)
Vue.component('x-address', XAddress)
Vue.component('selector', Selector)
Vue.component('popup-picker', PopupPicker)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('popup', Popup)
Vue.component('picker', Picker)
Vue.component('popup-header', PopupHeader)
Vue.component('x-dialog', XDialog)
Vue.component('x-button', XButton)
Vue.component('datetime', Datetime)
Vue.component('checklist', Checklist)

Vue.prototype.$axios = ajax
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
