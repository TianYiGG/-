//子仓库
export default{
    namespaced:true,
    state:{
        names:[],
        curName:''
    },
    getters:{},
    mutations:{
      add:function (state,name) {
          if(state.names.indexOf(name)===-1){
             state.names.push(name);
          }
            state.curName = name;
      },
      remove:function (state,name) {
          var i = state.names.indexOf(name);
          state.names.splice(i,1);
      }
    },
    actions:{}
}
