/**
 * @version 3.0.4
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-2.7.14 alpha-2.8.0
 */
import Request from '@/utils/luch-request/index.js'

import config from '@/common/config.js'

const apiAddress = config.apiAddress

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {
		//TODO handle the exception
	}
	return token
}

const test = new Request()
/**
 * 修改全局配置示例
 const test = new Request({
	header: {a:1}, // 举例
	baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
	validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
		return statusCode >= 200 && statusCode < 300
	}
})
 test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

test.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = apiAddress
	config.header = {
		...config.header,
		Accept: 'application/json'
	}
	config.custom = {
		// auth: false, // 是否传token
		// loading: false // 是否使用loading
	}
	return config
})

test.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作  */
	config.header = {
		...config.header,
		Accept: 'application/json'
	}
	/**
	 * custom {Object} - 自定义参数
	 */
	// if (config.custom.auth) {
	//   config.header.token = '123456'
	// }
	// if (config.custom.loading) {
	//   uni.showLoading()
	// }
	/*
	if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	  return Promise.reject(config)
	}
	*/
	return config
}, (config) => {
	return Promise.reject(config)
})


test.interceptors.response.use((response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	// if (response.config.custom.loading) {
	//    uni.hideLoading()
	//  }

	if (response.data.code === config.notLoggedIn) {
		uni.showToast({
			title: '会话超时，请重新登录！',
			icon: 'none'
		})
		uni.navigateTo({
			url: '/pages/login/login'
		})
		return Promise.reject(response)
	}

	if (response.data.code !== config.successCode) {
		let errorMsg = '出错啦!'
		if (!!response.data.description) {
			errorMsg = response.data.description
		}
		uni.showToast({
			title: response.data.description,
			icon: 'none'
		})
		return Promise.reject(response)
	}
	return response.data.data
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	uni.showToast({
		title: response.errorMsg || '出错啦!',
		icon: 'none'
	})
	
	uni.navigateTo({
		url: '/pages/login/login'
	})
	return Promise.reject(response)
})


const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = apiAddress /* 根域名不同 */
	config.header = {
		...config.header,
		Accept: 'application/json'
		/* a: 1, // 演示
		b: 2 // 演示 */
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
		Accept: 'application/json'
	}
	if (!config.custom.ignoreAuth) {
		config.header.Authorization = getTokenStorage()
	}
	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */

	if (response.data.code === config.notLoggedIn) { //未登录或会话超时
		uni.navigateTo({
			url: '/pages/login/login'
		})
		return Promise.reject(response)
	}

	if (response.data.code !== config.successCode) {
		uni.showToast({
			title: response.data.description || '出错啦!',
			icon: 'none'
		})
		return Promise.reject(response)
	}
	return response.data.data
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	uni.showToast({
		title: response.errorMsg || '出错啦!',
		icon: 'none'
	})
	
	uni.navigateTo({
		url: '/pages/login/login'
	})
	return Promise.reject(response)
})

export {
	http,
	test
}
