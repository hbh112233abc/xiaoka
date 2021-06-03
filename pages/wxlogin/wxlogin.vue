<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view v-if="isCanUse">
      <view>
        <view class='header'>
          <image :src='avatarUrl'></image>
        </view>
        <view class="nickname">
          {{nickName}}
        </view>
        <view class='content'>
          <view>申请获取以下权限</view>
          <text>获得你的公开信息(昵称，头像、地区等)</text>
        </view>

        <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
          @getuserinfo="wxGetUserInfo">
          授权登录
        </button>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        session_key: '',
        openid: '',
        nickName: '',
        avatarUrl: '../../static/images/wx_login.png',
        isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
      };
    },
    methods: {
      //第一授权获取用户信息===》按钮触发
      wxGetUserInfo() {
        let _this = this;
        uni.getUserInfo({
          provider: 'weixin',
          success: function(infoRes) {
            console.log(infoRes);
            _this.nickName = infoRes.userInfo.nickName; //昵称
            _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
            try {
              uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
              _this.updateUserInfo();
            } catch (e) {}
          },
          fail(res) {}
        });
      }, //登录
      login() {
        let _this = this;
        uni.showLoading({
          title: '登录中...'
        });

        // 1.wx获取登录用户code
        uni.login({
          provider: 'weixin',
          success: function(loginRes) {
            let code = loginRes.code;
            if (!_this.isCanUse) {
              //非第一次授权获取用户信息
              uni.getUserInfo({
                provider: 'weixin',
                success: function(infoRes) { //获取用户信息后向调用信息更新方法
                  console.log(infoRes);
                  _this.nickName = infoRes.userInfo.nickName; //昵称
                  _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
                  _this.updateUserInfo(); //调用更新信息方法
                }
              });
            }

            //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
            uni.request({
              url: 'https://www.ixiaoka.cn/miniprogram/index/login',
              data: {
                code: code,
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                uni.hideLoading();
                if(res.data.code != 0){
                  return uni.showToast({title:res.data.msg});
                }
                
                //openId、或SessionKdy存储//隐藏loading
                uni.setStorageSync('openId',res.data.data.openid);
                uni.setStorageSync('session_key',res.data.data.session_key);
                uni.setStorageSync('token',res.data.data.token);
                
              }
            });
          },
        });
      },
      //向后台更新信息
      updateUserInfo() {
        let _this = this;
        uni.request({
          url: 'https://www.ixiaoka.cn/miniprogram/index/updateUserInfo', //服务器端地址
          data: {
            openid:uni.getStorageSync('openId'),
            nickName: _this.nickName,
            headUrl: _this.avatarUrl
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            if (res.data.code == 0) {
              uni.reLaunch({ //信息更新成功后跳转到小程序首页
                url: '/pages/index/index'
              });
            }            
          }
        });
      }
    },
    onLoad() { //默认加载
      this.login();
    }
  }

</script>

<style>
  .header {
    margin: 90rpx 0 10rpx 50rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
  }

  .header image {
    width: 200rpx;
    height: 200rpx;
  }
  
  .nickname {
    text-align: center;
    margin-bottom:10rpx;
  }

  .content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
  }

  .content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
  }

  .bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
  }

</style>
