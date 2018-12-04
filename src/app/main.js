// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//这是根实例

import Vue from 'vue';  //引入Vue
import store from './store';
import router from './router';
import App from './App.vue';  //引入根组件
//引入Element ui组件及其css文件
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//引入自定义全局样式
import './assets/css/reset.css';
import 'vue2-animate/dist/vue2-animate.min.css';
//引入自定义字体图标文件的样式iconfontcss文件
//import './assets/css/iconfont.css';



//Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  el:'#app',
  store,    //公共仓库注入根实例
  router, //导入vue-router    路由注入根实例
  components: { App },  //注册根组件
  template:'<App />'  //表示要创建一个根组件对象
});
