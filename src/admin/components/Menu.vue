<template>
        <el-menu background-color="#606266"
                 text-color="#fff"
                 default-active="sale"
                 active-text-color="#ffd04b"
                 @select="addTab"
        >
          <el-menu-item index="account">
            <i class="iconfont icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="sale">
            <i class="el-icon-service"></i>
            <span slot="title">销售管理</span>
          </el-menu-item>
          <el-submenu index="goods">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
               <el-menu-item index="category">
                    <i class="iconfont icon-category"></i>
                    <span slot="title">商品分类管理</span>
               </el-menu-item>
               <el-menu-item index="product">
                 <i class="iconfont icon-list"></i>
                  <span slot="title">商品信息管理</span>
               </el-menu-item>
          </el-submenu>
        </el-menu>
</template>
<script type="text/ecmascript-6">
        export default {
            data:function(){
                return {
                  isCollapse: true
                }
            },
            methods:{
              addTab:function (key,keyPath) {
                  this.$store.commit('tabs/add',key);
              },
            }
        };
</script>
<style scoped>
</style>
