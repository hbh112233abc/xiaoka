<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    tabBar:[{
  				iconPath: "home",
  				selectedIconPath: "home-fill",
  				text: '首页',
  				count: 2,
  				isDot: true,
  				pagePath: "/pages/index/index"
  			},
  			{
  				iconPath: "scan",
  				selectedIconPath: "scan",
  				text: '扫一扫',
  				midButton: true,
  				pagePath: "/pages/scan/index"
  			},
  			{
  				iconPath: "account",
  				selectedIconPath: "account-fill",
  				text: '我的',
  				pagePath: "/pages/my/index"
  			},
  		]
  },
  mutations:{
    
  },
  getters:{
    
  },
  actions:{
    
  }
});

export default store;
  
</script>
