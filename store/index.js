import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appName:'春田花花幼稚园', //应用名称
    scrollHeight: 600, //windowHeight - app端状态栏高度 - 底部footer-tabbar高度
    statusBarHeight: 0, //状态栏高度
    isHorizontal: false, //是否横屏
    // 自定义tabbar数据
    tabBar: [
      {
        iconPath: "/static/images/home.png",
        selectedIconPath: "/static/images/home-fill.png",
        text: '首页',
        // count: 2,
        isDot: true,
        pagePath: "/pages/index/index"
      },
      {
        iconPath: "/static/images/scan.png",
        selectedIconPath: "/static/images/scan-fill.png",
        text: '扫一扫',
        midButton: true,
        pagePath: "/pages/scan/index"
      },
      {
        iconPath: "/static/images/my.png",
        selectedIconPath: "/static/images/my-fill.png",
        text: '我的',
        pagePath: "/pages/my/index"
      },
    ]
  },
  mutations: {
    //设置滚动区域的高度
    setScrollHeight(state, height) {
      state.scrollHeight = height
    },
    //设置app状态栏高度
    setStatusBarHeight(state, height) {
      state.statusBarHeight = height
    },
    //设置是否横屏
    setIsHorizontal(state, status) {
      state.isHorizontal = status
    },
  }
})

export default store
