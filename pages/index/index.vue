<template>
  <view class="content">
    <u-notice-bar mode="horizontal" :volume-icon="true" :list="list"></u-notice-bar>
    <view class="qr-content">
      <view class="title">
        <text class="title-text">{{title}}</text>
      </view>
      <view class="qrcode">
        <image src="@/static/images/qr.png" mode=""></image>
      </view>
      <view class="label">
        <u-tag text="教师" mode="plain" type="primary" />
        <u-tag text="家长" mode="plain" type="success" />
        <u-tag text="保安" mode="plain" type="warning" />
        <u-tag text="校车司机" mode="plain" type="error" />
      </view>
    </view>
    
    <news></news>    

    <!-- 底部菜单 -->
    <u-tabbar :list="_tabBar" :mid-button="true" :mid-button-size="60"></u-tabbar>
  </view>
</template>

<script>
  import news from '@/pages/index/news/news'
  export default {
    components:{
        news
    },
    data() {
      return {
        title: '春田花花幼稚园',
        list: [
          '寒雨连江夜入吴',
          '平明送客楚山孤',
          '洛阳亲友如相问',
          '一片冰心在玉壶'
        ]
      }
    },
    mounted() {},
    computed: {
      _tabBar() {
        return this.$store.state.tabBar;
      }
    },
    onShow() {
      console.log(this.tabbar);
    }
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
  }

  .qr-content {
    background-color: #FFFFFF;
    margin-top: 20rpx;
    width: 680rpx;
    height: 680rpx;
    border-radius: 20rpx;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
  }

  .title {
    margin-top: 25rpx;
    color: #ccc;
  }

  .qrcode {
    padding: 20rpx;
  }

  .qrcode image {
    width: 500rpx;
    height: 500rpx;
    /* background-color: #2B85E4; */
  }

  .label .tag {}

</style>
