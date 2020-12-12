<template>
	<view @touchmove.stop.prevent="clear" v-if="showPopup">
		<view class="popup_mask" @touchmove.stop.prevent="clear"></view>
		<view class="popup_content">
			<view class="title">{{title}}</view>
			<view class="explain_text">
				请你务必认真阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供数据、分享等服务所要获取的权限信息。
				<view class="line">
					你可以阅读<text class="path" @click.stop="toAgreementPage('用户协议','service.html')">《用户服务协议》</text>和<text class="path" @click.stop="toAgreementPage('隐私政策','privacy.html')">《隐私政策》</text>了解详细信息。如您同意，请点击"同意"开始接受我们的服务。
				</view>
			</view>

			<view class="button">
				<view class="back" @tap="isAgreePrivacy(false)">暂不使用</view>
				<view class="consent" @tap="isAgreePrivacy(true)">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'privacy-policy',
		props: {
			title: {
				type: String,
				default: "服务协议和隐私政策"
			}
		},
		data() {
			return {
				showPopup: false
			}
		},
		mounted() {
			//判断是否开启隐私政策提示框
			if(!plus.runtime.isAgreePrivacy()){
				this.showPopup = true
			}
		},
		methods: {
			//跳转服务协议页面
			toAgreementPage(title, url) {
				let agreement = {
					title: title,
					url: url
				}
				uni.navigateTo({
					url: '/pages/my/agreement?agreement=' + encodeURIComponent(JSON.stringify(agreement))
				})
			},
			// 禁止滚动
			clear() {
				return
			},
			isAgreePrivacy(status){
				if(status){
					this.showPopup = false
					plus.runtime.agreePrivacy()
				} else {
					uni.showToast({
					    title: '本产品在用户同意隐私政策与服务协议后方可使用',
						icon: 'none',
					    duration: 2000
					})
					plus.runtime.disagreePrivacy()
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		z-index: 999999;
	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		overflow: hidden;
		box-sizing: border-box;
		padding: 40upx 20upx 0 20upx;
		position: fixed;
		bottom: 30%;
		border-radius: 8px;
		left: 50%;
		margin-left: -40%;
		right: 0;
		min-height: 400upx;
		background: #fff;
		width: 80%;
		z-index: 9999999;

		.title {
			text-align: center;
			font-size: 34upx;
			padding: 10upx 0 0 0;
		}

		.explain_text {
			font-size: 30upx;
			padding: 30upx 30upx 40upx 30upx;
			line-height: 38upx;

			.line {
				display: block;

				.path {
					color: #007aff;
					display: inline-block;
					text-align: center;
				}
			}
		}

		.button {
			display: flex;
			padding: 20upx;
			align-items: center;
			font-size: 34upx;
			justify-content: space-around;
			border-top: 1upx solid #f2f2f2;

			view {
				text-align: center;
			}
		}
	}
</style>
