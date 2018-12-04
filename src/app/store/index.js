//仓库
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



var store = new Vuex.Store({
        modules:{

        },
        state:{
                serverIP:'http://localhost:3000'
        },
        getters:{},
        mutations:{},
        actions:{}
});

export default store;

