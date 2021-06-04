import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import { http } from '@/common/service.js' // 全局挂载引入，配置相关在该index.js文件里修改

Vue.prototype.$store = store
Vue.prototype.$http = http

import './filters' // 过滤器

// 引入全局组件
import navBar from '@/components/common/nav-bar.vue'
Vue.component('navBar', navBar)
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-uni', MescrollUni)

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

//挂载助手函数库
// import $U from '@/utils/common/utils.js'
// Vue.prototype.$U = $U

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js'
import English from '@/common/locales/en.js'

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js'

// VueI18n
Vue.use(VueI18n)

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
})

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
  ...App
})
app.$mount()
