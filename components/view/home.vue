<template>
	<view class="page-container" :class="show ? 'show' : ''">
		<view style="margin: 15rpx;">
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toRequestAPIPage">发送请求</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toAMapPage">高德地图</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toEchartsPage">echarts 图表</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toMescrollSwiperPage">下拉刷新上拉加载</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toFilterPage">过滤器的使用</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toFormPage">uView 表单组件</button>
			</view>
			<view style="margin: 15rpx;">
				<button type="primary" @click.stop="toI18nPage">vue-i18n 国际化</button>
			</view>
		</view>
	</view>
</template>

<script>	
	import listCell from '@/components/common/list-cell'
	
	export default {
		name: 'home',
		components: {
			listCell
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
			//跳转高德地图页面
			toAMapPage(){
				uni.navigateTo({
					url: '/pages/aMap/aMap'
				})
			},
			//跳转echarts页面
			toEchartsPage(){
				uni.navigateTo({
					url: '/pages/echarts/echarts'
				})
			},
			//跳转发送请求页面
			toRequestAPIPage(){
				uni.navigateTo({
					url: '/pages/requestAPI/requestAPI'
				})
			},
			//跳转下拉刷新上拉加载页面
			toMescrollSwiperPage(){
				uni.navigateTo({
					url: '/pages/mescroll-swiper/mescroll-swiper'
				})
			},
			//跳转过滤器页面
			toFilterPage(){
				uni.navigateTo({
					url: '/pages/filter/filter'
				})
			},
			//跳转表单组件页面
			toFormPage(){
				uni.navigateTo({
					url: '/pages/form/form'
				})
			},
			//跳转vue-i18n 国际化页面
			toI18nPage(){
				uni.navigateTo({
					url: '/pages/i18n/i18n'
				})
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
