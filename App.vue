<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      //获取设备信息
      const systemInfo = uni.getSystemInfoSync()
      
      //获取app状态栏高度
      // #ifdef APP-PLUS
      this.$store.commit('setStatusBarHeight', plus.navigator.getStatusbarHeight())
      // #endif
      
      // 获取滚动区域的高度
      let scrollH = systemInfo.windowHeight // - uni.upx2px(90) - uni.upx2px(125)
      // #ifdef APP-PLUS
      scrollH -= systemInfo.statusBarHeight
      // #endif
      this.$store.commit('setScrollHeight', scrollH)
      
      // #ifdef APP-PLUS
      this.$U.pushListener()
      // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	@import "uview-ui/index.scss";
</style>
