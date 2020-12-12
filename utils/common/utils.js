import { http } from '@/common/service.js'

import config from '@/common/config.js'

export default {
	//热更新
	update(showToast = false) {
		// #ifdef APP-PLUS 
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			let version = widgetInfo.version
			http.get('/smcsjs/user/getApp')
				.then(res => {
					let result = res
					let versionInfo = {
						url: '',
						version: ''
					}
					let systemInfo = uni.getSystemInfoSync()

					if (plus.os.name == 'Android') {
						versionInfo.url = config.versionUpdateAddress + res.url + '/' + res.version || ''
						versionInfo.version = res.version || ''
					}

					if (!versionInfo.url || versionInfo.version === version) {
						if (showToast) {
							//设置页面点击查看版本号
							return uni.showToast({
								title: '已经是最新版本了',
								icon: 'none'
							})
						}
						return
					}

					uni.showModal({
						title: '发现新版本',
						content: '新版本:' + versionInfo.version,
						cancelText: '放弃更新',
						confirmText: '立即更新',
						success: (res) => {
							if (res.confirm) {
								uni.showLoading({
									title: '版本更新中...'
								})
								//上传 start
								uni.downloadFile({
									url: versionInfo.url,
									success: (downloadResult) => {
										if (downloadResult.statusCode === 200) {
											plus.runtime.install(downloadResult.tempFilePath, {
												force: false
											}, function() {
												plus.runtime.restart()
											}, function(e) {
												uni.showToast({
													title: '更新失败',
													icon: 'none'
												})
											})
										}
									},
									fail: () => {
										uni.showToast({
											title: '更新失败',
											icon: 'none'
										})
									},
									complete: () => {
										uni.hideLoading()
									}
								})
								//上传 end
							}
						},
						fail: () => {
							uni.showToast({
								title: '更新失败',
								icon: 'none'
							})
						}
					})

				})
				.catch(err => {
					if (showToast) {
						//设置页面点击查看版本号
						uni.showToast({
							title: '获取版本信息失败',
							icon: 'none'
						})
					}
				})

		})
		// #endif
	},
	//获取个推cid
	pushListener() {
		let clientid = plus.push.getClientInfo().clientid
		store.commit('setCid', clientid)
		if (!clientid) { //如果获取的cid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
			setTimeout(() => {
				clientid = plus.push.getClientInfo().clientid
				store.commit('setCid', clientid)
			}, 4000)
		}
	
		plus.push.addEventListener('receive', (message) => {
			let msg = JSON.parse(message.payload) || {}
			if (msg.type === 'post') {
				//登录验证
				if (!store.state.isLogin) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/community/postDetail?postId=' + msg.id
					})
				}
	
			} else if (msg.type === 'news') {
				//登录验证
				if (!store.state.isLogin) {
					uni.navigateTo({
						url: '/pages/my/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/news'
					})
				}
			} else {
				uni.reLaunch({
					url: '/pages/app/index'
				})
			}
		})
	}

}
