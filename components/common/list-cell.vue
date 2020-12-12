<template>
	<view @click="listCellClick" class="list-cell-container">
		<view class="left-cell-section">
			<image v-if="icon" class="cell-icon" :src="'/static/common/'+icon" mode="widthFix"></image>
			<text :class="titleClass">{{title}}</text>
		</view>
		<view class="list-cell-right ellipsis">
			<slot name="special"></slot>
			<text :class="subTitleClass">{{subTitle}}</text>
			<text v-if="isShowArrow" class="iconfont iconjiantou right-arrow"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			icon:{
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			subTitle: {
				type: [String,Number],
				default: ""
			},
			isShowArrow: {
				type: Boolean,
				default: true
			},
			subTitleClass: {
				type: String,
				default: "black"
			},
			titleClass: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			//列表点击事件
			listCellClick(){
				this.$emit("listCellClick")
			}
		}
	}
</script>

<style lang="scss" scoped>
.list-cell-container{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 105rpx;
	line-height: 105rpx;
	padding: 0 18rpx  0 30rpx;
	font-size: 14px;
	border-bottom: 1rpx solid #e7e7e7;
	.left-cell-section{
		display: flex;
		align-items: center;
	}
	.cell-icon{
		width: 40rpx;
		height: 40rpx;
		padding-right: 20rpx;
	}
	
	.list-cell-right{
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
		margin-left: 15rpx;
		.right-arrow{
			color: #c7c7c7;
			font-size: 13px;
			padding-left: 20rpx;
		}
	}
}

.grayTitle{
	color: #666;
}

.red{
	color: #d96c47;
}
.gray{
	color: #a1a1a1;
}
.setting-subTitle{
	color: #999;
	font-size: 12px;
}
.black{
	color: #383838;
}
</style>
