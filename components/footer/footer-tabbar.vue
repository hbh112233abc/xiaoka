<template>
	<view class="footer-tabbar-container">
		<view class="action" @tap="tabTap(0)">
			<view class="footer-item-wrap">
				<image v-show="TabID === 0" src="/static/common/project_selected.jpg" mode="widthFix"></image>
				<image v-show="TabID !== 0" src="/static/common/project.jpg" mode="widthFix"></image>
				<view class="footer-text" :class="{ 'active': TabID === 0 }">
					首页
				</view>
			</view>
		</view>
		<view class="action" @tap="tabTap(1)">
			<view class="footer-item-wrap">
				<image v-show="TabID === 1" src="/static/common/leader_selected.jpg" mode="widthFix"></image>
				<image v-show="TabID !== 1" src="/static/common/leader.png" mode="widthFix"></image>
				<view class="footer-text" :class="{ 'active': TabID === 1 }">
					第二
				</view>
			</view>
		</view>
		<view class="action" @tap="tabTap(2)">
			<view class="footer-item-wrap">
				<image v-show="TabID === 2" src="/static/common/work_selected.jpg" mode="widthFix"></image>
				<image v-show="TabID !== 2" src="/static/common/work.jpg" mode="widthFix"></image>
				<view class="footer-text" :class="{ 'active': TabID === 2 }">
					第三
				</view>
			</view>
		</view>
		<view class="action" @tap="tabTap(3)">
			<view class="footer-item-wrap">
				<image v-show="TabID === 3" src="/static/common/my_selected.jpg" mode="widthFix"></image>
				<image v-show="TabID !== 3" src="/static/common/my.jpg" mode="widthFix"></image>
				<view class="footer-text" :class="{ 'active': TabID === 3 }">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'footer-tabbar',
		data() {
			return {
				TabID: 0,
				MsgDot: false,
				roleName: ''
			}
		},
		props: {
			tabID: {
				type: [String, Number],
				default: 0
			},
			msgDot: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.TabID = this.tabID
			this.MsgDot = this.msgDot
		},
		watch: {
			tabID() {
				this.TabID = this.tabID
			},
			msgDot() {
				this.MsgDot = this.msgDot
			}
		},
		methods: {
			tabTap(index) {
				if (index != this.TabID) {
					this.$emit('tabTap', index)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer-tabbar-container {
		height: 125rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 8rpx;
		background-color: #fff;
		border-top: 1rpx solid #d9d8d8;

		.action {
			flex: 1;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image {
				width: 60rpx;
				height: 80rpx;
			}
			.center-icon {
				width: 80rpx !important;
			}
		}
		
		.footer-item-wrap{
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.footer-text{
				margin-top: 5rpx;
				color: #badcff;
			}
			
			.active{
				color: #0070ff;
			}
		}
		
		
	}
</style>
