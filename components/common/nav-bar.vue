<template>
	<view class="nav-bar-container">
		<view class="fixed-top">
			<!-- 状态栏 -->
			<view class="nav-status-bar" :style="{ backgroundColor: backgroundColor,height: statusBarHeight + 'px'}"></view>
			<!-- 导航 -->
			<view class="nav-container" :style="{ backgroundColor: backgroundColor }">
				<view v-if="isShowBack" class="iconfont iconjiantou nav-left" @click.stop="back"></view>
				<view class="nav-title ellipsis">{{title || ''}}</view>
				<view class="nav-right" @click="rightMenuClick">{{rightMenuName}}</view>
				<view v-if="showShareBtn" class="nav-right share-btn" @click="rightMenuClick">
					<image src="/static/constellation/common/share_icon_new.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="isShowStatusBar" :style="fixedStyle"></view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			rightMenuName: {
				type: String,
				default: ""
			},
			isShowBack:{
				type: Boolean,
				default: true
			},
			showShareBtn:{
				type: Boolean,
				default: false
			},
			isCustomBackEvent: {
				type: Boolean,
				default: false
			},
			backgroundColor:{
				type: String
			},
			isShowStatusBar:{
				type: Boolean,
				default: true
			}
			
		},
		data() {
			return {
				statusBarHeight: 0,
				navBarHeight: 0
			}
		},
		created() {
			this.statusBarHeight = this.$store.state.statusBarHeight
		},
		mounted() {
			this.navBarHeight = this.statusBarHeight + uni.upx2px(90)
		},
		computed: {
			fixedStyle() {
				return `height:${this.navBarHeight}px`
			}
		},
		methods:{
			//返回
			back(){
				if(this.isCustomBackEvent){
					this.$emit('back')
				} else {
					uni.navigateBack()	
				}
			},
			//右侧功能菜单点击事件
			rightMenuClick(){
				this.$emit('rightMenuClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar-container{
		position: relative;
		z-index: 999;
	}
	.nav-container {
		display: flex;
		height: 89rpx;
		line-height: 89rpx;
		font-size: 16px;
		background-color: #0070f4;

		.nav-left {
			margin-left: 15rpx;
			font-size: 20px;
			transform: rotate(180deg);
			color: #fff;
		}

		.nav-title {
			font-size: 16px;
			flex: 1;
			text-align: center;
			color: #fff;
		}

		.nav-right {
			padding-right: 32rpx;
			font-size: 12px;
			color: #333;
		}
		
		.share-btn{
			display: flex;
			align-items: center;
			image{
				width: 45rpx;
				height: 45rpx;
			}
		}
	}
	
	.fixed-top {
	  position: fixed;
	  top: 0;
	  right: 0;
	  left: 0;
	  z-index: 1030;
	  .nav-status-bar{
		  background-color: #0070f4;
	  }
	}
</style>
