<!--这里是根组件-->
<template>
	<!--使用组件-->
	<div class="app">
		<div class="content">
			<router-view></router-view>
		</div>
		<div class="nav" v-show="!/details|address|dome/.test($route.path)" v-if="!/cart/.test($route.path)">
			<my-footer v-show="!/product/.test($route.path)"></my-footer>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Myfooter from './compontents/Myfooter.vue'  //导入组件

        export default {
		components:{
		        'my-footer':Myfooter    //注册组件
		}
        };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.app
		height:100%
		width: 100%
		display:flex
		flex-direction:column
		.content
			flex-grow:1
			flex-shrink:0
		.nav
			flex:0 0 1rem
</style>
