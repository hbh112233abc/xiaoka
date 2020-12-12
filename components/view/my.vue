<template>
	<view class="page-container" :class="show ? 'show' : ''">
		<view style="margin: 15rpx;">
			<button type="primary" @click.stop="clearStorage">清空缓存</button>
		</view>
		<view style="margin: 15rpx;">
			<button type="primary" @click.stop="updateApp">版本更新</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'my',
		components: {

		},
		data() {
			return {
				
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			//更新版本
			updateApp() {
				this.$U.update(true)
			},
			//清除缓存
			clearStorage() {
				let token = uni.getStorageSync('token')
				uni.clearStorageSync()
				uni.showModal({
					title: '缓存清理完毕',
					content: '缓存清理完毕',
					showCancel: false,
					confirmText: '确定'
				})
				uni.setStorageSync('token', token)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		display: none;
	}

	.show {
		display: block !important;
	}
</style>