<!--这里是根组件-->
<template>
        <el-container class="app-wrapper">
          <el-header>
            <h1>蘑菇街后台管理系统</h1>
          </el-header>
          <el-container>
            <el-aside>
              <my-menu></my-menu>
            </el-aside>
            <el-main>
              <my-tabs></my-tabs>
            </el-main>
          </el-container>
        </el-container>
</template>
<script type="text/ecmascript-6">
        import Menu from './components/Menu.vue';
        import Tabs from './components/Tabs.vue';

        export default {
          components: {
            'my-menu':Menu,
            'my-tabs':Tabs
          }
        };
</script>
<style scoped>
  .app-wrapper{
    height:100%;
  }
  .el-header{
    background-color: #303133;
  }
  .el-header>h1{
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-aside{
    background-color: #606266;
  }
</style>
