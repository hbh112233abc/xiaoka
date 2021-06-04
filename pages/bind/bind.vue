<template>  
	<view style="margin:20rpx">
    <view class="title">
      请绑定账号
    </view>
    <view class="form">
      <u-form :model="form" ref="uForm">
      <u-form-item label="手机号" prop="mobile">
        <u-input v-model="form.mobile" placeholder="请输入手机号"/>
      </u-form-item>
      <u-form-item label="验证码" prop="code">
        <u-input v-model="form.code" placeholder="请输入验证码"/>
        <slot name="right">
          <u-button type="success" size="mini" @click="getCode" :disabled="codeButtonDisable">{{codeButtonText}}</u-button>
        </slot>
      </u-form-item>
    </u-form>
    <u-button type="primary" @click="submit">提交</u-button>
    </view>		
    <view class="phone">
      <u-button type="success" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">本机号码一键绑定</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
          mobile: '',
          code: '',
        },
        codeButtonDisable:true,
        codeButtonText:"获取验证码",
        rules: {
          mobile: [
            { 
              required: true, 
              message: '请输入手机号', 
              // 可以单个或者同时写两个触发验证方式 
              trigger: ['change','blur'],
            },
            {
              // 自定义验证函数，见上说明
              validator: (rule, value, callback) => {
                // 上面有说，返回true表示校验通过，返回false表示不通过
                // this.$u.test.mobile()就是返回true或者false的
                return this.$u.test.mobile(value);
              },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change','blur'],
            }
          ],
          code: [
            {
              required: true, 
              min: 4, 
              message: '不能少于4个字', 
              trigger: ['change','blur'],
            }
          ]
        }
			}
		},
		methods: {
      //提交绑定
			submit() {
        this.$refs.uForm.validate(valid => {
          if (valid) {
            console.log('验证通过');
            //请求后端验证绑定
            
          } else {
            console.log('验证失败');
          }
        });
      },
      //获取验证码
      getCode() {
        
      },
      //一键获取手机号
      getPhoneNumber(e){
        console.log(e.detail.errMsg == "getPhoneNumber:ok");
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          uni.request({
            url: 'https://www.ixiaoka.cn/miniprogram/index/decodePhone',
            data: {
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              sessionKey: uni.getStorageSync('session_key'),
              uid: "",
            },
            method: "post",
            success: function (res) {
              console.log(res);
              //TODO 后台解析手机号,绑定结果
            }
          })
        }
      }
		},
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    }
	}
</script>

<style>
 .title {
   font-weight: bold;
   font-size: 40rpx;
   text-align: center;
   padding:80rpx;
 }
 .phone {
   padding-top: 10rpx;
 }
</style>
