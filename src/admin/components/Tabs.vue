<template>
        <el-tabs type="card" closable v-model="state.curName" @tab-remove="removeTab">
            <el-tab-pane :name="name" v-for="name in state.names" :label="map[name].title" :key="name">
                  <component :is="map[name].content"></component>
            </el-tab-pane>
        </el-tabs>
</template>
<script type="text/ecmascript-6">
        import Category from './Category.vue';
        import Product from './Product.vue';


        export default {
          data: function(){
            return {
                  map:{
                        category:{
                            title:'商品分类',
                            content:Category
                        },
                        product:{
                            title:'商品信息',
                            content:Product
                        }
                  },
            }
          },
          computed:{
              state:function(){return this.$store.state.tabs;}
          },
          methods:{
              removeTab:function(name){
                    this.$store.commit('tabs/remove',name)
              }
          }
        }
</script>
<style scoped>
</style>
