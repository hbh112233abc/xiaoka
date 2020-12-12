<template>
  <view class="">
    <view class="content">
      <view v-for="(item,index) in menuList" :key="index">
        <view class="u-flex user-box u-p-l-30 u-p-r-20">
          <view class="u-m-r-10">
            <u-image :src="item.logo" width="100rpx" mode="widthFix" shape="circle"></u-image>
          </view>
          <view class="u-flex-1">
            <view class="u-font-18 u-p-b-20">{{item.title}}</view>
            <view class="u-font-14 u-tips-color">{{item.remark}}</view>
          </view>
          <view class="u-m-l-10 u-p-10">
            <u-icon name="scan" color="#969799" size="28"></u-icon>
          </view>
          <view class="u-m-l-10 u-p-10">
            <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
          </view>
        </view>        
      </view>

      <u-tabbar :list="_tabBar" :mid-button="true" :mid-button-size="60"></u-tabbar>
    </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '工具',
        menuList:[
          {
            logo:'/static/uview/common/logo.png',
            title:'扫码入校',
            remark:'扫一扫入校学生校卡二维码',
          }
          ,{
            logo:'/static/uview/common/logo.png',
            title:'扫码出校',
            remark:'扫一扫出校学生校卡二维码',
          }
          ,{
            logo:'/static/uview/common/logo.png',
            title:'扫码上车',
            remark:'扫一扫学生校卡二维码',
          }
        ]
      }
    },
    computed: {
      _tabBar() {
        return this.$store.state.tabBar;
      }
    },
  }

</script>

<style>
  page {
    background-color: #ededed;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
  }

  .user-box {
    background-color: #fff;
    width: 720rpx;
    height: 220rpx;
    margin-top: 20rpx;
    border-radius: 20rpx;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

</style>
