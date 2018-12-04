//仓库
import Vue from 'vue';
import Vuex from 'vuex';
import tabs from './tabs.js'

Vue.use(Vuex);



  var store = new Vuex.Store({
    modules:{
      tabs
    },
    state:{
      serverIP:'http://localhost:3000'
    },
    getters:{},
    mutations:{},
    actions:{}
  });

  export default store;

